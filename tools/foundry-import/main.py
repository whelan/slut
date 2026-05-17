#!/usr/bin/env python3
"""CLI entry point for Foundry VTT campaign import."""

import argparse
import os
import sys
from pathlib import Path
from dotenv import load_dotenv

from converter import CampaignConverter
from foundry_api import FoundryAPIClient


def main():
    parser = argparse.ArgumentParser(
        description='Import D&D campaign content to Foundry VTT',
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog='''
Examples:
  # Convert to JSON files only (no API upload)
  python3 main.py --input-dir /path/to/campaign --output json-export/

  # Full import with API (requires FOUNDRY_API_KEY and FOUNDRY_WORLD_ID)
  python3 main.py --api-key YOUR_KEY --world YOUR_WORLD_ID --dry-run

  # Import and commit to forgevtt
  python3 main.py --api-key YOUR_KEY --world YOUR_WORLD_ID
        '''
    )

    parser.add_argument(
        '--input-dir',
        default='.',
        help='Root directory of campaign (default: current directory)'
    )
    parser.add_argument(
        '--output',
        default='json-export',
        help='Output directory for JSON files (default: json-export/)'
    )
    parser.add_argument(
        '--foundry-url',
        default='https://forgevtt.com',
        help='Foundry URL (default: https://forgevtt.com)'
    )
    parser.add_argument(
        '--api-key',
        help='Foundry API key (or set FOUNDRY_API_KEY env var)'
    )
    parser.add_argument(
        '--world',
        help='Foundry world ID (or set FOUNDRY_WORLD_ID env var)'
    )
    parser.add_argument(
        '--dry-run',
        action='store_true',
        help='Preview changes without sending to API'
    )
    parser.add_argument(
        '--json-only',
        action='store_true',
        help='Only export to JSON files (no API calls)'
    )
    parser.add_argument(
        '--skip-pcs',
        action='store_true',
        help='Skip player character creation (if PCs already exist in Foundry)'
    )
    parser.add_argument(
        '--env-file',
        default='.env.local',
        help='Path to .env file with credentials (default: .env.local)'
    )

    args = parser.parse_args()

    # Load environment
    if Path(args.env_file).exists():
        load_dotenv(args.env_file)

    # Get credentials
    api_key = args.api_key or os.getenv('FOUNDRY_API_KEY')
    world_id = args.world or os.getenv('FOUNDRY_WORLD_ID')

    # Validate input directory
    input_dir = Path(args.input_dir)
    if not input_dir.exists():
        print(f"❌ Input directory not found: {input_dir}")
        return 1

    print(f"📂 Campaign directory: {input_dir}")
    print()

    # Step 1: Convert markdown to JSON
    try:
        converter = CampaignConverter(str(input_dir))
        content = converter.convert_all(skip_pcs=args.skip_pcs)
    except Exception as e:
        print(f"❌ Conversion failed: {e}")
        return 1

    print(f"\n✅ Conversion complete:")
    print(f"  - {len(content['actors'])} actors")
    print(f"  - {len(content['journals'])} journals")
    print(f"  - {len(content['scenes'])} scenes")
    print()

    # Step 2: Write JSON files
    try:
        converter.to_json_files(args.output)
    except Exception as e:
        print(f"❌ Failed to write JSON files: {e}")
        return 1

    # Step 3: API upload (if credentials provided and not json-only)
    if args.json_only:
        print("✅ JSON-only mode. Skipping API upload.")
        return 0

    if not api_key or not world_id:
        print("⚠️  API credentials not provided. To upload to Foundry:")
        print(f"  1. Set FOUNDRY_API_KEY and FOUNDRY_WORLD_ID environment variables")
        print(f"  2. Or pass --api-key and --world arguments")
        print()
        print("JSON files are ready in:", args.output)
        return 0

    print("🚀 Uploading to Foundry VTT...")
    try:
        client = FoundryAPIClient(
            foundry_url=args.foundry_url,
            api_key=api_key,
            world_id=world_id,
        )

        # Test connection
        if not client.test_connection():
            print("❌ Failed to connect to Foundry. Check API key and URL.")
            return 1

        print("✓ Connected to Foundry")
        print()

        # Batch import
        print("📤 Creating actors...")
        actors_created = client.batch_create_actors(content['actors'], dry_run=args.dry_run)
        print(f"  Created {actors_created} actors")

        print("📤 Creating journals...")
        journals_created = client.batch_create_journals(content['journals'], dry_run=args.dry_run)
        print(f"  Created {journals_created} journals")

        print("📤 Creating scenes...")
        scenes_created = client.batch_create_scenes(content['scenes'], dry_run=args.dry_run)
        print(f"  Created {scenes_created} scenes")

        print()
        print(client.get_import_summary())

        if args.dry_run:
            print("✅ Dry-run complete. No changes made to Foundry.")
            print("   Run again without --dry-run to commit.")
        else:
            print("✅ Import complete!")

        return 0

    except Exception as e:
        print(f"❌ API upload failed: {e}")
        return 1


if __name__ == '__main__':
    sys.exit(main())

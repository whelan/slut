#!/usr/bin/env python3
"""CLI: convert D&D campaign markdown into a Foundry Adventure JSON file.

Output is a single adventure.json that imports via the "Adventure Importer /
Exporter" Foundry module (https://foundryvtt.com/packages/adventure-import-export).

Usage:
  python3 main.py --input-dir .. --output ./out/

  # Skip player characters (already exist in your Foundry world)
  python3 main.py --skip-pcs
"""

import argparse
import sys
from pathlib import Path

from converter import CampaignConverter


def main() -> int:
    parser = argparse.ArgumentParser(
        description='Convert D&D campaign markdown into a Foundry Adventure JSON file.',
        formatter_class=argparse.RawDescriptionHelpFormatter,
    )
    parser.add_argument(
        '--input-dir',
        default='.',
        help='Root directory of campaign (default: current directory)',
    )
    parser.add_argument(
        '--output',
        default='out',
        help='Output directory for adventure.json (default: out/)',
    )
    parser.add_argument(
        '--name',
        default='Tyranny of Dragons - Finale',
        help='Adventure name shown in Foundry',
    )
    parser.add_argument(
        '--skip-pcs',
        action='store_true',
        help='Skip player character creation (if PCs already exist in Foundry)',
    )
    parser.add_argument(
        '--embed-images',
        action='store_true',
        help='Embed images as base64 in JSON (larger file, ~128 MB; default is file paths)',
    )
    parser.add_argument(
        '--compendium',
        action='store_true',
        help='Generate Foundry v13 compendium packs instead of adventure.json',
    )
    parser.add_argument(
        '--module',
        action='store_true',
        help='Generate Foundry module package (best for Forge VTT)',
    )

    args = parser.parse_args()

    input_dir = Path(args.input_dir).resolve()
    if not input_dir.exists():
        print(f"Input directory not found: {input_dir}", file=sys.stderr)
        return 1

    print(f"Campaign directory: {input_dir}")

    try:
        converter = CampaignConverter(str(input_dir), embed_images=args.embed_images)
        converter.convert_all(skip_pcs=args.skip_pcs)

        if args.module:
            output_path = converter.write_module(args.output)
        elif args.compendium:
            output_path = converter.write_compendium_packs(args.output)
        else:
            output_path = converter.write_adventure(args.output, args.name)
    except Exception as e:
        print(f"Conversion failed: {e}", file=sys.stderr)
        return 1

    print()
    if args.module:
        print(f"✓ Module package created: {output_path}")
        print()
        print("Next steps:")
        print("  1. Zip the module directory:")
        print(f"     zip -r tyranny-of-dragons-finale.zip {Path(output_path).name}")
        print("  2. Upload to Forge VTT or your server")
        print("  3. In Foundry: Add-on Modules → Install Module")
        print("  4. Enable module in your world")
        print("  5. Open Compendiums sidebar and drag items into world")
    elif args.compendium:
        print(f"✓ Compendium packs written to: {output_path}")
        print()
        print("Next steps:")
        print("  1. Copy the 'packs' directory to your Foundry installation:")
        print("     cp -r packs/ /path/to/foundry/data/worlds/your-world/packs/")
        print("  2. Reload Foundry")
        print("  3. Compendiums will appear in the Compendium sidebar")
        print("  4. Drag actors/journals/scenes from compendiums into your world")
    else:
        print(f"✓ Adventure written to: {output_path}")
        print()
        print("Next steps:")
        print("  1. In Foundry, install the 'Adventure Importer / Exporter' module")
        print("     (https://foundryvtt.com/packages/adventure-import-export)")
        print(f"  2. Open the module's import dialog and select: {output_path}")
        print("  3. Click 'Import Adventure'")
    return 0


if __name__ == '__main__':
    sys.exit(main())

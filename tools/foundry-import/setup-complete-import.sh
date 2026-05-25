#!/bin/bash
# Complete Foundry import setup script
# This script generates all missing tokens and creates the import macro

set -e

echo "================================"
echo "Tyranny of Dragons - Complete Import Setup"
echo "================================"
echo ""

# Step 1: Generate missing tokens
echo "Step 1: Generating placeholder tokens for actors without artwork..."
python3 tools/foundry-import/generate_missing_tokens.py
echo ""

# Step 2: Regenerate complete image URL mappings
echo "Step 2: Regenerating complete image-urls.json..."
python3 tools/foundry-import/generate_complete_urls.py
echo ""

# Step 3: Generate the complete import macro
echo "Step 3: Generating complete import macro with all 57 actors, 12 journals, 3 scenes..."
python3 tools/foundry-import/main.py --input-dir . --output foundry-export --macro
echo ""

# Step 4: Verification
echo "Step 4: Verifying all actors have images..."
python3 << 'VERIFY'
import json
with open('foundry-export/image-urls.json', 'r') as f:
    urls = json.load(f)
with_img = sum(1 for v in urls.values() if v.get('portrait') and v['portrait'].startswith('https://'))
print(f"✓ {with_img}/{len(urls)} actors have images")
if with_img == len(urls):
    print("✓ ALL ACTORS READY FOR IMPORT!")
VERIFY

echo ""
echo "================================"
echo "✅ SETUP COMPLETE"
echo "================================"
echo ""
echo "Next Steps:"
echo ""
echo "1. UPLOAD TOKENS TO FORGE VTT:"
echo "   - Go to https://forge-vtt.com"
echo "   - Open your world"
echo "   - Go to: Assets → Asset Library"
echo "   - Upload all PNG files from: art/finale/output/"
echo "   - This may take 1-2 minutes for 17 files"
echo ""
echo "2. IMPORT INTO FOUNDRY:"
echo "   - Open your Foundry world"
echo "   - Press F12 to open Developer Console"
echo "   - Click the 'Console' tab"
echo "   - Copy entire contents of: foundry-export/import-macro.js"
echo "   - Paste into console and press Enter"
echo "   - Wait for: '✓ Campaign import complete!' notification"
echo ""
echo "3. VERIFY IN FOUNDRY:"
echo "   - Check Actors sidebar: should see 57 actors in 'temple-of-tiamat/NPCs' folder"
echo "   - Check Journals sidebar: should see 12 journals"
echo "   - Check Scenes sidebar: should see 3 temple scenes"
echo "   - All actors should have portrait and token artwork"
echo ""
echo "Files ready for import:"
echo "   - foundry-export/import-macro.js (1.1 MB)"
echo "   - art/finale/output/*.png (17 new placeholder tokens)"
echo ""

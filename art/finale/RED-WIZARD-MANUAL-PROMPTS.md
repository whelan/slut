# Red Wizard Character Portraits - Manual Generation Guide

**Generate these 6 images using DALL-E, Midjourney, Stable Diffusion, or similar.**

Copy each prompt → Paste into your image generator → Generate → Save with the filename shown.

---

## 1. Magus Thallid

**Filename to save as:** `red-wizard-1.png`

**Prompt:**
```
Dark fantasy D&D 5e male red wizard, crimson robes with dragon embroidery, intricate Thayan tattoos on face and hands, staff of arcane power, mystical aura, ultra detailed character portrait, ornate crimson and gold armor, high contrast cinematic lighting, full body, transparent background, no text, no watermark, fantasy illustration, professional art style
```

**Image specifications:**
- Size: 1024x1024 or 1536x1536
- Format: PNG (transparent background preferred)
- Style: D&D 5e fantasy character portrait

---

## 2. Magus Szass

**Filename to save as:** `red-wizard-2.png`

**Prompt:**
```
Dark fantasy D&D 5e male red wizard, deep crimson robes with mystical runes, Thayan red wizard cult robes, staff with glowing crystal, face painted with ritual marks, magical aura around hands, detailed character portrait, ultra detailed, full body, transparent background, cinematic fantasy lighting, high contrast, no text, no watermark
```

**Image specifications:**
- Size: 1024x1024 or 1536x1536
- Format: PNG (transparent background preferred)
- Style: D&D 5e fantasy character portrait

---

## 3. Magus Zalathorm

**Filename to save as:** `red-wizard-3.png`

**Prompt:**
```
Dark fantasy D&D 5e red wizard mage, crimson and black ceremonial robes, dragon motif armor, Thay cult sorcerer, ritual incantations flowing visually, arcane magic swirling, character portrait, full body, ornate magical staff, ultra detailed, transparent background, fantasy illustration, high contrast dramatic lighting, no text, no watermark
```

**Image specifications:**
- Size: 1024x1024 or 1536x1536
- Format: PNG (transparent background preferred)
- Style: D&D 5e fantasy character portrait

---

## 4. Magus Valrax

**Filename to save as:** `red-wizard-4.png`

**Prompt:**
```
Dark fantasy D&D 5e red wizard male, crimson ritual robes with gold trim, Thayan cultist mage, intricate magical tattoos, arcane aura, staff of power, character portrait illustration, full body, ultra detailed, transparent background, cinematic gothic lighting, high contrast, fantasy art style, no text, no watermark
```

**Image specifications:**
- Size: 1024x1024 or 1536x1536
- Format: PNG (transparent background preferred)
- Style: D&D 5e fantasy character portrait

---

## 5. Magus Thyrmog

**Filename to save as:** `red-wizard-5.png`

**Prompt:**
```
Dark fantasy D&D 5e red wizard sorcerer, deep crimson robes, Thayan arcane cult member, magical aura surrounding body, ornate staff, ritual robes with dragon symbols, character portrait, full body, ultra detailed, transparent background, high contrast cinematic lighting, fantasy illustration, no text, no watermark
```

**Image specifications:**
- Size: 1024x1024 or 1536x1536
- Format: PNG (transparent background preferred)
- Style: D&D 5e fantasy character portrait

---

## 6. Magus Yarthraax

**Filename to save as:** `red-wizard-6.png`

**Prompt:**
```
Dark fantasy D&D 5e red wizard male mage, crimson and black robes, Thay cult sorcerer, mystical aura, arcane power staff, ritual tattoos, character portrait, full body, ultra detailed, transparent background, high contrast cinematic lighting, fantasy art style, no text, no watermark
```

**Image specifications:**
- Size: 1024x1024 or 1536x1536
- Format: PNG (transparent background preferred)
- Style: D&D 5e fantasy character portrait

---

## Where to Store the Images

### **Local storage (for reference):**
```
art/finale/output/
├── red-wizard-1.png
├── red-wizard-2.png
├── red-wizard-3.png
├── red-wizard-4.png
├── red-wizard-5.png
└── red-wizard-6.png
```

### **Foundry/Forge VTT storage:**
Upload the 6 PNG files to your Forge VTT world's asset library:

1. In Foundry, go to **Assets** (left toolbar)
2. Navigate to **world** folder
3. Create folder: `temple-of-tiamat`
4. Upload all 6 PNG files
5. Note the asset URLs (they follow this pattern):
   ```
   https://assets.forge-vtt.com/[YOUR-WORLD-ID]/temple-of-tiamat/red-wizard-1.png
   https://assets.forge-vtt.com/[YOUR-WORLD-ID]/temple-of-tiamat/red-wizard-2.png
   (etc.)
   ```

---

## Update the Scripts with Your Image URLs

Once you have the images uploaded to Forge, update the image URLs in **RED-WIZARD-CREATOR-2024.js**:

### **Step 1:** Open `foundry-export/RED-WIZARD-CREATOR-2024.js`

### **Step 2:** Find the `RED_WIZARDS` array (around line 19-40)

### **Step 3:** Replace the placeholder URLs with your actual Forge URLs

**Before:**
```javascript
const RED_WIZARDS = [
  {
    name: "Magus Thallid",
    portrait: "https://assets.forge-vtt.com/6013af62c59beb36df7c44a8/temple-of-tiamat/red-wizard-1.png",
    token: "https://assets.forge-vtt.com/6013af62c59beb36df7c44a8/temple-of-tiamat/red-wizard-1-token.png"
  },
  ...
];
```

**After (with YOUR world ID):**
```javascript
const RED_WIZARDS = [
  {
    name: "Magus Thallid",
    portrait: "https://assets.forge-vtt.com/YOUR-WORLD-ID/temple-of-tiamat/red-wizard-1.png",
    token: "https://assets.forge-vtt.com/YOUR-WORLD-ID/temple-of-tiamat/red-wizard-1-token.png"
  },
  ...
];
```

---

## Token Images (Optional)

The script also references **token** images (for miniatures in combat). You have two options:

### **Option A: Use the same portrait as token**
If you're happy using the character portrait as the token, just use the same URL:
```javascript
token: "https://assets.forge-vtt.com/YOUR-WORLD-ID/temple-of-tiamat/red-wizard-1.png"
```

### **Option B: Create separate token variants**
Generate 6 additional token-sized images (circular, top-down view):
- `red-wizard-1-token.png`
- `red-wizard-2-token.png`
- (etc.)

And use those URLs in the `token` field.

---

## Quick Checklist

- [ ] Generate 6 character portraits (using prompts above)
- [ ] Save as `red-wizard-1.png` through `red-wizard-6.png`
- [ ] Upload to Forge VTT: Assets → world → temple-of-tiamat
- [ ] Note your Forge world ID (from the asset URLs)
- [ ] Update RED-WIZARD-CREATOR-2024.js with your Forge URLs
- [ ] Test by running the script in Foundry console
- [ ] Verify Red Wizards have correct portraits in Foundry

---

## Image Generation Tools

**Free/Paid Options:**
- **DALL-E 3** (via ChatGPT Plus): Best quality, $20/month
- **Midjourney**: High-quality fantasy, $10-120/month
- **Stable Diffusion** (free open source): Good quality, free
- **Microsoft Designer** (free, powered by DALL-E)
- **Bing Image Creator** (free DALL-E 3)

**Recommended:** DALL-E 3 for best D&D character portrait quality.

---

## Need Help?

If image generation doesn't work as expected:
1. Try simpler prompts (remove "ultra detailed", "high contrast")
2. Use reference images in your generator (show example red wizard art)
3. Adjust style: try "digital painting", "realistic", "stylized"
4. The import system works fine **without images** - portraits are optional

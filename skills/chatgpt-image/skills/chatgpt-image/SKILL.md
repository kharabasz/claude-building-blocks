---
name: chatgpt-image
description: Generate raster images (decorative art, textures, frames, ornaments, scenes, icons as PNG) with ChatGPT in the browser, one image per prompt, and save each one to a file in the project. Use whenever a task needs a new raster image and no other image generator is available, or the user says to make art with ChatGPT.
---

# ChatGPT image generation

Claude has no image generator of its own. ChatGPT does, and the user is signed in to it in the browser. This skill drives ChatGPT through the browser tools and saves each result as a file.

## Rules

- **One image per prompt.** ChatGPT spreads its resolution and quality across every image in a request, so asking for several at once gives worse images. Send one prompt, wait for one image, save it, then send the next.
- **Ask for standalone assets, never a "website mockup" or "UI screenshot".** Ask for a transparent PNG for ornaments, frames, corners and icons. Ask for a full-bleed scene for art that will be cropped or faded. State the size and aspect ratio, the palette and the light direction, and say that there should be no text, no watermark and no frame around the asset.
- **The user signs in themselves.** Never type credentials. If ChatGPT shows a sign-in page or a Cloudflare check, stop and ask the user to deal with it in the browser.
- **Don't get around blocks.** The image's signed `estuary` link won't serve to scripts outside the browser. Don't fake browser headers or cookies to get past that; save the image from inside the page as described below.
- Keep one ChatGPT chat per piece of work, so follow-ups ("same, but simpler") keep their context. Name the chat after the asset set.

## Steps

1. **Open ChatGPT.** Prefer Claude in Chrome (`mcp__claude-in-chrome__*`) when it's connected (`list_connected_browsers`), because Chrome saves downloads without asking. The built-in browser (`mcp__Claude_Browser__*`) works too, but it makes the user accept every download, including through ChatGPT's own Download button. If you use it, tell the user a prompt will appear for each image. Open `https://chatgpt.com/` or the chat the user names, and check the page shows a signed-in chat.
2. **Send the prompt.** Click the composer (the `div.ProseMirror[contenteditable]` labelled "Ask ChatGPT"; find it with `find` "Ask ChatGPT"), type the prompt, and press Enter. Don't paste several prompts.
3. **Wait for the image.** Generation takes 30 seconds to 2 minutes. Wait with short `wait` steps, and check with this script that the newest image has finished and stopped growing:

   ```js
   const imgs = [...document.querySelectorAll('img[alt^="Generated image"]')];
   const busy = !!document.querySelector('[data-testid="stop-button"]');
   ({ count: imgs.length, busy, size: imgs.length ? (await (await fetch(imgs.at(-1).src)).blob()).size : 0 })
   ```

   The image is done when `busy` is false, `count` went up by one since you sent the prompt, and `size` is the same on two checks in a row. ChatGPT shows low-resolution previews while it works, so a single reading isn't enough.
4. **Look at it before saving.** Take a screenshot or zoom in. If it's wrong (it has text, a frame, or it's a mockup instead of an asset), say what to change in the same chat, then go back to step 3.
5. **Note the time, then save it with ChatGPT's own button.** Run `node -e "console.log(Date.now())"` and keep the number. Then click the newest image (`find` "Generated image", the last button), which opens it in the viewer, and click the viewer's **Download** button (`find` "Download"). Close the viewer with Escape afterwards.

   The browser saves the file to `~/Downloads` under ChatGPT's default name. The built-in browser asks the user to accept each download, and while it waits the file sits there as a GUID-named `.tmp` with the complete bytes. Chrome saves without asking, unless "Ask where to save each file" is turned on in Chrome's settings.
6. **Move it into the project straight away** (start this right after the click, while any prompt is still open):

   ```bash
   node <base-dir>/scripts/collect-download.mjs <time-from-step-5> <project>/path/gen-corner-gold-01.png
   ```

   `<base-dir>` is this skill's base directory, shown when the skill loads. The script takes the newest file created in Downloads after that time, waits until its size stops changing, checks that it's a PNG, WebP or JPEG (a `.tmp` counts), copies it to the target and deletes the original. Use a unique, descriptive target name. If it times out, the download was declined or never started. Say so; don't retry blindly.

   Fallback when the viewer has no Download button: save from the page, which goes through the same download prompt:

   ```js
   const img = [...document.querySelectorAll('img[alt^="Generated image"]')].at(-1);
   const blob = await (await fetch(img.src)).blob();
   const a = Object.assign(document.createElement('a'), { href: URL.createObjectURL(blob), download: 'chatgpt-image.png' });
   document.body.append(a); a.click(); a.remove();
   ```
7. **Process it locally.** Crop, trim, key out the background, tint, or slice it into 9-slice pieces with a Playwright canvas script. Playwright's `chromium` is in any project that has it in `node_modules`; pass the images in as data URLs so the canvas isn't tainted. Keep the untouched generated file next to the processed one, so it can be reprocessed later.

## Prompt template

> Generate one image: a [what], as a standalone [transparent PNG asset | full-bleed painted scene], [W×H or aspect ratio]. Style: [medium, era, mood]. Palette: [colours]. Light from [direction]. [Edge or fade requirements, e.g. "the left third fades to plain parchment #F3E7D3".] No text, no watermark, no border, no UI, not a mockup.

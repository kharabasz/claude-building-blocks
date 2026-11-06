# Claude toolkit

Skills and other tools for Claude Code, published as a plugin marketplace. The spend-bar mod moved to [kharabasz/spend-bar](https://github.com/kharabasz/spend-bar).

## Skills

### humanizer

Rewrites AI-sounding prose so it reads like the writer without changing what it says: contrasts, one-line closers, forced triads, dashes, inflated claims, stock AI words, decorative formatting and chat leftovers. Invoke it with `/humanizer` or ask Claude to humanize a piece of text.

Imported unchanged from [blader/humanizer](https://github.com/blader/humanizer) (v3.1.0, commit `8c307f3`), MIT licensed, © 2025 Siqi Chen. Its own licence is in `skills/humanizer/LICENSE`.

### plain-direct-voice

Writes and edits blog posts and essays in a plain, direct voice: plain assertions, everyday words, no callbacks or wordplay, light on research, other people's stories told second-hand, and endings that state the practice. The rules and examples come from a writer's edits to [Token boxing](https://codingthinks.com/ai/token-boxing/). It flags once when a plainer word changes what a source says. Use it with humanizer: humanizer removes AI habits, and this skill is the writer's sample it matches. Invoke it with `/plain-direct-voice` or ask Claude to write in a plain, direct voice. Not for code, commit messages or pull requests.

### writing-quorum-review

Reviews a blog post, essay or article with four reviewer agents on different models (Opus, Sonnet, Haiku and Fable). Every reviewer gets the same brief with a shared list of finding tags, so their votes can be counted; Claude then applies only the findings at least three of the four agree on, breaks two-two splits in favour of what the author already proposed, and never copies in facts a reviewer made up. Use it for questions about flow, what to cut, or how to frame an idea. Invoke it with `/writing-quorum-review` or ask for a multi-model review. Pairs with `plain-direct-voice` and `humanizer` for the rewrite.

### chatgpt-image

Generates raster images (art, textures, frames, ornaments, scenes) with ChatGPT in the browser and saves each one into the project, for when Claude needs an image and has no generator of its own. It sends one image per prompt, because ChatGPT spreads quality across every image in a request. It asks for standalone assets rather than mockups, and it saves each image with ChatGPT's own Download button. A script then moves the file from Downloads into the project, picking it up even while the browser still holds it as a `.tmp`. You sign in to ChatGPT yourself. It prefers Claude in Chrome, which saves without asking, because the desktop app's built-in browser asks you to accept every download. Invoke it with `/chatgpt-image` or ask Claude to make an image with ChatGPT.

## Install

At the prompt of a terminal session (swap `humanizer` for `plain-direct-voice`, `writing-quorum-review` or `chatgpt-image` as needed):

```
/plugin install humanizer --marketplace kharabasz/claude-toolkit
```

From a shell:

```bash
claude plugin install humanizer --marketplace kharabasz/claude-toolkit
```

In the desktop app, where `/plugin` does not run: click **+** next to the prompt box, then **Plugins**, **Add marketplace** with `kharabasz/claude-toolkit`, then **Add plugin**.

## Developing

Each skill plugin lives in `skills/<name>/`. Check one with:

```bash
claude plugin validate skills/humanizer
```


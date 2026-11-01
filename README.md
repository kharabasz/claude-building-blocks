# Claude building blocks

Mods and other building blocks for Claude Code, published as a plugin marketplace.

## Mods

### spend-bar

A bar above the prompt showing:

- **Session (5h) and weekly usage limits**, with time until each resets — amber above 70%, red above 90%
- **Prompt cache status**, counted down from the last model response — amber in the last fifth of the TTL, red once expired
- **Context usage** — amber above 40%, red above 60%
- A **Compact** button (hotkey `c` while the bar has focus) that runs `/compact` in the chat, as the session rail does. It reads **Compacting…** while any compaction runs (automatic ones too) and is dimmed and inactive below 30% context

Values under their thresholds are plain dim text; values past them become pills (rounded SVG pills on the desktop app, coloured labels in the terminal).

Option: **Prompt cache TTL** (`1h` default for subscriptions, `5m` for most API keys), in the config menu.

#### Usage stats

The bar also records how each session uses tokens, for a later spend review. It records metadata only, never prompt text, file contents or command output:

- each model request: model, effort, main thread or subagent, input, output, cache read and cache write tokens, the idle gap before it, and context %
- each tool call: tool name, result size, error or denied, and a hash of the file path (to spot repeated reads)
- compactions (trigger, size before and after), subagents spawned, skills run, and the tools and MCP servers loaded at session start

Each session writes a JSONL file per day to `%LOCALAPPDATA%\claude-building-blocks\spend-bar\events\<date>\<session>.jsonl` (`$XDG_STATE_HOME` or `~/.local/state` elsewhere). Daily totals are kept in the plugin's store. Both are deleted after 30 days. Options: **Collect usage stats** (on by default) and **Stats folder**.

Requires Claude Code 2.1.308 or newer.

## Skills

### humanizer

Rewrites AI-sounding prose so it reads like the writer without changing what it says: contrasts, one-line closers, forced triads, dashes, inflated claims, stock AI words, decorative formatting and chat leftovers. Invoke it with `/humanizer` or ask Claude to humanize a piece of text.

Imported unchanged from [blader/humanizer](https://github.com/blader/humanizer) (v3.1.0, commit `8c307f3`), MIT licensed, © 2025 Siqi Chen. Its own licence is in `skills/humanizer/LICENSE`.

### plain-direct-voice

Writes and edits blog posts and essays in a plain, direct voice: plain assertions, everyday words, no callbacks or wordplay, light on research, other people's stories told second-hand, and endings that state the practice. The rules and examples come from a writer's edits to [Token boxing](https://codingthinks.com/ai/token-boxing/). It flags once when a plainer word changes what a source says. Use it with humanizer: humanizer removes AI habits, and this skill is the writer's sample it matches. Invoke it with `/plain-direct-voice` or ask Claude to write in a plain, direct voice. Not for code, commit messages or pull requests.

### writing-quorum-review

Reviews a blog post, essay or article with four reviewer agents on different models (Opus, Sonnet, Haiku and Fable). Every reviewer gets the same brief with a shared list of finding tags, so their votes can be counted; Claude then applies only the findings at least three of the four agree on, breaks two-two splits in favour of what the author already proposed, and never copies in facts a reviewer made up. Use it for questions about flow, what to cut, or how to frame an idea. Invoke it with `/writing-quorum-review` or ask for a multi-model review. Pairs with `plain-direct-voice` and `humanizer` for the rewrite.

## Install

Add the marketplace once, then install plugins from it by `name@claude-building-blocks` (swap `spend-bar` for `humanizer`, `plain-direct-voice` or `writing-quorum-review` as needed).

At the prompt of a terminal session:

```
/plugin marketplace add kharabasz/claude-building-blocks
```

```
/plugin install spend-bar@claude-building-blocks
```

From a shell:

```bash
claude plugin marketplace add kharabasz/claude-building-blocks
```

```bash
claude plugin install spend-bar@claude-building-blocks
```

When a plugin is added or updated here, refresh your copy of the marketplace before installing it:

```bash
claude plugin marketplace update claude-building-blocks
```

In the desktop app, where `/plugin` does not run: click **+** next to the prompt box, then **Plugins**, **Add marketplace** with `kharabasz/claude-building-blocks`, then **Add plugin**.

## Developing

Each mod lives in `mods/<name>/` and each skill plugin in `skills/<name>/`. Check one with:

```bash
claude plugin validate mods/spend-bar
```

```bash
claude plugin test mods/spend-bar
```

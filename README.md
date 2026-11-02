# Claude toolkit

Mods, skills and other tools for Claude Code, published as a plugin marketplace.

## Mods

### spend-bar

A bar above the prompt showing:

- **Session (5h) and weekly usage limits**, with time until each resets — amber above 70%, red above 90%
- **Prompt cache status**, counted down from the last model response — amber in the last fifth of the TTL, red once expired
- **Context usage** — amber above 40%, red above 60%
- A **↓** (Compact) button, hotkey `c` while the bar has focus, that runs `/compact` in the chat, as the session rail does. It reads **↓…** while any compaction runs (automatic ones too) and is dimmed and inactive below 30% context. It turns amber from 40% context, the point to compact by
- A **$** (Optimize spend) button, hotkey `o`, that scores this session and the past week from the usage stats below and asks Claude for suggestions. It looks at the share of tokens sent above 40% context, turns over 50 requests, shell calls per request, repeated reads, tool results over 20k characters, cache rewrites over 100k tokens, the most used shell commands and the most common shell errors

A toast appears when one main-thread turn reaches 40 model requests, since each request resends the whole context.

Values under their thresholds are plain dim text; values past them become pills (rounded SVG pills on the desktop app, coloured labels in the terminal).

Options, in the config menu: **Prompt cache TTL** (`1h` default for subscriptions, `5m` for most API keys), **Compact warning** (40% by default) and **Long turn warning** (40 requests by default); `0` turns either warning off.

#### Output trimming

Bash, PowerShell and `browser_batch` results over 10,000 characters are cut to their head and tail before the model reads them. The note in the middle names a file with the full output (under `events\output\<date>`, kept 7 days), so the model can read or grep it instead of running the command again. Option: **Trim tool output over** (`0` turns trimming off).

#### Usage stats

The bar also records how each session uses tokens, for a later spend review. It records metadata only, never prompt text or file contents, and of command output only the start of shell error text:

- each model request: model, effort, main thread or subagent, input, output, cache read and cache write tokens, the idle gap before it, and context %
- each tool call: tool name, result size (and the size sent after trimming), error or denied, and a hash of the file path (to spot repeated reads)
- each shell call: the first word of the command (`git`, `gh`, `dotnet`, `npm`, ...) and, when it fails, the first 100 characters of its error text
- compactions (trigger, size before and after), subagents spawned, skills run, and the tools and MCP servers loaded at session start

Each session writes a JSONL file per day to `%LOCALAPPDATA%\claude-toolkit\spend-bar\events\<date>\<session>.jsonl` (`$XDG_STATE_HOME` or `~/.local/state` elsewhere). Daily totals are kept in the plugin's store. Both are deleted after 30 days. Options: **Collect usage stats** (on by default) and **Stats folder**.

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

At the prompt of a terminal session (swap `spend-bar` for `humanizer`, `plain-direct-voice` or `writing-quorum-review` as needed):

```
/plugin install spend-bar --marketplace kharabasz/claude-toolkit
```

From a shell:

```bash
claude plugin install spend-bar --marketplace kharabasz/claude-toolkit
```

In the desktop app, where `/plugin` does not run: click **+** next to the prompt box, then **Plugins**, **Add marketplace** with `kharabasz/claude-toolkit`, then **Add plugin**.

## Developing

Each mod lives in `mods/<name>/` and each skill plugin in `skills/<name>/`. Check one with:

```bash
claude plugin validate mods/spend-bar
```

```bash
claude plugin test mods/spend-bar
```

# Claude building blocks

Mods and other building blocks for Claude Code, published as a plugin marketplace.

## Mods

### spend-bar

A bar above the prompt showing:

- **Session (5h) and weekly usage limits**, with time until each resets — amber above 70%, red above 90%
- **Prompt cache status**, counted down from the last model response — amber in the last fifth of the TTL, red once expired
- **Context usage** — amber above 40%, red above 60%
- A **Compact** button (hotkey `c` while the bar has focus) that runs the same compaction as `/compact`

Values under their thresholds are plain dim text; values past them become pills (rounded SVG pills on the desktop app, coloured labels in the terminal).

Option: **Prompt cache TTL** (`1h` default for subscriptions, `5m` for most API keys), in the config menu.

Requires Claude Code 2.1.308 or newer.

## Skills

### humanizer

Rewrites AI-sounding prose so it reads like the writer without changing what it says: contrasts, one-line closers, forced triads, dashes, inflated claims, stock AI words, decorative formatting and chat leftovers. Invoke it with `/humanizer` or ask Claude to humanize a piece of text.

Imported unchanged from [blader/humanizer](https://github.com/blader/humanizer) (v3.1.0, commit `8c307f3`), MIT licensed, © 2025 Siqi Chen. Its own licence is in `skills/humanizer/LICENSE`.

### ste100

Writes or rewrites technical text in Simplified Technical English by the ASD-STE100 writing rules: approved words with one meaning, sentences of at most 20 words in procedures and 25 in descriptions, imperative steps, active voice, noun clusters of at most three words, and safety instructions that start with a command. Invoke it with `/ste100` or ask Claude to answer in STE.

The skill summarises the rules in its own words. It does not contain the ASD-STE100 dictionary, which is copyrighted by ASD and free on request from [asd-ste100.org](https://www.asd-ste100.org/). Check certified output against the official dictionary.

## Install

At the prompt of a terminal session (swap `spend-bar` for `humanizer` or `ste100` as needed):

```
/plugin install spend-bar --marketplace kharabasz/claude-building-blocks
```

From a shell:

```bash
claude plugin install spend-bar --marketplace kharabasz/claude-building-blocks
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

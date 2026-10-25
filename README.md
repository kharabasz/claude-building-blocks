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

## Install

At the prompt of a terminal session:

```
/plugin install spend-bar --marketplace kharabasz/claude-building-blocks
```

From a shell:

```bash
claude plugin install spend-bar --marketplace kharabasz/claude-building-blocks
```

In the desktop app, where `/plugin` does not run: click **+** next to the prompt box, then **Plugins**, **Add marketplace** with `kharabasz/claude-building-blocks`, then **Add plugin**.

## Developing

Each mod lives in `mods/<name>/`. Check one with:

```bash
claude plugin validate mods/spend-bar
```

```bash
claude plugin test mods/spend-bar
```

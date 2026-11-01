---
name: plain-direct-voice
description: |
  Write or edit blog posts, essays and articles in a plain, direct voice: plain assertions,
  everyday words, no callbacks or wordplay, light on research, other people's stories told
  second-hand, practical endings. Use when drafting, rewriting or reviewing long-form prose
  that should read this way. Not for code, commit messages, pull requests or technical docs.
license: MIT
metadata:
  version: "0.1.0"
---

# Plain, direct voice

This voice is for opinion pieces written for working developers. It states a point, gives the reader what they need to act on it, and stops. The rules come from a writer's line edits to a full draft, so each one is a choice a writer made, not a style guess.

Run the `humanizer` skill as well when it is installed. Humanizer removes AI habits; this skill adds the writer's. Treat this skill as the writer's sample that humanizer matches.

## The rules

1. **State it plainly.** Assert the point. Keep hedges and epistemic labels ("that half is well supported", "that part is a hypothesis", "as far as I know") out of the argument's flow. A caveat belongs in the one place where the evidence is discussed, said once.
2. **Use everyday words.** Prefer "different" to "a different number", "wrong" to "false", "result" to "answer", "cheated by reward-hacking" to "reward-hacked". Readability beats precision, within one limit: see the guardrail below.
3. **Be direct, not clever.** No callbacks to earlier phrases, no echoes, no reversals ("improve the evidence instead of the work"), no punchlines ("verified perfectly"), no metaphor that has to be carried through ("when the box empties, fill it again").
4. **Keep research light.** At most one source per claim, and only for a claim that needs it. Cut illustrative detours (a famous result, a personal anecdote used as a metaphor) and state the general point instead.
5. **End sentences early.** Cut trailing qualifiers ("made before the first run", "an empty box") when the next sentence carries the detail. A colon can introduce a list without restating it.
6. **Keep distance on other people's stories.** Report them second-hand and in the plural: "I've heard from colleagues in the industry about teams…", never "I watched a colleague…". Don't add details the writer didn't give.
7. **Make general claims broad and firm.** "Months or even years", not "months or even a year".
8. **End on the practice.** The last paragraph says what to do and stops. No image, no return to the opening story, no summary line.

## Guardrail: flag source drift once

When a simpler word changes what a source says, keep the writer's wording but say so once, briefly, with a fix that stays plain. Example: "cheated by reward-hacking in 30.5% of open-ended research tasks" drops that the study found the behaviour *unprompted* in *research-pipeline* tasks. Offer "cheated, unprompted, by reward-hacking" and let the writer choose. Do the same when a cut breaks a link to an earlier section: "based on merit" lost the tie to "define done", and the writer took "based on the definition of done".

## Example edits

Each pair is a draft line and the writer's version.

| Draft | Writer's version |
|---|---|
| That's a different number from the probability that the output is correct. | That's different from the probability that the output is correct. |
| A fluent answer can break a requirement nobody wrote down, hide a bug or simply be false, and running the model again gets you another answer, which may or may not be a better one. | An iteration can break a requirement nobody wrote down, hide a bug or simply be wrong, and running the model again gets you another result, which may or may not be a better one. |
| …so whatever was missing, it wasn't compute. | …so the problem wasn't compute. |
| The machine can keep generating without getting closer to a correct result, and that half is well supported. | The machine can keep generating without getting closer to a correct result. |
| The second loop runs through the person at the keyboard, and it has no proof checker. | The second loop runs through the person at the keyboard. |
| …and it comes down to three moves made before the first run. | …and it comes down to three moves: |
| Second, set the box and treat an empty box as a checkpoint. | Second, set the box and treat it as a checkpoint. |
| I have watched colleagues spend more than $20,000 a month each on AI… | I've heard from colleagues in the industry about teams spending more than $20,000 a month per person on AI… |
| …breaking one can take months or even a year. | …breaking one can take months or even years. |
| …when it empties, someone looks at what is actually there and decides on purpose whether to fill it again. The projects I heard about went from week two to month six… | …when the budget runs out, a person looks at what has been built and decides whether to spend more. |

The writer also cut a whole sentence of supporting example ("In formal mathematics a proof counts only once a proof checker validates it…") and dropped a swimming anecdote in favour of the general point about habits.

## An accepted paragraph

This is the target register. Short sentences, plain words, one source, one caveat where the evidence is:

> Gambling research calls this a near-miss, and near-misses make people want to keep playing (Clark et al., 2009). Nobody has shown the same effect in agent loops, and nineteen of twenty can be a real sign that one more run is worth it. The problem is carrying on when the evidence of progress is weak or comes only from the agent.

The full reference sample is the post [Token boxing](https://codingthinks.com/ai/token-boxing/).

## How to work

1. Draft in this voice from the start rather than writing generically and converting.
2. Check every sentence against the eight rules, then run humanizer's checks (no dashes, no not-X-but-Y, no one-line closers, no bold labels).
3. Keep every fact, number and source accurate. Never add a fact, story detail or quote the writer didn't give.
4. When the writer edits a line, apply their wording as given. If it causes source drift or breaks a link to another section, say so once, after applying it.

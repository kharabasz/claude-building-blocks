---
name: writing-quorum-review
description: |
  Review a blog post, essay or article with four reviewer agents on different models
  (Opus, Sonnet, Haiku, Fable), tally their findings by shared tags, and change only what
  at least three of the four agree on. Use when the user asks for a multi-model review,
  a quorum review, or a second opinion from several models on the flow, structure, length
  or framing of a piece of writing. Not for code review.
license: MIT
metadata:
  version: "0.1.0"
---

# Writing quorum review

One reviewer's opinion is noise; four reviewers on different models agreeing is a signal. This skill sends the same brief to four reviewers, counts which findings they share, and applies only those. It works for any review question about a piece of writing: does it flow, what can be cut, should two ideas merge.

Invoking this skill is the user's request to run reviewer agents. Run them in parallel and in the background.

## 1. Pin the draft and the question

1. Save the current draft to a file (the scratchpad is fine) so every reviewer reads the same text. Version it: `post-v1.md`, `post-v2.md`. Never point reviewers at a file you are still editing.
2. Write down the question in the user's words, for example "it reads like loose thoughts, not an article" or "the how-to section feels heavy".
3. List what must stay: anything the user asked for explicitly (an opening definition, their personal stories, a hypothesis they stated). Reviewers may argue against these, but the author's explicit request wins over a quorum, and you say so in the report.

## 2. Write one brief with shared tags

Every reviewer gets the identical prompt. It has five parts:

- **Role.** "You are an experienced editor of opinion essays for a tech-industry blog."
- **Scope.** The file path, "Do not edit it", and what to judge (flow and structure, ideas to trim, framing). Say what is out of scope, usually line-level wording, which the voice and humanizer passes handle.
- **Must stay.** The list from step 1.
- **Tags.** A list of 10 to 18 short tags for the findings you expect, each with a few words of meaning, plus "invent a new tag if none fits". Shared tags are what make the votes countable. Write them for the question:
  - Flow: `WEAK-HOOK`, `STORY-PLACEMENT`, `THESIS-BURIED`, `MISSING-TRANSITIONS`, `HEDGING-OVERLOAD`, `RESEARCH-DUMP`, `LIST-HEAVY`, `TABLE-BREAKS-FLOW`, `DIGRESSION`, `ENDING-WEAK`, `TOO-LONG`.
  - Trims: one `CUT-<THING>` tag per paragraph or citation you suspect, plus `KEEP-<THING>` and `MERGE-<SECTIONS>` where the user floated an option.
  - Framing: one tag per option, for example `MERGE-INTO-INTRO`, `MERGE-INTO-SECTION`, `KEEP-BOTH-REWORD`, `OTHER`, and ask the reviewer to pick exactly one.
- **Report format.** A word cap (400 to 500) and fixed numbered sections, for example: a one-sentence verdict, a one-line findings list as `[TAG] problem → fix`, direct answers to each of the user's questions, and a proposed outline or draft paragraph when the change is structural.

## 3. Run four reviewers

Spawn four agents in one message with the same prompt, each with a different `model`: `opus`, `sonnet`, `haiku`, `fable`. Give each a short description such as "Flow review (Opus)". If one model is unavailable, run three and lower the quorum to two of three.

While they run, tell the user in one line what each is answering. Report each result as it arrives in one line ("Two of four are back"); don't summarise findings until all are in.

## 4. Tally

Count each tag across the four reports. Merge tags that mean the same thing (a reviewer's invented tag often duplicates a listed one). Then sort every finding into:

- **Quorum:** raised by at least three of four. Apply it.
- **Split:** two of four. Don't apply it, unless the user already proposed exactly that change, in which case their proposal breaks the tie. Say which way you went.
- **Single:** one of four. Ignore it, but mention it if it is the only finding on something the user asked about.

When reviewers agree on the change but differ on how (cut versus compress, which label to use), take the option most of them share, and the smallest edit when it's still even.

## 5. Apply

1. Write the next version from the quorum findings only. When three or four reviewers proposed nearly the same outline or paragraph, follow it.
2. Treat reviewers' draft text as suggestions. Never copy in a fact, number, study, example or story detail a reviewer added; only the user and the sources supply facts.
3. Keep everything on the must-stay list.
4. Run the writer's voice skill (for example `plain-direct-voice`) and `humanizer` over the changed passages when they are installed.
5. Check the word count before and after, and scan for dashes and other humanizer tells.

## 6. Report

Lead with what changed, then the evidence:

- **Quorum findings applied**, each with its count (4 of 4, 3 of 4).
- **Splits**, with how you resolved each and why.
- **Where you went against the reviewers**, because of an explicit author request.
- **What you removed because the user never said it**, if reviewers or earlier drafts invented details.
- The new version, or its path and word count when the user is already reading it in a file.

Keep this short; the user wants the decisions, not the four reports.

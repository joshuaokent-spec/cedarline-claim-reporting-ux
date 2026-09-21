# Heuristic Evaluation & Revision Log

This project did not include moderated usability testing. To avoid presenting assumptions as research findings, I used a structured heuristic review of the prototype and documented the issues I found, the risk behind each issue, and the revision made.

## Review criteria

The review focused on:

- clarity of system status;
- match between the interface and real-world language;
- error prevention and recovery;
- user control and freedom;
- progressive disclosure;
- accessibility and semantic structure;
- consistency between the stated UX concept and the coded behavior.

## Findings and revisions

| Finding | UX risk | Revision |
| --- | --- | --- |
| The first prototype assumed a single auto policy even though the concept discussed auto and property claims. | Property scenarios felt bolted on rather than intentionally supported. | Added explicit policy selection and policy-aware loss categories from XML. |
| “Save & exit” saved progress but did not actually leave the experience. | The label promised behavior the prototype did not provide. | Renamed the action to “Save progress” and made the saved state explicit. |
| The main form container referenced a heading that became hidden after Step 1. | Assistive-technology context could become ambiguous. | Replaced the stale relationship with a stable accessible label and step-heading focus management. |
| File names were restored from storage even though browser security prevents restoring the actual selected files. | A returning user could believe uploads were still attached when they were not. | Draft restore now preserves form data but clearly requires files to be reselected. |
| The review screen summarized answers but offered no direct way to revise a section. | Users had to navigate backward repeatedly to correct one answer. | Added section-level Edit actions that return directly to the relevant step. |
| The progress bar was visual only. | Screen-reader users did not receive equivalent progress information. | Added progressbar semantics with live step values and labels. |
| Motion behavior was not explicitly constrained. | Smooth scrolling and transitions may be uncomfortable for users who prefer reduced motion. | Added `prefers-reduced-motion` handling. |
| Loss categories were generic rather than tied to the selected policy. | Users could see irrelevant choices, increasing cognitive load. | Added policy attributes to XML and filter categories by Auto/Home policy context. |

## What this evaluation does — and does not — prove

This heuristic pass demonstrates iterative design reasoning and implementation cleanup. It does **not** substitute for usability testing with real claimants.

The next production-quality validation step would be task-based testing with representative users, including people using keyboard navigation, browser zoom, and screen readers.

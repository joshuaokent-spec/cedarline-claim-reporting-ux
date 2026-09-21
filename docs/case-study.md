# Case Study — Insurance Claim Reporting Experience

## Summary

I designed and prototyped a responsive First Notice of Loss (FNOL) experience for Cedarline Mutual, a fictional personal-lines insurer. The concept focuses on a difficult UX context: a person reporting auto or property damage may be stressed, interrupted, missing information, or completing the task from a phone.

The design goal was to reduce unnecessary cognitive load while still collecting structured information useful for claim triage.

## The problem

A claim intake experience has competing needs. The claimant wants speed, clarity, reassurance, and flexibility. Claims operations need enough structured information to begin routing and follow-up. A poor implementation can shift that burden onto the user by asking for information they do not yet know, using insurance terminology too early, or making the user fear that leaving the form will lose their work.

I framed the design question as:

> How can someone report a loss confidently without already understanding insurance terminology or having every detail available?

## Project constraint and research integrity

This was a rapid portfolio sprint rather than a production engagement. I did not claim interview-derived personas, survey findings, or moderated usability-study results.

Instead, I documented assumptions as proto-personas and used desk research, task analysis, accessibility requirements, heuristic evaluation, and iterative interface design. In a production project, those assumptions would be validated with primary research before release.

## Proto-personas

### Maya — Auto claim / mobile-first

Maya has been rear-ended during an evening commute. Her vehicle is drivable, but she is stressed, standing near traffic, and using her phone. She needs to start a report quickly, understand what can wait, and know that leaving the form will not erase her work.

### Daniel — Property claim / high disruption

Daniel returns home to water damage from a supply-line leak. He needs to document the loss while also protecting the home and managing disruption. He may have many photos but little certainty about cause, repair cost, or coverage.

### Eleanor — Accessibility / low technical confidence

Eleanor reports storm damage from a laptop using 200% browser zoom and primarily keyboard navigation. She benefits from persistent labels, predictable focus, explicit error messages, large controls, and clear confirmation that the task succeeded.

These are design hypotheses, not research findings.

## Requirements derived from the problem

The V1 experience should:

- collect only information useful at first notice of loss;
- support incomplete or unknown information;
- visibly autosave progress;
- let evidence be added later;
- use plain language before insurance terminology;
- progressively reveal relevant questions;
- support mobile, keyboard, zoom, and screen-reader use;
- provide review and edit before submission;
- confirm receipt without implying coverage approval;
- explain what happens after submission.

## Information architecture

The shared claim shell is organized around a short intake sequence:

1. Start and expectations
2. What happened?
3. When and where?
4. Damage and safety
5. Photos and documents
6. Contact preferences
7. Review
8. Confirmation and next steps

The concept anticipates future branching for auto and property losses while keeping the global shell consistent: progress, autosave state, help, save-and-exit behavior, validation, review, and confirmation.

## Notable UX decisions

### “I don’t know yet” is legitimate

Unknown information is not treated as an error when it is not necessary to start intake. The exact loss time can be unknown, evidence can be added later, and category selection includes an unsure option.

### Save state is visible

The prototype stores progress in `localStorage` and displays save/restoration status. This targets a realistic risk: interrupted sessions in stressful environments.

### Evidence is optional

Claimants do not need to delay intake while gathering photos, police reports, receipts, or estimates. The interface explains that more evidence can be added later.

### Review is grouped by meaning

The final review summarizes the claim in human-readable sections instead of dumping raw form fields. This gives users a chance to catch mistakes before submission.

### Confirmation is a workflow, not a dead end

The confirmation state includes a claim reference, submission timestamp, current status, contact preference, and next steps. It also makes a critical distinction: successful receipt does not mean coverage or payment has been approved.

## Prototype result

The coded prototype demonstrates a seven-step responsive intake flow with:

- XML-driven loss categories;
- plain-language prompts;
- autosave and draft restoration;
- optional evidence upload;
- accessible validation;
- contact preferences;
- review-before-submit;
- dynamic claim reference and submission confirmation.

## What I would validate next

The highest-risk assumptions for primary testing are:

- whether claimants understand which information can be deferred;
- whether autosave messaging creates confidence without distraction;
- whether users interpret “unsure” options correctly;
- whether the progress model matches perceived effort;
- whether the confirmation state reassures without suggesting coverage approval;
- how the experience performs at high zoom and with keyboard/screen-reader navigation.

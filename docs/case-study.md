# Case Study — Cedarline Insurance Claim Reporting Experience

## Executive summary

I designed and implemented a responsive **First Notice of Loss (FNOL)** experience for Cedarline Mutual, a fictional personal-lines insurer.

The project focuses on a difficult service moment: someone reporting auto or property damage may be stressed, interrupted, missing information, or completing the task from a phone or with assistive technology.

The design goal was to reduce unnecessary cognitive load while still collecting enough structured information to begin claims triage.

**Role:** UX Designer + front-end prototyper  
**Scope:** Auto + homeowners FNOL concept  
**Outputs:** proto-personas, requirements, task flow, IA, low-fi wireframes, web standards, heuristic evaluation, coded prototype

## Problem framing

A claim intake experience has competing needs.

The claimant wants:

- speed;
- plain language;
- reassurance;
- flexibility when information is incomplete;
- confidence that progress will not disappear;
- clear next steps after submission.

Claims operations need:

- policy context;
- structured loss category;
- timing and location;
- safety/damage information;
- evidence when available;
- a reliable contact preference.

A weak intake flow pushes the insurer’s complexity onto the claimant. It asks for information too early, uses insurance terminology without explanation, or treats “I don’t know yet” as failure.

I framed the design question as:

> **How can someone report a loss confidently without already understanding insurance terminology or having every detail available?**

## Constraint and research integrity

This was a rapid portfolio sprint rather than a live production engagement.

I did **not** claim interview-derived personas, survey findings, usability metrics, or moderated study results.

Instead, I used hypothesis-based proto-personas, public service patterns, task analysis, accessibility requirements, information architecture, heuristic evaluation, wireframing, and coded prototyping.

That distinction is intentional: a portfolio should demonstrate research judgment without fabricating evidence.

## Proto-personas

### Maya — Auto claim / mobile-first

Maya has been rear-ended during an evening commute. Her vehicle is drivable, but she is stressed and using her phone. She needs to start quickly, understand what can wait, and know she can resume later.

**Design risks:** interruption, incomplete information, small-screen use, insurance vocabulary.

### Daniel — Homeowners claim / high disruption

Daniel returns home to water damage from a supply-line leak. He needs to protect the property while documenting what happened. He may have many photos but little certainty about cause, cost, or coverage.

**Design risks:** evidence overload, uncertainty, repeated data entry, pressure to find exact answers too early.

### Eleanor — Accessibility / low technical confidence

Eleanor reports storm damage using 200% browser zoom and primarily keyboard navigation.

**Design risks:** dense layouts, hidden focus, color-only states, unlabeled controls, ambiguous success/error feedback.

These are **design hypotheses**, not research findings.

## Requirements

The V1 experience should:

1. collect only information useful for first notice of loss;
2. support both auto and homeowners contexts;
3. filter irrelevant loss categories;
4. support incomplete or unknown information;
5. visibly save progress;
6. make uploads optional for intake;
7. use plain language first;
8. progressively disclose relevant questions;
9. support mobile, keyboard, zoom, and screen-reader use;
10. provide review and direct editing before submission;
11. confirm receipt without implying coverage approval;
12. explain what happens next.

## Information architecture

The final shared shell is:

1. **Choose policy**
2. **What happened?**
3. **When & where?**
4. **Damage & safety**
5. **Photos & documents**
6. **Contact preferences**
7. **Review & edit**
8. **Confirmation & next steps**

The prototype uses policy-aware branching at the start, while keeping the rest of the interaction model consistent.

### Auto branch
Personal Auto → vehicle-relevant loss categories → shared intake

### Home branch
Homeowners → property-relevant loss categories → shared intake

Loss categories are stored in XML and filtered in JavaScript according to the selected policy.

## Major UX decisions

### 1. Choose policy before loss type

The earliest version displayed a single auto policy while also claiming to support property losses. That mismatch made the information architecture feel artificial.

The revised flow asks which policy the loss belongs to first. The next step then shows only relevant claim categories.

### 2. “Unknown” is a valid state

Exact information is not treated as mandatory when it is unnecessary for initial intake.

Examples:

- exact loss time can be unknown;
- safety responses include Unsure;
- loss category includes “Something else / not sure”;
- evidence can be added later.

### 3. Draft behavior is explicit and honest

The form saves text and selections to `localStorage` and can reopen at the prior step.

Because browsers do not allow a site to restore previously selected local files into a file input, the prototype **does not pretend uploaded files survived the session**. Returning users are told to reselect them.

### 4. Review is actionable

The review screen is organized by meaning, not raw field order. Each section includes a direct **Edit** action that returns to the relevant step.

### 5. Confirmation is part of the service experience

Submission provides:

- claim reference;
- current status;
- submission timestamp;
- selected contact channel;
- a short process explanation;
- a clear statement that receipt is not coverage approval.

## Accessibility approach

Accessibility influenced the structure from the wireframe stage.

The implementation includes:

- native form controls;
- persistent labels;
- `fieldset` and `legend`;
- visible focus treatment;
- skip navigation;
- field-level text errors;
- focusable error summary;
- live status messaging;
- programmatic progress state;
- responsive reflow;
- reduced-motion handling.

See [accessibility.md](accessibility.md) for detail.

## Heuristic evaluation and iteration

A structured heuristic review identified several problems in the first coded prototype, including:

- inconsistent policy scope;
- misleading “Save & exit” language;
- stale accessible heading relationships;
- unrealistic file restoration;
- review without edit shortcuts;
- visual-only progress;
- no reduced-motion handling.

Those findings were addressed in the current version.

See [heuristic-evaluation.md](heuristic-evaluation.md).

## Web standards / design system

The project includes a small standards artifact covering:

- color and type tokens;
- spacing;
- controls and card patterns;
- responsive breakpoints;
- content rules;
- accessibility rules.

See [design-system.md](design-system.md).

## Technical prototype

The coded prototype demonstrates:

- semantic HTML;
- responsive CSS;
- JavaScript interaction/state management;
- XML-driven loss categories;
- XML parsing with `DOMParser`;
- progressive fallback data;
- local draft persistence;
- direct review editing;
- responsive desktop/mobile layouts;
- GitHub Pages deployment.

## What I would validate next

The highest-risk assumptions for real usability testing are:

- whether users understand the policy-first entry point;
- whether users know which information can be deferred;
- whether autosave reduces anxiety;
- whether “Unsure” options are interpreted consistently;
- whether claim-category labels match claimant language;
- whether the confirmation screen reassures without implying claim approval;
- performance at high zoom and with keyboard/screen-reader navigation.

## Outcome

The finished concept demonstrates the complete UX chain I wanted from the project:

**Problem framing → proto-personas → requirements → IA/task flow → wireframes → heuristic evaluation → iteration → visual standards → accessible coded prototype.**

It does not replace real primary research, but it shows how I would structure, reason through, document, and implement a user-centered workflow under a rapid project constraint.

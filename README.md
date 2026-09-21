# Cedarline Mutual — Insurance Claim Reporting UX

A responsive **First Notice of Loss (FNOL)** UX case study and working front-end prototype for a fictional personal-lines insurer.

**Portfolio focus:** UX design · information architecture · accessibility · responsive web design · HTML/CSS/JavaScript/XML

> Cedarline Mutual is fictional. This project does not provide insurance coverage or claims services.

## Project overview

Reporting an insurance loss is a difficult UX moment. A claimant may be stressed, interrupted, using a phone, missing information, or relying on assistive technology. At the same time, the insurer needs enough structured information to begin triage.

I designed this experience around one core question:

**How can a claimant report a loss confidently without already understanding insurance terminology or having every detail available?**

The result is a mobile-first, seven-step claim-reporting flow that makes incomplete information, save-and-resume, optional evidence, review, and clear post-submission next steps first-class parts of the experience.

## UX process

This is a rapid portfolio concept rather than a production engagement. I do **not** claim primary user-interview or usability-study findings.

Instead, I used:

- explicit proto-personas and assumptions;
- desk research and public insurance-service patterns;
- task analysis and information architecture;
- accessibility requirements and heuristic evaluation;
- low-fidelity wireframes in Figma;
- a responsive coded prototype for implementation validation.

In a production engagement, the next step would be moderated task-based usability testing with recent claimants and users of browser zoom, keyboard navigation, and screen readers.

## Core flow

```text
Start
  → What happened?
  → When & where?
  → Damage & safety
  → Photos & documents
  → Contact preferences
  → Review
  → Confirmation & next steps
```

## Key design decisions

1. **Unknown is a valid state.** Exact time and some supporting information can be added later.
2. **Autosave is visible.** Form progress persists with `localStorage`, and the interface communicates saved state.
3. **Plain language comes first.** Prompts use language like “What happened?” instead of expecting insurance vocabulary.
4. **Evidence is optional for intake.** A claimant can start a report without delaying submission to gather files.
5. **Validation is accessible.** Errors are written in text, do not rely on color alone, and are summarized in a focusable error region.
6. **Confirmation is part of the workflow.** The experience provides a claim reference, status, selected contact method, and concrete next steps.
7. **Receipt is not approval.** The confirmation explicitly distinguishes successful submission from coverage or payment determination.

## Technical implementation

The prototype intentionally demonstrates the technical skills listed alongside UX work in the target role:

- semantic HTML;
- responsive CSS;
- vanilla JavaScript;
- XML-driven loss categories;
- DOM parsing with `DOMParser`;
- progressive fallback data if XML loading fails;
- `localStorage` save-and-resume behavior;
- accessible form validation and live status messaging;
- keyboard-visible focus states;
- responsive mobile/desktop layouts.

## Repository structure

```text
.
├── index.html
├── styles.css
├── app.js
├── data/
│   └── loss-categories.xml
└── docs/
    ├── case-study.md
    ├── design-process.md
    └── accessibility.md
```

## Run locally

The prototype loads XML with `fetch()`, so use a local web server instead of opening `index.html` directly.

```bash
python -m http.server 8000
```

Then open:

```text
http://localhost:8000
```

## Figma

The UX discovery board, task flow, information architecture, and low-fidelity wireframes were created in Figma:

https://www.figma.com/design/2ehS8ZH3HoTEdLXnmrD64d

## Case-study documentation

- [Case study](docs/case-study.md)
- [Design process](docs/design-process.md)
- [Accessibility approach](docs/accessibility.md)

## What I would validate next

The highest-risk assumptions I would test next are:

- whether users understand which information can be deferred;
- whether the progress model feels transparent without creating false certainty;
- whether “I don’t know yet” states reduce abandonment;
- whether the confirmation screen provides reassurance without implying coverage has been determined;
- whether the experience remains comfortable at high zoom and with keyboard/screen-reader navigation.

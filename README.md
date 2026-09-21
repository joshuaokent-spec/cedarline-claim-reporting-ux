# Cedarline Mutual — Insurance Claim Reporting UX

A responsive **First Notice of Loss (FNOL)** experience designed for people reporting an auto or homeowners claim while stressed, interrupted, or missing information.

**UX portfolio case study · Responsive web design · Information architecture · Accessibility · HTML/CSS/JavaScript/XML**

[**Live prototype**](https://joshuaokent-spec.github.io/cedarline-claim-reporting-ux/) · [**Figma process board**](https://www.figma.com/design/2ehS8ZH3HoTEdLXnmrD64d) · [**Full case study**](docs/case-study.md)

> **Cedarline Mutual is fictional.** This project does not provide insurance coverage or claims services.

## At a glance

| | |
| --- | --- |
| **Role** | UX Designer + front-end prototyper |
| **Project type** | Rapid portfolio concept sprint |
| **Primary challenge** | Balance a stressed claimant’s need for simplicity with structured FNOL information needs |
| **Deliverables** | Proto-personas, requirements, task flow, IA, low-fi wireframes, design standards, heuristic evaluation, responsive coded prototype |
| **Tools / tech** | Figma, HTML, CSS, JavaScript, XML, GitHub Pages |
| **Accessibility** | WCAG-informed interaction patterns; not presented as formally audited conformance |

## The problem

Reporting an insurance loss is not a calm, ideal-use scenario. A claimant may be standing beside a damaged vehicle, dealing with water in a home, using a phone, relying on browser zoom or keyboard navigation, or simply not know the answer to every question yet.

At the same time, claims operations need enough structured information to begin triage.

I framed the project around one question:

> **How can someone report a loss confidently without already understanding insurance terminology or having every detail available?**

## Design response

The prototype uses a short, progressive flow:

```text
Choose policy
  → What happened?
  → When & where?
  → Damage & safety
  → Photos & documents
  → Contact preferences
  → Review & edit
  → Confirmation & next steps
```

The current implementation supports **Personal Auto** and **Homeowners** scenarios and filters XML-driven claim categories based on the policy the user selects.

## What I designed for

### Stress and incomplete information
- exact time can be unknown;
- evidence can be added later;
- “Something else / not sure” is a valid claim category;
- repair estimates are not required for initial intake.

### Interruption
- progress saves to `localStorage`;
- save state is visible;
- a draft can reopen at the previous step;
- browser file selections are **not** falsely represented as restored.

### Clear recovery
- errors appear beside the relevant field and in a focusable summary;
- the review screen provides direct Edit actions back to each section;
- submission clearly distinguishes **report received** from **coverage approved**.

### Accessibility
- native inputs remain underneath visual choice cards;
- grouped questions use `fieldset` / `legend`;
- progress is exposed as a programmatic progressbar;
- status changes use live regions;
- keyboard focus is visible;
- reduced-motion preferences are respected;
- mobile layouts reflow to one column.

## Research integrity

This is a rapid portfolio project, not a production research engagement.

I **did not fabricate** user interviews, survey results, usability metrics, or research-derived personas. Instead, I documented assumptions as **proto-personas** and used:

- public insurance-service patterns;
- task analysis;
- information architecture;
- accessibility requirements;
- heuristic evaluation;
- iterative wireframing and coded prototyping.

In a production project, the next step would be moderated task-based usability testing with representative claimants and assistive-technology users.

## Iteration evidence

The project includes a documented heuristic review showing problems found in the first prototype and the changes made in response.

Examples:

- a single-policy prototype became policy-aware Auto/Home branching;
- “Save & exit” became the truthful “Save progress” action;
- file-restoration behavior was corrected to reflect browser security;
- review gained direct Edit actions;
- visual-only progress gained programmatic semantics;
- reduced-motion support was added.

Read the full [heuristic evaluation and revision log](docs/heuristic-evaluation.md).

## Information architecture

The shared shell keeps the high-level mental model consistent while relevant questions vary by policy:

- **Global shell:** progress, save state, help, errors, Back/Continue
- **Policy context:** Auto or Homeowners
- **Loss category:** filtered from XML based on selected policy
- **Shared intake:** timing/location, safety/damage, evidence, contact
- **Review:** grouped summary with section-level editing
- **Post-submission:** reference number, status, contact preference, next steps

See [design process](docs/design-process.md) for the reasoning behind the task flow.

## Corporate web standards artifact

I also created a small project-level design-system document covering:

- brand and semantic color tokens;
- typography and spacing;
- buttons, choice cards, inputs, status messaging;
- responsive behavior;
- content standards;
- accessibility standards.

See [Cedarline Web Standards & Design System](docs/design-system.md).

## Technical implementation

This is a working front-end prototype, not just static mockups.

- semantic HTML;
- responsive CSS;
- vanilla JavaScript;
- XML-driven policy-aware loss categories;
- `DOMParser` with fallback data;
- local draft persistence;
- accessible validation and live status messaging;
- edit-from-review navigation;
- responsive mobile/desktop layouts;
- static deployment through GitHub Pages.

## Repository map

```text
.
├── index.html
├── styles.css
├── app.js
├── assets/
│   └── cedarline-mark.svg
├── data/
│   └── loss-categories.xml
└── docs/
    ├── case-study.md
    ├── design-process.md
    ├── accessibility.md
    ├── design-system.md
    └── heuristic-evaluation.md
```

## Run locally

The prototype loads XML with `fetch()`, so serve the repository instead of opening `index.html` directly.

```bash
python -m http.server 8000
```

Then open `http://localhost:8000`.

## What I would validate next

If this were moving toward production, I would test:

- whether users understand what can be deferred;
- whether policy-aware categories match user language;
- whether visible autosave increases confidence;
- whether “Unsure” reduces abandonment without reducing useful intake quality;
- whether users understand the distinction between receipt and coverage determination;
- the flow at 200–400% zoom;
- keyboard and screen-reader behavior across supported browser/AT combinations;
- whether the confirmation screen gives enough post-submission orientation.

## Supporting documentation

- [Full UX case study](docs/case-study.md)
- [Design process](docs/design-process.md)
- [Accessibility approach](docs/accessibility.md)
- [Web standards & design system](docs/design-system.md)
- [Heuristic evaluation & revision log](docs/heuristic-evaluation.md)

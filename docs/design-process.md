# Design Process

## 1. Define the service boundary

The experience begins at **First Notice of Loss**, not coverage determination.

That boundary prevents the interface from pretending to decide liability, fraud, coverage, repair cost, or payment. Its job is to collect enough structured information to begin triage and orient the claimant to what happens next.

## 2. Identify difficult usage contexts

Instead of designing around an ideal desktop session, I started with three stressors:

- mobile use immediately after an auto loss;
- disruptive homeowners damage with lots of potential evidence;
- accessibility and low technical confidence.

This shaped the requirements before visual design began.

## 3. Translate assumptions into design requirements

| Assumption | Design response |
| --- | --- |
| A claimant may have more than one policy | Ask which policy the loss belongs to first |
| Claim types differ by policy | Filter XML categories by Auto/Home context |
| People may not know exact details | Offer approximate, unsure, and add-later states |
| Sessions may be interrupted | Autosave and restore the prior step |
| Browser file inputs cannot be restored | Tell users to reselect files after returning |
| Insurance language can create friction | Use plain-language questions first |
| Claimants may be on phones | Mobile-first single-column task flow |
| Evidence may not be available yet | Make uploads optional for intake |
| Users need reassurance after submit | Provide reference, status, and next steps |
| Review may reveal mistakes | Provide direct Edit actions by section |
| Some users rely on assistive technology | Labels, focus, text errors, live status, semantic progress |

## 4. Create the information architecture

The initial concept used a single generic path. The polished version adds a policy-selection decision before the shared task flow:

```text
Choose policy
  ├─ Personal Auto → relevant auto claim categories
  └─ Homeowners   → relevant property claim categories
                    ↓
             When & where
                    ↓
             Damage & safety
                    ↓
             Evidence
                    ↓
             Contact
                    ↓
             Review & edit
                    ↓
             Confirmation
```

This keeps the shell consistent while avoiding irrelevant category choices.

## 5. Build low-fidelity wireframes

The wireframe pass focused on behavior rather than brand polish.

Questions included:

- What is actually required now?
- What can wait?
- What if the user does not know?
- What if the session is interrupted?
- How does the user correct something found during review?
- What does a useful confirmation state contain?
- What should never imply that coverage has already been decided?

## 6. Implement the interaction model

The coded prototype became another design artifact.

Implementation exposed issues that static wireframes did not, including:

- whether save wording matched actual behavior;
- how restored drafts handle browser file security;
- how review editing should work;
- how progress should be exposed to assistive technology;
- how category branching should be encoded in XML;
- how focus should move after validation and step changes.

## 7. Run a heuristic evaluation

Because this sprint did not include moderated usability testing, I documented a heuristic review instead of inventing test results.

The review checked:

- visibility of system status;
- match with real-world language;
- error prevention and recovery;
- user control and freedom;
- progressive disclosure;
- accessibility semantics;
- consistency between design claims and coded behavior.

See [heuristic-evaluation.md](heuristic-evaluation.md).

## 8. Establish lightweight web standards

To demonstrate standards thinking beyond one screen, I documented:

- design tokens;
- typography;
- spacing;
- component usage;
- responsive behavior;
- content rules;
- accessibility rules.

See [design-system.md](design-system.md).

## 9. Production validation plan

A real next phase would include:

1. 5–8 task-based interviews/usability sessions with recent claimants;
2. separate Auto and Homeowners scenario tests;
3. keyboard-only and 200–400% zoom evaluation;
4. screen-reader evaluation with supported browser/AT combinations;
5. terminology testing for claim categories;
6. confirmation-screen comprehension testing;
7. iteration based on observed behavior rather than assumed behavior.

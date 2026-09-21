# Design Process

## 1. Define the service moment

The experience begins at First Notice of Loss, not coverage determination. That boundary matters: the interface should collect enough information to begin triage without pretending to decide liability, coverage, repair cost, fraud, or payment.

## 2. Identify the hardest usage contexts

The concept was designed around three stressors:

- mobile use immediately after an auto loss;
- high-disruption property damage with many possible artifacts;
- accessibility and low technical confidence.

Designing for those cases early helps prevent the desktop happy path from becoming the only path that works well.

## 3. Translate assumptions into requirements

| Assumption | Design response |
| --- | --- |
| People may not know exact details | Offer approximate, unsure, and add-later states |
| Sessions may be interrupted | Autosave and restore drafts |
| Insurance language can create friction | Use plain-language questions first |
| Claimants may be on phones | Mobile-first single-column form flow |
| Evidence may not be available yet | Make uploads optional for intake |
| Users need reassurance after submit | Provide reference, status, and next steps |
| Some users rely on assistive technology | Persistent labels, focus states, text errors, live status messaging |

## 4. Create the task flow

The primary task flow is deliberately linear at the shell level:

`Start → Event → Time/location → Damage/safety → Evidence → Contact → Review → Confirmation`

Branching is reserved for questions whose relevance depends on claim type. This limits irrelevant content and supports progressive disclosure.

## 5. Build low-fidelity wireframes

The low-fidelity pass focused on structure and behavior rather than brand polish. The questions asked during this pass were:

- What is required right now?
- What can be optional?
- Where does the user need explanation?
- What happens if they do not know?
- What happens if they leave?
- What does success look like after submission?

## 6. Implement the interaction model

The coded prototype was used as another design artifact, not merely a development exercise. Implementation made interaction questions concrete: validation timing, state restoration, focus behavior, XML fallback behavior, responsive layouts, and the transition from review to confirmation.

## 7. Evaluate heuristically

Because this rapid sprint did not include primary usability testing, the current evaluation is heuristic. The prototype is reviewed against questions such as:

- Can users identify what is required?
- Can they recover from errors?
- Are status changes communicated visibly and programmatically?
- Does the interface avoid making unknown information feel like failure?
- Is submission clearly different from coverage approval?

## 8. Next iteration

A production iteration would add moderated usability testing, refine content based on observed terminology problems, test the auto/property branches independently, and validate the experience with assistive-technology users.

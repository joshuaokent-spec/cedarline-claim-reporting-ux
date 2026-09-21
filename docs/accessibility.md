# Accessibility Approach

This prototype is **WCAG-informed**, but it has not been formally audited and should not be described as certified conformance.

Accessibility is treated as part of the interaction model, not a final visual-polish step.

## Implemented considerations

### Keyboard and focus

- skip link to the main form;
- visible `:focus-visible` treatment;
- native controls beneath custom visual treatments;
- focus moves to the active step heading;
- validation moves focus to the error summary;
- error-summary items can return focus to the relevant control;
- Edit actions on the review screen return directly to the relevant step.

### Form semantics

- persistent `<label>` elements;
- `<fieldset>` and `<legend>` for grouped questions;
- native radio buttons and checkboxes;
- helper text remains visible instead of relying on placeholders alone.

### Error identification

Validation errors are:

- written beside the question;
- repeated in a focusable summary;
- not communicated by color alone;
- paired with `aria-invalid` on the relevant control.

### Status messages

Live regions communicate:

- saving;
- successful manual save;
- draft restoration;
- XML fallback;
- file-selection changes;
- successful submission.

### Progress

The progress indicator is not only visual. It uses progressbar semantics and updates:

- `aria-valuenow`;
- `aria-valuemin`;
- `aria-valuemax`;
- `aria-valuetext`.

### Responsive / zoom considerations

- desktop shell collapses to one column;
- policy/category cards collapse to one column;
- segmented controls stack on narrow screens;
- review items reflow;
- no fixed-height form containers;
- long text can wrap instead of clipping.

### Motion

The stylesheet honors `prefers-reduced-motion: reduce` by disabling transitions and smooth behavior.

### File upload honesty

Browsers do not allow a site to repopulate a local file input after a reload. The prototype therefore restores form data but tells returning users that files must be selected again.

This is both a security constraint and a UX trust issue.

## Known limitations / future validation

A production pass should include:

- automated accessibility scanning;
- manual keyboard testing across supported browsers;
- screen-reader testing with representative browser/AT combinations;
- 200% and 400% zoom/reflow checks;
- contrast verification for all final tokens;
- accessible real upload progress/status if server uploads are implemented;
- error-recovery testing with representative users.

## Why this matters for the case study

The goal is not to claim a perfect accessibility score. The goal is to show that accessibility requirements influenced information architecture, component choice, interaction behavior, and implementation decisions throughout the project.

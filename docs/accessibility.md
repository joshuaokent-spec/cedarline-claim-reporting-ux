# Accessibility Approach

This prototype is **WCAG-informed**, but it has not been formally audited and should not be presented as a certified conforming implementation.

## Accessibility goals

The design treats accessibility as part of the interaction model rather than a visual-polish step. Key goals include:

- full keyboard operability;
- visible keyboard focus;
- persistent form labels;
- programmatically associated fieldsets and legends;
- text-based error identification;
- focusable error summaries;
- live status messaging for saves and file selection;
- no color-only indication of selected/error state;
- responsive behavior that remains usable at narrow widths and browser zoom;
- touch-friendly controls;
- semantic headings and landmarks.

## Keyboard and focus

The interface includes a skip link, visible `:focus-visible` treatment, native form controls, and programmatic focus movement to each step heading. When validation fails, focus moves to the error summary so keyboard and screen-reader users are alerted to the problem.

## Form labels and instructions

Inputs use persistent `<label>` elements, while grouped controls use `<fieldset>` and `<legend>`. Help text remains visible rather than relying on placeholder text as the only instruction.

## Errors

Validation errors are written as text adjacent to the relevant question and also summarized in a focusable alert region. Error communication is therefore not dependent on red color alone.

## Status changes

Autosave, draft restoration, XML fallback, and file-selection updates use live status regions so important asynchronous changes can be announced by assistive technology.

## Choice controls

Radio buttons remain native inputs even when visually presented as cards or segmented choices. This preserves expected keyboard and assistive-technology behavior while providing larger visual targets.

## Responsive and zoom considerations

The desktop two-column layout collapses to one column at narrower widths. Multi-column choice groups and confirmation cards also collapse. The layout avoids fixed viewport-height containers that would create clipping at high zoom.

## Known limitations / future testing

A future production pass should include:

- automated accessibility testing;
- manual keyboard testing across supported browsers;
- screen-reader testing with representative browser/AT combinations;
- 200% and 400% zoom/reflow testing;
- contrast verification for all final visual-design tokens;
- error-recovery testing with real users;
- review of file-upload behavior and accessible upload progress if real uploads are implemented.

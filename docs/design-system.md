# Cedarline Web Standards & Design System

This lightweight design-system artifact documents the visual, interaction, responsive, and content standards used in the prototype. It is intentionally small enough for a portfolio project while demonstrating the kind of standards thinking needed for a larger corporate web environment.

## Design principles

### Calm under stress
The UI avoids alarmist colors, dense dashboards, and unnecessary decisions. The user should always know what is required now and what can wait.

### Plain language first
Questions are written in everyday language before insurance terminology. Supporting copy explains why information is requested and whether it is optional.

### Unknown is valid
When exact information is not required for intake, users can select unsure, approximate, or add-later states.

### Accessible by default
Focus, labels, error messages, semantic controls, status messaging, zoom/reflow, and touch target size are structural requirements.

## Core tokens

| Token | Value | Usage |
| --- | --- | --- |
| Cedar 700 | `#0B4A43` | Primary actions, brand mark, strong accents |
| Cedar 900 | `#073630` | Hover/pressed primary state |
| Ink 900 | `#12212C` | Main text |
| Slate 600 | `#52636F` | Secondary text |
| Mist 50 | `#F5F8F7` | Soft section backgrounds |
| Sand 50 | `#F7F3E8` | Warm informational surfaces |
| Border | `#C8D3D7` | Input and card boundaries |
| Danger 700 | `#9B1C1C` | Error text/borders |
| Focus | `#FFD166` | Keyboard focus ring |

## Typography

The prototype uses a system-ui stack to avoid external font dependencies and keep rendering fast and predictable.

- Display heading: 2.25–3.5rem, bold, compact line height
- Step heading: 1.75–2.25rem, bold
- Body: 1rem–1.1rem
- Helper/error text: .875–.925rem
- Labels: bold, persistent, never replaced by placeholder-only instructions

## Spacing

The interface uses an 8px-derived spacing rhythm, with common gaps of 8, 12, 16, 24, 32, and 48px.

## Components

### Primary button
Use for the single main action on a step. Minimum height is 48px. Do not place multiple competing primary buttons in the same action row.

### Secondary button
Use for Back, alternate, or non-destructive actions.

### Choice card
Use when a short explanation helps users distinguish options. The native radio remains in the accessibility tree.

### Segmented radio
Use for short mutually exclusive responses such as Yes / No / Unsure.

### Input field
Persistent label above the input; helper text below; error text below helper text. Error state is never communicated by color alone.

### Status message
Used for save state, restored drafts, file selection, and submission state. Important asynchronous changes use live-region semantics.

## Responsive standards

- Desktop: two-column shell with contextual guidance beside the task
- Tablet/mobile: one-column flow
- Multi-column choice grids collapse to one column
- Action area remains reachable without fixed-height containers
- No essential information is hidden solely because the viewport is narrow

## Content standards

- Prefer “What happened?” over “Loss type”
- Prefer “Other people or vehicles” over “Third parties”
- State what is optional explicitly
- Separate “report received” from “coverage approved”
- Avoid making users gather documents before they can start
- Tell users when they can add information later

## Accessibility standards

- Native HTML controls wherever practical
- Visible focus ring
- Skip link
- Logical heading order
- `fieldset` / `legend` for grouped questions
- Error summary plus field-level errors
- Programmatic progress state
- Live status messaging
- Reduced-motion support
- Responsive reflow suitable for high zoom

This document is a project-level standard, not a full enterprise design system.

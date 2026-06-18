# Design System

## Overview

This design system defines the visual language for ani-web, a premium anime streaming platform. The system prioritizes desktop experiences, refined aesthetics, and gaming-grade polish.

## Color Strategy: Restrained Premium

**Philosophy:** Amber/gold accent on warm-tinted dark neutrals. Accent usage ≤10% of any surface. Confidence through restraint, not saturation.

### Primary Accent: Amber/Gold
Premium and exclusive without gaming RGB clichés. Warm, inviting, signals quality.

```css
--accent-primary: oklch(0.70 0.15 70);
--accent-primary-hover: oklch(0.75 0.15 70);
--accent-primary-pressed: oklch(0.65 0.15 70);
```

### Secondary Accent: Slate Blue
For interactive states and secondary actions. Cool contrast to warm amber.

```css
--accent-secondary: oklch(0.55 0.08 250);
--accent-secondary-hover: oklch(0.60 0.08 250);
```

### Neutrals: Warm-tinted Blacks
Never pure black (#000) or pure white (#fff). All neutrals tinted toward amber (chroma 0.008) for warmth.

```css
--neutral-950: oklch(0.12 0.008 70);  /* Background main */
--neutral-900: oklch(0.18 0.008 70);  /* Background secondary */
--neutral-850: oklch(0.22 0.008 70);  /* Background tertiary */
--neutral-800: oklch(0.30 0.008 70);  /* Background elevated */
--neutral-700: oklch(0.40 0.008 70);  /* Borders primary */
--neutral-600: oklch(0.50 0.008 70);  /* Borders secondary */
```

### Text
```css
--text-primary: oklch(0.98 0.002 70);    /* High contrast white-ish */
--text-secondary: oklch(0.68 0.005 70);  /* Muted text */
--text-tertiary: oklch(0.50 0.005 70);   /* Disabled/placeholder */
```

### Semantic
```css
--semantic-danger: oklch(0.58 0.22 25);    /* Red for destructive actions */
--semantic-success: oklch(0.65 0.18 145);  /* Green for success states */
--semantic-warning: oklch(0.72 0.18 75);   /* Orange for warnings */
--semantic-info: oklch(0.60 0.12 250);     /* Blue for informational */
```

### Theme Justification
**Dark theme by design:** Gamers accessing a premium streaming service on desktop during evening hours (post-work, weekend sessions). Ambient lighting: dim room, minimal glare. Mood: focused entertainment, not productivity. Dark theme reduces eye strain during extended viewing sessions and signals entertainment context over utility.

## Typography

### Font Families
**Inter** for both headings and body. Geometric precision, excellent readability, gaming-adjacent without being gamery.

```css
--font-heading: 'Inter', system-ui, -apple-system, sans-serif;
--font-body: 'Inter', system-ui, -apple-system, sans-serif;
```

### Type Scale: 1.333 (Perfect Fourth)
Tighter hierarchy than generic 1.5 scales. Creates rhythm without excessive jumps.

```css
--text-xs: 0.75rem;      /* 12px - Labels, captions */
--text-sm: 0.875rem;     /* 14px - Small UI text */
--text-base: 1rem;       /* 16px - Body text */
--text-lg: 1.333rem;     /* ~21px - Large body, small headings */
--text-xl: 1.777rem;     /* ~28px - Section headings */
--text-2xl: 2.369rem;    /* ~38px - Page headings */
--text-3xl: 3.157rem;    /* ~51px - Hero text (rare) */
```

### Font Weights
```css
--font-normal: 400;   /* Body text */
--font-medium: 600;   /* Emphasis, UI labels */
--font-bold: 700;     /* Headings, buttons */
--font-black: 800;    /* Hero text, major headings */
```

### Line Heights
```css
--leading-tight: 1.25;   /* Headings */
--leading-snug: 1.375;   /* Large body text */
--leading-normal: 1.5;   /* Body text */
--leading-relaxed: 1.75; /* Long-form content */
```

### Letter Spacing
```css
--tracking-tight: -0.02em;  /* Large headings */
--tracking-normal: 0;       /* Body text */
--tracking-wide: 0.05em;    /* Small caps, labels */
```

### Typography Rules
- **Body line length:** Cap at 65-75ch for readability
- **Hierarchy through scale + weight:** Minimum 1.25 ratio between levels
- **No gradient text:** Banned. Use solid colors with weight/size for emphasis
- **Headings:** Always semibold (600) or bold (700), never regular weight

## Spacing

### Scale: Varied Rhythm
Not uniform padding. Intentional variation creates visual rhythm.

```css
--space-1: 0.25rem;   /* 4px  - Micro spacing */
--space-2: 0.5rem;    /* 8px  - Tight spacing */
--space-3: 0.75rem;   /* 12px - Compact spacing */
--space-4: 1rem;      /* 16px - Base spacing */
--space-5: 1.5rem;    /* 24px - Comfortable spacing */
--space-6: 2rem;      /* 32px - Section spacing */
--space-8: 3rem;      /* 48px - Large section spacing */
--space-10: 4rem;     /* 64px - Major section breaks */
--space-12: 6rem;     /* 96px - Page-level spacing */
--space-16: 8rem;     /* 128px - Hero spacing */
```

### Spacing Principles
- **Vary intentionally:** Same padding everywhere is monotony
- **Increase with importance:** Hero sections get more space than list items
- **Optical balance:** Sometimes unequal spacing looks more balanced than equal

## Border Radius

### Scale
```css
--radius-sm: 6px;    /* Small elements, badges */
--radius-md: 10px;   /* Buttons, inputs, cards */
--radius-lg: 14px;   /* Large cards, panels */
--radius-xl: 20px;   /* Modal dialogs, major containers */
--radius-full: 9999px; /* Pills, circular elements */
```

### Radius Rules
- **Consistent within component families:** All buttons use same radius
- **Larger elements = larger radius:** Visual weight matches corner softness
- **Nested elements:** Inner radius = outer radius - padding (for optical consistency)

## Elevation & Shadows

### Shadow Scale
Subtle shadows. Not dramatic drop shadows.

```css
--shadow-sm: 0 1px 2px oklch(0.05 0 0 / 0.05);
--shadow-md: 0 4px 8px oklch(0.05 0 0 / 0.08);
--shadow-lg: 0 8px 16px oklch(0.05 0 0 / 0.12);
--shadow-xl: 0 16px 32px oklch(0.05 0 0 / 0.16);
```

### Focus Shadows
```css
--shadow-focus: 0 0 0 3px oklch(0.70 0.15 70 / 0.3); /* Amber glow */
```

### Elevation Rules
- **Use sparingly:** Most elements sit flat on the surface
- **Elevate on interaction:** Hover/focus states can add subtle lift
- **No excessive blur:** Keep shadow blur tight and controlled

## Motion & Animation

### Easing Curves
**Ease out only.** Exponential curves for smooth deceleration. No bounce, no elastic.

```css
--ease-out-quad: cubic-bezier(0.25, 0.46, 0.45, 0.94);
--ease-out-quart: cubic-bezier(0.165, 0.84, 0.44, 1);
--ease-out-expo: cubic-bezier(0.19, 1, 0.22, 1);
```

### Durations
```css
--duration-fast: 150ms;   /* Micro-interactions, hovers */
--duration-base: 250ms;   /* Standard transitions */
--duration-slow: 400ms;   /* Page transitions, complex animations */
```

### Motion Rules
- **Never animate layout properties:** No transitions on width, height, top, left, margin, padding
- **Transform and opacity only:** Use translate, scale, rotate, opacity for performance
- **Respect `prefers-reduced-motion`:** Disable all animations when user prefers reduced motion
- **Purposeful, not decorative:** Every animation serves a functional purpose

## Layout

### Max Widths
```css
--max-width-prose: 65ch;   /* Long-form text */
--max-width-content: 1800px; /* Main content area (increased from 1600px) */
--max-width-wide: 2400px;    /* Ultra-wide screens */
```

### Layout Principles
- **Desktop-first:** Maximize screen real estate for desktop users
- **Don't wrap everything in containers:** Most elements don't need them
- **Varied spacing for rhythm:** Avoid uniform padding throughout

## Components

### Buttons

**Variants:**
- **Primary:** Solid amber fill, white text. For primary actions.
- **Secondary:** Neutral fill with border. For secondary actions.
- **Ghost:** Transparent, text-colored. For tertiary actions.
- **Danger:** Red fill. For destructive actions.

**Rules:**
- **No gradient backgrounds:** Banned. Use solid fills only.
- **Icon support:** Leading or trailing icons allowed.
- **Loading state:** Spinner inside button, text remains visible but disabled.

### Cards

**Rules:**
- **Use sparingly:** Cards are not the default container for everything.
- **Never nest cards:** Nested cards are always wrong.
- **Border over shadow:** Prefer subtle borders over drop shadows.

### Modals

**Rules:**
- **Modal as last resort:** Exhaust inline/progressive alternatives first.
- **Dark backdrop:** Warm dark (oklch(0.05 0.005 70 / 0.8)), not pure black.
- **Keyboard navigation:** ESC to close, focus trap within modal.

## Banned Patterns

These patterns are explicitly forbidden. If you're about to use one, stop and redesign.

### 1. Side-stripe Borders
`border-left` or `border-right` >1px as colored accents on cards, list items, alerts. Rewrite with full borders, background tints, or nothing.

### 2. Gradient Text
`background-clip: text` with gradient backgrounds. Never meaningful, always decorative. Use solid colors with weight/size for emphasis.

### 3. Glassmorphism as Default
Backdrop blur and glass effects used decoratively everywhere. Use rarely and purposefully, or not at all.

### 4. Hero-Metric Template
Big number, small label, gradient accent. SaaS cliché. Integrate numbers into narrative layouts instead.

### 5. Identical Card Grids
Same-sized cards with icon + heading + text repeated endlessly. Vary card sizes, use list/table hybrids.

### 6. Modal as First Thought
Reaching for modals by default. Exhaust inline and progressive disclosure first.

## Accessibility Standards

### WCAG 2.1 AA Compliance
- **Color contrast:** Minimum 4.5:1 for body text, 3:1 for large text (18px+)
- **Interactive targets:** Minimum 44x44px touch target size
- **Focus indicators:** Visible 3px outline with sufficient contrast
- **Keyboard navigation:** All interactive elements keyboard-accessible

### Reduced Motion
```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

### Screen Reader Support
- Semantic HTML elements
- ARIA labels where necessary
- Proper heading hierarchy
- Alt text for images

## Implementation Notes

### CSS Architecture
- **CSS Modules only:** No plain CSS files for components
- **tokens.css:** Single source of truth for design tokens
- **base.css:** Global resets, utilities, typography defaults
- **Component styles:** Co-located with components in `.module.css` files

### Color Implementation
All colors use OKLCH via `oklch()` function. No HSL, no hex codes (except in comments for reference).

### Font Loading
Inter loaded from Google Fonts or self-hosted. Ensure font-display: swap for performance.

### Performance
- **Code-split routes:** Lazy load page components
- **Lazy load images:** Use native lazy loading
- **CSS Modules:** Automatic code splitting
- **Minimize animations:** Fewer animations = better performance

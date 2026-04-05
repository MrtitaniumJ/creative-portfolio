```markdown
# Design System: Arctic Editorial

## 1. Overview & Creative North Star
**The Creative North Star: "The Glacial Monolith"**

This design system moves away from the cluttered, "noisy" nature of traditional developer portfolios. It rejects the standard bootstrap-grid look in favor of a high-end editorial layout characterized by **intentional asymmetry, expansive negative space, and a chillingly precise typographic hierarchy.** 

The "Arctic Editorial" aesthetic mimics the experience of a luxury print magazine or a high-end architecture monograph. It is quiet but authoritative. We achieve this by breaking the "box" mentality—using large, offset typography and layered surfaces that feel like sheets of ice stacked in a frozen landscape. Every element must feel "placed," not "poured."

---

## 2. Colors & Tonal Architecture
The palette is built on a foundation of "Cold Light." It is not merely white and grey; it is a spectrum of cool temperatures that provide depth without the need for traditional borders.

### Surface Hierarchy & The "No-Line" Rule
**Explicit Instruction:** 1px solid borders are prohibited for sectioning. 
Structure is defined through **Surface Nesting**:
*   **Base Layer:** `surface` (#f7f9fb) acts as the expansive tundra.
*   **Secondary Sections:** Use `surface_container_low` (#f0f4f7) to subtly differentiate large content blocks.
*   **Interactive Containers:** Use `surface_container_lowest` (#ffffff) for cards or code blocks to create a "bright-white" lift that feels cleaner than a shadow.

### Glass & Gradient Transitions
To avoid a "flat" feel, use **Glassmorphism** for navigation bars and floating overlays:
*   **Surface Blur:** Apply a `backdrop-blur` of 12px-20px to `surface` at 80% opacity.
*   **The Glacial Gradient:** For Hero backgrounds or Primary CTAs, use a subtle linear gradient from `primary` (#565e74) to `primary_dim` (#4a5268). This provides a "brushed metal" or "deep ice" soul to the interface.

---

## 3. Typography: The Editorial Voice
We use **Inter** as our sole typeface, relying on extreme weight and size contrasts to provide the "Editorial" feel.

*   **Display (The Statement):** `display-lg` (3.5rem) should be used with `on_background` (#2a3439) and a tracking (letter-spacing) of `-0.02em`. Use this for hero statements, often offset to the left or right to break the grid.
*   **Headlines (The Anchor):** `headline-lg` (2rem) provides clear entry points. These should always have generous `margin-bottom` (token `8` or `10`) to let the type breathe.
*   **Body (The Narrative):** `body-lg` (1rem) is the workhorse. To maintain the "premium" feel, keep line-lengths restricted to a maximum of 65 characters.
*   **Labels (The Metadata):** `label-md` (0.75rem) should be set in All Caps with `letter-spacing: 0.05em` using `on_surface_variant` (#566166) to denote technical details or dates.

---

## 4. Elevation & Depth
In this design system, depth is a result of **Tonal Layering**, not structural engineering.

*   **The Layering Principle:** Rather than adding a shadow to a card, place a `surface_container_lowest` (#ffffff) card on a `surface_container` (#e8eff3) background. The 2-stop difference in "coolness" creates a natural, sophisticated lift.
*   **Ambient Shadows:** If a floating element (like a modal) is required, use a "Cloud Shadow":
    *   `box-shadow: 0 20px 50px rgba(42, 52, 57, 0.05);` (using a tinted version of `on_surface`).
*   **The Ghost Border:** For accessibility in input fields, use `outline_variant` at 20% opacity. It should be felt, not seen.

---

## 5. Components

### Buttons (The Precision Tools)
*   **Primary:** Background `primary` (#565e74), text `on_primary`. Shape: `DEFAULT` (0.25rem). No shadow. Hover state shifts to `primary_dim`.
*   **Tertiary (Editorial):** No background. Text `primary`. Underline is a 1px `outline_variant` offset by 4px.

### Cards & Projects
*   **Rule:** Forbid divider lines. 
*   **Style:** Use `surface_container_low` for the card body. Use vertical spacing `12` (4rem) between project entries. Use `display-sm` for project titles to make them feel like chapters in a book.

### Code Blocks & Snippets
*   **Background:** `inverse_surface` (#0b0f10) with a 5% opacity `primary` tint.
*   **Corner:** `DEFAULT` (0.25rem).
*   **Label:** A `label-sm` tag in the top right indicating the language, using `surface_variant`.

### Inputs & Forms
*   **Background:** `surface_container_highest` (#d9e4ea) at 40% opacity.
*   **Interaction:** On focus, the background shifts to `surface_container_lowest` (#ffffff) with a `primary` "Ghost Border" (20% opacity).

---

## 6. Do's and Don'ts

### Do:
*   **Embrace Asymmetry:** Let a headline sit on the left while the body text starts at the 50% mark of the grid.
*   **Use Generous Leading:** Increase line-height on `body-lg` to 1.6 for a relaxed, high-end feel.
*   **Color as Emphasis:** Use `secondary` (#526075) only for interactive elements or subtle highlights.

### Don't:
*   **Don't Use Pure Black:** Never use #000000. Use `on_background` (#2a3439) for maximum legibility without the harshness.
*   **Don't Use 1px Dividers:** If you feel the urge to separate content, use a spacing token (e.g., `16` or `20`) or a tonal shift.
*   **Don't Round Everything:** Stick strictly to `DEFAULT` (0.25rem). Avoid large pills or circles unless it's a specific `full` avatar.

---

## 7. Spacing & Rhythm
The spacing scale is non-linear to encourage "Extreme Breathing Room." 
*   **Section Padding:** Use `20` (7rem) or `24` (8.5rem) for vertical padding between major portfolio sections. 
*   **Group Spacing:** Use `6` (2rem) for related elements (e.g., a headline and its subtext).
*   **Precision:** Use `1` (0.35rem) for small metadata clusters.

This system is about the **luxury of space.** If a layout feels "full," it is likely incorrect. Remove an element or increase the spacing until the design feels as quiet as an arctic morning.```
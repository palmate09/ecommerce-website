# ContactPage Refactor Plan

## Phase 1: Foundation (Critical Fixes)

### 1.1 Fix bugs & data issues
- [done] Typo: `"john@exmple.com"` → `"john@example.com"` (`src/pages/ContactPage.tsx:94`)
- [done] Data: Fix `item2: "Working Hours"` → actual hours (e.g. `"Saturday: 10am - 4pm"`) (`src/pages/ContactPage.tsx:78`)
- [ ] `<hr>` styling: `text-neutral-300` → `border-t-neutral-300` (`src/pages/ContactPage.tsx:287, 341`)
- [ ] Remove `dark:shadow-neutral-50` from form inputs (`src/pages/ContactPage.tsx:208, 224, 235`)

### 1.2 Extract data outside component
- [ ] Create `src/data/contactData.ts`
- [ ] Move `contacts`, `forms`, `services`, `faqs`, `buttons` arrays out of the component
- [ ] Import them in `ContactPage.tsx`

### 1.3 Normalize `cn()` calls
- [ ] Replace single-argument `cn()` calls with plain strings (`src/pages/ContactPage.tsx:329-330`)

---

## Phase 2: Design System Alignment

### 2.1 Replace arbitrary font sizes
| Current | Target | Location |
|---|---|---|
| `text-[22px]` | `text-xl` | :186 |
| `text-[17px]` | `text-lg` | :260 |
| `text-[16px]` | `text-base` | :186, 195, 323 |
| `text-[15px]` | `text-sm` | :312 |
| `text-[13px]` | `text-xs` | :218, 313 |
| `text-[12px]` | `text-xs` | :242 |

### 2.2 Replace arbitrary spacing
- [ ] Map `px-15`, `px-20`, `px-22`, `mt-30`, `my-60` to standard scale or define in `tailwind.config`
- [ ] CTA buttons with `px-20`/`px-22` → use responsive padding + max-width to prevent overflow on mobile

### 2.3 Reduce font class repetition
- [ ] Move `font-finlandica` to a parent wrapper or global CSS
- [ ] Only override `font-*` on child elements where it differs

### 2.4 Standardize border radius usage
- [ ] Cards/sections → `rounded-2xl`
- [ ] Buttons → `rounded-full` or `rounded-lg`
- [ ] Form inputs → `rounded-lg`

---

## Phase 3: Form Logic (Biggest Production Gap)

### 3.1 Add form library
- [ ] `npm install react-hook-form @hookform/resolvers zod`

### 3.2 Create form schema & types
- [ ] Define a Zod schema for the contact form (name, email, subject, message with validation rules)

### 3.3 Wire up the form
- [ ] Replace uncontrolled inputs with `register()` from react-hook-form
- [ ] Add `htmlFor`/`id` pairs on labels/inputs
- [ ] Add `onSubmit` handler with `handleSubmit()`
- [ ] Add error messages below each field
- [ ] Make submit button `type="submit"`
- [ ] Add loading state (`isSubmitting`)

### 3.4 Create submit handler
- [ ] At minimum, log form data
- [ ] Structure so swapping API endpoints requires changing one function

---

## Phase 4: Accessibility

### 4.1 Semantic HTML
- [ ] Add `aria-label="Contact page"` to outer `<section>`
- [ ] Wrap form card in `<section aria-label="Contact form">`
- [ ] Wrap contact info in `<section aria-label="Contact information">`
- [ ] Wrap FAQ in `<section aria-label="Frequently asked questions">`

### 4.2 Label-input association
- [ ] Add `htmlFor` to all `<label>` elements
- [ ] Add matching `id` to all `<input>` / `<textarea>` elements

### 4.3 Button accessibility
- [ ] Add `aria-label` to CTA buttons
- [ ] Verify color contrast meets WCAG AA

### 4.4 Focus management
- [ ] Add `focus-visible:` ring styles for keyboard navigation
- [ ] Ensure form fields have visible focus indicators

---

## Phase 5: Polish & Edge Cases

### 5.1 Dark FAQ card borders
- [ ] Add `dark:border-neutral-700` to FAQ card divs (`src/pages/ContactPage.tsx:311`)

### 5.2 Hero section gradient
- [ ] Change `from-primary/5 to-slate-50/5` to something more visible (`src/pages/ContactPage.tsx:178`)

### 5.3 Responsive CTA buttons
- [ ] Replace `px-20` / `px-22` with `px-10 md:px-20` (`src/pages/ContactPage.tsx:328`)

### 5.4 Textarea height
- [ ] Replace inline style with `min-h-28 max-h-28` classes (`src/pages/ContactPage.tsx:225`)

### 5.5 Fix `key` prop
- [ ] Change `key={idx}` → `key={field.id}` (`src/pages/ContactPage.tsx:214`)

---

## Execution Order

```
Phase 1 (bugs + data extraction)
    ↓
Phase 2 (design tokens) — can run parallel with Phase 3
    ↓
Phase 3 (form logic) — biggest effort, needs installs
    ↓
Phase 4 (a11y) — depends on Phase 3 for form a11y
    ↓
Phase 5 (polish) — safe to do whenever, no dependencies
```

# Design Preset (Rem System) ⚙️

A simple design preset for projects using:

```
html {
  font-size: 62.5%;
}
```

Meaning:

```
1rem = 10px
```

Which is why many developers prefer it — **mental math becomes easy**.

Examples:

| rem    | px   |
| ------ | ---- |
| 1rem   | 10px |
| 1.6rem | 16px |
| 2rem   | 20px |
| 3rem   | 30px |

### 1. Universal Reset

This reset ensures **consistent layout across browsers**.

```css
*,
*::before,
*::after {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
```

### 2. HTML + Root Settings

```css
html {
  font-size: 62.5%;
  scroll-behavior: smooth;
}
```

Explanation:

```
62.5% of 16px = 10px
```

This makes:

```
1rem = 10px
```

---

### 3. Body Defaults

Basic styling for the entire application.

```css
body {
  font-family: "Inter", sans-serif;
  font-size: 1.6rem;
  line-height: 1.6;
  color: #333;
  background-color: #fff;
}
```

Body text:

```
1.6rem = 16px
```

### 4. Typography Scale

A clean hierarchy for headings.

| Element | rem    | px   |
| ------- | ------ | ---- |
| h1      | 4.8rem | 48px |
| h2      | 4rem   | 40px |
| h3      | 3.2rem | 32px |
| h4      | 2.4rem | 24px |
| h5      | 2rem   | 20px |
| h6      | 1.8rem | 18px |
| p       | 1.6rem | 16px |
| small   | 1.2rem | 12px |

Example CSS:

```css
h1 {
  font-size: 4.8rem;
}

h2 {
  font-size: 4rem;
}

h3 {
  font-size: 3.2rem;
}

h4 {
  font-size: 2.4rem;
}

h5 {
  font-size: 2rem;
}

h6 {
  font-size: 1.8rem;
}

p {
  font-size: 1.6rem;
}

small {
  font-size: 1.2rem;
}
```

### 5. Spacing System

A spacing scale keeps layouts consistent.

| rem    | px   |
| ------ | ---- |
| 0.4rem | 4px  |
| 0.8rem | 8px  |
| 1.2rem | 12px |
| 1.6rem | 16px |
| 2rem   | 20px |
| 2.4rem | 24px |
| 3.2rem | 32px |
| 4rem   | 40px |
| 4.8rem | 48px |
| 6.4rem | 64px |
| 8rem   | 80px |

Use these values for:

```
margin
padding
gap
```

Example:

```css
.section {
  padding: 6.4rem 2.4rem;
}

.card {
  padding: 2.4rem;
}
```

### 6. Layout Widths

Standard page container widths.

| Size             | rem    | px     |
| ---------------- | ------ | ------ |
| small container  | 80rem  | 800px  |
| medium container | 100rem | 1000px |
| large container  | 120rem | 1200px |
| extra large      | 140rem | 1400px |

Example container:

```css
.container {
  max-width: 120rem;
  margin: 0 auto;
  padding: 0 2.4rem;
}
```

### 7. Page Sections

Recommended section spacing.

| Element       | Padding |
| ------------- | ------- |
| section       | 8rem 0  |
| large section | 12rem 0 |
| small section | 4rem 0  |

Example:

```css
.section {
  padding: 8rem 0;
}
```

### 8. Button System

```css
.btn {
  font-size: 1.6rem;
  padding: 1.2rem 2.4rem;
  border-radius: 0.8rem;
  border: none;
  cursor: pointer;
}
```

Button sizes:

| Type   | Height |
| ------ | ------ |
| small  | 3.2rem |
| medium | 4rem   |
| large  | 4.8rem |

Example:

```css
.btn-sm {
  padding: 0.8rem 1.6rem;
}

.btn-md {
  padding: 1.2rem 2.4rem;
}

.btn-lg {
  padding: 1.6rem 3.2rem;
}
```

### 9. Form Inputs

Recommended input size.

```css
input,
textarea,
select {
  font-size: 1.6rem;
  padding: 1.2rem;
  border-radius: 0.6rem;
  border: 1px solid #ccc;
}
```

Standard height:

```
4rem
```

### 10. Card Layout

Example reusable card component.

```css
.card {
  padding: 2.4rem;
  border-radius: 1.2rem;
  box-shadow: 0 0.8rem 2.4rem rgba(0, 0, 0, 0.08);
}
```

### 11. Grid Layouts

#### Two Column Grid

```css
.grid-2 {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 3.2rem;
}
```

#### Three Column Grid

```css
.grid-3 {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 3.2rem;
}
```

### 12. Images

Recommended responsive images.

```css
img {
  max-width: 100%;
  height: auto;
  display: block;
}
```

### 13. Lists

```css
ul {
  list-style: none;
}
```

### 14. Links

```css
a {
  text-decoration: none;
  color: inherit;
}
```

### 15. Utility Classes

Useful spacing utilities.

```css
.mt-sm {
  margin-top: 1.6rem;
}

.mt-md {
  margin-top: 3.2rem;
}

.mt-lg {
  margin-top: 6.4rem;
}

.mb-sm {
  margin-bottom: 1.6rem;
}

.mb-md {
  margin-bottom: 3.2rem;
}

.mb-lg {
  margin-bottom: 6.4rem;
}
```

### 16. Navbar Size

Recommended navbar size.

```
height: 6rem
padding: 0 2.4rem
```

Example:

```css
.navbar {
  height: 6rem;
  padding: 0 2.4rem;
}
```

### 17. Footer Size

Recommended footer spacing.

```
padding: 4rem 0
```

### 18. Z-Index Preset

| Layer    | Value |
| -------- | ----- |
| dropdown | 100   |
| navbar   | 200   |
| modal    | 500   |
| overlay  | 1000  |

Example:

```css
.modal {
  z-index: 500;
}
```

### 19. Border Radius System

| Size        | rem    |
| ----------- | ------ |
| small       | 0.4rem |
| medium      | 0.8rem |
| large       | 1.2rem |
| extra large | 2rem   |

Example:

```css
.card {
  border-radius: 1.2rem;
}
```

### 20. Shadow System

| Type   | Shadow                           |
| ------ | -------------------------------- |
| small  | 0 0.4rem 1.2rem rgba(0,0,0,0.08) |
| medium | 0 0.8rem 2.4rem rgba(0,0,0,0.1)  |
| large  | 0 1.6rem 4rem rgba(0,0,0,0.12)   |

Example:

```css
.shadow-md {
  box-shadow: 0 0.8rem 2.4rem rgba(0, 0, 0, 0.1);
}
```

### 21. Breakpoints

Responsive breakpoints.

| Device        | Width  |
| ------------- | ------ |
| small phones  | 480px  |
| phones        | 600px  |
| tablets       | 768px  |
| laptops       | 1024px |
| desktops      | 1200px |
| large screens | 1440px |

Example:

```css
@media (max-width: 768px) {
  html {
    font-size: 56.25%;
  }
}
```

### Quick Reference

```
1rem = 10px
1.6rem = 16px
2rem = 20px
3.2rem = 32px
4.8rem = 48px
```

---

Happy coding 🎉

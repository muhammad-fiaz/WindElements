---
layout: home

hero:
  name: WindElements
  text: Production-ready UI components
  tagline: Like shadcn/ui but for Vanilla JavaScript/TypeScript
  image:
    src: /logo.svg
    alt: WindElements
  actions:
    - theme: brand
      text: Get Started
      link: /guide/getting-started
    - theme: alt
      text: View Components
      link: /components/
    - theme: alt
      text: GitHub
      link: https://github.com/muhammad-fiaz/WindElements

features:
  - icon: 🎨
    title: 70+ Components
    details: Complete UI library with buttons, forms, navigation, overlays, data display, and marketing components.
  
  - icon: 🎯
    title: Fully Customizable
    details: Every component accepts className prop for Tailwind CSS or custom styling. Own the code!
  
  - icon: 📦
    title: Zero Dependencies
    details: Pure vanilla JavaScript/TypeScript. No framework required. Works everywhere.
  
  - icon: 💎
    title: TypeScript First
    details: Full type safety with comprehensive .d.ts files and interfaces.
  
  - icon: 🎨
    title: OKLCH Colors
    details: Modern color system with automatic dark mode support via CSS variables.
  
  - icon: ⚡
    title: Tree-Shakeable
    details: Only bundle what you use. Optimized for performance.
  
  - icon: 🔧
    title: CLI Tool
    details: Install components individually or all at once with npx windelements.
  
  - icon: 🎭
    title: Framework Agnostic
    details: Use with React, Vue, Svelte, or any vanilla JS/TS project.
  
  - icon: 📚
    title: Well Documented
    details: Comprehensive documentation with live examples and usage guides.
---

## Quick Start

```bash
# Initialize your project
npx windelements@latest init

# Add components
npx windelements@latest add button
npx windelements@latest add card
npx windelements@latest add dialog

# Or add all components
npx windelements@latest add --all
```

## Simple Example

```typescript
import { createButton } from './components/ui/button';
import { createCard, createCardHeader, createCardTitle, createCardContent } from './components/ui/card';

// Create a button
const button = createButton({
  variant: 'default',
  children: 'Click me!',
  onClick: () => alert('Hello WindElements!')
});

// Create a card
const card = createCard();
const header = createCardHeader();
const title = createCardTitle({ children: 'Welcome' });
const content = createCardContent();

content.getElement().appendChild(button.getElement());
header.getElement().appendChild(title.getElement());
card.getElement().appendChild(header.getElement());
card.getElement().appendChild(content.getElement());

document.body.appendChild(card.getElement());
```

## Component Categories

### 🎨 Foundational (11 components)
Button, Button Group, Input, Label, Textarea, Form, File Upload, Checkbox, Switch, Radio Group, Kbd

### 📐 Layout (10 components)
Card, Separator, Accordion, Aspect Ratio, Breadcrumb, Collapsible, Tabs, Scroll Area, Divider, Resizable

### 🧭 Navigation (6 components)
Navbar, Sidebar, Footer, Menubar, Dropdown Menu, Context Menu

### 💬 Feedback (11 components)
Alert, Alert Dialog, Badge, Progress, Skeleton, Spinner, Toast, Tooltip, Empty, Notification, Sonner

### 📝 Form Components (10 components)
Select, Slider, Toggle, Toggle Group, Input OTP, Combobox, Counter, Calendar, Date Picker, Rating

### 🎭 Display (13 components)
Avatar, Avatar Group, Table, Data Table, Typography, Pagination, Chip, Stats, Timeline, Stepper, Carousel, Testimonial, Empty

### 🪟 Overlay (10 components)
Dialog, Drawer, Popover, Modal, Sheet, Hover Card, Hint, Command, Alert Dialog, Tooltip

### 🎯 Marketing (4 components)
Hero, Feature Card, Pricing Card, Testimonial

---

<div style="text-align: center; margin-top: 3rem; padding: 2rem; background: var(--vp-c-bg-soft); border-radius: 8px;">
  <h2>Ready to build amazing UIs?</h2>
  <p style="font-size: 1.1rem; margin: 1rem 0;">Start using WindElements in your project today!</p>
  <a href="/guide/getting-started" style="display: inline-block; padding: 0.75rem 2rem; background: var(--vp-c-brand); color: white; text-decoration: none; border-radius: 6px; font-weight: 600; margin-top: 1rem;">Get Started →</a>
</div>

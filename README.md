<div align="center">

<img  alt="WindElements" src="https://github.com/user-attachments/assets/00789781-5bef-4cee-be7d-6365cc6263c3" />

<br>
  <p><em>Production-ready UI components for Vanilla JavaScript/TypeScript - like shadcn/ui but for vanilla JS.</em></p>
  
<br>

<a href="https://www.npmjs.com/package/windelements"><img src="https://img.shields.io/npm/v/windelements" alt="NPM"></a>
<a href="https://www.npmjs.com/package/windelements"><img src="https://img.shields.io/npm/dm/windelements" alt="NPM - Downloads"></a>
  <a href="https://muhammad-fiaz.github.io/WindElements/"><img src="https://img.shields.io/badge/docs-muhammad--fiaz.github.io-blue" alt="Documentation"></a>
  <a href="https://www.typescriptlang.org/"><img src="https://img.shields.io/badge/typescript-%3E%3D5.0-brightgreen.svg" alt="Supported TypeScript"></a>
  <a href="https://github.com/muhammad-fiaz/WindElements"><img src="https://img.shields.io/github/stars/muhammad-fiaz/WindElements" alt="GitHub stars"></a>
  <a href="https://github.com/muhammad-fiaz/WindElements/issues"><img src="https://img.shields.io/github/issues/muhammad-fiaz/WindElements" alt="GitHub issues"></a>
  <a href="https://github.com/muhammad-fiaz/WindElements/pulls"><img src="https://img.shields.io/github/issues-pr/muhammad-fiaz/WindElements" alt="GitHub pull requests"></a>
  <a href="https://github.com/muhammad-fiaz/WindElements"><img src="https://img.shields.io/github/last-commit/muhammad-fiaz/WindElements" alt="GitHub last commit"></a>
  <a href="https://github.com/muhammad-fiaz/WindElements/releases"><img src="https://img.shields.io/github/v/release/muhammad-fiaz/WindElements" alt="GitHub release"></a>
  <a href="https://github.com/muhammad-fiaz/WindElements"><img src="https://img.shields.io/github/license/muhammad-fiaz/WindElements" alt="License"></a>
  <a href="https://github.com/muhammad-fiaz/WindElements/actions/workflows/deploy.yml"><img src="https://github.com/muhammad-fiaz/WindElements/actions/workflows/deploy.yml/badge.svg" alt="Deploy Documentation"></a>
  <a href="https://github.com/muhammad-fiaz/WindElements/actions/workflows/publish.yml"><img src="https://github.com/muhammad-fiaz/WindElements/actions/workflows/publish.yml/badge.svg" alt="Publish NPM"></a>


  **📚 [Documentation](https://muhammad-fiaz.github.io/WindElements/) | [API Reference](https://muhammad-fiaz.github.io/WindElements/components/) | [Quick Start](https://muhammad-fiaz.github.io/WindElements/guide/getting-started/)**
</div>

## ✨ Features

- 🎨 **70+ Production-Ready Components** - Complete UI library with buttons, forms, navigation, overlays, data display, marketing components and more
- 🎯 **Fully Customizable** - Every component accepts `className` prop for Tailwind CSS or custom CSS styling
- 📦 **Zero Runtime Dependencies** - Pure vanilla JavaScript/TypeScript
- 🔧 **CLI Tool** - Install components individually or all at once
- 💎 **TypeScript First** - Full type safety with `.d.ts` files
- 🎨 **OKLCH Color System** - Modern color definitions with automatic dark mode
- ⚡ **Tree-Shakeable** - Only bundle what you use
- 🎭 **Works Everywhere** - No framework required
- 📚 **Comprehensive Docs** - Full documentation with live examples at [muhammad-fiaz.github.io/WindElements](https://muhammad-fiaz.github.io/WindElements)

## Installation

**WindElements works like shadcn/ui** - components are copied to YOUR project, not installed as npm dependencies.

### Initialize Your Project

```bash
npx windelements@latest init
```

This will:
- ✅ Create `components.json` configuration
- ✅ Detect TypeScript and Tailwind CSS
- ✅ Set up component directory (default: `src/components/ui`)
- ✅ Auto-inject OKLCH theme CSS variables
- ✅ Copy utility functions to your project

### Add Components

```bash
# Add individual components (copied to src/components/ui/)
npx windelements@latest add button
npx windelements@latest add input
npx windelements@latest add dialog

# Add multiple components
npx windelements@latest add button input card

# Add all components
npx windelements@latest add --all

# Overwrite existing
npx windelements@latest add button --overwrite
```

**Components are copied to `src/components/ui/` - you own the code!**

## Usage

Components are in YOUR project at `src/components/ui/`. Import and use them:

```typescript
// Import from YOUR source code (not from npm!)
import { createButton } from './components/ui/button';
import { createInput } from './components/ui/input';
import { createCard, createCardHeader, createCardTitle } from './components/ui/card';

// Create a button
const button = createButton({
  variant: 'default',
  children: 'Click me',
  onClick: (e) => console.log('Clicked!')
});

// Create an input
const input = createInput({
  type: 'text',
  placeholder: 'Enter your name...',
  onInput: (e) => console.log((e.target as HTMLInputElement).value)
});

// Create a card
const card = createCard();
const cardHeader = createCardHeader();
const cardTitle = createCardTitle({ children: 'My Card' });
const cardContent = createCardContent();

cardContent.getElement().appendChild(input.getElement());
cardContent.getElement().appendChild(button.getElement());
cardHeader.getElement().appendChild(cardTitle.getElement());
card.getElement().appendChild(cardHeader.getElement());
card.getElement().appendChild(cardContent.getElement());

document.body.appendChild(card.getElement());
```

### JavaScript Example

```javascript
import { createButton } from './components/button.js';

const button = createButton({
  variant: 'default',
  children: 'Click me',
  onClick: () => alert('Hello!')
});

document.body.appendChild(button.getElement());
```

## 📦 Available Components (70+)

### 🎨 Foundational Components (11)
`button` `button-group` `input` `label` `textarea` `form` `file-upload` `checkbox` `switch` `radio-group` `kbd`

### 📐 Layout Components (10)
`card` `separator` `accordion` `aspect-ratio` `breadcrumb` `collapsible` `tabs` `scroll-area` `divider` `resizable`

### 🧭 Navigation Components (6)
`navbar` `sidebar` `footer` `menubar` `dropdown-menu` `context-menu`

### 💬 Feedback Components (11)
`alert` `alert-dialog` `badge` `progress` `skeleton` `spinner` `toast` `tooltip` `empty` `notification` `sonner`

### 📝 Form Components (11)
`select` `slider` `toggle` `toggle-group` `input-otp` `combobox` `counter` `calendar` `date-picker` `rating` `file-upload`

### 🎭 Display Components (13)
`avatar` `avatar-group` `table` `data-table` `typography` `pagination` `chip` `stats` `timeline` `stepper` `carousel` `testimonial` `empty`

### 🪟 Overlay Components (10)
`dialog` `drawer` `popover` `modal` `sheet` `hover-card` `hint` `command` `alert-dialog` `tooltip`

### 🎯 Marketing Components (4)
`hero` `feature-card` `pricing-card` `testimonial`

**[View Full Component Documentation →](https://muhammad-fiaz.github.io/WindElements/components/)**

## Component API

All components follow a consistent API pattern:

### Class-based API

```typescript
const component = new ComponentName(props);
const element = component.getElement();
component.update(newProps);
component.destroy();
```

### Factory Function API

```typescript
const component = createComponentName(props);
const element = component.getElement();
```

## Configuration

Your `components.json` file:

```json
{
  "typescript": true,
  "componentDir": "src/components",
  "utilsDir": "src/lib",
  "cssFile": "src/styles/globals.css",
  "tailwindConfig": "tailwind.config.js"
}
```

## Styling

All components use CSS custom properties for theming:

```css
:root {
  --radius: 0.625rem;
  --background: oklch(1 0 0);
  --foreground: oklch(0.145 0 0);
  --primary: oklch(0.205 0 0);
  --primary-foreground: oklch(0.985 0 0);
  /* ... more theme variables */
}

.dark {
  --background: oklch(0.145 0 0);
  --foreground: oklch(0.985 0 0);
  /* ... dark mode overrides */
}
```

## TypeScript

All components are fully typed:

```typescript
import { Button, ButtonProps } from './components/button';

const props: ButtonProps = {
  variant: 'default',
  size: 'lg',
  disabled: false,
  onClick: (e: MouseEvent) => console.log(e)
};

const button = new Button(props);
```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Star History

[![Star History Chart](https://api.star-history.com/svg?repos=muhammad-fiaz/WindElements&type=Date)](https://star-history.com/#muhammad-fiaz/WindElements&Date)

## Credits

Inspired by [shadcn/ui](https://ui.shadcn.com)

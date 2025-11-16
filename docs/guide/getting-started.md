# Getting Started

Welcome to WindElements! This guide will help you get started with using production-ready UI components in your Vanilla JavaScript/TypeScript project.

## What is WindElements?

WindElements is a collection of 70+ production-ready UI components for Vanilla JavaScript/TypeScript projects. It works like **shadcn/ui** - components are copied to your project, not installed as npm dependencies. This means you own the code and can customize it however you want!

## Features

- ✅ **70+ Components** - Complete UI library
- ✅ **Copy, not install** - Components go into YOUR codebase
- ✅ **TypeScript First** - Full type safety
- ✅ **Zero Dependencies** - Pure vanilla JS/TS
- ✅ **Tailwind CSS** - Utility-first styling
- ✅ **OKLCH Colors** - Modern color system
- ✅ **Dark Mode** - Built-in support
- ✅ **Customizable** - Modify components as needed

## Philosophy

Unlike traditional component libraries, WindElements doesn't add components as npm dependencies. Instead, it copies the source code directly into your project. This approach gives you:

1. **Full Control** - Own and modify the code
2. **No Lock-in** - Not tied to package updates
3. **Tree-Shaking** - Only bundle what you use
4. **Transparency** - See exactly what's happening
5. **Customization** - Change anything you need

## Prerequisites

Before you begin, make sure you have:

- **Node.js** 18 or higher
- **Package Manager** (npm, pnpm, yarn, or bun)
- **Tailwind CSS** 4.0+ configured in your project

## Installation

WindElements requires Tailwind CSS 4.0 or higher. If you haven't set up Tailwind CSS yet, follow the [official Tailwind CSS installation guide](https://tailwindcss.com/docs/installation).

### Initialize Your Project

Run the init command to set up WindElements:

```bash
npx windelements@latest init
```

This interactive CLI will:
1. Detect if you're using TypeScript
2. Ask where you want components (`src/components/ui` by default)
3. Set up the utilities directory (`src/lib/utils`)
4. Configure your CSS file with OKLCH theme variables
5. Create a `components.json` configuration file

### Configuration File

After initialization, you'll have a `components.json` file:

```json
{
  "typescript": true,
  "componentDir": "src/components/ui",
  "utilsDir": "src/lib",
  "cssFile": "src/styles/globals.css",
  "tailwindConfig": "tailwind.config.js"
}
```

## Adding Components

Once initialized, you can add components to your project:

### Add Individual Components

```bash
npx windelements@latest add button
npx windelements@latest add input
npx windelements@latest add dialog
```

### Add Multiple Components

```bash
npx windelements@latest add button input card
```

### Add All Components

```bash
npx windelements@latest add --all
```

### Overwrite Existing Components

```bash
npx windelements@latest add button --overwrite
```

## Project Structure

After adding components, your project structure will look like this:

```
your-project/
├── src/
│   ├── components/
│   │   └── ui/
│   │       ├── button.ts
│   │       ├── input.ts
│   │       ├── card.ts
│   │       └── ...
│   ├── lib/
│   │   └── utils.ts
│   └── styles/
│       └── globals.css
├── components.json
└── package.json
```

## First Component

Let's create your first component:

```typescript
import { createButton } from './components/ui/button';

const button = createButton({
  variant: 'default',
  size: 'md',
  children: 'Click me!',
  onClick: () => {
    console.log('Button clicked!');
  }
});

// Append to DOM
document.body.appendChild(button.getElement());
```

## TypeScript Support

WindElements is built with TypeScript and provides full type safety:

```typescript
import { Button, ButtonProps } from './components/ui/button';

const props: ButtonProps = {
  variant: 'primary',
  size: 'lg',
  disabled: false,
  children: 'Type-safe button',
  onClick: (e: MouseEvent) => console.log(e)
};

const button = new Button(props);
```

## Next Steps

- [Installation Guide](/guide/installation) - Detailed setup instructions
- [Theming](/guide/theming) - Customize colors and styles
- [Browse Components](/components/) - Explore all 70+ components
- [Examples](/examples) - See real-world usage examples

## Need Help?

- [GitHub Issues](https://github.com/muhammad-fiaz/WindElements/issues)
- [Discussions](https://github.com/muhammad-fiaz/WindElements/discussions)
- [Twitter](https://twitter.com/muhammad_o_faiz)

# Installation

This guide will walk you through installing WindElements in your project step by step.

## Requirements

- **Node.js** 18.0.0 or higher
- **Package Manager**: npm, pnpm, yarn, or bun
- **Tailwind CSS** 4.0.0 or higher

## Step 1: Install Tailwind CSS

If you haven't already, install and configure Tailwind CSS 4.0:

::: code-group

```bash [npm]
npm install -D tailwindcss@next @tailwindcss/vite@next
```

```bash [pnpm]
pnpm add -D tailwindcss@next @tailwindcss/vite@next
```

```bash [yarn]
yarn add -D tailwindcss@next @tailwindcss/vite@next
```

```bash [bun]
bun add -D tailwindcss@next @tailwindcss/vite@next
```

:::

Create a `tailwind.config.js`:

```javascript
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
}
```

Add Tailwind to your `vite.config.ts`:

```typescript
import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [tailwindcss()],
})
```

## Step 2: Initialize WindElements

Run the init command:

```bash
npx windelements@latest init
```

### Interactive Prompts

You'll be asked a few questions:

1. **TypeScript**: Are you using TypeScript? (auto-detected)
2. **Component Directory**: Where should components be added? (default: `src/components/ui`)
3. **Utils Directory**: Where should utilities be placed? (default: `src/lib`)
4. **CSS File**: Path to your global CSS file (default: `src/styles/globals.css`)

### What Gets Created

The init command will:

✅ Create `components.json` configuration file  
✅ Create the utils file with helper functions  
✅ Add OKLCH theme variables to your CSS  
✅ Set up the component directory structure

## Step 3: Configure CSS

Your CSS file will be updated with OKLCH color variables:

```css
@import "tailwindcss";

:root {
  --radius: 0.625rem;
  --background: oklch(1 0 0);
  --foreground: oklch(0.145 0 0);
  --primary: oklch(0.205 0 0);
  --primary-foreground: oklch(0.985 0 0);
  --secondary: oklch(0.97 0 0);
  --secondary-foreground: oklch(0.205 0 0);
  /* ... more variables */
}

.dark {
  --background: oklch(0.145 0 0);
  --foreground: oklch(0.985 0 0);
  /* ... dark mode overrides */
}
```

Import this in your main entry file:

```typescript
import './styles/globals.css';
```

## Step 4: Add Components

Now you can add components to your project:

```bash
# Add individual components
npx windelements@latest add button

# Add multiple components
npx windelements@latest add button input card dialog

# Add all components (70+)
npx windelements@latest add --all
```

## Step 5: Use Components

Import and use components from your project:

```typescript
import { createButton } from './components/ui/button';
import { createInput } from './components/ui/input';

const button = createButton({
  variant: 'default',
  children: 'Submit',
  onClick: () => console.log('Clicked!')
});

const input = createInput({
  type: 'email',
  placeholder: 'Enter your email',
  onInput: (e) => console.log((e.target as HTMLInputElement).value)
});

document.body.appendChild(input.getElement());
document.body.appendChild(button.getElement());
```

## Configuration File

The `components.json` file configures how WindElements works:

```json
{
  "typescript": true,
  "componentDir": "src/components/ui",
  "utilsDir": "src/lib",
  "cssFile": "src/styles/globals.css",
  "tailwindConfig": "tailwind.config.js"
}
```

### Options

- **typescript**: Whether to use TypeScript files (`.ts` vs `.js`)
- **componentDir**: Where components are copied to
- **utilsDir**: Where utility functions are placed
- **cssFile**: Your global CSS file for theme variables
- **tailwindConfig**: Path to Tailwind config (for future enhancements)

## Updating Components

Components are copied to your project, so you control updates:

### Overwrite Individual Component

```bash
npx windelements@latest add button --overwrite
```

### Update All Components

```bash
npx windelements@latest add --all --overwrite
```

⚠️ **Warning**: This will overwrite any customizations you've made!

## Manual Installation

If you prefer not to use the CLI, you can manually copy components:

1. Copy the component file from the [GitHub repository](https://github.com/muhammad-fiaz/WindElements/tree/main/src/components)
2. Copy `src/utils/index.ts` to your project
3. Add OKLCH variables to your CSS
4. Import and use the component

## Troubleshooting

### Module Not Found

If you get "Module not found" errors:

1. Check that paths in `components.json` are correct
2. Verify the component file exists in your `componentDir`
3. Make sure you've imported from the correct path

### Styling Issues

If styles don't work:

1. Verify Tailwind CSS is installed and configured
2. Check that your CSS file includes `@import "tailwindcss"`
3. Ensure OKLCH variables are in your CSS
4. Add component directories to Tailwind's `content` array

### TypeScript Errors

If you get TypeScript errors:

1. Check `typescript: true` in `components.json`
2. Verify `tsconfig.json` includes your component directory
3. Make sure `moduleResolution` is set to `"bundler"` or `"node16"`

## Next Steps

- [Theming Guide](/guide/theming) - Customize colors and styles
- [TypeScript Guide](/guide/typescript) - Type safety and interfaces
- [Browse Components](/components/) - Explore all 70+ components

## Framework-Specific Setup

### Vite

WindElements works great with Vite. No additional configuration needed!

### Webpack

Add Tailwind CSS PostCSS plugin to your webpack config.

### Parcel

Parcel has built-in PostCSS support. Just install Tailwind CSS.

### Next.js

WindElements works with Next.js! Use the same installation steps.

## Need Help?

- [GitHub Issues](https://github.com/muhammad-fiaz/WindElements/issues)
- [Discussions](https://github.com/muhammad-fiaz/WindElements/discussions)

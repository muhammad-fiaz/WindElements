# WindElements - Component Development Guide

## Architecture Overview

WindElements is a production-ready component library for Vanilla JavaScript/TypeScript that follows a consistent, modular architecture.

## Component Structure

Every component follows this pattern:

```typescript
import { cn } from '../lib/utils';

export interface ComponentProps {
  // Props definition
  className?: string;
  // ... other props
}

export class ComponentName {
  private element: HTMLElement;
  private props: ComponentProps;
  
  constructor(props: ComponentProps = {}) {
    this.props = props;
    this.element = this.render();
  }
  
  private render(): HTMLElement {
    const element = document.createElement('div');
    element.className = cn('base-classes', this.props.className);
    // ... rendering logic
    return element;
  }
  
  getElement(): HTMLElement {
    return this.element;
  }
  
  destroy(): void {
    // Cleanup
    this.element.remove();
  }
}

export function createComponentName(props: ComponentProps = {}): ComponentName {
  return new ComponentName(props);
}
```

## Styling Guidelines

1. **Use CSS Custom Properties** - All colors use `var(--token-name)`
2. **TailwindCSS Classes** - Utility-first approach
3. **Consistent Spacing** - Use Tailwind spacing scale
4. **Responsive Design** - Mobile-first with `sm:`, `md:`, `lg:` breakpoints
5. **Dark Mode Support** - Automatic through CSS variables

## Accessibility Requirements

1. **ARIA Attributes** - Proper `role`, `aria-label`, etc.
2. **Keyboard Navigation** - Tab, Enter, Escape support
3. **Focus Management** - Visible focus states
4. **Screen Reader Support** - Semantic HTML and ARIA

## Component Categories

### Form Components
- Button, Input, Textarea, Label
- Checkbox, Radio, Switch
- Select, Combobox
- Form, Field

### Layout Components  
- Card, Container
- Separator, Divider
- Grid, Stack
- Aspect Ratio

### Feedback Components
- Alert, Toast
- Badge, Chip
- Progress, Spinner, Skeleton
- Empty State

### Overlay Components
- Dialog, Modal
- Drawer, Sheet
- Popover, Tooltip
- Alert Dialog, Confirm Dialog

### Navigation Components
- Breadcrumb, Pagination
- Tabs, Steps
- Navigation Menu, Menubar
- Sidebar

### Data Display
- Table, Data Table
- Avatar, Avatar Group
- List, Description List
- Stat, Metric

### Advanced Components
- Calendar, Date Picker
- Chart (via Chart.js)
- Carousel, Slider
- Command Palette
- Resizable Panels

## Component Template

Use this as a starting point for new components:

```typescript
import { cn } from '../lib/utils';

export interface NewComponentProps {
  variant?: 'default' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  className?: string;
  children?: HTMLElement | HTMLElement[] | string;
  onClick?: (event: MouseEvent) => void;
}

export class NewComponent {
  private element: HTMLElement;
  private props: NewComponentProps;

  constructor(props: NewComponentProps = {}) {
    this.props = props;
    this.element = this.render();
  }

  private render(): HTMLElement {
    const element = document.createElement('div');
    
    // Base classes
    const baseClasses = 'relative inline-flex items-center justify-center';
    
    // Variant classes
    const variantClasses = {
      default: 'bg-[var(--primary)] text-[var(--primary-foreground)]',
      outline: 'border border-[var(--border)] bg-transparent'
    };
    
    // Size classes
    const sizeClasses = {
      sm: 'h-8 px-3 text-xs',
      md: 'h-10 px-4 text-sm',
      lg: 'h-12 px-6 text-base'
    };
    
    const variant = this.props.variant || 'default';
    const size = this.props.size || 'md';
    
    element.className = cn(
      baseClasses,
      variantClasses[variant],
      sizeClasses[size],
      this.props.disabled && 'opacity-50 pointer-events-none',
      this.props.className
    );
    
    // Add children
    if (this.props.children) {
      if (typeof this.props.children === 'string') {
        element.textContent = this.props.children;
      } else if (Array.isArray(this.props.children)) {
        this.props.children.forEach(child => element.appendChild(child));
      } else {
        element.appendChild(this.props.children);
      }
    }
    
    // Add event listeners
    if (this.props.onClick) {
      element.addEventListener('click', this.props.onClick);
    }
    
    return element;
  }

  getElement(): HTMLElement {
    return this.element;
  }

  update(props: Partial<NewComponentProps>): void {
    this.props = { ...this.props, ...props };
    const newElement = this.render();
    this.element.replaceWith(newElement);
    this.element = newElement;
  }

  destroy(): void {
    if (this.props.onClick) {
      this.element.removeEventListener('click', this.props.onClick);
    }
    this.element.remove();
  }
}

export function createNewComponent(props: NewComponentProps = {}): NewComponent {
  return new NewComponent(props);
}
```

## Testing Components

```typescript
// Example usage
import { createNewComponent } from './components/new-component';

const component = createNewComponent({
  variant: 'outline',
  size: 'lg',
  children: 'Click me',
  onClick: (e) => console.log('Clicked!')
});

document.body.appendChild(component.getElement());
```

## Contributing Components

When adding a new component:

1. Create the component file in `src/components/`
2. Add to registry in `src/registry/index.ts`
3. Add export in `src/index.ts`
4. Follow the component template
5. Include TypeScript types
6. Add proper ARIA attributes
7. Handle cleanup in `destroy()` method

## Component Checklist

- [ ] TypeScript interface for props
- [ ] Class with constructor accepting props
- [ ] Private render() method
- [ ] Public getElement() method
- [ ] Public destroy() method
- [ ] Factory function
- [ ] Proper className merging with `cn()`
- [ ] CSS custom properties for theming
- [ ] ARIA attributes where needed
- [ ] Event listener cleanup
- [ ] Responsive design
- [ ] Dark mode support

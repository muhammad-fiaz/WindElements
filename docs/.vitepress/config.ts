import { defineConfig } from 'vitepress';

export default defineConfig({
  title: 'WindElements',
  description: 'Production-ready UI components for Vanilla JavaScript/TypeScript',
  base: '/WindElements/',
  ignoreDeadLinks: true,
  
  themeConfig: {
    logo: '/logo.svg',
    
    nav: [
      { text: 'Guide', link: '/guide/getting-started' },
      { text: 'Components', link: '/components/' },
      { text: 'Examples', link: '/examples' },
      { text: 'GitHub', link: 'https://github.com/muhammad-fiaz/WindElements' }
    ],

    sidebar: {
      '/guide/': [
        {
          text: 'Introduction',
          items: [
            { text: 'Getting Started', link: '/guide/getting-started' },
            { text: 'Installation', link: '/guide/installation' },
            { text: 'Theming', link: '/guide/theming' },
            { text: 'TypeScript', link: '/guide/typescript' }
          ]
        }
      ],
      
      '/components/': [
        {
          text: 'Foundational',
          collapsed: false,
          items: [
            { text: 'Button', link: '/components/button' },
            { text: 'Button Group', link: '/components/button-group' },
            { text: 'Input', link: '/components/input' },
            { text: 'Label', link: '/components/label' },
            { text: 'Textarea', link: '/components/textarea' },
            { text: 'Form', link: '/components/form' },
            { text: 'File Upload', link: '/components/file-upload' },
            { text: 'Checkbox', link: '/components/checkbox' },
            { text: 'Switch', link: '/components/switch' },
            { text: 'Radio Group', link: '/components/radio-group' },
            { text: 'Kbd', link: '/components/kbd' }
          ]
        },
        {
          text: 'Layout',
          collapsed: false,
          items: [
            { text: 'Card', link: '/components/card' },
            { text: 'Separator', link: '/components/separator' },
            { text: 'Accordion', link: '/components/accordion' },
            { text: 'Aspect Ratio', link: '/components/aspect-ratio' },
            { text: 'Breadcrumb', link: '/components/breadcrumb' },
            { text: 'Collapsible', link: '/components/collapsible' },
            { text: 'Tabs', link: '/components/tabs' },
            { text: 'Scroll Area', link: '/components/scroll-area' },
            { text: 'Divider', link: '/components/divider' },
            { text: 'Resizable', link: '/components/resizable' }
          ]
        },
        {
          text: 'Navigation',
          collapsed: false,
          items: [
            { text: 'Navbar', link: '/components/navbar' },
            { text: 'Sidebar', link: '/components/sidebar' },
            { text: 'Footer', link: '/components/footer' },
            { text: 'Menubar', link: '/components/menubar' },
            { text: 'Dropdown Menu', link: '/components/dropdown-menu' },
            { text: 'Context Menu', link: '/components/context-menu' }
          ]
        },
        {
          text: 'Feedback',
          collapsed: false,
          items: [
            { text: 'Alert', link: '/components/alert' },
            { text: 'Alert Dialog', link: '/components/alert-dialog' },
            { text: 'Badge', link: '/components/badge' },
            { text: 'Progress', link: '/components/progress' },
            { text: 'Skeleton', link: '/components/skeleton' },
            { text: 'Spinner', link: '/components/spinner' },
            { text: 'Toast', link: '/components/toast' },
            { text: 'Tooltip', link: '/components/tooltip' },
            { text: 'Empty', link: '/components/empty' },
            { text: 'Notification', link: '/components/notification' },
            { text: 'Sonner', link: '/components/sonner' }
          ]
        },
        {
          text: 'Form Components',
          collapsed: false,
          items: [
            { text: 'Select', link: '/components/select' },
            { text: 'Slider', link: '/components/slider' },
            { text: 'Toggle', link: '/components/toggle' },
            { text: 'Toggle Group', link: '/components/toggle-group' },
            { text: 'Input OTP', link: '/components/input-otp' },
            { text: 'Combobox', link: '/components/combobox' },
            { text: 'Counter', link: '/components/counter' },
            { text: 'Calendar', link: '/components/calendar' },
            { text: 'Date Picker', link: '/components/date-picker' },
            { text: 'Rating', link: '/components/rating' }
          ]
        },
        {
          text: 'Display',
          collapsed: false,
          items: [
            { text: 'Avatar', link: '/components/avatar' },
            { text: 'Avatar Group', link: '/components/avatar-group' },
            { text: 'Table', link: '/components/table' },
            { text: 'Data Table', link: '/components/data-table' },
            { text: 'Typography', link: '/components/typography' },
            { text: 'Pagination', link: '/components/pagination' },
            { text: 'Chip', link: '/components/chip' },
            { text: 'Stats', link: '/components/stats' },
            { text: 'Timeline', link: '/components/timeline' },
            { text: 'Stepper', link: '/components/stepper' },
            { text: 'Carousel', link: '/components/carousel' },
            { text: 'Testimonial', link: '/components/testimonial' }
          ]
        },
        {
          text: 'Overlay',
          collapsed: false,
          items: [
            { text: 'Dialog', link: '/components/dialog' },
            { text: 'Drawer', link: '/components/drawer' },
            { text: 'Popover', link: '/components/popover' },
            { text: 'Modal', link: '/components/modal' },
            { text: 'Sheet', link: '/components/sheet' },
            { text: 'Hover Card', link: '/components/hover-card' },
            { text: 'Hint', link: '/components/hint' },
            { text: 'Command', link: '/components/command' }
          ]
        },
        {
          text: 'Marketing',
          collapsed: false,
          items: [
            { text: 'Hero', link: '/components/hero' },
            { text: 'Feature Card', link: '/components/feature-card' },
            { text: 'Pricing Card', link: '/components/pricing-card' },
            { text: 'Testimonial', link: '/components/testimonial' }
          ]
        }
      ]
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/muhammad-fiaz/WindElements' }
    ],

    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2025-present Muhammad Fiaz'
    },

    search: {
      provider: 'local'
    }
  },

  head: [
    ['link', { rel: 'icon', type: 'image/svg+xml', href: '/WindElements/logo.svg' }],
    ['meta', { name: 'theme-color', content: '#646cff' }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:title', content: 'WindElements' }],
    ['meta', { property: 'og:description', content: 'Production-ready UI components for Vanilla JavaScript/TypeScript' }]
  ]
});

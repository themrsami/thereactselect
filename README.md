# theReactSelect

A beautiful, fast, and accessible React Select component library built with TypeScript and Tailwind CSS. No external dependencies except React.

## 🌟 Live Demo

**🚀 [View Live Demo & Playground](https://thereactselect.vercel.app)**

Experience all features including:
- **Interactive Playground** - Test all configurations in real-time
- **Live Examples** - See components in action
- **Complete Documentation** - API reference and usage guides
- **Dark/Light Mode** - Toggle themes to see both modes
- **Copy-Paste Code** - Generated code for immediate use

## Features

✨ **Beautiful Design** - Clean, modern interface with smooth animations  
🚀 **High Performance** - Optimized for performance with minimal re-renders  
♿ **Fully Accessible** - ARIA compliant with keyboard navigation  
🎨 **Highly Customizable** - Multiple variants, sizes, and styling options  
� **Mobile Friendly** - Touch-optimized for mobile devices  
�🔍 **Searchable** - Built-in search functionality with debounced input  
�️ **Multi-select** - Support for selecting multiple options with badges  
🎯 **TypeScript** - Full TypeScript support with comprehensive types  
🌙 **Dark Mode** - Built-in dark theme support  
🧩 **Zero Dependencies** - Only peer dependencies on React  
⚡ **Select All** - Bulk selection for multi-select mode  
🎨 **Badge Variants** - Multiple badge styles for different use cases  
� **Flexible Display** - Multiple ways to display selected items  
🔢 **Numbered Options** - Optional numbering for better UX  
👥 **Grouped Options** - Support for option grouping  
🎛️ **Custom Icons** - Support for icons in options  
📝 **Rich Options** - Options with descriptions and badges  
🎪 **Loading States** - Built-in loading and error states  
🧹 **Clearable** - Optional clear functionality  
⌨️ **Keyboard Navigation** - Full keyboard support  
🎭 **Multiple Variants** - Different visual styles to choose from  

## Installation

> 💡 **Try it first:** Check out the [live demo and playground](https://thereactselect.vercel.app) before installing!

```bash
# npm
npm install thereactselect

# pnpm  
pnpm add thereactselect

# yarn
yarn add thereactselect

# bun
bun add thereactselect
```
bun add thereactselect
```
```

## Required CSS Variables

Add these CSS variables to your `globals.css` (Next.js) or `index.css` (React):

### For Tailwind CSS v4 (Next.js)
```css
@import 'tailwindcss';

:root {
  --background: 0 0% 100%;
  --foreground: 222.2 84% 4.9%;
  --card: 0 0% 100%;
  --card-foreground: 222.2 84% 4.9%;
  --popover: 0 0% 100%;
  --popover-foreground: 222.2 84% 4.9%;
  --primary: 221.2 83.2% 53.3%;
  --primary-foreground: 210 40% 98%;
  --secondary: 210 40% 96%;
  --secondary-foreground: 222.2 84% 4.9%;
  --muted: 210 40% 96%;
  --muted-foreground: 215.4 16.3% 46.9%;
  --accent: 210 40% 96%;
  --accent-foreground: 222.2 84% 4.9%;
  --destructive: 0 84.2% 60.2%;
  --destructive-foreground: 210 40% 98%;
  --border: 214.3 31.8% 91.4%;
  --input: 214.3 31.8% 91.4%;
  --ring: 221.2 83.2% 53.3%;
  --radius: 0.5rem;
}

.dark {
  --background: 222.2 84% 4.9%;
  --foreground: 210 40% 98%;
  --card: 222.2 84% 4.9%;
  --card-foreground: 210 40% 98%;
  --popover: 222.2 84% 4.9%;
  --popover-foreground: 210 40% 98%;
  --primary: 217.2 91.2% 59.8%;
  --primary-foreground: 222.2 84% 4.9%;
  --secondary: 217.2 32.6% 17.5%;
  --secondary-foreground: 210 40% 98%;
  --muted: 217.2 32.6% 17.5%;
  --muted-foreground: 215 20.2% 65.1%;
  --accent: 217.2 32.6% 17.5%;
  --accent-foreground: 210 40% 98%;
  --destructive: 0 62.8% 30.6%;
  --destructive-foreground: 210 40% 98%;
  --border: 217.2 32.6% 17.5%;
  --input: 217.2 32.6% 17.5%;
  --ring: 224.3 76.3% 94.1%;
}
```

### For Traditional Tailwind CSS
```css
@tailwind base;
@tailwind components;
@tailwind utilities;

/* Add the same CSS variables as above */
```

## Quick Start

```tsx
import { Select } from 'thereactselect';

const options = [
  { value: 'apple', label: 'Apple' },
  { value: 'banana', label: 'Banana' },
  { value: 'orange', label: 'Orange' },
];

function App() {
  return (
    <Select
      options={options}
      placeholder="Select a fruit..."
      onValueChange={(value) => console.log(value)}
    />
  );
}
```

## Examples

### Basic Select
```tsx
import React, { useState } from 'react';
import { Select } from 'thereactselect';

const options = [
  { value: 'apple', label: 'Apple' },
  { value: 'banana', label: 'Banana' },
  { value: 'orange', label: 'Orange' },
];

function BasicExample() {
  const [value, setValue] = useState();
  
  return (
    <Select
      options={options}
      value={value}
      onValueChange={setValue}
      placeholder="Select a fruit..."
    />
  );
}
```

### Multi Select
```tsx
function MultiSelectExample() {
  const [values, setValues] = useState([]);
  
  return (
    <Select
      options={options}
      multiple
      value={values}
      onValueChange={setValues}
      placeholder="Select multiple fruits..."
    />
  );
}
```

### Multi Select with Select All
```tsx
function SelectAllExample() {
  const [values, setValues] = useState([]);
  
  return (
    <Select
      options={options}
      multiple
      selectAll
      selectAllLabel="Select All Fruits"
      value={values}
      onValueChange={setValues}
      placeholder="Choose fruits..."
    />
  );
}
```

### Searchable Select
```tsx
function SearchableExample() {
  const [value, setValue] = useState();
  
  return (
    <Select
      options={options}
      searchable
      value={value}
      onValueChange={setValue}
      placeholder="Search fruits..."
      searchPlaceholder="Type to search..."
    />
  );
}
```

### With Icons and Descriptions
```tsx
import { Heart, Star, Award } from 'lucide-react';

const richOptions = [
  { 
    value: 'favorite', 
    label: 'Favorite', 
    icon: Heart,
    description: 'Your most loved option',
    badge: 'Popular',
    badgeVariant: 'success'
  },
  { 
    value: 'starred', 
    label: 'Starred', 
    icon: Star,
    description: 'Marked with a star',
    badge: 'New',
    badgeVariant: 'warning'
  },
  { 
    value: 'premium', 
    label: 'Premium', 
    icon: Award,
    description: 'Premium tier option',
    badge: 'Pro',
    badgeVariant: 'default'
  },
];

function RichOptionsExample() {
  const [value, setValue] = useState();
  
  return (
    <Select
      options={richOptions}
      value={value}
      onValueChange={setValue}
      placeholder="Select an option..."
    />
  );
}
```

### Grouped Options
```tsx
const groupedOptions = {
  groups: [
    {
      label: 'Fruits',
      options: [
        { value: 'apple', label: 'Apple' },
        { value: 'banana', label: 'Banana' },
      ]
    },
    {
      label: 'Vegetables',
      options: [
        { value: 'carrot', label: 'Carrot' },
        { value: 'lettuce', label: 'Lettuce' },
      ]
    }
  ]
};

function GroupedExample() {
  const [value, setValue] = useState();
  
  return (
    <Select
      {...groupedOptions}
      value={value}
      onValueChange={setValue}
      placeholder="Select food..."
    />
  );
}
```

### Different Sizes and Variants
```tsx
// Sizes
<Select options={options} size="sm" placeholder="Small" />
<Select options={options} size="default" placeholder="Default" />
<Select options={options} size="lg" placeholder="Large" />

// Variants
<Select options={options} variant="default" placeholder="Default variant" />
<Select options={options} variant="outline" placeholder="Outline variant" />
```

### States and Loading
```tsx
// Loading state
<Select options={options} loading placeholder="Loading..." />

// Error state
<Select options={options} error placeholder="Error state..." />

// Success state  
<Select options={options} success placeholder="Success state..." />

// Disabled
<Select options={options} disabled placeholder="Disabled..." />
```

### Clearable and Custom Display
```tsx
// Clearable
<Select 
  options={options} 
  clearable 
  value={value}
  onValueChange={setValue}
  placeholder="Clearable select..." 
/>

// Multi-select with different display modes
<Select 
  options={options}
  multiple
  selectedItemsDisplay="count"
  maxSelectedItemsToShow={2}
  value={values}
  onValueChange={setValues}
  placeholder="Display as count..."
/>

<Select 
  options={options}
  multiple
  selectedItemsDisplay="text"
  value={values}
  onValueChange={setValues}
  placeholder="Display as text..."
/>
```

### Numbered Options
```tsx
<Select 
  options={options}
  numbered
  value={value}
  onValueChange={setValue}
  placeholder="Numbered options..."
/>

// Custom number format
<Select 
  options={options}
  numbered
  numberFormat={(index) => `${index + 1})`}
  value={value}
  onValueChange={setValue}
  placeholder="Custom numbering..."
/>
```

### Scrollable Dropdown with Custom Height
```tsx
// Default scrollable dropdown (300px max height)
<Select 
  options={longListOfOptions}
  searchable
  placeholder="Select from many options..."
/>

// Custom max height
<Select 
  options={longListOfOptions}
  searchable
  scrollable
  maxHeight={500}
  placeholder="Taller dropdown..."
/>

// Disable scrolling (shows all options)
<Select 
  options={options}
  scrollable={false}
  placeholder="No scrolling..."
/>
```

## API Reference

### Types

#### SelectOption
```tsx
interface SelectOption {
  value: string | number;
  label: string;
  disabled?: boolean;
  icon?: React.ComponentType<{ className?: string }>;
  description?: string;
  badge?: string;
  badgeVariant?: 'default' | 'secondary' | 'success' | 'warning' | 'error' | 'outline';
}
```

#### SelectGroup
```tsx
interface SelectGroup {
  label: string;
  options: SelectOption[];
}
```

### Main Component Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| **Basic Props** | | | |
| `options` | `SelectOption[]` | `[]` | Array of options to display |
| `groups` | `SelectGroup[]` | `undefined` | Grouped options (alternative to options) |
| `value` | `string \| number \| (string \| number)[]` | `undefined` | Current selected value(s) |
| `defaultValue` | `string \| number \| (string \| number)[]` | `undefined` | Default selected value(s) |
| `placeholder` | `string` | `"Select..."` | Placeholder text when no selection |
| `onValueChange` | `(value: any) => void` | `undefined` | Callback when selection changes |
| **Selection Modes** | | | |
| `multiple` | `boolean` | `false` | Enable multi-select mode |
| `selectAll` | `boolean` | `false` | Show "Select All" option (multi-select only) |
| `selectAllLabel` | `string` | `"Select All"` | Label for select all option |
| **Search & Filter** | | | |
| `searchable` | `boolean` | `false` | Enable search functionality |
| `searchPlaceholder` | `string` | `"Search..."` | Placeholder for search input |
| `searchValue` | `string` | `undefined` | Controlled search value |
| `onSearchChange` | `(value: string) => void` | `undefined` | Callback when search changes |
| **Interaction** | | | |
| `clearable` | `boolean` | `false` | Show clear button when value selected |
| `disabled` | `boolean` | `false` | Disable the entire component |
| `loading` | `boolean` | `false` | Show loading spinner |
| `closeOnSelect` | `boolean` | `true` | Close dropdown after selecting an option |
| `onOpenChange` | `(open: boolean) => void` | `undefined` | Callback when dropdown opens/closes |
| **Dropdown Behavior** | | | |
| `scrollable` | `boolean` | `true` | Enable scrolling when content exceeds maxHeight |
| `maxHeight` | `number` | `300` | Maximum height of dropdown in pixels |
| **Styling & Variants** | | | |
| `variant` | `"default" \| "outline"` | `"default"` | Visual style variant |
| `size` | `"sm" \| "default" \| "lg"` | `"default"` | Size variant |
| `error` | `boolean` | `false` | Show error state styling |
| `success` | `boolean` | `false` | Show success state styling |
| **Multi-Select Display** | | | |
| `selectedItemsDisplay` | `"badges" \| "text" \| "count"` | `"badges"` | How to display selected items |
| `maxSelectedItemsToShow` | `number` | `3` | Max items before showing count |
| `showItemClearButtons` | `boolean` | `true` | Show X buttons on individual badges |
| **Options Display** | | | |
| `numbered` | `boolean` | `false` | Show numbers next to options |
| `numberFormat` | `(index: number) => string` | `undefined` | Custom number formatting function |
| **Groups Configuration** | | | |
| `showGroupHeaders` | `boolean` | `true` | Show group header labels |
| `groupDividers` | `boolean` | `false` | Show dividers between groups |
| **Messages** | | | |
| `noOptionsMessage` | `string` | `"No options available"` | Message when no options |
| `noSearchResultsMessage` | `string` | `"No results found"` | Message when search yields no results |
| **Styling Overrides** | | | |
| `className` | `string` | `undefined` | Additional CSS classes for container |
| `triggerClassName` | `string` | `undefined` | CSS classes for trigger button |
| `dropdownClassName` | `string` | `undefined` | CSS classes for dropdown |
| `optionClassName` | `string` | `undefined` | CSS classes for options |
| `maxHeight` | `number` | `300` | Maximum height of dropdown in pixels |

### Badge Variants

The `badgeVariant` prop on options supports these variants:

| Variant | Description | Styling |
|---------|-------------|---------|
| `default` | Primary brand color | Blue theme colors |
| `secondary` | Muted appearance | Gray theme colors |
| `success` | Positive/success state | Green theme colors |
| `warning` | Warning/attention state | Yellow/orange theme colors |
| `error` | Error/danger state | Red theme colors |
| `outline` | Transparent with border | Border with theme colors |

### Selected Items Display Modes

When using multi-select, you can control how selected items are displayed:

| Mode | Description |
|------|-------------|
| `badges` | Show individual badges for each selected item (default) |
| `text` | Show selected items as comma-separated text |
| `count` | Show count of selected items (e.g., "3 items selected") |

### Keyboard Navigation

| Key | Action |
|-----|--------|
| `Arrow Down` | Move to next option |
| `Arrow Up` | Move to previous option |
| `Enter` | Select highlighted option |
| `Space` | Select highlighted option |
| `Escape` | Close dropdown |
| `Tab` | Move focus to next element |

### Accessibility Features

- **ARIA Compliance**: Full ARIA attributes for screen readers
- **Keyboard Navigation**: Complete keyboard support
- **Focus Management**: Proper focus handling and visual indicators
- **Screen Reader Support**: Descriptive labels and announcements
- **High Contrast**: Supports high contrast mode
- **Role Attributes**: Proper semantic roles for all elements

## Styling and Theming

theReactSelect uses Tailwind CSS and CSS variables for theming. The component is fully themeable and supports dark mode out of the box.

### CSS Variables Reference

The component uses these CSS variables for consistent theming:

```css
:root {
  /* Layout Colors */
  --background: 0 0% 100%;              /* Main background */
  --foreground: 222.2 84% 4.9%;         /* Main text color */
  --card: 0 0% 100%;                    /* Card backgrounds */
  --card-foreground: 222.2 84% 4.9%;    /* Card text */
  --popover: 0 0% 100%;                 /* Popover background */
  --popover-foreground: 222.2 84% 4.9%; /* Popover text */
  
  /* Brand Colors */
  --primary: 221.2 83.2% 53.3%;         /* Primary brand color */
  --primary-foreground: 210 40% 98%;    /* Primary text */
  --secondary: 210 40% 96%;             /* Secondary backgrounds */
  --secondary-foreground: 222.2 84% 4.9%; /* Secondary text */
  
  /* UI Colors */
  --muted: 210 40% 96%;                 /* Muted backgrounds */
  --muted-foreground: 215.4 16.3% 46.9%; /* Muted text */
  --accent: 210 40% 96%;                /* Accent backgrounds */
  --accent-foreground: 222.2 84% 4.9%;  /* Accent text */
  --destructive: 0 84.2% 60.2%;         /* Error/danger color */
  --destructive-foreground: 210 40% 98%; /* Error text */
  
  /* Borders and Inputs */
  --border: 214.3 31.8% 91.4%;         /* Border color */
  --input: 214.3 31.8% 91.4%;          /* Input border */
  --ring: 221.2 83.2% 53.3%;           /* Focus ring */
  --radius: 0.5rem;                     /* Border radius */
}

.dark {
  --background: 222.2 84% 4.9%;
  --foreground: 210 40% 98%;
  --card: 222.2 84% 4.9%;
  --card-foreground: 210 40% 98%;
  --popover: 222.2 84% 4.9%;
  --popover-foreground: 210 40% 98%;
  --primary: 217.2 91.2% 59.8%;
  --primary-foreground: 222.2 84% 4.9%;
  --secondary: 217.2 32.6% 17.5%;
  --secondary-foreground: 210 40% 98%;
  --muted: 217.2 32.6% 17.5%;
  --muted-foreground: 215 20.2% 65.1%;
  --accent: 217.2 32.6% 17.5%;
  --accent-foreground: 210 40% 98%;
  --destructive: 0 62.8% 30.6%;
  --destructive-foreground: 210 40% 98%;
  --border: 217.2 32.6% 17.5%;
  --input: 217.2 32.6% 17.5%;
  --ring: 224.3 76.3% 94.1%;
}
```

### Custom Styling

You can customize the appearance using the provided className props:

```tsx
<Select
  options={options}
  className="w-full max-w-md"           // Container styling
  triggerClassName="border-2"           // Trigger button styling  
  dropdownClassName="shadow-2xl"        // Dropdown styling
  optionClassName="hover:bg-blue-50"    // Individual option styling
/>
```

### Responsive Design

The component is fully responsive and works well on all screen sizes:

```tsx
<Select
  options={options}
  size="sm"                            // Smaller on mobile
  className="w-full sm:w-64 md:w-80"   // Responsive width
/>
```

## Performance

theReactSelect is optimized for performance with several built-in optimizations:

- **Debounced Search**: Search input is debounced to prevent excessive filtering
- **Minimal Re-renders**: Optimized state management to minimize unnecessary renders
- **Efficient Filtering**: Fast client-side filtering with memoization
- **Lightweight Bundle**: Small bundle size with tree-shaking support
- **Virtual Scrolling Ready**: Can be extended with virtual scrolling for large datasets

### Large Datasets

For very large datasets (1000+ options), consider:

```tsx
// Use search to filter options
<Select
  options={largeDataset}
  searchable
  maxHeight={200}
  placeholder="Search from 1000+ options..."
/>

// Or limit initial options and load more
const [visibleOptions, setVisibleOptions] = useState(options.slice(0, 100));
```

## Migration Guide

### From react-select

theReactSelect provides a similar API to react-select with some differences:

```tsx
// react-select
import Select from 'react-select';

<Select
  options={options}
  value={value}
  onChange={setValue}
  isMulti
  isSearchable
/>

// theReactSelect
import { Select } from 'thereactselect';

<Select
  options={options}
  value={value}
  onValueChange={setValue}
  multiple
  searchable
/>
```

### Key Differences

| Feature | react-select | theReactSelect |
|---------|--------------|-------------|
| Multi-select | `isMulti` | `multiple` |
| Search | `isSearchable` | `searchable` |
| Change handler | `onChange` | `onValueChange` |
| Clear | `isClearable` | `clearable` |
| Loading | `isLoading` | `loading` |
| Disabled | `isDisabled` | `disabled` |

## Troubleshooting

### Common Issues

#### Styling not appearing
Make sure you've included the required CSS variables in your global styles.

#### TypeScript errors
Ensure you're using the correct types:
```tsx
import { Select, SelectOption } from 'thereactselect';

const options: SelectOption[] = [
  { value: 'apple', label: 'Apple' }
];
```

#### Search not working
Ensure the `searchable` prop is set to `true`:
```tsx
<Select searchable options={options} />
```

#### Multi-select values not updating
Make sure you're using an array for multi-select values:
```tsx
const [values, setValues] = useState<(string | number)[]>([]);

<Select
  multiple
  value={values}
  onValueChange={setValues}
  options={options}
/>
```

## Browser Support

theReactSelect supports all modern browsers:

- Chrome 60+
- Firefox 60+
- Safari 12+
- Edge 79+

## Accessibility

theReactSelect is built with accessibility as a core principle:

### ARIA Support
- `role="combobox"` for the main trigger
- `role="listbox"` for the options container  
- `role="option"` for individual options
- `aria-expanded` to indicate dropdown state
- `aria-selected` for selected options
- `aria-disabled` for disabled options
- `aria-label` and `aria-labelledby` support

### Keyboard Navigation
| Key | Action |
|-----|--------|
| `Arrow Down` | Move to next option |
| `Arrow Up` | Move to previous option |
| `Enter` | Select highlighted option |
| `Space` | Select highlighted option |
| `Escape` | Close dropdown |
| `Tab` | Move focus to next element |
| `Home` | Jump to first option |
| `End` | Jump to last option |

### Screen Reader Support
- Descriptive announcements for state changes
- Clear labeling of all interactive elements
- Proper focus management
- Selection announcements

### Visual Accessibility
- High contrast mode support
- Clear focus indicators
- Sufficient color contrast ratios
- Scalable text and UI elements

### Implementation Tips
```tsx
// Always provide descriptive labels
<Select
  options={options}
  placeholder="Choose your preferred fruit"
  aria-label="Fruit selection"
/>

// Use proper labeling for forms
<label htmlFor="fruit-select">Favorite Fruit</label>
<Select
  id="fruit-select"
  options={options}
/>
```

## Contributing

We welcome contributions! Please see our contributing guidelines:

### Development Setup

```bash
# Clone the repository
git clone https://github.com/themrsami/thereactselect.git
cd thereactselect

# Install dependencies
npm install

# Start development server
npm run dev

# Build the library
npm run build:lib

# Run tests
npm test
```

### Contribution Guidelines

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **Make** your changes
4. **Add** tests for new functionality
5. **Ensure** all tests pass
6. **Update** documentation if needed
7. **Commit** your changes (`git commit -m 'Add amazing feature'`)
8. **Push** to the branch (`git push origin feature/amazing-feature`)
9. **Open** a Pull Request

### Code Style

- Use TypeScript for all new code
- Follow existing code formatting
- Add JSDoc comments for public APIs
- Include tests for new features
- Update documentation as needed

### Reporting Issues

When reporting issues, please include:
- Clear description of the problem
- Steps to reproduce
- Expected vs actual behavior
- Browser and version information
- Code examples if applicable

## Links

- 🌐 **[Live Demo & Playground](https://thereactselect.vercel.app)** - Interactive examples and configuration
- 📦 **[NPM Package](https://www.npmjs.com/package/thereactselect)** - Install and usage
- 📚 **[GitHub Repository](https://github.com/themrsami/thereactselect)** - Source code and issues
- 🎮 **[Interactive Playground](https://thereactselect.vercel.app/playground)** - Test all features
- 📖 **[Documentation](https://thereactselect.vercel.app#api-reference)** - Complete API reference

## License

MIT © [Usama](https://github.com/themrsami)

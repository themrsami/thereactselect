"use client";

import { useState } from "react";
import { useTheme } from "next-themes";
import { Sun, Moon, Github, Star, Zap, Heart, Code, Search, CheckCircle2, Palette, Settings } from "lucide-react";
import { Select } from "../lib";
import type { SelectOption } from "../lib";
import { cn } from "../lib/utils";
import { ExampleCard } from "../components/ui/example-card";
import { CodeBlock } from "../components/ui/code-block";

function GradientText({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <span className={`${className}`}>
      {children}
    </span>
  );
}

// Sample data
const fruits = [
  { value: "apple", label: "Apple", description: "A sweet red fruit" },
  { value: "banana", label: "Banana", description: "A yellow tropical fruit" },
  { value: "orange", label: "Orange", description: "A citrus fruit" },
  { value: "grape", label: "Grape", description: "Small purple fruits" },
  { value: "strawberry", label: "Strawberry", description: "A red berry" },
  { value: "watermelon", label: "Watermelon", description: "A large green fruit" },
  { value: "pineapple", label: "Pineapple", description: "A tropical fruit" },
  { value: "mango", label: "Mango", description: "A sweet tropical fruit" },
];

const countries = [
  { value: "us", label: "United States", description: "North America" },
  { value: "uk", label: "United Kingdom", description: "Europe" },
  { value: "ca", label: "Canada", description: "North America" },
  { value: "de", label: "Germany", description: "Europe" },
  { value: "fr", label: "France", description: "Europe" },
  { value: "jp", label: "Japan", description: "Asia" },
  { value: "au", label: "Australia", description: "Oceania" },
  { value: "br", label: "Brazil", description: "South America" },
  { value: "in", label: "India", description: "Asia" },
  { value: "cn", label: "China", description: "Asia" },
];

const frameworks = [
  { value: "react", label: "React", icon: Code, description: "A JavaScript library for building user interfaces" },
  { value: "vue", label: "Vue.js", icon: Code, description: "Progressive JavaScript framework" },
  { value: "angular", label: "Angular", icon: Code, description: "Platform for building mobile and desktop apps" },
  { value: "svelte", label: "Svelte", icon: Code, description: "Cybernetically enhanced web apps" },
  { value: "solid", label: "SolidJS", icon: Code, description: "Simple and performant reactivity" },
];

const groupedOptions = [
  {
    label: "Fruits",
    options: [
      { value: "apple", label: "Apple" },
      { value: "banana", label: "Banana" },
      { value: "orange", label: "Orange" },
    ]
  },
  {
    label: "Vegetables",
    options: [
      { value: "carrot", label: "Carrot" },
      { value: "broccoli", label: "Broccoli" },
      { value: "spinach", label: "Spinach" },
    ]
  }
];

const sizes = [
  { value: "sm", label: "Small" },
  { value: "default", label: "Default" },
  { value: "lg", label: "Large" },
  { value: "xl", label: "Extra Large" },
];

const variants = [
  { value: "default", label: "Default" },
  { value: "outline", label: "Outline" },
  { value: "ghost", label: "Ghost" },
  { value: "filled", label: "Filled" },
];

const numberedOptions = [
  { value: "first", label: "First Option", number: 1 },
  { value: "second", label: "Second Option", number: 2 },
  { value: "third", label: "Third Option", number: 3 },
  { value: "fourth", label: "Fourth Option", number: 4 },
];

function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="relative p-2 rounded-md border border-border bg-background hover:bg-accent transition-colors flex items-center justify-center"
    >
      <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
    </button>
  );
}

function APITable() {
  const apiData = [
    // Basic Props
    { prop: "options", type: "SelectOption[]", description: "Array of options to display in the dropdown" },
    { prop: "groups", type: "SelectGroup[]", description: "Array of grouped options (alternative to options)" },
    { prop: "value", type: "string | number | (string | number)[]", description: "Currently selected value(s)" },
    { prop: "defaultValue", type: "string | number | (string | number)[]", description: "Default selected value(s)" },
    { prop: "placeholder", type: "string", default: "Select...", description: "Placeholder text when no option is selected" },
    { prop: "multiple", type: "boolean", default: "false", description: "Enable multiple selection mode" },
    { prop: "selectAll", type: "boolean", default: "false", description: "Show select all option in multi-select mode" },
    { prop: "selectAllLabel", type: "string", default: '"Select All"', description: "Label text for the select all option" },
    { prop: "disabled", type: "boolean", default: "false", description: "Disable the entire select component" },
    { prop: "required", type: "boolean", default: "false", description: "Mark the field as required" },
    
    // Visual States
    { prop: "error", type: "boolean", default: "false", description: "Show error state styling" },
    { prop: "success", type: "boolean", default: "false", description: "Show success state styling" },
    { prop: "loading", type: "boolean", default: "false", description: "Show loading state with spinner" },
    
    // Styling Variants
    { prop: "variant", type: '"default" | "outline" | "ghost" | "filled"', default: '"default"', description: "Visual variant of the select component" },
    { prop: "size", type: '"default" | "sm" | "lg" | "xl"', default: '"default"', description: "Size variant of the select component" },
    
    // Search & Interaction
    { prop: "searchable", type: "boolean", default: "false", description: "Enable search/filter functionality" },
    { prop: "searchPlaceholder", type: "string", default: '"Search..."', description: "Placeholder text for search input" },
    { prop: "clearable", type: "boolean", default: "false", description: "Show clear button to reset selection" },
    { prop: "closeOnSelect", type: "boolean", default: "true", description: "Close dropdown after selecting an option" },
    
    // Dropdown Behavior
    { prop: "scrollable", type: "boolean", default: "true", description: "Enable scrolling in dropdown when content exceeds maxHeight" },
    { prop: "maxHeight", type: "number", default: "300", description: "Maximum height of dropdown in pixels (only applies when scrollable is true)" },
    
    // Multi-Select Display
    { prop: "selectedItemsDisplay", type: '"badges" | "text" | "count"', default: '"badges"', description: "How to display selected items in multi-select mode" },
    { prop: "showItemClearButtons", type: "boolean", default: "true", description: "Show individual clear buttons on selected item badges" },
    { prop: "maxSelectedItemsToShow", type: "number", default: "3", description: "Maximum number of selected items to show before showing count" },
    
    // Option Features
    { prop: "numbered", type: "boolean", default: "false", description: "Show numbers next to each option" },
    { prop: "showBadges", type: "boolean", default: "false", description: "Show badges on options (if option has badge property)" },
    { prop: "showIcons", type: "boolean", default: "false", description: "Show icons on options (if option has icon property)" },
    { prop: "showDescriptions", type: "boolean", default: "false", description: "Show descriptions on options (if option has description property)" },
    
    // Event Handlers
    { prop: "onValueChange", type: "(value: any) => void", description: "Callback when selection changes" },
    { prop: "onSearchChange", type: "(search: string) => void", description: "Callback when search input changes" },
    { prop: "onOpenChange", type: "(open: boolean) => void", description: "Callback when dropdown open state changes" },
    { prop: "onOptionSelect", type: "(option: SelectOption) => void", description: "Callback when an option is selected" },
    { prop: "onClear", type: "() => void", description: "Callback when selection is cleared" },
  ];

  return (
    <div className="rounded-lg border border-border overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted/50">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-semibold">Property</th>
              <th className="px-4 py-3 text-left text-sm font-semibold">Type</th>
              <th className="px-4 py-3 text-left text-sm font-semibold">Default</th>
              <th className="px-4 py-3 text-left text-sm font-semibold">Description</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {apiData.map((item, index) => (
              <tr key={index} className="hover:bg-muted/25">
                <td className="px-4 py-3">
                  <code className="text-sm font-mono bg-muted px-1.5 py-0.5 rounded">
                    {item.prop}
                  </code>
                </td>
                <td className="px-4 py-3">
                  <code className="text-sm font-mono text-muted-foreground">
                    {item.type}
                  </code>
                </td>
                <td className="px-4 py-3">
                  {(item as any).default ? (
                    <code className="text-sm font-mono text-muted-foreground">
                      {(item as any).default}
                    </code>
                  ) : (
                    <span className="text-muted-foreground">-</span>
                  )}
                </td>
                <td className="px-4 py-3 text-sm">
                  {item.description}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default function Home() {
  const [basicValue, setBasicValue] = useState<string | number | undefined>();
  const [multiValue, setMultiValue] = useState<(string | number)[]>([]);
  const [selectAllValue, setSelectAllValue] = useState<(string | number)[]>([]);
  const [searchableValue, setSearchableValue] = useState<string | number | undefined>();
  const [clearableValue, setClearableValue] = useState<string | number | undefined>("apple");
  const [cssFileTab, setCssFileTab] = useState<"globals" | "index">("globals");
  const [packageManagerTab, setPackageManagerTab] = useState<"npm" | "pnpm" | "yarn" | "bun">("npm");

  const examples = [
    {
      title: "Basic Select",
      description: "Simple single selection with clean styling",
      preview: (
        <Select
          options={fruits.slice(0, 5)}
          placeholder="Select a fruit..."
          onValueChange={setBasicValue}
          value={basicValue}
        />
      ),
      code: `import { Select } from 'thereactselect';
import { useState } from 'react';

const fruits = [
  { value: "apple", label: "Apple", description: "A sweet red fruit" },
  { value: "banana", label: "Banana", description: "A yellow tropical fruit" },
  { value: "orange", label: "Orange", description: "A citrus fruit" },
  { value: "grape", label: "Grape", description: "Small purple fruits" },
  { value: "strawberry", label: "Strawberry", description: "A red berry" },
  { value: "watermelon", label: "Watermelon", description: "A large green fruit" },
];

function BasicExample() {
  const [value, setValue] = useState();
  
  return (
    <Select
      options={fruits}
      placeholder="Select a fruit..."
      onValueChange={setValue}
      value={value}
    />
  );
}`
    },
    {
      title: "Multi Select",
      description: "Select multiple options with visual indicators",
      preview: (
        <Select
          options={fruits.slice(0, 5)}
          placeholder="Select fruits..."
          multiple
          onValueChange={setMultiValue}
          value={multiValue}
        />
      ),
      code: `import { Select } from 'thereactselect';
import { useState } from 'react';

const fruits = [
  { value: "apple", label: "Apple", description: "A sweet red fruit" },
  { value: "banana", label: "Banana", description: "A yellow tropical fruit" },
  { value: "orange", label: "Orange", description: "A citrus fruit" },
  { value: "grape", label: "Grape", description: "Small purple fruits" },
  { value: "strawberry", label: "Strawberry", description: "A red berry" },
  { value: "watermelon", label: "Watermelon", description: "A large green fruit" },
];

function MultiSelectExample() {
  const [values, setValues] = useState([]);
  
  return (
    <Select
      options={fruits}
      placeholder="Select fruits..."
      multiple
      onValueChange={setValues}
      value={values}
    />
  );
}`
    },
    {
      title: "Multi Select with Select All",
      description: "Multi-select with convenient select all option",
      preview: (
        <Select
          options={fruits.slice(0, 6)}
          placeholder="Select fruits..."
          multiple
          selectAll
          selectAllLabel="Select All Fruits"
          clearable
          onValueChange={setSelectAllValue}
          value={selectAllValue}
        />
      ),
      code: `import { Select } from 'thereactselect';
import { useState } from 'react';

const fruits = [
  { value: "apple", label: "Apple", description: "A sweet red fruit" },
  { value: "banana", label: "Banana", description: "A yellow tropical fruit" },
  { value: "orange", label: "Orange", description: "A citrus fruit" },
  { value: "grape", label: "Grape", description: "Small purple fruits" },
  { value: "strawberry", label: "Strawberry", description: "A red berry" },
  { value: "watermelon", label: "Watermelon", description: "A large green fruit" },
];

function SelectAllExample() {
  const [values, setValues] = useState([]);
  
  return (
    <Select
      options={fruits}
      placeholder="Select fruits..."
      multiple
      selectAll
      selectAllLabel="Select All Fruits"
      clearable
      onValueChange={setValues}
      value={values}
    />
  );
}`
    },
    {
      title: "Searchable Select",
      description: "Type to filter through options quickly",
      preview: (
        <Select
          options={countries}
          placeholder="Search countries..."
          searchable
          searchPlaceholder="Type to search..."
          onValueChange={setSearchableValue}
          value={searchableValue}
        />
      ),
      code: `import { Select } from 'thereactselect';
import { useState } from 'react';

const countries = [
  { value: "us", label: "United States", description: "North America" },
  { value: "uk", label: "United Kingdom", description: "Europe" },
  { value: "ca", label: "Canada", description: "North America" },
  { value: "de", label: "Germany", description: "Europe" },
  { value: "fr", label: "France", description: "Europe" },
  { value: "jp", label: "Japan", description: "Asia" },
  { value: "au", label: "Australia", description: "Oceania" },
  { value: "br", label: "Brazil", description: "South America" },
];

function SearchableExample() {
  const [value, setValue] = useState();
  
  return (
    <Select
      options={countries}
      placeholder="Search countries..."
      searchable
      searchPlaceholder="Type to search..."
      onValueChange={setValue}
      value={value}
    />
  );
}`
    },
    {
      title: "Clearable Select",
      description: "Easy to clear selection with clear button",
      preview: (
        <Select
          options={fruits.slice(0, 5)}
          placeholder="Select a fruit..."
          clearable
          onValueChange={setClearableValue}
          value={clearableValue}
        />
      ),
      code: `import { Select } from 'thereactselect';
import { useState } from 'react';

const fruits = [
  { value: "apple", label: "Apple", description: "A sweet red fruit" },
  { value: "banana", label: "Banana", description: "A yellow tropical fruit" },
  { value: "orange", label: "Orange", description: "A citrus fruit" },
  { value: "grape", label: "Grape", description: "Small purple fruits" },
  { value: "strawberry", label: "Strawberry", description: "A red berry" },
];

function ClearableExample() {
  const [value, setValue] = useState("apple");
  
  return (
    <Select
      options={fruits}
      placeholder="Select a fruit..."
      clearable
      onValueChange={setValue}
      value={value}
    />
  );
}`
    },
    {
      title: "With Icons & Descriptions",
      description: "Rich options with custom icons and descriptions",
      preview: (
        <Select
          options={frameworks}
          placeholder="Choose framework..."
          searchable
          showDescriptions
          showIcons
        />
      ),
      code: `import { Select } from 'thereactselect';
import { Code, Zap, Globe, Layers } from 'lucide-react';

const frameworks = [
  { 
    value: "react", 
    label: "React", 
    icon: Code, 
    description: "A JavaScript library for building user interfaces" 
  },
  { 
    value: "vue", 
    label: "Vue.js", 
    icon: Layers, 
    description: "The Progressive JavaScript Framework" 
  },
  { 
    value: "angular", 
    label: "Angular", 
    icon: Globe, 
    description: "Platform for building mobile and desktop web applications" 
  },
  { 
    value: "svelte", 
    label: "Svelte", 
    icon: Zap, 
    description: "Cybernetically enhanced web apps" 
  }
];

function IconExample() {
  const [value, setValue] = useState();
  
  return (
    <Select
      options={frameworks}
      placeholder="Choose framework..."
      searchable
      showDescriptions
      showIcons
      onValueChange={setValue}
      value={value}
    />
  );
}`
    },
    {
      title: "Different Sizes",
      description: "Various sizes to fit your design needs",
      preview: (
        <div className="space-y-3 w-full">
          <Select options={sizes} placeholder="Small size" size="sm" />
          <Select options={sizes} placeholder="Default size" size="default" />
          <Select options={sizes} placeholder="Large size" size="lg" />
          <Select options={sizes} placeholder="Extra large size" size="xl" />
        </div>
      ),
      code: `import { Select } from 'thereactselect';

const options = [
  { value: "option1", label: "Option 1" },
  { value: "option2", label: "Option 2" },
  { value: "option3", label: "Option 3" },
];

function SizeExample() {
  return (
    <div className="space-y-3">
      <Select options={options} size="sm" placeholder="Small" />
      <Select options={options} size="default" placeholder="Default" />
      <Select options={options} size="lg" placeholder="Large" />
      <Select options={options} size="xl" placeholder="Extra Large" />
    </div>
  );
}`
    },
    {
      title: "Different Variants",
      description: "Various styling variants for different use cases",
      preview: (
        <div className="space-y-3 w-full">
          <Select options={variants} placeholder="Default variant" variant="default" />
          <Select options={variants} placeholder="Outline variant" variant="outline" />
          <Select options={variants} placeholder="Ghost variant" variant="ghost" />
          <Select options={variants} placeholder="Filled variant" variant="filled" />
        </div>
      ),
      code: `import { Select } from 'thereactselect';

const options = [
  { value: "option1", label: "Option 1" },
  { value: "option2", label: "Option 2" },
  { value: "option3", label: "Option 3" },
];

function VariantExample() {
  return (
    <div className="space-y-3">
      <Select options={options} variant="default" placeholder="Default" />
      <Select options={options} variant="outline" placeholder="Outline" />
      <Select options={options} variant="ghost" placeholder="Ghost" />
      <Select options={options} variant="filled" placeholder="Filled" />
    </div>
  );
}`
    },
    {
      title: "States",
      description: "Error and success states for form validation",
      preview: (
        <div className="space-y-3 w-full">
          <Select options={fruits.slice(0, 3)} placeholder="Normal state" />
          <Select options={fruits.slice(0, 3)} placeholder="Error state" error />
          <Select options={fruits.slice(0, 3)} placeholder="Success state" success />
          <Select options={fruits.slice(0, 3)} placeholder="Loading state" loading />
          <Select options={fruits.slice(0, 3)} placeholder="Disabled state" disabled />
        </div>
      ),
      code: `import { Select } from 'thereactselect';

const options = [
  { value: "option1", label: "Option 1" },
  { value: "option2", label: "Option 2" },
  { value: "option3", label: "Option 3" },
];

function StateExample() {
  return (
    <div className="space-y-3">
      <Select options={options} placeholder="Normal state" />
      <Select options={options} placeholder="Error state" error />
      <Select options={options} placeholder="Success state" success />
      <Select options={options} placeholder="Loading state" loading />
      <Select options={options} placeholder="Disabled state" disabled />
    </div>
  );
}`
    },
    {
      title: "Grouped Options",
      description: "Organize options into logical groups",
      preview: (
        <div className="w-full">
          <Select 
            groups={groupedOptions} 
            placeholder="Select from groups..." 
            searchable 
            showGroupHeaders
            groupDividers
          />
        </div>
      ),
      code: `import { Select } from 'thereactselect';

const groupedOptions = [
  {
    label: "Fruits",
    options: [
      { value: "apple", label: "Apple" },
      { value: "banana", label: "Banana" },
      { value: "orange", label: "Orange" },
    ]
  },
  {
    label: "Vegetables",
    options: [
      { value: "carrot", label: "Carrot" },
      { value: "broccoli", label: "Broccoli" },
      { value: "spinach", label: "Spinach" },
    ]
  }
];

function GroupedExample() {
  const [value, setValue] = useState();
  
  return (
    <Select 
      groups={groupedOptions} 
      placeholder="Select from groups..." 
      searchable 
      showGroupHeaders
      groupDividers
      onValueChange={setValue}
      value={value}
    />
  );
}`
    },
    {
      title: "Numbered Options",
      description: "Display numbers next to each option",
      preview: (
        <div className="w-full">
          <Select 
            options={numberedOptions} 
            placeholder="Choose a numbered option..." 
            numbered
          />
        </div>
      ),
      code: `import { Select } from 'thereactselect';
import { useState } from 'react';

const numberedOptions = [
  { value: "first", label: "First Option", number: 1 },
  { value: "second", label: "Second Option", number: 2 },
  { value: "third", label: "Third Option", number: 3 },
  { value: "fourth", label: "Fourth Option", number: 4 },
  { value: "fifth", label: "Fifth Option", number: 5 },
];

function NumberedExample() {
  const [value, setValue] = useState();
  
  return (
    <Select 
      options={numberedOptions} 
      placeholder="Choose a numbered option..." 
      numbered
      onValueChange={setValue}
      value={value}
    />
  );
}`
    },
    {
      title: "Scrollable Dropdown",
      description: "Control dropdown height with scrollable and maxHeight props",
      preview: (
        <div className="w-full space-y-3">
          <Select 
            options={[
              { value: "1", label: "Item 1", description: "First item" },
              { value: "2", label: "Item 2", description: "Second item" },
              { value: "3", label: "Item 3", description: "Third item" },
              { value: "4", label: "Item 4", description: "Fourth item" },
              { value: "5", label: "Item 5", description: "Fifth item" },
              { value: "6", label: "Item 6", description: "Sixth item" },
              { value: "7", label: "Item 7", description: "Seventh item" },
              { value: "8", label: "Item 8", description: "Eighth item" },
              { value: "9", label: "Item 9", description: "Ninth item" },
              { value: "10", label: "Item 10", description: "Tenth item" },
            ]}
            placeholder="Default scrollable (300px max)..." 
            searchable
            showDescriptions
            scrollable
            maxHeight={300}
          />
          <Select 
            options={[
              { value: "1", label: "Item 1" },
              { value: "2", label: "Item 2" },
              { value: "3", label: "Item 3" },
              { value: "4", label: "Item 4" },
              { value: "5", label: "Item 5" },
            ]}
            placeholder="No scrolling (shows all)..." 
            scrollable={false}
          />
        </div>
      ),
      code: `import { Select } from 'thereactselect';
import { useState } from 'react';

const manyOptions = [
  { value: "1", label: "Item 1", description: "First item" },
  { value: "2", label: "Item 2", description: "Second item" },
  { value: "3", label: "Item 3", description: "Third item" },
  { value: "4", label: "Item 4", description: "Fourth item" },
  { value: "5", label: "Item 5", description: "Fifth item" },
  { value: "6", label: "Item 6", description: "Sixth item" },
  { value: "7", label: "Item 7", description: "Seventh item" },
  { value: "8", label: "Item 8", description: "Eighth item" },
  { value: "9", label: "Item 9", description: "Ninth item" },
  { value: "10", label: "Item 10", description: "Tenth item" },
];

function ScrollableExample() {
  const [value, setValue] = useState();
  
  return (
    <>
      {/* Default scrollable (300px max height) */}
      <Select 
        options={manyOptions} 
        placeholder="Default scrollable..." 
        searchable
        showDescriptions
        onValueChange={setValue}
        value={value}
      />
      
      {/* Custom max height */}
      <Select 
        options={manyOptions} 
        placeholder="Custom height (500px)..." 
        searchable
        scrollable
        maxHeight={500}
        onValueChange={setValue}
        value={value}
      />
      
      {/* Disable scrolling */}
      <Select 
        options={options} 
        placeholder="No scrolling..." 
        scrollable={false}
        onValueChange={setValue}
        value={value}
      />
    </>
  );
}`
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-40 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container max-w-7xl mx-auto flex h-14 items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <div className="relative">
              <Zap className="h-6 w-6 text-primary" />
              <div className="absolute inset-0 h-6 w-6 bg-gradient-to-r from-gray-400 via-gray-600 to-gray-800 opacity-10 blur-sm rounded-full dark:from-white dark:via-gray-100 dark:to-gray-300 dark:opacity-30"></div>
            </div>
            <span className="text-xl font-bold">
              <GradientText>
                theReactSelect
              </GradientText>
            </span>
          </div>
          
          <div className="flex items-center gap-2">
            <a
              href="https://github.com/themrsami/thereactselect"
              className="p-2 rounded-md border border-border bg-background hover:bg-accent transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github className="h-4 w-4" />
            </a>
            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container max-w-5xl mx-auto px-4 py-16 text-center">
        <div className="space-y-6">
          <div className="space-y-2">
            <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
              <GradientText>
                Beautiful Select Components
              </GradientText>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Lightning-fast, elegantly designed select components for React. 
              Built with TypeScript, Tailwind CSS, and modern best practices.
            </p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Zap className="h-4 w-4 text-primary" />
              Lightning Fast
            </div>
            <div className="flex items-center gap-2">
              <Heart className="h-4 w-4 text-red-500" />
              Beautiful Design
            </div>
            <div className="flex items-center gap-2">
              <Star className="h-4 w-4 text-yellow-500" />
              TypeScript Ready
            </div>
            <div className="flex items-center gap-2">
              <Search className="h-4 w-4 text-primary" />
              Searchable
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-green-500" />
              Accessible
            </div>
            <div className="flex items-center gap-2">
              <Palette className="h-4 w-4 text-purple-500" />
              Customizable
            </div>
          </div>

          {/* Quick Demo */}
          <div className="max-w-sm mx-auto">
            <Select
              options={fruits.slice(0, 6)}
              placeholder="Try me out!"
              searchable
              clearable
              onValueChange={setBasicValue}
              value={basicValue}
              size="lg"
            />
          </div>

          {/* Playground Link */}
          <div className="text-center">
            <p className="text-muted-foreground mb-4">
              Wanna build your own version?
            </p>
            <a
              href="/playground"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-colors text-sm font-medium"
            >
              <Settings className="h-4 w-4" />
              Go to playground
            </a>
          </div>

          {/* Quick Start */}
          <div className="max-w-2xl mx-auto space-y-8">
            <h3 className="text-2xl font-semibold mb-6">Quick Start Guide</h3>
            
            {/* Step 1: Installation */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <div className="flex items-center justify-center w-6 h-6 rounded-full bg-primary text-primary-foreground text-sm font-bold">1</div>
                <h4 className="text-base font-semibold">Install the package</h4>
              </div>
              
              {/* Package Manager Tabs */}
              <div className="flex border border-border rounded-lg mb-3 p-1 bg-muted">
                {(["npm", "pnpm", "yarn", "bun"] as const).map((manager) => (
                  <button
                    key={manager}
                    className={cn(
                      "flex-1 px-3 py-1.5 text-sm font-medium rounded-md transition-colors",
                      packageManagerTab === manager
                        ? "bg-background text-foreground shadow-sm"
                        : "text-muted-foreground hover:text-foreground"
                    )}
                    onClick={() => setPackageManagerTab(manager)}
                  >
                    {manager}
                  </button>
                ))}
              </div>
              
              {/* Installation Commands */}
              <CodeBlock 
                code={
                  packageManagerTab === "npm" ? "npm install thereactselect" :
                  packageManagerTab === "pnpm" ? "pnpm add thereactselect" :
                  packageManagerTab === "yarn" ? "yarn add thereactselect" :
                  "bun add thereactselect"
                }
                language="bash"
              />
            </div>

            {/* Step 2: CSS Setup */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <div className="flex items-center justify-center w-6 h-6 rounded-full bg-primary text-primary-foreground text-sm font-bold">2</div>
                <h4 className="text-base font-semibold">Setup CSS Variables</h4>
              </div>
              <p className="text-sm text-muted-foreground ml-8">
                Add the required CSS variables to your project. Choose the setup based on your Tailwind CSS version:
              </p>
              
              {/* CSS File Tabs */}
              <div className="flex space-x-2 ml-8">
                <button
                  onClick={() => setCssFileTab('globals')}
                  className={cn(
                    "px-3 py-1.5 text-sm font-medium rounded border transition-colors",
                    cssFileTab === 'globals'
                      ? "bg-primary text-primary-foreground border-primary"
                      : "bg-background text-foreground border-border hover:bg-accent"
                  )}
                >
                  Tailwind CSS v4
                </button>
                <button
                  onClick={() => setCssFileTab('index')}
                  className={cn(
                    "px-3 py-1.5 text-sm font-medium rounded border transition-colors",
                    cssFileTab === 'index'
                      ? "bg-primary text-primary-foreground border-primary"
                      : "bg-background text-foreground border-border hover:bg-accent"
                  )}
                >
                  Tailwind CSS v3
                </button>
              </div>
              
              {/* CSS Content */}
              <div className="ml-8">
                {cssFileTab === 'globals' && (
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">
                      For <strong>Next.js</strong> or <strong>Vite</strong> with Tailwind CSS v4, add to your <code className="px-1 py-0.5 rounded bg-muted">app/globals.css</code> or <code className="px-1 py-0.5 rounded bg-muted">src/index.css</code>:
                    </p>
                    <CodeBlock
                      code={`@import 'tailwindcss';

@theme inline {
  --color-background: 0 0% 100%;
  --color-foreground: 222.2 84% 4.9%;
  --color-card: 0 0% 100%;
  --color-card-foreground: 222.2 84% 4.9%;
  --color-popover: 0 0% 100%;
  --color-popover-foreground: 222.2 84% 4.9%;
  --color-primary: 221.2 83.2% 53.3%;
  --color-primary-foreground: 210 40% 98%;
  --color-secondary: 210 40% 96%;
  --color-secondary-foreground: 222.2 84% 4.9%;
  --color-muted: 210 40% 96%;
  --color-muted-foreground: 215.4 16.3% 46.9%;
  --color-accent: 210 40% 96%;
  --color-accent-foreground: 222.2 84% 4.9%;
  --color-destructive: 0 84.2% 60.2%;
  --color-destructive-foreground: 210 40% 98%;
  --color-border: 214.3 31.8% 91.4%;
  --color-input: 214.3 31.8% 91.4%;
  --color-ring: 221.2 83.2% 53.3%;
  --radius: 0.5rem;
}

.dark {
  @theme inline {
    --color-background: 222.2 84% 4.9%;
    --color-foreground: 210 40% 98%;
    --color-card: 222.2 84% 4.9%;
    --color-card-foreground: 210 40% 98%;
    --color-popover: 222.2 84% 4.9%;
    --color-popover-foreground: 210 40% 98%;
    --color-primary: 217.2 91.2% 59.8%;
    --color-primary-foreground: 222.2 84% 4.9%;
    --color-secondary: 217.2 32.6% 17.5%;
    --color-secondary-foreground: 210 40% 98%;
    --color-muted: 217.2 32.6% 17.5%;
    --color-muted-foreground: 215 20.2% 65.1%;
    --color-accent: 217.2 32.6% 17.5%;
    --color-accent-foreground: 210 40% 98%;
    --color-destructive: 0 62.8% 30.6%;
    --color-destructive-foreground: 210 40% 98%;
    --color-border: 217.2 32.6% 17.5%;
    --color-input: 217.2 32.6% 17.5%;
    --color-ring: 224.3 76.3% 94.1%;
  }
}`}
                      language="css"
                    />
                  </div>
                )}
                
                {cssFileTab === 'index' && (
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">
                      For <strong>Create React App</strong> or traditional setup with Tailwind CSS v3, add to your <code className="px-1 py-0.5 rounded bg-muted">src/index.css</code>:
                    </p>
                    <CodeBlock
                      code={`@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
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
}

* {
  border-color: hsl(var(--border));
}

body {
  background-color: hsl(var(--background));
  color: hsl(var(--foreground));
}`}
                      language="css"
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Step 3: Usage Example */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <div className="flex items-center justify-center w-6 h-6 rounded-full bg-primary text-primary-foreground text-sm font-bold">3</div>
                <h4 className="text-base font-semibold">Use the component</h4>
              </div>
              
              <div className="ml-8">
                <CodeBlock 
                  code={`import { Select } from 'thereactselect';
import { useState } from 'react';

const options = [
  { value: "apple", label: "Apple", description: "A sweet red fruit" },
  { value: "banana", label: "Banana", description: "A yellow tropical fruit" },
  { value: "orange", label: "Orange", description: "A citrus fruit" },
];

function MyComponent() {
  const [value, setValue] = useState();

  return (
    <Select
      options={options}
      placeholder="Select a fruit..."
      searchable
      clearable
      onValueChange={setValue}
      value={value}
    />
  );
}`}
                  language="tsx"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Examples Grid */}
      <section className="container max-w-7xl mx-auto px-4 pb-16">
        <div className="mb-8">
          <h2 className="text-3xl font-bold tracking-tight mb-2">Examples</h2>
          <p className="text-muted-foreground">Explore different variations and use cases</p>
        </div>
        
        <div className="grid gap-6 lg:grid-cols-2">
          {examples.map((example, index) => (
            <ExampleCard
              key={index}
              title={example.title}
              description={example.description}
              preview={example.preview}
              code={example.code}
            />
          ))}
        </div>
      </section>

      {/* API Reference */}
      <section className="container max-w-7xl mx-auto px-4 pb-16">
        <div className="mb-8">
          <h2 className="text-3xl font-bold tracking-tight mb-2">API Reference</h2>
          <p className="text-muted-foreground">Complete props and configuration options</p>
        </div>
        
        <div className="space-y-6">
          <APITable />
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-muted/50">
        <div className="container max-w-7xl mx-auto px-4 py-8 text-center text-sm text-muted-foreground">
          <p>Built with ❤️ using Next.js, TypeScript, and Tailwind CSS</p>
          <p className="mt-2">theReactSelect - Lightning-fast, beautiful select components for React</p>
        </div>
      </footer>
    </div>
  );
}

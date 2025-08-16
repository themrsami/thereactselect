"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { useTheme } from "next-themes";
import { Sun, Moon, Github, Home, Copy, Check, RefreshCw, Zap } from "lucide-react";
import { Select } from "../../lib";
import type { SelectOption } from "../../lib";
import { CodeBlock } from "../../components/ui/code-block";
import { StyledInput } from "../../components/ui/styled-input";
import { StyledCheckbox } from "../../components/ui/styled-checkbox";

interface PlaygroundState {
  variant: "default" | "outline" | "ghost" | "filled";
  size: "default" | "sm" | "lg" | "xl";
  multiple: boolean;
  searchable: boolean;
  clearable: boolean;
  disabled: boolean;
  error: boolean;
  success: boolean;
  loading: boolean;
  numbered: boolean;
  selectedItemsDisplay: "badges" | "text" | "count";
  showItemClearButtons: boolean;
  maxSelectedItemsToShow: number;
  showBadges: boolean;
  badgeVariant: "default" | "secondary" | "success" | "warning" | "error" | "outline";
  showIcons: boolean;
  showDescriptions: boolean;
  useGroups: boolean;
  selectAll: boolean;
  selectAllLabel: string;
  placeholder: string;
  noOptionsMessage: string;
  searchPlaceholder: string;
}

// Sample data with badges, icons, and descriptions available
const richSampleOptions = [
  { 
    value: "apple", 
    label: "Apple",
    description: "A sweet red fruit",
    badge: "Popular",
    badgeVariant: "success" as const,
    icon: Zap
  },
  { 
    value: "banana", 
    label: "Banana",
    description: "A yellow tropical fruit", 
    badge: "Healthy",
    badgeVariant: "default" as const,
    icon: Sun
  },
  { 
    value: "orange", 
    label: "Orange",
    description: "A citrus fruit",
    badge: "Vitamin C",
    badgeVariant: "warning" as const,
    icon: Moon
  },
  { 
    value: "grape", 
    label: "Grape",
    description: "Small purple fruits",
    badge: "Antioxidants", 
    badgeVariant: "secondary" as const,
    icon: Github
  },
  { 
    value: "strawberry", 
    label: "Strawberry",
    description: "A red berry",
    badge: "Seasonal",
    badgeVariant: "error" as const,
    icon: Home
  },
  { 
    value: "watermelon", 
    label: "Watermelon",
    description: "A large green fruit",
    badge: "Hydrating",
    badgeVariant: "outline" as const,
    icon: RefreshCw
  },
];

// Default simple options (used by default)
const sampleOptions = [
  { value: "apple", label: "Apple" },
  { value: "banana", label: "Banana" },
  { value: "orange", label: "Orange" },
  { value: "grape", label: "Grape" },
  { value: "strawberry", label: "Strawberry" },
  { value: "watermelon", label: "Watermelon" },
];

const groupedSampleOptions = [
  {
    label: "Fruits",
    options: [
      { value: "apple", label: "Apple", description: "A sweet red fruit", badge: "Popular", icon: Zap },
      { value: "banana", label: "Banana", description: "A yellow tropical fruit", badge: "Healthy", icon: Sun },
      { value: "orange", label: "Orange", description: "A citrus fruit", badge: "Vitamin C", icon: Moon },
    ]
  },
  {
    label: "Vegetables", 
    options: [
      { value: "carrot", label: "Carrot", description: "An orange root vegetable", badge: "Crunchy", icon: Github },
      { value: "broccoli", label: "Broccoli", description: "A green tree-like vegetable", badge: "Nutritious", icon: Home },
      { value: "spinach", label: "Spinach", description: "A leafy green vegetable", badge: "Iron-rich", icon: RefreshCw },
    ]
  }
];

interface PlaygroundState {
  variant: "default" | "outline" | "ghost" | "filled";
  size: "sm" | "default" | "lg" | "xl";
  multiple: boolean;
  searchable: boolean;
  clearable: boolean;
  disabled: boolean;
  error: boolean;
  success: boolean;
  loading: boolean;
  numbered: boolean;
  useGroups: boolean;
  placeholder: string;
  noOptionsMessage: string;
  searchPlaceholder: string;
}

function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="p-2 rounded-md border border-border bg-background hover:bg-accent"
    >
      <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
    </button>
  );
}

function CopyButton({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={copyToClipboard}
      className="inline-flex items-center gap-2 px-3 py-1 text-sm bg-primary text-primary-foreground rounded hover:bg-primary/90 transition-colors"
    >
      {copied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
      {copied ? "Copied!" : "Copy Code"}
    </button>
  );
}

export default function Playground() {
  const [config, setConfig] = useState<PlaygroundState>({
    variant: "default",
    size: "default",
    multiple: false,
    searchable: false,
    clearable: false,
    disabled: false,
    error: false,
    success: false,
    loading: false,
    numbered: false,
    selectedItemsDisplay: "badges",
    showItemClearButtons: true,
    maxSelectedItemsToShow: 3,
    showBadges: false,
    badgeVariant: "default",
    showIcons: false,
    showDescriptions: false,
    useGroups: false,
    selectAll: false,
    selectAllLabel: "Select All",
    placeholder: "Select an option...",
    noOptionsMessage: "No options available",
    searchPlaceholder: "Search...",
  });

  const [selectedValue, setSelectedValue] = useState<string | number | (string | number)[] | undefined>();

  // Dynamic rich options based on config
  const getRichOptions = useCallback(() => [
    { 
      value: "apple", 
      label: "Apple",
      description: config.showDescriptions ? "A sweet red fruit" : undefined,
      badge: config.showBadges ? "Popular" : undefined,
      badgeVariant: config.badgeVariant,
      icon: config.showIcons ? Zap : undefined
    },
    { 
      value: "banana", 
      label: "Banana",
      description: config.showDescriptions ? "A yellow tropical fruit" : undefined, 
      badge: config.showBadges ? "Healthy" : undefined,
      badgeVariant: config.badgeVariant,
      icon: config.showIcons ? Sun : undefined
    },
    { 
      value: "orange", 
      label: "Orange",
      description: config.showDescriptions ? "A citrus fruit" : undefined,
      badge: config.showBadges ? "Vitamin C" : undefined,
      badgeVariant: config.badgeVariant,
      icon: config.showIcons ? Moon : undefined
    },
    { 
      value: "grape", 
      label: "Grape",
      description: config.showDescriptions ? "Small purple fruits" : undefined,
      badge: config.showBadges ? "Antioxidants" : undefined,
      badgeVariant: config.badgeVariant,
      icon: config.showIcons ? Github : undefined
    },
    { 
      value: "strawberry", 
      label: "Strawberry",
      description: config.showDescriptions ? "A red berry" : undefined,
      badge: config.showBadges ? "Seasonal" : undefined,
      badgeVariant: config.badgeVariant,
      icon: config.showIcons ? Home : undefined
    },
    { 
      value: "watermelon", 
      label: "Watermelon",
      description: config.showDescriptions ? "A large green fruit" : undefined,
      badge: config.showBadges ? "Hydrating" : undefined,
      badgeVariant: config.badgeVariant,
      icon: config.showIcons ? RefreshCw : undefined
    },
  ], [config.showDescriptions, config.showBadges, config.badgeVariant, config.showIcons]);

  const getRichGroupedOptions = useCallback(() => [
    {
      label: "Fruits",
      options: [
        { 
          value: "apple", 
          label: "Apple",
          description: config.showDescriptions ? "A sweet red fruit" : undefined,
          badge: config.showBadges ? "Popular" : undefined,
          badgeVariant: config.badgeVariant,
          icon: config.showIcons ? Zap : undefined
        },
        { 
          value: "banana", 
          label: "Banana",
          description: config.showDescriptions ? "A yellow tropical fruit" : undefined,
          badge: config.showBadges ? "Healthy" : undefined,
          badgeVariant: config.badgeVariant,
          icon: config.showIcons ? Sun : undefined
        },
        { 
          value: "orange", 
          label: "Orange",
          description: config.showDescriptions ? "A citrus fruit" : undefined,
          badge: config.showBadges ? "Vitamin C" : undefined,
          badgeVariant: config.badgeVariant,
          icon: config.showIcons ? Moon : undefined
        },
      ]
    },
    {
      label: "Vegetables", 
      options: [
        { 
          value: "carrot", 
          label: "Carrot",
          description: config.showDescriptions ? "An orange root vegetable" : undefined,
          badge: config.showBadges ? "Crunchy" : undefined,
          badgeVariant: config.badgeVariant,
          icon: config.showIcons ? Github : undefined
        },
        { 
          value: "broccoli", 
          label: "Broccoli",
          description: config.showDescriptions ? "A green tree-like vegetable" : undefined,
          badge: config.showBadges ? "Nutritious" : undefined,
          badgeVariant: config.badgeVariant,
          icon: config.showIcons ? Home : undefined
        },
        { 
          value: "spinach", 
          label: "Spinach",
          description: config.showDescriptions ? "A leafy green vegetable" : undefined,
          badge: config.showBadges ? "Iron-rich" : undefined,
          badgeVariant: config.badgeVariant,
          icon: config.showIcons ? RefreshCw : undefined
        },
      ]
    }
  ], [config.showDescriptions, config.showBadges, config.badgeVariant, config.showIcons]);

  const generateOptionCode = (value: string, label: string, description?: string, badge?: string, icon?: string) => {
    const props = [`value: "${value}"`, `label: "${label}"`];
    if (description) props.push(`description: "${description}"`);
    if (badge) {
      props.push(`badge: "${badge}"`);
      if (config.badgeVariant !== "default") {
        props.push(`badgeVariant: "${config.badgeVariant}"`);
      }
    }
    if (icon) props.push(`icon: ${icon}`);
    return `{ ${props.join(', ')} }`;
  };

  const generateCode = useCallback(() => {
    const props = [];
    
    // Always include options or groups
    if (config.useGroups) {
      props.push('groups={groupedOptions}');
    } else {
      props.push('options={options}');
    }
    
    // Add non-default props
    if (config.placeholder !== "Select an option...") props.push(`placeholder="${config.placeholder}"`);
    if (config.variant !== "default") props.push(`variant="${config.variant}"`);
    if (config.size !== "default") props.push(`size="${config.size}"`);
    if (config.multiple) props.push('multiple');
    if (config.searchable) props.push('searchable');
    if (config.clearable) props.push('clearable');
    if (config.disabled) props.push('disabled');
    if (config.error) props.push('error');
    if (config.success) props.push('success');
    if (config.loading) props.push('loading');
    if (config.numbered) props.push('numbered');
    
    // Multi-select specific props
    if (config.multiple && config.selectedItemsDisplay !== "badges") props.push(`selectedItemsDisplay="${config.selectedItemsDisplay}"`);
    if (config.multiple && !config.showItemClearButtons) props.push('showItemClearButtons={false}');
    if (config.multiple && config.maxSelectedItemsToShow !== 3) props.push(`maxSelectedItemsToShow={${config.maxSelectedItemsToShow}}`);
    if (config.multiple && config.selectAll) props.push('selectAll');
    if (config.multiple && config.selectAll && config.selectAllLabel !== "Select All") props.push(`selectAllLabel="${config.selectAllLabel}"`);
    
    // Option display props
    if (config.showBadges) props.push('showBadges');
    if (config.showIcons) props.push('showIcons');
    if (config.showDescriptions) props.push('showDescriptions');
    
    // Custom messages
    if (config.searchPlaceholder !== "Search...") props.push(`searchPlaceholder="${config.searchPlaceholder}"`);
    if (config.noOptionsMessage !== "No options available") props.push(`noOptionsMessage="${config.noOptionsMessage}"`);
    
    // Add handlers
    props.push('onValueChange={(value) => console.log(value)}');

    const dataArrays = config.useGroups ? `
const groupedOptions = [
  {
    label: "Fruits",
    options: [
      ${generateOptionCode("apple", "Apple", config.showDescriptions ? "A sweet red fruit" : undefined, config.showBadges ? "Popular" : undefined, config.showIcons ? "Apple" : undefined)},
      ${generateOptionCode("banana", "Banana", config.showDescriptions ? "A yellow tropical fruit" : undefined, config.showBadges ? "Healthy" : undefined, config.showIcons ? "Banana" : undefined)},
      ${generateOptionCode("orange", "Orange", config.showDescriptions ? "A citrus fruit" : undefined, config.showBadges ? "Vitamin C" : undefined, config.showIcons ? "Citrus" : undefined)},
    ]
  },
  {
    label: "Vegetables", 
    options: [
      ${generateOptionCode("carrot", "Carrot", config.showDescriptions ? "An orange root vegetable" : undefined, config.showBadges ? "Crunchy" : undefined, config.showIcons ? "Carrot" : undefined)},
      ${generateOptionCode("broccoli", "Broccoli", config.showDescriptions ? "A green tree-like vegetable" : undefined, config.showBadges ? "Nutritious" : undefined, config.showIcons ? "Broccoli" : undefined)},
      ${generateOptionCode("spinach", "Spinach", config.showDescriptions ? "A leafy green vegetable" : undefined, config.showBadges ? "Iron-rich" : undefined, config.showIcons ? "Leaf" : undefined)},
    ]
  }
];` : `
const options = [
  ${generateOptionCode("apple", "Apple", config.showDescriptions ? "A sweet red fruit" : undefined, config.showBadges ? "Popular" : undefined, config.showIcons ? "Apple" : undefined)},
  ${generateOptionCode("banana", "Banana", config.showDescriptions ? "A yellow tropical fruit" : undefined, config.showBadges ? "Healthy" : undefined, config.showIcons ? "Banana" : undefined)},
  ${generateOptionCode("orange", "Orange", config.showDescriptions ? "A citrus fruit" : undefined, config.showBadges ? "Vitamin C" : undefined, config.showIcons ? "Citrus" : undefined)},
  ${generateOptionCode("grape", "Grape", config.showDescriptions ? "Small purple fruits" : undefined, config.showBadges ? "Antioxidants" : undefined, config.showIcons ? "Grape" : undefined)},
  ${generateOptionCode("strawberry", "Strawberry", config.showDescriptions ? "A red berry" : undefined, config.showBadges ? "Seasonal" : undefined, config.showIcons ? "Code" : undefined)},
  ${generateOptionCode("watermelon", "Watermelon", config.showDescriptions ? "A large green fruit" : undefined, config.showBadges ? "Hydrating" : undefined, config.showIcons ? "Zap" : undefined)},
];`;

    const imports = config.showIcons ? 
      'import { Select } from \'thereactselect\';\nimport { Code, Zap, Globe, Layers, Carrot } from \'lucide-react\';' : 
      'import { Select } from \'thereactselect\';';

    const stateType = config.multiple ? '<(string | number)[]>' : '<string | number | undefined>';
    const initialValue = config.multiple ? '[]' : 'undefined';

    return `${imports}
${dataArrays}

function MyComponent() {
  const [value, setValue] = useState${stateType}(${initialValue});

  return (
    <Select
      ${props.join('\n      ')}
    />
  );
}`;
  }, [config]);

  const resetConfig = useCallback(() => {
    setConfig({
      variant: "default",
      size: "default",
      multiple: false,
      searchable: false,
      clearable: false,
      disabled: false,
      error: false,
      success: false,
      loading: false,
      numbered: false,
      selectedItemsDisplay: "badges",
      showItemClearButtons: true,
      maxSelectedItemsToShow: 3,
      showBadges: false,
      badgeVariant: "default",
      showIcons: false,
      showDescriptions: false,
      useGroups: false,
      selectAll: false,
      selectAllLabel: "Select All",
      placeholder: "Select an option...",
      noOptionsMessage: "No options available",
      searchPlaceholder: "Search...",
    });
    setSelectedValue(undefined);
  }, []);

  const updateConfig = useCallback((updates: Partial<PlaygroundState>) => {
    setConfig(prev => ({ ...prev, ...updates }));
  }, []);

  const generatedCode = useMemo(() => generateCode(), [generateCode]);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-40 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container max-w-7xl mx-auto flex h-14 items-center justify-between px-4">
          <div className="flex items-center gap-4">
            <a href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
              <Home className="h-5 w-5" />
              <span className="font-semibold">theReactSelect</span>
            </a>
            <span className="text-muted-foreground">/</span>
            <span className="font-medium">Playground</span>
          </div>
          
          <div className="flex items-center gap-2">
            <button
              onClick={resetConfig}
              className="p-2 rounded-md border border-border bg-background hover:bg-accent"
              title="Reset to defaults"
            >
              <RefreshCw className="h-4 w-4" />
            </button>
            <a
              href="https://github.com/themrsami/thereactselect"
              className="p-2 rounded-md border border-border bg-background hover:bg-accent"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github className="h-4 w-4" />
            </a>
            <ThemeToggle />
          </div>
        </div>
      </header>

      <div className="container max-w-7xl mx-auto p-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Configuration Panel */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-card border border-border rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4">Configuration</h2>
              
              <div className="space-y-4">
                {/* Variant */}
                <div>
                  <label className="block text-sm font-medium mb-2">Variant</label>
                  <Select
                    options={[
                      { value: "default", label: "Default" },
                      { value: "outline", label: "Outline" },
                      { value: "ghost", label: "Ghost" },
                      { value: "filled", label: "Filled" },
                    ]}
                    value={config.variant}
                    onValueChange={(value) => updateConfig({ variant: value as any })}
                    size="sm"
                  />
                </div>

                {/* Size */}
                <div>
                  <label className="block text-sm font-medium mb-2">Size</label>
                  <Select
                    options={[
                      { value: "sm", label: "Small" },
                      { value: "default", label: "Default" },
                      { value: "lg", label: "Large" },
                      { value: "xl", label: "Extra Large" },
                    ]}
                    value={config.size}
                    onValueChange={(value) => updateConfig({ size: value as any })}
                    size="sm"
                  />
                </div>

                {/* Badge Variant */}
                <div>
                  <label className="block text-sm font-medium mb-2">Badge Variant</label>
                  <Select
                    options={[
                      { value: "default", label: "Default" },
                      { value: "secondary", label: "Secondary" },
                      { value: "success", label: "Success" },
                      { value: "warning", label: "Warning" },
                      { value: "error", label: "Error" },
                      { value: "outline", label: "Outline" },
                    ]}
                    value={config.badgeVariant}
                    onValueChange={(value) => updateConfig({ badgeVariant: value as any })}
                    size="sm"
                    disabled={!config.showBadges}
                  />
                </div>

                {/* Text Inputs */}
                <div>
                  <label className="block text-sm font-medium mb-2">Placeholder</label>
                  <StyledInput
                    value={config.placeholder}
                    onChange={(value) => updateConfig({ placeholder: value })}
                    placeholder="Enter placeholder text"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Search Placeholder</label>
                  <StyledInput
                    value={config.searchPlaceholder}
                    onChange={(value) => updateConfig({ searchPlaceholder: value })}
                    placeholder="Enter search placeholder"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">No Options Message</label>
                  <StyledInput
                    value={config.noOptionsMessage}
                    onChange={(value) => updateConfig({ noOptionsMessage: value })}
                    placeholder="Enter no options message"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Select All Label</label>
                  <StyledInput
                    value={config.selectAllLabel}
                    onChange={(value) => updateConfig({ selectAllLabel: value })}
                    placeholder="Enter select all label"
                    disabled={!config.multiple || !config.selectAll}
                  />
                </div>

                {/* Boolean Options */}
                <div className="space-y-3">
                  <h3 className="text-sm font-medium">Options</h3>
                  <div className="max-h-64 overflow-y-auto space-y-2 pr-2">
                    {[
                      { key: 'multiple', label: 'Multiple Selection' },
                      { key: 'searchable', label: 'Searchable' },
                      { key: 'clearable', label: 'Clearable' },
                      { key: 'disabled', label: 'Disabled' },
                      { key: 'error', label: 'Error State' },
                      { key: 'success', label: 'Success State' },
                      { key: 'loading', label: 'Loading State' },
                      { key: 'numbered', label: 'Numbered Options' },
                      { key: 'showBadges', label: 'Show Badges' },
                      { key: 'showIcons', label: 'Show Icons' },
                      { key: 'showDescriptions', label: 'Show Descriptions' },
                      { key: 'useGroups', label: 'Use Grouped Options' },
                      { key: 'selectAll', label: 'Select All (Multi-select only)', disabled: !config.multiple },
                    ].map(({ key, label, disabled }) => (
                      <StyledCheckbox
                        key={key}
                        checked={config[key as keyof PlaygroundState] as boolean}
                        disabled={disabled}
                        onChange={(checked) => updateConfig({ [key]: checked })}
                        label={label}
                      />
                    ))}
                  </div>
                </div>

                {/* Multi-select Options */}
                {config.multiple && (
                  <div className="space-y-3">
                    <h3 className="text-sm font-medium">Multi-select Display</h3>
                    
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Selected Items Display</label>
                      <Select
                        options={[
                          { value: "badges", label: "Badges with Clear Buttons" },
                          { value: "text", label: "Comma-separated Text" },
                          { value: "count", label: "Selected Count" },
                        ]}
                        value={config.selectedItemsDisplay}
                        onValueChange={(value) => updateConfig({ selectedItemsDisplay: value as "badges" | "text" | "count" })}
                        size="sm"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium">Max Items to Show</label>
                      <input
                        type="number"
                        min="1"
                        max="10"
                        value={config.maxSelectedItemsToShow}
                        onChange={(e) => updateConfig({ maxSelectedItemsToShow: parseInt(e.target.value) || 3 })}
                        className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground"
                      />
                    </div>

                    <StyledCheckbox
                      checked={config.showItemClearButtons}
                      onChange={(checked) => updateConfig({ showItemClearButtons: checked })}
                      label="Show Individual Clear Buttons"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Preview and Code */}
          <div className="lg:col-span-2 space-y-6">
            {/* Preview */}
            <div className="bg-card border border-border rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold">Preview</h2>
                <span className="text-sm text-muted-foreground">
                  Selected: {JSON.stringify(selectedValue)}
                </span>
              </div>
              
              <div className="max-w-md">
                <Select
                  {...(config.useGroups ? { 
                    groups: getRichGroupedOptions()
                  } : { 
                    options: getRichOptions()
                  })}
                  placeholder={config.placeholder}
                  variant={config.variant}
                  size={config.size}
                  multiple={config.multiple}
                  searchable={config.searchable}
                  clearable={config.clearable}
                  disabled={config.disabled}
                  error={config.error}
                  success={config.success}
                  loading={config.loading}
                  numbered={config.numbered}
                  selectedItemsDisplay={config.selectedItemsDisplay}
                  showItemClearButtons={config.showItemClearButtons}
                  maxSelectedItemsToShow={config.maxSelectedItemsToShow}
                  showBadges={config.showBadges}
                  showIcons={config.showIcons}
                  showDescriptions={config.showDescriptions}
                  searchPlaceholder={config.searchPlaceholder}
                  noOptionsMessage={config.noOptionsMessage}
                  {...(config.multiple && config.selectAll ? {
                    selectAll: config.selectAll,
                    selectAllLabel: config.selectAllLabel
                  } : {})}
                  value={selectedValue}
                  onValueChange={setSelectedValue}
                />
              </div>
            </div>

            {/* Generated Code */}
            <div className="bg-card border border-border rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold">Generated Code</h2>
                <CopyButton code={generatedCode} />
              </div>
              
              <div className="max-h-96 overflow-y-auto">
                <CodeBlock 
                  code={generatedCode}
                  language="tsx"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

"use client";

import { useState, useCallback, useMemo } from "react";
import { useTheme } from "next-themes";
import { Sun, Moon, Github, Home, Copy, Check, RefreshCw, Zap, Code } from "lucide-react";
import { Select } from "../../lib";
import type { SelectOption } from "../../lib";
import { CodeBlock } from "../../components/ui/code-block";
import { StyledInput } from "../../components/ui/styled-input";
import { StyledCheckbox } from "../../components/ui/styled-checkbox";
import { cn } from "../../lib/utils";

interface PlaygroundState {
  // Styling
  variant: "default" | "outline" | "ghost" | "filled";
  size: "default" | "sm" | "lg" | "xl";
  
  // Basic Options
  multiple: boolean;
  searchable: boolean;
  clearable: boolean;
  disabled: boolean;
  required: boolean;
  
  // States
  error: boolean;
  success: boolean;
  loading: boolean;
  
  // Display Options
  numbered: boolean;
  showBadges: boolean;
  showIcons: boolean;
  showDescriptions: boolean;
  
  // Grouping
  useGroups: boolean;
  showGroupHeaders: boolean;
  groupDividers: boolean;
  
  // Multi-select
  selectAll: boolean;
  selectedItemsDisplay: "badges" | "text" | "count";
  showItemClearButtons: boolean;
  maxSelectedItemsToShow: number;
  
  // Behavior
  closeOnSelect: boolean;
  scrollable: boolean;
  maxHeight: number;
  
  // Text Configuration
  placeholder: string;
  searchPlaceholder: string;
  noOptionsMessage: string;
  noSearchResultsMessage: string;
  selectAllLabel: string;
  
  // Badge Variant
  badgeVariant: "default" | "secondary" | "success" | "warning" | "error" | "outline";
}

function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="relative p-2 rounded-md border border-border bg-background hover:bg-accent transition-colors flex items-center justify-center"
      title="Toggle theme"
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
      className="inline-flex items-center gap-2 px-3 py-1.5 text-sm bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
    >
      {copied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
      {copied ? "Copied!" : "Copy Code"}
    </button>
  );
}

function ConfigSection({ 
  title, 
  children,
  collapsible = false 
}: { 
  title: string; 
  children: React.ReactNode;
  collapsible?: boolean;
}) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="border-b border-border last:border-0 pb-4 last:pb-0">
      {collapsible ? (
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full flex items-center justify-between text-sm font-semibold mb-3 hover:text-primary transition-colors"
        >
          <span>{title}</span>
          <span className={cn("transition-transform", isOpen && "rotate-180")}>▼</span>
        </button>
      ) : (
        <h3 className="text-sm font-semibold mb-3">{title}</h3>
      )}
      {(!collapsible || isOpen) && (
        <div className="space-y-3">
          {children}
        </div>
      )}
    </div>
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
    required: false,
    error: false,
    success: false,
    loading: false,
    numbered: false,
    showBadges: false,
    showIcons: false,
    showDescriptions: false,
    useGroups: false,
    showGroupHeaders: true,
    groupDividers: false,
    selectAll: false,
    selectedItemsDisplay: "badges",
    showItemClearButtons: true,
    maxSelectedItemsToShow: 3,
    closeOnSelect: true,
    scrollable: true,
    maxHeight: 300,
    placeholder: "Select an option...",
    searchPlaceholder: "Search...",
    noOptionsMessage: "No options available",
    noSearchResultsMessage: "No results found",
    selectAllLabel: "Select All",
    badgeVariant: "default",
  });

  const [selectedValue, setSelectedValue] = useState<string | number | (string | number)[] | undefined>();

  const updateConfig = useCallback((updates: Partial<PlaygroundState>) => {
    setConfig(prev => ({ ...prev, ...updates }));
  }, []);

  const resetConfig = useCallback(() => {
    setConfig({
      variant: "default",
      size: "default",
      multiple: false,
      searchable: false,
      clearable: false,
      disabled: false,
      required: false,
      error: false,
      success: false,
      loading: false,
      numbered: false,
      showBadges: false,
      showIcons: false,
      showDescriptions: false,
      useGroups: false,
      showGroupHeaders: true,
      groupDividers: false,
      selectAll: false,
      selectedItemsDisplay: "badges",
      showItemClearButtons: true,
      maxSelectedItemsToShow: 3,
      closeOnSelect: true,
      scrollable: true,
      maxHeight: 300,
      placeholder: "Select an option...",
      searchPlaceholder: "Search...",
      noOptionsMessage: "No options available",
      noSearchResultsMessage: "No results found",
      selectAllLabel: "Select All",
      badgeVariant: "default",
    });
    setSelectedValue(undefined);
  }, []);

  // Generate dynamic options based on config
  const generateOptions = useCallback((): SelectOption[] => {
    return [
      { 
        value: "apple", 
        label: "Apple",
        description: config.showDescriptions ? "A sweet red fruit" : undefined,
        badge: config.showBadges ? "Popular" : undefined,
        badgeVariant: config.badgeVariant,
        icon: config.showIcons ? Zap : undefined,
      },
      { 
        value: "banana", 
        label: "Banana",
        description: config.showDescriptions ? "A yellow tropical fruit" : undefined,
        badge: config.showBadges ? "Healthy" : undefined,
        badgeVariant: config.badgeVariant,
        icon: config.showIcons ? Sun : undefined,
      },
      { 
        value: "orange", 
        label: "Orange",
        description: config.showDescriptions ? "A citrus fruit" : undefined,
        badge: config.showBadges ? "Vitamin C" : undefined,
        badgeVariant: config.badgeVariant,
        icon: config.showIcons ? Moon : undefined,
      },
      { 
        value: "grape", 
        label: "Grape",
        description: config.showDescriptions ? "Small purple fruits" : undefined,
        badge: config.showBadges ? "Antioxidants" : undefined,
        badgeVariant: config.badgeVariant,
        icon: config.showIcons ? Github : undefined,
      },
      { 
        value: "strawberry", 
        label: "Strawberry",
        description: config.showDescriptions ? "A red berry" : undefined,
        badge: config.showBadges ? "Seasonal" : undefined,
        badgeVariant: config.badgeVariant,
        icon: config.showIcons ? Home : undefined,
      },
      { 
        value: "watermelon", 
        label: "Watermelon",
        description: config.showDescriptions ? "A large green fruit" : undefined,
        badge: config.showBadges ? "Hydrating" : undefined,
        badgeVariant: config.badgeVariant,
        icon: config.showIcons ? RefreshCw : undefined,
      },
    ];
  }, [config.showDescriptions, config.showBadges, config.badgeVariant, config.showIcons]);

  const generateGroups = useCallback(() => [
    {
      label: "Fruits",
      options: [
        { 
          value: "apple", 
          label: "Apple",
          description: config.showDescriptions ? "A sweet red fruit" : undefined,
          badge: config.showBadges ? "Popular" : undefined,
          badgeVariant: config.badgeVariant,
          icon: config.showIcons ? Zap : undefined,
        },
        { 
          value: "banana", 
          label: "Banana",
          description: config.showDescriptions ? "A yellow tropical fruit" : undefined,
          badge: config.showBadges ? "Healthy" : undefined,
          badgeVariant: config.badgeVariant,
          icon: config.showIcons ? Sun : undefined,
        },
        { 
          value: "orange", 
          label: "Orange",
          description: config.showDescriptions ? "A citrus fruit" : undefined,
          badge: config.showBadges ? "Vitamin C" : undefined,
          badgeVariant: config.badgeVariant,
          icon: config.showIcons ? Moon : undefined,
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
          icon: config.showIcons ? Github : undefined,
        },
        { 
          value: "broccoli", 
          label: "Broccoli",
          description: config.showDescriptions ? "A green tree-like vegetable" : undefined,
          badge: config.showBadges ? "Nutritious" : undefined,
          badgeVariant: config.badgeVariant,
          icon: config.showIcons ? Home : undefined,
        },
        { 
          value: "spinach", 
          label: "Spinach",
          description: config.showDescriptions ? "A leafy green vegetable" : undefined,
          badge: config.showBadges ? "Iron-rich" : undefined,
          badgeVariant: config.badgeVariant,
          icon: config.showIcons ? RefreshCw : undefined,
        },
      ]
    }
  ], [config.showDescriptions, config.showBadges, config.badgeVariant, config.showIcons]);

  const generateCode = useCallback(() => {
    const props: string[] = [];
    
    // Options or Groups
    if (config.useGroups) {
      props.push('groups={groups}');
    } else {
      props.push('options={options}');
    }
    
    // Basic props
    if (config.placeholder !== "Select an option...") props.push(`placeholder="${config.placeholder}"`);
    if (config.variant !== "default") props.push(`variant="${config.variant}"`);
    if (config.size !== "default") props.push(`size="${config.size}"`);
    
    // Boolean flags
    if (config.multiple) props.push('multiple');
    if (config.searchable) props.push('searchable');
    if (config.clearable) props.push('clearable');
    if (config.disabled) props.push('disabled');
    if (config.required) props.push('required');
    if (config.error) props.push('error');
    if (config.success) props.push('success');
    if (config.loading) props.push('loading');
    if (config.numbered) props.push('numbered');
    if (!config.closeOnSelect) props.push('closeOnSelect={false}');
    if (!config.scrollable) props.push('scrollable={false}');
    if (config.scrollable && config.maxHeight !== 300) props.push(`maxHeight={${config.maxHeight}}`);
    
    // Display options
    if (config.showBadges) props.push('showBadges');
    if (config.showIcons) props.push('showIcons');
    if (config.showDescriptions) props.push('showDescriptions');
    
    // Group options
    if (config.useGroups && !config.showGroupHeaders) props.push('showGroupHeaders={false}');
    if (config.useGroups && config.groupDividers) props.push('groupDividers');
    
    // Multi-select options
    if (config.multiple) {
      if (config.selectAll) props.push('selectAll');
      if (config.selectAllLabel !== "Select All") props.push(`selectAllLabel="${config.selectAllLabel}"`);
      if (config.selectedItemsDisplay !== "badges") props.push(`selectedItemsDisplay="${config.selectedItemsDisplay}"`);
      if (!config.showItemClearButtons) props.push('showItemClearButtons={false}');
      if (config.maxSelectedItemsToShow !== 3) props.push(`maxSelectedItemsToShow={${config.maxSelectedItemsToShow}}`);
    }
    
    // Search options
    if (config.searchPlaceholder !== "Search...") props.push(`searchPlaceholder="${config.searchPlaceholder}"`);
    
    // Messages
    if (config.noOptionsMessage !== "No options available") props.push(`noOptionsMessage="${config.noOptionsMessage}"`);
    if (config.noSearchResultsMessage !== "No results found") props.push(`noSearchResultsMessage="${config.noSearchResultsMessage}"`);
    
    // Event handlers
    props.push('value={value}');
    props.push('onValueChange={setValue}');

    const valueType = config.multiple ? '(string | number)[]' : 'string | number | undefined';
    const initialValue = config.multiple ? '[]' : 'undefined';

    // Icon mapping for code generation
    const iconMap: Record<string, string> = {
      apple: 'Zap',
      banana: 'Sun',
      orange: 'Moon',
      grape: 'Github',
      strawberry: 'Home',
      watermelon: 'RefreshCw',
      carrot: 'Github',
      broccoli: 'Home',
      spinach: 'RefreshCw',
    };

    // Description mapping for code generation
    const descriptionMap: Record<string, string> = {
      apple: 'A sweet red fruit',
      banana: 'A yellow tropical fruit',
      orange: 'A citrus fruit',
      grape: 'Small purple fruits',
      strawberry: 'A red berry',
      watermelon: 'A large green fruit',
      carrot: 'An orange root vegetable',
      broccoli: 'A green tree-like vegetable',
      spinach: 'A leafy green vegetable',
    };

    // Badge mapping for code generation
    const badgeMap: Record<string, string> = {
      apple: 'Popular',
      banana: 'Healthy',
      orange: 'Vitamin C',
      grape: 'Antioxidants',
      strawberry: 'Seasonal',
      watermelon: 'Hydrating',
      carrot: 'Crunchy',
      broccoli: 'Nutritious',
      spinach: 'Iron-rich',
    };

    const optionCode = (val: string, label: string) => {
      const parts = [`value: "${val}", label: "${label}"`];
      if (config.showDescriptions) parts.push(`description: "${descriptionMap[val] || 'Description here'}"`);
      if (config.showBadges) parts.push(`badge: "${badgeMap[val] || 'Badge'}", badgeVariant: "${config.badgeVariant}"`);
      if (config.showIcons) parts.push(`icon: ${iconMap[val] || 'Zap'}`);
      return `{ ${parts.join(', ')} }`;
    };

    const dataCode = config.useGroups ? `const groups = [
  {
    label: "Fruits",
    options: [
      ${optionCode('apple', 'Apple')},
      ${optionCode('banana', 'Banana')},
      ${optionCode('orange', 'Orange')},
    ]
  },
  {
    label: "Vegetables",
    options: [
      ${optionCode('carrot', 'Carrot')},
      ${optionCode('broccoli', 'Broccoli')},
      ${optionCode('spinach', 'Spinach')},
    ]
  }
];` : `const options = [
  ${optionCode('apple', 'Apple')},
  ${optionCode('banana', 'Banana')},
  ${optionCode('orange', 'Orange')},
  ${optionCode('grape', 'Grape')},
  ${optionCode('strawberry', 'Strawberry')},
  ${optionCode('watermelon', 'Watermelon')},
];`;

    const imports = config.showIcons 
      ? `import { Select } from 'thereactselect';\nimport { useState } from 'react';\nimport { Zap, Sun, Moon, Github, Home, RefreshCw } from 'lucide-react';`
      : `import { Select } from 'thereactselect';\nimport { useState } from 'react';`;

    return `${imports}

${dataCode}

function MyComponent() {
  const [value, setValue] = useState<${valueType}>(${initialValue});

  return (
    <Select
      ${props.join('\n      ')}
    />
  );
}`;
  }, [config]);

  const options = useMemo(() => generateOptions(), [generateOptions]);
  const groups = useMemo(() => generateGroups(), [generateGroups]);
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
              className="p-2 rounded-md border border-border bg-background hover:bg-accent transition-colors"
              title="Reset to defaults"
            >
              <RefreshCw className="h-4 w-4" />
            </button>
            <a
              href="https://github.com/themrsami/thereactselect"
              className="p-2 rounded-md border border-border bg-background hover:bg-accent transition-colors"
              target="_blank"
              rel="noopener noreferrer"
              title="View on GitHub"
            >
              <Github className="h-4 w-4" />
            </a>
            <ThemeToggle />
          </div>
        </div>
      </header>

      <div className="container max-w-[1800px] mx-auto p-4 md:p-6">
        <div className="grid grid-cols-1 xl:grid-cols-[380px_1fr] gap-6">
          {/* Configuration Panel */}
          <div className="space-y-4">
            <div className="bg-card border border-border rounded-lg p-4 sticky top-20 max-h-[calc(100vh-6rem)] overflow-y-auto">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold">Configuration</h2>
                <button
                  onClick={resetConfig}
                  className="text-xs text-muted-foreground hover:text-foreground transition-colors"
                >
                  Reset All
                </button>
              </div>
              
              <div className="space-y-4">
                {/* Styling Section */}
                <ConfigSection title="Styling">
                  <div>
                    <label className="block text-xs font-medium mb-1.5 text-muted-foreground">Variant</label>
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

                  <div>
                    <label className="block text-xs font-medium mb-1.5 text-muted-foreground">Size</label>
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
                </ConfigSection>

                {/* Text Configuration */}
                <ConfigSection title="Text & Labels" collapsible>
                  <div>
                    <label className="block text-xs font-medium mb-1.5 text-muted-foreground">Placeholder</label>
                    <StyledInput
                      value={config.placeholder}
                      onChange={(value) => updateConfig({ placeholder: value })}
                      placeholder="Enter placeholder..."
                      size="sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium mb-1.5 text-muted-foreground">Search Placeholder</label>
                    <StyledInput
                      value={config.searchPlaceholder}
                      onChange={(value) => updateConfig({ searchPlaceholder: value })}
                      placeholder="Enter search placeholder..."
                      size="sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium mb-1.5 text-muted-foreground">No Options Message</label>
                    <StyledInput
                      value={config.noOptionsMessage}
                      onChange={(value) => updateConfig({ noOptionsMessage: value })}
                      size="sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium mb-1.5 text-muted-foreground">No Results Message</label>
                    <StyledInput
                      value={config.noSearchResultsMessage}
                      onChange={(value) => updateConfig({ noSearchResultsMessage: value })}
                      size="sm"
                    />
                  </div>
                </ConfigSection>

                {/* Basic Options */}
                <ConfigSection title="Basic Options">
                  <StyledCheckbox
                    checked={config.multiple}
                    onChange={(checked) => updateConfig({ multiple: checked })}
                    label="Multiple Selection"
                  />
                  <StyledCheckbox
                    checked={config.searchable}
                    onChange={(checked) => updateConfig({ searchable: checked })}
                    label="Searchable"
                  />
                  <StyledCheckbox
                    checked={config.clearable}
                    onChange={(checked) => updateConfig({ clearable: checked })}
                    label="Clearable"
                  />
                  <StyledCheckbox
                    checked={config.disabled}
                    onChange={(checked) => updateConfig({ disabled: checked })}
                    label="Disabled"
                  />
                  <StyledCheckbox
                    checked={config.required}
                    onChange={(checked) => updateConfig({ required: checked })}
                    label="Required"
                  />
                  <StyledCheckbox
                    checked={config.closeOnSelect}
                    onChange={(checked) => updateConfig({ closeOnSelect: checked })}
                    label="Close on Select"
                  />
                  <StyledCheckbox
                    checked={config.scrollable}
                    onChange={(checked) => updateConfig({ scrollable: checked })}
                    label="Scrollable Dropdown"
                  />
                  
                  {config.scrollable && (
                    <StyledInput
                      type="number"
                      value={String(config.maxHeight)}
                      onChange={(value) => updateConfig({ maxHeight: parseInt(value) || 300 })}
                      label="Max Height (px)"
                      placeholder="300"
                      min={100}
                    />
                  )}
                </ConfigSection>

                {/* States */}
                <ConfigSection title="States" collapsible>
                  <StyledCheckbox
                    checked={config.error}
                    onChange={(checked) => updateConfig({ error: checked })}
                    label="Error State"
                  />
                  <StyledCheckbox
                    checked={config.success}
                    onChange={(checked) => updateConfig({ success: checked })}
                    label="Success State"
                  />
                  <StyledCheckbox
                    checked={config.loading}
                    onChange={(checked) => updateConfig({ loading: checked })}
                    label="Loading State"
                  />
                </ConfigSection>

                {/* Display Options */}
                <ConfigSection title="Display Options">
                  <StyledCheckbox
                    checked={config.numbered}
                    onChange={(checked) => updateConfig({ numbered: checked })}
                    label="Numbered Options"
                  />
                  <StyledCheckbox
                    checked={config.showIcons}
                    onChange={(checked) => updateConfig({ showIcons: checked })}
                    label="Show Icons"
                  />
                  <StyledCheckbox
                    checked={config.showDescriptions}
                    onChange={(checked) => updateConfig({ showDescriptions: checked })}
                    label="Show Descriptions"
                  />
                  <StyledCheckbox
                    checked={config.showBadges}
                    onChange={(checked) => updateConfig({ showBadges: checked })}
                    label="Show Badges"
                  />
                  
                  {config.showBadges && (
                    <div>
                      <label className="block text-xs font-medium mb-1.5 text-muted-foreground">Badge Variant</label>
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
                      />
                    </div>
                  )}
                </ConfigSection>

                {/* Grouping Options */}
                <ConfigSection title="Grouping" collapsible>
                  <StyledCheckbox
                    checked={config.useGroups}
                    onChange={(checked) => updateConfig({ useGroups: checked })}
                    label="Use Grouped Options"
                  />
                  {config.useGroups && (
                    <>
                      <StyledCheckbox
                        checked={config.showGroupHeaders}
                        onChange={(checked) => updateConfig({ showGroupHeaders: checked })}
                        label="Show Group Headers"
                      />
                      <StyledCheckbox
                        checked={config.groupDividers}
                        onChange={(checked) => updateConfig({ groupDividers: checked })}
                        label="Group Dividers"
                      />
                    </>
                  )}
                </ConfigSection>

                {/* Multi-select Options */}
                {config.multiple && (
                  <ConfigSection title="Multi-select Options">
                    <StyledCheckbox
                      checked={config.selectAll}
                      onChange={(checked) => updateConfig({ selectAll: checked })}
                      label="Select All Option"
                    />
                    
                    {config.selectAll && (
                      <div>
                        <label className="block text-xs font-medium mb-1.5 text-muted-foreground">Select All Label</label>
                        <StyledInput
                          value={config.selectAllLabel}
                          onChange={(value) => updateConfig({ selectAllLabel: value })}
                          size="sm"
                        />
                      </div>
                    )}
                    
                    <div>
                      <label className="block text-xs font-medium mb-1.5 text-muted-foreground">Display Mode</label>
                      <Select
                        options={[
                          { value: "badges", label: "Badges" },
                          { value: "text", label: "Comma-separated Text" },
                          { value: "count", label: "Count Only" },
                        ]}
                        value={config.selectedItemsDisplay}
                        onValueChange={(value) => updateConfig({ selectedItemsDisplay: value as any })}
                        size="sm"
                      />
                    </div>

                    <StyledCheckbox
                      checked={config.showItemClearButtons}
                      onChange={(checked) => updateConfig({ showItemClearButtons: checked })}
                      label="Show Clear Buttons on Badges"
                    />

                    <StyledInput
                      type="number"
                      value={String(config.maxSelectedItemsToShow)}
                      onChange={(value) => updateConfig({ maxSelectedItemsToShow: parseInt(value) || 3 })}
                      label="Max Items to Show"
                      placeholder="3"
                      min={1}
                    />
                  </ConfigSection>
                )}
              </div>
            </div>
          </div>

          {/* Preview and Code */}
          <div className="space-y-6">
            {/* Preview Section */}
            <div className="bg-card border border-border rounded-lg p-6">
              <div className="mb-4">
                <h2 className="text-xl font-bold mb-1">Live Preview</h2>
                <p className="text-sm text-muted-foreground">
                  Interact with the component to see it in action
                </p>
              </div>
              
              <div className="space-y-4">
                <div className="max-w-xl">
                  <Select
                    {...(config.useGroups 
                      ? { groups, showGroupHeaders: config.showGroupHeaders, groupDividers: config.groupDividers }
                      : { options }
                    )}
                    placeholder={config.placeholder}
                    variant={config.variant}
                    size={config.size}
                    multiple={config.multiple}
                    searchable={config.searchable}
                    clearable={config.clearable}
                    disabled={config.disabled}
                    required={config.required}
                    error={config.error}
                    success={config.success}
                    loading={config.loading}
                    numbered={config.numbered}
                    showBadges={config.showBadges}
                    showIcons={config.showIcons}
                    showDescriptions={config.showDescriptions}
                    searchPlaceholder={config.searchPlaceholder}
                    noOptionsMessage={config.noOptionsMessage}
                    noSearchResultsMessage={config.noSearchResultsMessage}
                    closeOnSelect={config.closeOnSelect}
                    scrollable={config.scrollable}
                    maxHeight={config.maxHeight}
                    {...(config.multiple ? {
                      selectAll: config.selectAll,
                      selectAllLabel: config.selectAllLabel,
                      selectedItemsDisplay: config.selectedItemsDisplay,
                      showItemClearButtons: config.showItemClearButtons,
                      maxSelectedItemsToShow: config.maxSelectedItemsToShow,
                    } : {})}
                    value={selectedValue}
                    onValueChange={setSelectedValue}
                  />
                </div>

                {/* Selected Value Display */}
                <div className="p-4 bg-muted rounded-lg">
                  <div className="text-xs font-medium text-muted-foreground mb-1">Current Value:</div>
                  <code className="text-sm">
                    {selectedValue === undefined 
                      ? 'undefined' 
                      : JSON.stringify(selectedValue, null, 2)
                    }
                  </code>
                </div>
              </div>
            </div>

            {/* Generated Code Section */}
            <div className="bg-card border border-border rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-xl font-bold mb-1">Generated Code</h2>
                  <p className="text-sm text-muted-foreground">
                    Copy and paste this code into your project
                  </p>
                </div>
                <CopyButton code={generatedCode} />
              </div>
              
              <div className="relative">
                <div className="max-h-[600px] overflow-y-auto rounded-lg">
                  <CodeBlock 
                    code={generatedCode}
                    language="tsx"
                  />
                </div>
              </div>
            </div>

            {/* Configuration Summary */}
            <div className="bg-card border border-border rounded-lg p-6">
              <h2 className="text-xl font-bold mb-4">Active Configuration</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                {Object.entries(config).map(([key, value]) => (
                  <div 
                    key={key}
                    className="text-xs p-2 rounded bg-muted"
                  >
                    <div className="font-medium text-muted-foreground mb-0.5">
                      {key.replace(/([A-Z])/g, ' $1').trim()}
                    </div>
                    <div className="font-mono">
                      {typeof value === 'boolean' 
                        ? (value ? '✓ true' : '✗ false')
                        : typeof value === 'string' && value.length > 20
                        ? `"${value.substring(0, 20)}..."`
                        : typeof value === 'string'
                        ? `"${value}"`
                        : String(value)
                      }
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

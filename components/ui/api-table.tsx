"use client";

interface APIProperty {
  prop: string;
  type: string;
  default?: string;
  description: string;
}

const apiData: APIProperty[] = [
  // Basic Props
  { prop: "options", type: "SelectOption[]", description: "Array of options to display in the dropdown" },
  { prop: "groups", type: "SelectGroup[]", description: "Array of grouped options (alternative to options)" },
  { prop: "value", type: "string | number | (string | number)[]", description: "Currently selected value(s)" },
  { prop: "defaultValue", type: "string | number | (string | number)[]", description: "Default selected value(s)" },
  { prop: "placeholder", type: "string", default: "Select...", description: "Placeholder text when no option is selected" },
  { prop: "multiple", type: "boolean", default: "false", description: "Enable multiple selection mode" },
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
  
  // Multi-Select Display
  { prop: "selectedItemsDisplay", type: '"badges" | "text" | "count"', default: '"badges"', description: "How to display selected items in multi-select mode" },
  { prop: "showItemClearButtons", type: "boolean", default: "true", description: "Show individual clear buttons on selected item badges" },
  { prop: "maxSelectedItemsToShow", type: "number", default: "3", description: "Maximum number of selected items to show before showing count" },
  
  // Option Features
  { prop: "numbered", type: "boolean", default: "false", description: "Show numbers next to each option" },
  { prop: "showBadges", type: "boolean", default: "false", description: "Show badges on options (if option has badge property)" },
  { prop: "showIcons", type: "boolean", default: "false", description: "Show icons on options (if option has icon property)" },
  { prop: "showDescriptions", type: "boolean", default: "false", description: "Show descriptions on options (if option has description property)" },
  
  // Dropdown Behavior
  { prop: "position", type: '"top" | "bottom" | "auto"', default: '"auto"', description: "Position of the dropdown relative to trigger" },
  { prop: "maxHeight", type: "number", default: "300", description: "Maximum height of the dropdown in pixels" },
  { prop: "open", type: "boolean", description: "Control the open state of the dropdown" },
  { prop: "defaultOpen", type: "boolean", default: "false", description: "Default open state of the dropdown" },
  
  // Grouped Options
  { prop: "showGroupHeaders", type: "boolean", default: "true", description: "Show group headers in grouped mode" },
  { prop: "groupDividers", type: "boolean", default: "false", description: "Show dividers between groups" },
  
  // Messages & Feedback
  { prop: "noOptionsMessage", type: "string", default: '"No options available"', description: "Message shown when no options are available" },
  { prop: "noSearchResultsMessage", type: "string", default: '"No results found"', description: "Message shown when search returns no results" },
  { prop: "loadingText", type: "string", default: '"Loading..."', description: "Text shown during loading state" },
  { prop: "errorMessage", type: "string", description: "Error message to display" },
  { prop: "successMessage", type: "string", description: "Success message to display" },
  
  // Styling & Classes
  { prop: "className", type: "string", description: "Additional CSS class for the select container" },
  { prop: "dropdownClassName", type: "string", description: "Additional CSS class for the dropdown" },
  { prop: "optionClassName", type: "string", description: "Additional CSS class for options" },
  
  // Event Handlers
  { prop: "onValueChange", type: "(value: any) => void", description: "Callback when selection changes" },
  { prop: "onSearchChange", type: "(search: string) => void", description: "Callback when search input changes" },
  { prop: "onOpenChange", type: "(open: boolean) => void", description: "Callback when dropdown open state changes" },
  { prop: "onOptionSelect", type: "(option: SelectOption) => void", description: "Callback when an option is selected" },
  { prop: "onClear", type: "() => void", description: "Callback when selection is cleared" },
  
  // Form Integration
  { prop: "name", type: "string", description: "HTML name attribute for form integration" },
  { prop: "id", type: "string", description: "HTML id attribute" },
  { prop: "autoFocus", type: "boolean", default: "false", description: "Auto-focus the component on mount" },
  { prop: "tabIndex", type: "number", description: "Tab index for keyboard navigation" },
];

export function APITable() {
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
                  {item.default ? (
                    <code className="text-sm font-mono bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400 px-1.5 py-0.5 rounded">
                      {item.default}
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

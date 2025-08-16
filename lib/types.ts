export interface SelectOption {
  value: string | number;
  label: string;
  disabled?: boolean;
  icon?: React.ComponentType<{ className?: string }>;
  description?: string;
  color?: string;
  badge?: string;
  badgeVariant?: "default" | "secondary" | "success" | "warning" | "error" | "outline";
  category?: string;
}

export interface SelectGroup {
  label: string;
  options: SelectOption[];
}

export interface BaseSelectProps {
  /** Options to display */
  options?: SelectOption[];
  /** Grouped options */
  groups?: SelectGroup[];
  /** Currently selected value(s) */
  value?: string | number | (string | number)[];
  /** Default value(s) */
  defaultValue?: string | number | (string | number)[];
  /** Placeholder text */
  placeholder?: string;
  /** Whether the select is disabled */
  disabled?: boolean;
  /** Whether the select is required */
  required?: boolean;
  /** Whether the select has an error state */
  error?: boolean;
  /** Error message to display */
  errorMessage?: string;
  /** Success state */
  success?: boolean;
  /** Success message to display */
  successMessage?: string;
  /** Loading state */
  loading?: boolean;
  /** Custom loading text */
  loadingText?: string;
  /** Whether to show search input */
  searchable?: boolean;
  /** Search placeholder */
  searchPlaceholder?: string;
  /** Whether to allow clearing selection */
  clearable?: boolean;
  /** Custom clear icon */
  clearIcon?: React.ComponentType<{ className?: string }>;
  /** Whether the dropdown is open */
  open?: boolean;
  /** Default open state */
  defaultOpen?: boolean;
  /** Position of the dropdown */
  position?: "top" | "bottom" | "auto";
  /** Maximum height of the dropdown */
  maxHeight?: number;
  /** Whether to close on select */
  closeOnSelect?: boolean;
  /** Custom class name */
  className?: string;
  /** Custom dropdown class name */
  dropdownClassName?: string;
  /** Custom option class name */
  optionClassName?: string;
  /** Variant styling */
  variant?: "default" | "outline" | "ghost" | "filled";
  /** Size variant */
  size?: "default" | "sm" | "lg" | "xl";
  /** Animation duration in ms */
  animationDuration?: number;
  /** Custom no options message */
  noOptionsMessage?: string;
  /** Custom no search results message */
  noSearchResultsMessage?: string;
  /** Whether to show numbers for options */
  numbered?: boolean;
  /** Custom number format */
  numberFormat?: (index: number) => string;
  /** Group dividers style */
  groupDividers?: boolean;
  /** Show group headers */
  showGroupHeaders?: boolean;
  /** Custom group header renderer */
  renderGroupHeader?: (group: SelectGroup) => React.ReactNode;
  /** Option badges */
  showBadges?: boolean;
  /** Option categories */
  showCategories?: boolean;
  /** Virtual scrolling for large lists */
  virtualized?: boolean;
  /** Virtual list height */
  virtualHeight?: number;
  /** Item height for virtualization */
  itemHeight?: number;
  /** Whether to show option descriptions */
  showDescriptions?: boolean;
  /** Whether to show option icons */
  showIcons?: boolean;
  /** Custom dropdown trigger icon */
  dropdownIcon?: React.ComponentType<{ className?: string }>;
  /** Display mode for selected items in multi-select */
  selectedItemsDisplay?: "badges" | "text" | "count";
  /** Whether to show individual clear buttons on selected item badges */
  showItemClearButtons?: boolean;
  /** Maximum number of selected items to show before showing count */
  maxSelectedItemsToShow?: number;
  /** Whether the select is in a form */
  inForm?: boolean;
  /** HTML name attribute */
  name?: string;
  /** HTML id attribute */
  id?: string;
  /** Whether to auto-focus */
  autoFocus?: boolean;
  /** Tab index */
  tabIndex?: number;
  /** Portal container for dropdown */
  portalContainer?: HTMLElement | null;
  /** Whether to use portal */
  usePortal?: boolean;
  /** Minimum search length to trigger filtering */
  minSearchLength?: number;
  /** Whether search is case sensitive */
  caseSensitiveSearch?: boolean;
  /** Custom filter function */
  filterOption?: (option: SelectOption, inputValue: string) => boolean;
  /** Whether to highlight matching text */
  highlightMatches?: boolean;
}

export interface SingleSelectProps extends BaseSelectProps {
  /** Single select mode */
  multiple?: false;
  /** Change handler for single select */
  onValueChange?: (value: string | number | undefined) => void;
  /** Search change handler */
  onSearchChange?: (search: string) => void;
  /** Open state change handler */
  onOpenChange?: (open: boolean) => void;
  /** Option select handler */
  onOptionSelect?: (option: SelectOption) => void;
  /** Clear handler */
  onClear?: () => void;
}

export interface MultiSelectProps extends BaseSelectProps {
  /** Multiple select mode */
  multiple: true;
  /** Change handler for multi select */
  onValueChange?: (values: (string | number)[]) => void;
  /** Search change handler */
  onSearchChange?: (search: string) => void;
  /** Open state change handler */
  onOpenChange?: (open: boolean) => void;
  /** Option select handler */
  onOptionSelect?: (option: SelectOption, selected: boolean) => void;
  /** Clear handler */
  onClear?: () => void;
  /** Maximum number of selections */
  maxSelections?: number;
  /** Whether to show selected count */
  showSelectedCount?: boolean;
  /** Custom selected count format */
  selectedCountFormat?: (count: number) => string;
  /** Whether to show select all option */
  selectAll?: boolean;
  /** Custom select all label */
  selectAllLabel?: string;
  /** Select all handler */
  onSelectAll?: () => void;
}

export interface CreatableSelectProps extends BaseSelectProps {
  /** Whether users can create new options */
  creatable?: true;
  /** Single select mode */
  multiple?: false;
  /** Change handler for single select */
  onValueChange?: (value: string | number | undefined) => void;
  /** Search change handler */
  onSearchChange?: (search: string) => void;
  /** Open state change handler */
  onOpenChange?: (open: boolean) => void;
  /** Option select handler */
  onOptionSelect?: (option: SelectOption) => void;
  /** Clear handler */
  onClear?: () => void;
  /** Create option handler */
  onCreateOption?: (inputValue: string) => void;
  /** Custom create option label */
  createOptionLabel?: (inputValue: string) => string;
  /** Whether creating is allowed for current input */
  isValidNewOption?: (inputValue: string) => boolean;
}

export interface AsyncSelectProps extends BaseSelectProps {
  /** Single select mode */
  multiple?: false;
  /** Change handler for single select */
  onValueChange?: (value: string | number | undefined) => void;
  /** Search change handler */
  onSearchChange?: (search: string) => void;
  /** Open state change handler */
  onOpenChange?: (open: boolean) => void;
  /** Option select handler */
  onOptionSelect?: (option: SelectOption) => void;
  /** Clear handler */
  onClear?: () => void;
  /** Async loading function */
  loadOptions?: (inputValue: string) => Promise<SelectOption[]>;
  /** Default options to show */
  defaultOptions?: SelectOption[] | boolean;
  /** Debounce delay for search */
  debounceDelay?: number;
  /** Cache loaded options */
  cacheOptions?: boolean;
}

export type SelectProps = SingleSelectProps | MultiSelectProps | CreatableSelectProps | AsyncSelectProps;

export interface SelectState {
  isOpen: boolean;
  searchValue: string;
  highlightedIndex: number;
  selectedValues: (string | number)[];
  filteredOptions: SelectOption[];
  loading: boolean;
}

export interface SelectActions {
  open: () => void;
  close: () => void;
  toggle: () => void;
  setSearchValue: (value: string) => void;
  setHighlightedIndex: (index: number) => void;
  selectOption: (option: SelectOption) => void;
  deselectOption: (option: SelectOption) => void;
  clearSelection: () => void;
  selectAll: () => void;
  highlightNext: () => void;
  highlightPrevious: () => void;
  selectHighlighted: () => void;
}

export interface SelectContext extends SelectState, SelectActions {
  props: SelectProps;
  triggerRef: React.RefObject<HTMLButtonElement | null>;
  dropdownRef: React.RefObject<HTMLDivElement | null>;
  searchRef: React.RefObject<HTMLInputElement | null>;
}

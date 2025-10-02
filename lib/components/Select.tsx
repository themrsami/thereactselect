"use client";

import React, { forwardRef, useEffect } from "react";
import { ChevronDown, X, Search, Check, Loader2 } from "lucide-react";
import { SelectProvider, useSelectContext } from "../contexts/select-context";
import { SelectProps, SelectOption } from "../types";
import { cn, selectVariants, optionVariants } from "../utils";

// Select Trigger Component
const SelectTrigger = forwardRef<HTMLButtonElement, React.ButtonHTMLAttributes<HTMLButtonElement>>(
  ({ className, children, ...props }, ref) => {
    const { 
      isOpen, 
      selectedValues, 
      props: selectProps, 
      toggle, 
      clearSelection,
      deselectOption 
    } = useSelectContext();

    const allOptions = selectProps.options || 
      (selectProps.groups?.flatMap(g => g.options) || []);

    const getSelectedOptions = () => {
      return selectedValues.map(value => 
        allOptions.find(opt => opt.value === value)
      ).filter(Boolean);
    };

    const renderSelectedItems = () => {
      if (selectedValues.length === 0) {
        return (
          <span className="text-muted-foreground">
            {selectProps.placeholder || "Select..."}
          </span>
        );
      }

      if (!selectProps.multiple) {
        const selectedOption = allOptions.find(opt => opt.value === selectedValues[0]);
        return (
          <span className="truncate">
            {selectedOption?.label || String(selectedValues[0])}
          </span>
        );
      }

      // Multi-select display modes
      const selectedOptions = getSelectedOptions();
      const displayMode = selectProps.selectedItemsDisplay || "badges";
      const maxToShow = selectProps.maxSelectedItemsToShow || 3;

      if (displayMode === "count" || selectedValues.length > maxToShow) {
        return (
          <span className="text-sm">
            {selectedValues.length} item{selectedValues.length === 1 ? '' : 's'} selected
          </span>
        );
      }

      if (displayMode === "text") {
        return (
          <span className="truncate">
            {selectedOptions.map(opt => opt?.label).join(", ")}
          </span>
        );
      }

      // Default: badges
      return (
        <div className="flex flex-wrap gap-1 min-h-[1.25rem]">
          {selectedOptions.slice(0, maxToShow).map((option) => (
            <div
              key={option?.value}
              className="inline-flex items-center gap-1 px-2 py-0.5 bg-primary/10 text-primary text-xs rounded border border-primary/20"
            >
              <span className="truncate max-w-[100px]">
                {option?.label}
              </span>
              {selectProps.showItemClearButtons !== false && (
                <div
                  onClick={(e) => {
                    e.stopPropagation();
                    if (option) deselectOption(option);
                  }}
                  className="text-primary/70 hover:text-primary ml-1 p-0.5 rounded-full hover:bg-primary/20 cursor-pointer"
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      e.stopPropagation();
                      if (option) deselectOption(option);
                    }
                  }}
                >
                  <X className="h-3 w-3" />
                </div>
              )}
            </div>
          ))}
          {selectedValues.length > maxToShow && (
            <span className="text-xs text-muted-foreground px-2 py-0.5">
              +{selectedValues.length - maxToShow} more
            </span>
          )}
        </div>
      );
    };

    const handleClear = (e: React.MouseEvent) => {
      e.stopPropagation();
      clearSelection();
    };

    return (
      <button
        ref={ref}
        className={cn(
          selectVariants({
            variant: selectProps.variant,
            size: selectProps.size,
            state: selectProps.error ? "error" : selectProps.success ? "success" : "default"
          }),
          "flex items-center justify-between",
          // Auto-adjust height for multiple selections with badges
          selectProps.multiple && selectProps.selectedItemsDisplay === "badges" && 
          selectedValues.length > 0 && "min-h-[2.5rem] h-auto items-start py-2",
          selectProps.disabled && "cursor-not-allowed opacity-50",
          className
        )}
        onClick={toggle}
        disabled={selectProps.disabled}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        {...props}
      >
        <div className={cn(
          "flex-1 min-w-0 text-left",
          selectedValues.length === 0 && "text-muted-foreground"
        )}>
          {renderSelectedItems()}
        </div>
        
        <div className="flex items-center gap-1">
          {selectProps.clearable && selectedValues.length > 0 && (
            <div
              className="text-muted-foreground hover:text-foreground p-0.5 rounded cursor-pointer"
              onClick={handleClear}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  handleClear(e as any);
                }
              }}
              aria-label="Clear all selections"
            >
              <X className="h-3 w-3" />
            </div>
          )}
          
          {selectProps.loading ? (
            <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
          ) : (
            <ChevronDown className={cn(
              "h-4 w-4 text-muted-foreground transition-transform duration-200",
              isOpen && "transform rotate-180"
            )} />
          )}
        </div>
      </button>
    );
  }
);
SelectTrigger.displayName = "SelectTrigger";

// Select Search Component
const SelectSearch = forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className, ...props }, ref) => {
    const { searchValue, setSearchValue, props: selectProps } = useSelectContext();

    return (
      <div className="relative p-2 border-b border-border">
        <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <input
          ref={ref}
          className={cn(
            "w-full bg-transparent pl-8 pr-2 py-1 text-sm outline-none placeholder:text-muted-foreground",
            className
          )}
          placeholder={selectProps.searchPlaceholder || "Search..."}
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          {...props}
        />
      </div>
    );
  }
);
SelectSearch.displayName = "SelectSearch";

// Select Option Component
interface SelectOptionComponentProps {
  option: SelectOption;
  index: number;
  showNumber?: boolean;
  numberFormat?: (index: number) => string;
}

const SelectOptionComponent = ({ option, index, showNumber, numberFormat }: SelectOptionComponentProps) => {
  const { 
    highlightedIndex, 
    selectedValues, 
    selectOption, 
    setHighlightedIndex,
    props: selectProps 
  } = useSelectContext();

  const isSelected = selectedValues.includes(option.value);
  const isHighlighted = highlightedIndex === index;

  return (
    <div
      className={cn(
        optionVariants({
          variant: "default",
          state: option.disabled ? "disabled" : isSelected ? "selected" : "default"
        }),
        isHighlighted && "bg-accent text-accent-foreground",
        selectProps.optionClassName
      )}
      onClick={() => !option.disabled && selectOption(option)}
      onMouseEnter={() => setHighlightedIndex(index)}
      data-highlighted={isHighlighted ? "true" : undefined}
      data-selected={isSelected ? "true" : undefined}
      data-disabled={option.disabled ? "true" : undefined}
      role="option"
      aria-selected={isSelected}
    >
      <div className="flex items-center gap-2 text-left">
        {/* Option Number */}
        {showNumber && (
          <span className="text-xs text-muted-foreground font-mono min-w-[1.5rem] text-center">
            {numberFormat ? numberFormat(index) : `${index + 1}.`}
          </span>
        )}
        
        {/* Option Icon */}
        {option.icon && <option.icon className="h-4 w-4 flex-shrink-0" />}
        
        <div className="flex-1 min-w-0 text-left">
          <div className="flex items-center gap-2">
            <div className="truncate text-left">{option.label}</div>
            
            {/* Option Badge */}
            {option.badge && (
              <span className={cn(
                "px-1.5 py-0.5 text-xs rounded border font-medium whitespace-nowrap",
                {
                  "bg-primary/10 text-primary border-primary/20": option.badgeVariant === "default" || !option.badgeVariant,
                  "bg-muted text-muted-foreground border-border": option.badgeVariant === "secondary",
                  "bg-green-100 text-green-700 border-green-200 dark:bg-green-900/20 dark:text-green-400 dark:border-green-800": option.badgeVariant === "success",
                  "bg-yellow-100 text-yellow-700 border-yellow-200 dark:bg-yellow-900/20 dark:text-yellow-400 dark:border-yellow-800": option.badgeVariant === "warning",
                  "bg-red-100 text-red-700 border-red-200 dark:bg-red-900/20 dark:text-red-400 dark:border-red-800": option.badgeVariant === "error",
                  "bg-transparent text-foreground border-border": option.badgeVariant === "outline"
                }
              )}>
                {option.badge}
              </span>
            )}
          </div>
          
          {option.description && (
            <div className="text-xs text-muted-foreground truncate text-left">
              {option.description}
            </div>
          )}
        </div>

        {selectProps.multiple && isSelected && (
          <Check className="h-4 w-4 flex-shrink-0" />
        )}
      </div>
    </div>
  );
};

// Select All Option Component
const SelectAllOption = () => {
  const { 
    selectedValues, 
    filteredOptions,
    selectAll,
    clearSelection,
    props: selectProps 
  } = useSelectContext();

  const allOptions = selectProps.options || 
    (selectProps.groups?.flatMap(g => g.options) || []);
  
  const selectableOptions = allOptions.filter(option => !option.disabled);
  const allSelected = selectableOptions.length > 0 && 
    selectableOptions.every(option => selectedValues.includes(option.value));
  const someSelected = selectedValues.length > 0 && !allSelected;

  const handleSelectAll = () => {
    if (allSelected) {
      clearSelection();
    } else {
      selectAll();
    }
  };

  const selectAllLabel = (selectProps as any).selectAllLabel || "Select All";

  return (
    <>
      <div
        className={cn(
          "flex items-center justify-between px-3 py-2 text-sm cursor-pointer rounded-sm transition-colors",
          "hover:bg-accent hover:text-accent-foreground border-b border-border mb-1",
          "font-medium text-primary"
        )}
        onClick={handleSelectAll}
        role="option"
        aria-selected={allSelected}
      >
        <div className="flex items-center gap-2">
          <div className={cn(
            "w-4 h-4 border border-primary rounded flex items-center justify-center",
            allSelected && "bg-primary text-primary-foreground",
            someSelected && "bg-primary/20"
          )}>
            {allSelected && <Check className="h-3 w-3" />}
            {someSelected && <div className="w-2 h-2 bg-primary rounded-sm" />}
          </div>
          <span>{selectAllLabel}</span>
        </div>
        <span className="text-xs text-muted-foreground">
          {selectedValues.length}/{selectableOptions.length}
        </span>
      </div>
    </>
  );
};

// Select Content Component
const SelectContent = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    const { 
      isOpen, 
      filteredOptions, 
      searchValue,
      props: selectProps 
    } = useSelectContext();

    if (!isOpen) return null;

    const showNoOptions = filteredOptions.length === 0;
    const showSearch = selectProps.searchable;

    const isScrollable = selectProps.scrollable !== false; // Default to true
    const maxHeight = selectProps.maxHeight || (isScrollable ? 300 : undefined);

    return (
      <div
        ref={ref}
        className={cn(
          "absolute z-50 w-full mt-1 bg-background border border-border rounded-md shadow-lg",
          "animate-in fade-in-0 zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=top]:slide-in-from-bottom-2",
          selectProps.dropdownClassName,
          className
        )}
        role="listbox"
        {...props}
      >
        {showSearch && <SelectSearch />}
        
        <div 
          className={cn(
            "p-1",
            isScrollable ? "overflow-y-auto" : "overflow-visible"
          )}
          style={isScrollable && maxHeight ? { maxHeight: `${maxHeight}px` } : undefined}
        >
          {showNoOptions ? (
            <div className="px-3 py-6 text-center text-sm text-muted-foreground">
              {searchValue ? 
                (selectProps.noSearchResultsMessage || "No results found") :
                (selectProps.noOptionsMessage || "No options available")
              }
            </div>
          ) : (
            <>
              {/* Select All Option for Multi-Select */}
              {selectProps.multiple && (selectProps as any).selectAll && !searchValue && (
                <SelectAllOption />
              )}
              
              {selectProps.groups ? (
                // Render grouped options
                selectProps.groups.map((group, groupIndex) => {
                  const groupOptions = group.options.filter(option => 
                    filteredOptions.some(filtered => filtered.value === option.value)
                  );
                  
                  if (groupOptions.length === 0) return null;
                  
                  return (
                    <div key={group.label}>
                      {selectProps.showGroupHeaders !== false && (
                        <div className="px-3 py-2 text-xs font-medium text-muted-foreground uppercase tracking-wider border-b border-border">
                          {group.label}
                        </div>
                      )}
                      {groupOptions.map((option) => {
                        const globalIndex = filteredOptions.findIndex(filtered => filtered.value === option.value);
                        return (
                          <div key={`${option.value}-${globalIndex}`} className="pl-4">
                            <SelectOptionComponent 
                              option={option} 
                              index={globalIndex}
                              showNumber={selectProps.numbered}
                              numberFormat={selectProps.numberFormat}
                            />
                          </div>
                        );
                      })}
                      {selectProps.groupDividers && groupIndex < (selectProps.groups?.length || 0) - 1 && (
                        <div className="border-b border-border my-1" />
                      )}
                    </div>
                  );
                })
              ) : (
                // Render flat options
                filteredOptions.map((option, index) => (
                  <SelectOptionComponent 
                    key={`${option.value}-${index}`} 
                    option={option} 
                    index={index}
                    showNumber={selectProps.numbered}
                    numberFormat={selectProps.numberFormat}
                  />
                ))
              )}
            </>
          )}
        </div>
      </div>
    );
  }
);
SelectContent.displayName = "SelectContent";

// Main Select Component
export const Select = forwardRef<HTMLDivElement, SelectProps & React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    const { 
      triggerRef, 
      dropdownRef, 
      isOpen, 
      close, 
      highlightNext, 
      highlightPrevious, 
      selectHighlighted 
    } = useSelectContext();

    // Keyboard navigation
    useEffect(() => {
      const handleKeyDown = (e: KeyboardEvent) => {
        if (!isOpen) return;

        switch (e.key) {
          case "ArrowDown":
            e.preventDefault();
            highlightNext();
            break;
          case "ArrowUp":
            e.preventDefault();
            highlightPrevious();
            break;
          case "Enter":
            e.preventDefault();
            selectHighlighted();
            break;
          case "Escape":
            e.preventDefault();
            close();
            break;
        }
      };

      if (isOpen) {
        document.addEventListener("keydown", handleKeyDown);
        return () => document.removeEventListener("keydown", handleKeyDown);
      }
    }, [isOpen, highlightNext, highlightPrevious, selectHighlighted, close]);

    // Click outside to close
    useEffect(() => {
      const handleClickOutside = (e: MouseEvent) => {
        if (
          isOpen &&
          triggerRef.current &&
          dropdownRef.current &&
          !triggerRef.current.contains(e.target as Node) &&
          !dropdownRef.current.contains(e.target as Node)
        ) {
          close();
        }
      };

      if (isOpen) {
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
      }
    }, [isOpen, close, triggerRef, dropdownRef]);

    return (
      <div ref={ref} className={cn("relative w-full", className)}>
        <SelectTrigger ref={triggerRef} />
        <SelectContent ref={dropdownRef} />
      </div>
    );
  }
);
Select.displayName = "Select";

// Main Export with Provider
export const theReactSelect = forwardRef<HTMLDivElement, SelectProps & React.HTMLAttributes<HTMLDivElement>>(
  (props, ref) => {
    return (
      <SelectProvider props={props}>
        <Select ref={ref} {...props} />
      </SelectProvider>
    );
  }
);
theReactSelect.displayName = "theReactSelect";

"use client";

import React, { createContext, useContext, useCallback, useRef, useState, useEffect } from "react";
import { SelectContext, SelectProps, SelectOption, SelectState, SelectActions } from "../types";

const SelectContextProvider = createContext<SelectContext | null>(null);

export function useSelectContext() {
  const context = useContext(SelectContextProvider);
  if (!context) {
    throw new Error("useSelectContext must be used within a SelectProvider");
  }
  return context;
}

interface SelectProviderProps {
  children: React.ReactNode;
  props: SelectProps;
}

export function SelectProvider({ children, props }: SelectProviderProps) {
  const triggerRef = useRef<HTMLButtonElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);

  const [state, setState] = useState<SelectState>({
    isOpen: props.defaultOpen || false,
    searchValue: "",
    highlightedIndex: -1,
    selectedValues: Array.isArray(props.defaultValue) 
      ? props.defaultValue 
      : props.defaultValue 
        ? [props.defaultValue] 
        : [],
    filteredOptions: [],
    loading: false,
  });

  // Get all available options
  const getAllOptions = useCallback((): SelectOption[] => {
    if (props.options) return props.options;
    if (props.groups) return props.groups.flatMap(group => group.options);
    return [];
  }, [props.options, props.groups]);

  // Filter options based on search
  const filterOptions = useCallback((options: SelectOption[], search: string): SelectOption[] => {
    if (!search.trim()) return options;
    return options.filter(option => 
      option.label.toLowerCase().includes(search.toLowerCase()) ||
      option.value.toString().toLowerCase().includes(search.toLowerCase())
    );
  }, []);

  // Update filtered options when search changes
  useEffect(() => {
    const allOptions = getAllOptions();
    const filtered = filterOptions(allOptions, state.searchValue);
    setState(prev => ({ ...prev, filteredOptions: filtered }));
  }, [state.searchValue, getAllOptions, filterOptions]);

  // Actions
  const open = useCallback(() => {
    setState(prev => ({ ...prev, isOpen: true }));
    props.onOpenChange?.(true);
  }, [props]);

  const close = useCallback(() => {
    setState(prev => ({ 
      ...prev, 
      isOpen: false, 
      searchValue: "", 
      highlightedIndex: -1 
    }));
    props.onOpenChange?.(false);
  }, [props]);

  const toggle = useCallback(() => {
    if (state.isOpen) close();
    else open();
  }, [state.isOpen, close, open]);

  const setSearchValue = useCallback((value: string) => {
    setState(prev => ({ ...prev, searchValue: value }));
    props.onSearchChange?.(value);
  }, [props]);

  const setHighlightedIndex = useCallback((index: number) => {
    setState(prev => ({ ...prev, highlightedIndex: index }));
  }, []);

  const selectOption = useCallback((option: SelectOption) => {
    if (option.disabled) return;

    if (props.multiple) {
      const newValues = state.selectedValues.includes(option.value)
        ? state.selectedValues.filter(v => v !== option.value)
        : [...state.selectedValues, option.value];
      
      setState(prev => ({ ...prev, selectedValues: newValues }));
      (props as any).onValueChange?.(newValues);
      (props as any).onOptionSelect?.(option, !state.selectedValues.includes(option.value));
    } else {
      setState(prev => ({ ...prev, selectedValues: [option.value] }));
      (props as any).onValueChange?.(option.value);
      (props as any).onOptionSelect?.(option);
      
      if (props.closeOnSelect !== false) {
        close();
      }
    }
  }, [props, state.selectedValues, close]);

  const deselectOption = useCallback((option: SelectOption) => {
    if (props.multiple) {
      const newValues = state.selectedValues.filter(v => v !== option.value);
      setState(prev => ({ ...prev, selectedValues: newValues }));
      (props as any).onValueChange?.(newValues);
      (props as any).onOptionSelect?.(option, false);
    }
  }, [props, state.selectedValues]);

  const clearSelection = useCallback(() => {
    setState(prev => ({ ...prev, selectedValues: [] }));
    if (props.multiple) {
      (props as any).onValueChange?.([]);
    } else {
      (props as any).onValueChange?.(undefined);
    }
    props.onClear?.();
  }, [props]);

  const highlightNext = useCallback(() => {
    setState(prev => ({
      ...prev,
      highlightedIndex: Math.min(prev.highlightedIndex + 1, prev.filteredOptions.length - 1)
    }));
  }, []);

  const highlightPrevious = useCallback(() => {
    setState(prev => ({
      ...prev,
      highlightedIndex: Math.max(prev.highlightedIndex - 1, 0)
    }));
  }, []);

  const selectAll = useCallback(() => {
    if (props.multiple) {
      const allOptions = getAllOptions();
      const selectableOptions = allOptions.filter(option => !option.disabled);
      const allValues = selectableOptions.map(option => option.value);
      
      setState(prev => ({ ...prev, selectedValues: allValues }));
      (props as any).onValueChange?.(allValues);
      (props as any).onSelectAll?.();
    }
  }, [props, getAllOptions]);

  const selectHighlighted = useCallback(() => {
    if (state.highlightedIndex >= 0 && state.filteredOptions[state.highlightedIndex]) {
      selectOption(state.filteredOptions[state.highlightedIndex]);
    }
  }, [state.highlightedIndex, state.filteredOptions, selectOption]);

  const contextValue: SelectContext = {
    ...state,
    props,
    triggerRef,
    dropdownRef,
    searchRef,
    open,
    close,
    toggle,
    setSearchValue,
    setHighlightedIndex,
    selectOption,
    deselectOption,
    clearSelection,
    selectAll,
    highlightNext,
    highlightPrevious,
    selectHighlighted,
  };

  return (
    <SelectContextProvider.Provider value={contextValue}>
      {children}
    </SelectContextProvider.Provider>
  );
}

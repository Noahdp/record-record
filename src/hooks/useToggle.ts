import { useState, useCallback } from "react";

interface UseToggleOptions {
  defaultValue?: boolean;
  onToggle?: (isOpen: boolean) => void;
}

interface UseToggleReturn {
  isOpen: boolean;
  toggle: () => void;
}

/**
 * Custom hook for managing toggle state (show/hide, open/close, etc.)
 * @param options - Configuration options
 * @returns Toggle state and control functions
 */
export function useToggle(options: UseToggleOptions = {}): UseToggleReturn {
  const { defaultValue = false, onToggle } = options;
  const [isOpen, setIsOpen] = useState(defaultValue);

  const toggle = useCallback(() => {
    const newValue = !isOpen;
    setIsOpen(newValue);
    onToggle?.(newValue);
  }, [isOpen, onToggle]);

  return {
    isOpen,
    toggle,
  };
}

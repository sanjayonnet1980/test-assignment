import { useRef } from "react";

export const useDateRefTrigger = () => {
  const dateRefs = useRef<HTMLInputElement[]>([]);

  const triggerDatePicker = (index: number) => {
    const input = dateRefs.current[index];
    if (input) {
      if (typeof input.showPicker === "function") {
        input.showPicker();
      } else {
        input.focus();
      }
    }
  };

  const setDateRef = (index: number) => (el: HTMLInputElement | null) => {
    if (el !== null) {
      dateRefs.current[index] = el;
    }
  };

  return { triggerDatePicker, setDateRef };
};

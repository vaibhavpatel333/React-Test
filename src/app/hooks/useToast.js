"use client";
import { useState, useCallback } from "react";

const useToast = () => {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback(
    (message, type) => {
      if (!toasts.some((toast) => toast.message === message)) {
        const id = Math.random().toString(36).substring(7);
        setToasts((prevToasts) => [...prevToasts, { id, message, type }]);
        setTimeout(() => removeToast(id), 4000); // Auto-remove after 4 seconds
      } // Auto-remove after 4 seconds
    },
    [toasts]
  );

  const removeToast = useCallback((id) => {
    setToasts((prevToasts) => {
      const findIndex = prevToasts.findIndex((a) => a.id === id);
      findIndex !== -1 && prevToasts.splice(findIndex, 1);
      return prevToasts;
    });
  }, [setToasts]);

  return {
    toasts,
    addToast,
    removeToast,
  };
};

export default useToast;

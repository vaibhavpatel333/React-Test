/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react/jsx-key */
"use client";
import { useState, useCallback, useEffect, useMemo } from "react";
import ToastNotification from "../components/ToastNotification";

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
  }, []);

  const ToastComponent = useMemo(() => {
    // eslint-disable-next-line react/display-name
    return ({ toasts, onRemove, position }) => {
      const [resizePosition, setResizePosition] = useState(position);

      const updatePosition = () => {
        if (window.innerWidth < 768) {
          setResizePosition("bottom-center");
        } else {
          setResizePosition("top-right");
        }
      };

      useEffect(() => {
        updatePosition();
        window.addEventListener("resize", updatePosition);
        return () => window.removeEventListener("resize", updatePosition);
      }, []);

      const getPositionClasses = () => {
        switch (resizePosition) {
          case "top-left":
            return "top-4 left-4";
          case "top-right":
            return "top-4 right-4";
          case "bottom-left":
            return "bottom-4 left-4";
          case "bottom-right":
            return "bottom-4 right-4";
          case "bottom-center":
            return "bottom-4 left-1/2 transform -translate-x-1/2";
          default:
            return "top-4 right-4";
        }
      };

      return (
        <div
          className={`fixed z-50 w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg flex flex-col space-y-4 max-h-screen overflow-y-auto ${getPositionClasses()}`}
        >
          {toasts?.map((toast) => (
            // eslint-disable-next-line react/jsx-key
            <div key={toast.id}>
              <ToastNotification
                id={toast.id}
                message={toast.message}
                type={toast.type}
                onRemove={onRemove}
              />
            </div>
          ))}
        </div>
      );
    };
  }, []);

  return {
    toasts,
    addToast,
    removeToast,
    ToastComponent,
  };
};

export default useToast;

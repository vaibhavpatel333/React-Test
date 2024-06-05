"use client";
import React, { useEffect, useState } from "react";
import ToastNotification from "./ToastNotification";

const ToastContainer = ({ toasts, onRemove, position }) => {

  const [reSizePosition, setReSizePosition] = useState(position);

  // Function to update position based on screen width
  const updatePosition = () => {
    if (window.innerWidth < 768) {
      setReSizePosition('bottom-center');
    } else {
      setReSizePosition('top-right');
    }
  };

  useEffect(() => {
    updatePosition();
    window.addEventListener('resize', updatePosition);
    return () => window.removeEventListener('resize', updatePosition);
  }, []);

  const getPositionClasses = () => {
    switch (reSizePosition) {
      case 'top-left':
        return 'top-4 left-4';
      case 'top-right':
        return 'top-4 right-4';
      case 'bottom-left':
        return 'bottom-4 left-4';
      case 'bottom-right':
        return 'bottom-4 right-4';
      case 'bottom-center':
        return 'bottom-4 left-1/2 transform -translate-x-1/2';
      default:
        return 'top-4 right-4';
    }
  };

  return (
    <div className={`fixed z-50 ${getPositionClasses()} flex flex-col items-end space-y-4 w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg max-h-screen overflow-y-auto`}>
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

export default ToastContainer;

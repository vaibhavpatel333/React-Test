"use client";
import React, { useState, useEffect } from "react";

const ToastNotification = ({ id, message, type, onRemove }) => {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    setVisible(true);
    const timer = setTimeout(() => {
      setVisible(false);
      setTimeout(() => onRemove(id), 300); // Delay to allow the animation to complete
    }, 4000);
    return () => clearTimeout(timer);
  }, [id, onRemove]);
  
  const getTypeClasses = () => {
    switch (type) {
      case "success":
        return "bg-green-500 text-white";
      case "warning":
        return "bg-yellow-500 text-black";
      case "error":
        return "bg-red-500 text-white";
      case "info":
        return "bg-blue-500 text-white";
      default:
        return "bg-gray-500 text-white";
    }
  };

  return (
    <div
      className={`w-full p-4 rounded shadow-lg transition-all duration-500 mb-4 ${
        visible ? "opacity-100" : "opacity-0"
      } ${getTypeClasses()}`}
      key={id}
    >
      <div className="flex items-center justify-between">
        <span>{message}</span>
        <button
          onClick={() => {
            setVisible(false);
            onRemove(id);
          }}
          className="ml-4 text-white hover:text-gray-300"
        >
          X
        </button>
      </div>
    </div>
  );
};

export default ToastNotification;

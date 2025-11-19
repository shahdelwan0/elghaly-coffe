"use client";

import { X, Check, AlertCircle, Info } from "lucide-react";
import { Toast } from "@/lib/toastContext";
import Image from "next/image";

interface ToastProps {
  toast: Toast;
  onClose: (id: string) => void;
}

export default function ToastComponent({ toast, onClose }: ToastProps) {
  const getIcon = () => {
    switch (toast.type) {
      case "success":
        return <Check className="w-5 h-5" />;
      case "error":
        return <AlertCircle className="w-5 h-5" />;
      case "warning":
        return <AlertCircle className="w-5 h-5" />;
      case "info":
      default:
        return <Info className="w-5 h-5" />;
    }
  };

  const getColors = () => {
    switch (toast.type) {
      case "success":
        return "bg-green-50 border-green-200 text-green-800";
      case "error":
        return "bg-red-50 border-red-200 text-red-800";
      case "warning":
        return "bg-yellow-50 border-yellow-200 text-yellow-800";
      case "info":
      default:
        return "bg-blue-50 border-blue-200 text-blue-800";
    }
  };

  const getIconColor = () => {
    switch (toast.type) {
      case "success":
        return "text-green-500";
      case "error":
        return "text-red-500";
      case "warning":
        return "text-yellow-500";
      case "info":
      default:
        return "text-blue-500";
    }
  };

  return (
    <div
      className={`rounded-lg border shadow-lg p-4 flex gap-3 items-start min-w-[300px] max-w-sm animate-in slide-in-from-left-5 duration-200 ${getColors()}`}
    >
      {/* Product Image */}
      {toast.image && (
        <div className="relative w-16 h-16 flex-shrink-0 rounded-md overflow-hidden bg-gray-200">
          <Image
            src={toast.image}
            alt={toast.title}
            fill
            className="object-cover object-center"
          />
        </div>
      )}

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-start gap-2">
          <div className={`flex-shrink-0 mt-0.5 ${getIconColor()}`}>
            {getIcon()}
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-sm">{toast.title}</h3>
            {toast.description && (
              <p className="text-xs opacity-90 mt-0.5">{toast.description}</p>
            )}
          </div>
        </div>
      </div>

      {/* Close Button */}
      <button
        onClick={() => onClose(toast.id)}
        className={`flex-shrink-0 p-1 rounded-md hover:bg-black/10 transition-colors`}
        aria-label="Close notification"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}

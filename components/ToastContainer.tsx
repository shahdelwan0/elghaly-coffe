"use client";

import { useToast } from "@/hooks/useToast";
import ToastComponent from "./Toast";

export default function ToastContainer() {
  const { toasts, removeToast } = useToast();

  return (
    <div className="fixed bottom-4 left-4 z-50 flex flex-col gap-3 pointer-events-none">
      {toasts.map((toast) => (
        <div key={toast.id} className="pointer-events-auto">
          <ToastComponent toast={toast} onClose={removeToast} />
        </div>
      ))}
    </div>
  );
}

// Toast notification system — lightweight, auto-dismissing feedback component.
import { useState, useEffect, useCallback, createContext, useContext, type ReactNode } from "react";
import { cn } from "#/lib/utils";
import { CheckCircle, XCircle, Info, X } from "lucide-react";

type ToastVariant = "success" | "error" | "info";

interface Toast {
    id: string;
    message: string;
    variant: ToastVariant;
}

interface ToastContextValue {
    toast: (message: string, variant?: ToastVariant) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

export function useToast() {
    const ctx = useContext(ToastContext);
    if (!ctx) throw new Error("useToast must be used inside ToastProvider");
    return ctx;
}

const icons: Record<ToastVariant, ReactNode> = {
    success: <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0" />,
    error: <XCircle className="w-4 h-4 text-red-400 flex-shrink-0" />,
    info: <Info className="w-4 h-4 text-cyan-400 flex-shrink-0" />,
};

const borderColors: Record<ToastVariant, string> = {
    success: "border-emerald-500/40",
    error: "border-red-500/40",
    info: "border-cyan-500/40",
};

export function ToastProvider({ children }: { children: ReactNode }) {
    const [toasts, setToasts] = useState<Toast[]>([]);

    const addToast = useCallback((message: string, variant: ToastVariant = "info") => {
        const id = Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
        setToasts((prev) => [...prev, { id, message, variant }]);
    }, []);

    const removeToast = useCallback((id: string) => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
    }, []);

    return (
        <ToastContext.Provider value={{ toast: addToast }}>
            {children}
            <div className="fixed bottom-4 right-4 z-[9999] flex flex-col gap-2 pointer-events-none">
                {toasts.map((t) => (
                    <ToastItem key={t.id} toast={t} onRemove={removeToast} />
                ))}
            </div>
        </ToastContext.Provider>
    );
}

function ToastItem({ toast, onRemove }: { toast: Toast; onRemove: (id: string) => void }) {
    useEffect(() => {
        const timer = setTimeout(() => onRemove(toast.id), 3500);
        return () => clearTimeout(timer);
    }, [toast.id, onRemove]);

    return (
        <div
            className={cn(
                "pointer-events-auto flex items-center gap-2.5 px-4 py-3 rounded-lg border bg-slate-900/95 backdrop-blur-sm shadow-lg shadow-black/30 text-sm text-slate-200 animate-in slide-in-from-right-5 fade-in duration-200 min-w-[280px] max-w-[400px]",
                borderColors[toast.variant],
            )}
        >
            {icons[toast.variant]}
            <span className="flex-1">{toast.message}</span>
            <button
                onClick={() => onRemove(toast.id)}
                className="text-slate-500 hover:text-slate-300 transition-colors flex-shrink-0"
            >
                <X className="w-3.5 h-3.5" />
            </button>
        </div>
    );
}

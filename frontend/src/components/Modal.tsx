import { X } from "lucide-react";
import { useEffect, type ReactNode } from "react";
import { createPortal } from "react-dom";

type ModalProps = {
    children: ReactNode;
    isOpen: boolean;
    onClose: () => void;
} 

export default function Modal({children, isOpen, onClose}: ModalProps) {
    useEffect(() => {
        if (!isOpen) return;

        function handleKeyDown(event: KeyboardEvent) {
            if (event.key === "Escape") {
                onClose();
            }
        }

        document.addEventListener("keydown", handleKeyDown);
        document.body.style.overflow = "hidden";

        return () => {
            document.removeEventListener("keydown", handleKeyDown);
            document.body.style.overflow = "";
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    const modalRoot = document.getElementById("modal-root"); 

    if(!modalRoot) return null; 

    return createPortal(
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4 py-8" onClick={onClose}>
            <div className="relative w-full max-w-2xl rounded-3xl bg-white p-5 shadow-2xl dark:bg-neutral-900" onClick={(event) => event.stopPropagation()}>
                <button
                    type="button"
                    aria-label="Close modal"
                    className="absolute right-4 top-4 rounded-full bg-neutral-100 p-2 text-neutral-600 transition hover:bg-neutral-200 dark:bg-neutral-800 dark:text-neutral-300 dark:hover:bg-neutral-700"
                    onClick={onClose}
                >
                    <X className="h-4 w-4" />
                </button>
                {children}
            </div>
        </div>, 
        modalRoot
    ); 
}

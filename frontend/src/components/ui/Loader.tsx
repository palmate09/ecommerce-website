import { cn } from "@/utils/cn";


interface LoaderProps {
    size?: number;
    className?: string
}
  
export function Loader({ size = 40, className }: LoaderProps) {
    return (
        <div className={cn("flex items-center justify-center", className)}>
            <div
                className="animate-spin rounded-full border-4 border-neutral-200 border-t-amber-600"
                style={{
                width: `${size}px`,
                height: `${size}px`,
                }}
            />
        </div>
    );
}
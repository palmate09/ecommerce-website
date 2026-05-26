

interface LoaderProps {
    size?: number;
}
  
export function Loader({ size = 40 }: LoaderProps) {
    return (
        <div className="flex items-center justify-center">
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
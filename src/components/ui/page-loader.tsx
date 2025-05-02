import { cn } from "@/lib/utils";

export default function PageLoader() {
  return (
    <div
      className={cn(
        "fixed inset-0 z-[9999] flex items-center justify-center bg-background/80 backdrop-blur-sm",
        "page-loader" // Add class for specific styling/animation targeting
      )}
      aria-label="Loading page"
      role="status"
    >
      <div className="page-loader-spinner"></div>
    </div>
  );
}

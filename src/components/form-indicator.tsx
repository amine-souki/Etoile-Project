import { cn } from "@/lib/utils";

interface FormIndicatorProps {
  result: 'W' | 'D' | 'L';
}

export default function FormIndicator({ result }: FormIndicatorProps) {
  const colorClasses = {
    W: 'bg-green-500',
    D: 'bg-gray-400', // Gray for Draw
    L: 'bg-red-500',
  };

  return (
    <span
      className={cn(
        "h-3.5 w-3.5 rounded-full inline-block", // Circle style
        colorClasses[result]
      )}
      aria-label={result === 'W' ? 'Win' : result === 'D' ? 'Draw' : 'Loss'} // Accessibility
    ></span>
  );
}

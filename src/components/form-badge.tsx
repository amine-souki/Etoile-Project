import { cn } from "@/lib/utils";

interface FormBadgeProps {
  result: 'W' | 'D' | 'L';
  size?: 'small' | 'default';
}

export default function FormBadge({ result, size = 'default' }: FormBadgeProps) {
  const baseClasses = "rounded-full flex justify-center items-center text-white";
  const sizeClasses = size === 'default'
    ? "h-5 w-5 text-xs"
    : "h-3 w-3 text-[8px]";

  const colorClasses = {
    W: 'bg-green-500',
    D: 'bg-yellow-500', // Using yellow-500 as an equivalent for 'bg-yellow'
    L: 'bg-red-500',
  };

  return (
    <span className={cn(baseClasses, sizeClasses, colorClasses[result])}>
      {result}
    </span>
  );
}

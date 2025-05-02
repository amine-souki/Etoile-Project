'use client';

import { cn } from "@/lib/utils";
import type { SVGProps } from "react";

export function TunisiaFlag({ className, ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 900 600"
      className={cn("inline-block h-4 w-auto", className)} // Adjust size as needed
      {...props}
    >
      <rect width="900" height="600" fill="#e70013" />
      <circle cx="450" cy="300" r="150" fill="#fff" />
      <circle cx="480" cy="300" r="120" fill="#e70013" />
      <path
        d="M416.338 360l19.486-59.814 19.486 59.814-51.02-36.953h63.095z"
        fill="#fff"
      />
    </svg>
  );
}

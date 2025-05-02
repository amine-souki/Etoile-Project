

"use client"

import * as React from "react"
import * as SliderPrimitive from "@radix-ui/react-slider"

import { cn } from "@/lib/utils"

const Slider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root> & {
    // Add value and onValueChange for controlled state
    value?: number[];
    onValueChange?: (value: number[]) => void;
  }
>(({ className, value, onValueChange, ...props }, ref) => (
  <SliderPrimitive.Root
    ref={ref}
    className={cn(
      "relative flex w-full touch-none select-none items-center",
      className
    )}
    value={value} // Pass value to the primitive
    onValueChange={onValueChange} // Pass onValueChange to the primitive
    {...props}
  >
    <SliderPrimitive.Track className="relative h-2 w-full grow overflow-hidden rounded-full bg-primary/20 dark:bg-primary/30"> {/* Adjusted background */}
      <SliderPrimitive.Range className="absolute h-full bg-primary" />
    </SliderPrimitive.Track>
    <SliderPrimitive.Thumb className="block h-5 w-5 rounded-full border-2 border-primary bg-background ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 cursor-pointer" /> {/* Added cursor-pointer */}
     {/* Optional: Value Label - You might need to dynamically position this based on the value */}
     {/*
     {value && value[0] !== undefined && (
        <span className="absolute top-[-25px] left-[calc(var(--slider-thumb-position,0%)-10px)] bg-popover text-popover-foreground px-2 py-0.5 rounded text-xs shadow" style={{'--slider-thumb-position': `${((value[0] - (props.min || 0)) / ((props.max || 100) - (props.min || 0))) * 100}%` } as React.CSSProperties}>
          {value[0]}
        </span>
     )}
     */}
  </SliderPrimitive.Root>
))
Slider.displayName = SliderPrimitive.Root.displayName

export { Slider }

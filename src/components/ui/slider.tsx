import * as React from "react"
import { cn } from "@/lib/utils"

interface SliderProps {
  value?: number[]
  onValueChange?: (value: number[]) => void
  max?: number
  step?: number
  className?: string
}

const Slider = React.forwardRef<HTMLInputElement, SliderProps>(
  ({ className, value = [0], onValueChange, max = 100, step = 1 }, ref) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = Number(e.target.value)
      onValueChange?.([newValue])
    }

    return (
      <div className={cn("relative flex w-full touch-none select-none items-center", className)}>
        <input
          ref={ref}
          type="range"
          min={0}
          max={max}
          step={step}
          value={value[0]}
          onChange={handleChange}
          className={cn(
            "w-full h-2 bg-neutral-200 rounded-lg appearance-none cursor-pointer",
            "accent-neutral-900",
            "[&::-webkit-slider-thumb]:appearance-none",
            "[&::-webkit-slider-thumb]:w-4",
            "[&::-webkit-slider-thumb]:h-4",
            "[&::-webkit-slider-thumb]:bg-neutral-900",
            "[&::-webkit-slider-thumb]:rounded-full",
            "[&::-webkit-slider-thumb]:cursor-pointer",
            "[&::-webkit-slider-thumb]:shadow-md",
            "[&::-moz-range-thumb]:w-4",
            "[&::-moz-range-thumb]:h-4",
            "[&::-moz-range-thumb]:bg-neutral-900",
            "[&::-moz-range-thumb]:rounded-full",
            "[&::-moz-range-thumb]:cursor-pointer",
            "[&::-moz-range-thumb]:border-0"
          )}
        />
      </div>
    )
  }
)

Slider.displayName = "Slider"

export { Slider }

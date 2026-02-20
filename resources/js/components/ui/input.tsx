import * as React from "react"

import { cn } from "@/lib/utils"

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "flex h-10 w-full min-w-0 rounded-lg border px-3 py-2 text-sm outline-none transition-all duration-200",
        "bg-muted/40 dark:bg-muted/20 text-foreground border-border",
        "placeholder:text-muted-foreground",
        "hover:border-primary/60",
        "focus-visible:border-primary focus-visible:ring-4 focus-visible:ring-primary/20",
        "disabled:pointer-events-none disabled:opacity-50",
        "aria-invalid:border-destructive aria-invalid:ring-4 aria-invalid:ring-destructive/20",
        className
      )}
      {...props}
    />
  )
}

export { Input }

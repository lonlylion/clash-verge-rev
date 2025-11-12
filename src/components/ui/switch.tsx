import * as SwitchPrimitives from "@radix-ui/react-switch";
import { forwardRef } from "react";

import { cn } from "@/lib/utils";

export type UiSwitchProps = React.ComponentPropsWithoutRef<
  typeof SwitchPrimitives.Root
>;

export const Switch = forwardRef<
  React.ElementRef<typeof SwitchPrimitives.Root>,
  UiSwitchProps
>(({ className, ...props }, ref) => (
  <SwitchPrimitives.Root
    ref={ref}
    className={cn(
      "peer inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border border-transparent bg-[var(--verge-color-muted)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--verge-color-ring)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--verge-color-background)] disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-[var(--verge-color-primary)]",
      className,
    )}
    {...props}
  >
    <SwitchPrimitives.Thumb
      className={cn(
        "pointer-events-none block h-5 w-5 rounded-full bg-white shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-1",
      )}
    />
  </SwitchPrimitives.Root>
));

Switch.displayName = SwitchPrimitives.Root.displayName;

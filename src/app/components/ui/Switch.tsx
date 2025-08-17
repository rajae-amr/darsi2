"use client";

import * as React from "react";
import * as SwitchPrimitives from "@radix-ui/react-switch";
import { cn } from "@/app/lib/utils";

/**
 * مكون المفتاح (Switch)
 * يستخدم للتبديل بين حالتين (تشغيل/إيقاف) مع دعم الوضع المظلم والاتجاه RTL
 */
const Switch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitives.Root>,
  React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root>
>(({ className, ...props }, ref) => (
  <SwitchPrimitives.Root
    className={cn("switch-root", className)}
    {...props}
    ref={ref}
  >
    <SwitchPrimitives.Thumb className="switch-thumb" />
  </SwitchPrimitives.Root>
));

Switch.displayName = SwitchPrimitives.Root.displayName;

export { Switch };

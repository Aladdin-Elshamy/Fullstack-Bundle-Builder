import type { ReactNode } from "react";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";

export default function DisabledStepperTooltip({
  message,
  children,
}: {
  message?: string;
  children: ReactNode;
}) {
  if (!message) {
    return children;
  }

  return (
    <Tooltip>
      <TooltipTrigger
        delay={0}
        render={<span className="inline-flex" tabIndex={0} />}
      >
        {children}
      </TooltipTrigger>
      <TooltipContent>{message}</TooltipContent>
    </Tooltip>
  );
}

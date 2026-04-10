import { Info } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

type AccentColor = "primary" | "secondary" | "success" | "warning" | "danger";

const borderColors: Record<AccentColor, string> = {
  primary: "border-t-primary",
  secondary: "border-t-secondary",
  success: "border-t-success",
  warning: "border-t-warning",
  danger: "border-t-danger",
};

const textColors: Record<AccentColor, string> = {
  primary: "text-primary",
  secondary: "text-secondary",
  success: "text-success",
  warning: "text-warning",
  danger: "text-danger",
};

interface StatCardProps {
  label: string;
  value: string | number;
  accent?: AccentColor;
  tooltip?: string;
  icon?: React.ReactNode;
}

export function StatCard({ label, value, accent = "primary", tooltip, icon }: StatCardProps) {
  return (
    <div className={`bg-card rounded-lg border-t-4 ${borderColors[accent]} border border-border p-5 card-lift`}>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-muted-foreground text-sm mb-1">{label}</p>
          <p className={`text-3xl font-bold ${textColors[accent]}`}>{value}</p>
        </div>
        <div className="flex items-center gap-2">
          {icon && <span className={`${textColors[accent]} opacity-60`}>{icon}</span>}
          {tooltip && (
            <Tooltip>
              <TooltipTrigger>
                <Info className="h-4 w-4 text-muted-foreground" />
              </TooltipTrigger>
              <TooltipContent className="bg-popover text-popover-foreground border-border">
                <p className="text-sm">{tooltip}</p>
              </TooltipContent>
            </Tooltip>
          )}
        </div>
      </div>
    </div>
  );
}

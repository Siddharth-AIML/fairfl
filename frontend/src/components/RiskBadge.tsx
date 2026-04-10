const levels = {
  LOW: { bg: "bg-success/15", text: "text-success", border: "border-success/30" },
  MEDIUM: { bg: "bg-warning/15", text: "text-warning", border: "border-warning/30" },
  HIGH: { bg: "bg-danger/15", text: "text-danger", border: "border-danger/30" },
  CRITICAL: { bg: "bg-danger/25", text: "text-danger", border: "border-danger/50" },
};

interface RiskBadgeProps {
  level: keyof typeof levels;
  size?: "sm" | "lg";
}

export function RiskBadge({ level, size = "sm" }: RiskBadgeProps) {
  const s = levels[level];
  return (
    <span className={`inline-flex items-center gap-2 rounded-full border px-4 py-1.5 font-semibold ${s.bg} ${s.text} ${s.border} ${size === "lg" ? "text-lg px-6 py-2" : "text-xs"}`}>
      <span className={`h-2 w-2 rounded-full ${s.text} bg-current animate-pulse-glow`} />
      {level}
    </span>
  );
}

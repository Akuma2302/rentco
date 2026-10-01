import { TrendingUp, TrendingDown, Minus } from "lucide-react";

interface DemandBadgeProps {
  demand: "low" | "medium" | "high";
  explanation?: string;
  size?: "sm" | "md";
}

const CONFIG = {
  high: {
    label: "High Demand",
    Icon: TrendingUp,
    color: "text-emerald-700",
    bg: "bg-emerald-50",
    ring: "ring-emerald-300",
    dot: "bg-emerald-500",
  },
  medium: {
    label: "Medium Demand",
    Icon: Minus,
    color: "text-amber-700",
    bg: "bg-amber-50",
    ring: "ring-amber-300",
    dot: "bg-amber-400",
  },
  low: {
    label: "Low Demand",
    Icon: TrendingDown,
    color: "text-gray-500",
    bg: "bg-gray-50",
    ring: "ring-gray-200",
    dot: "bg-gray-400",
  },
};

export function DemandBadge({ demand, explanation, size = "md" }: DemandBadgeProps) {
  const { label, Icon, color, bg, ring, dot } = CONFIG[demand];

  if (size === "sm") {
    return (
      <span className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-medium ${bg} ${color}`}>
        <span className={`w-1.5 h-1.5 rounded-full ${dot}`} />
        {demand === "high" ? "High" : demand === "medium" ? "Medium" : "Low"}
      </span>
    );
  }

  return (
    <div className={`rounded-lg p-3 ring-1 ${bg} ${ring}`}>
      <div className="flex items-center gap-2 mb-0.5">
        <Icon className={`w-4 h-4 ${color}`} />
        <span className={`text-sm font-semibold ${color}`}>{label}</span>
      </div>
      {explanation && (
        <p className="text-xs text-gray-500 ml-6">{explanation}</p>
      )}
    </div>
  );
}

import { ShieldCheck } from "lucide-react";
import { getTrustTier } from "../data/trustScore";

interface TrustScoreBadgeProps {
  score: number;
  size?: "sm" | "md";
}

export function TrustScoreBadge({ score, size = "md" }: TrustScoreBadgeProps) {
  const tier = getTrustTier(score);

  if (size === "sm") {
    return (
      <span
        className={`inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded text-[10px] font-semibold ${tier.bg} ${tier.color}`}
      >
        <ShieldCheck className="w-2.5 h-2.5" />
        {score}
      </span>
    );
  }

  return (
    <div
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ring-1 ${tier.bg} ${tier.color} ${tier.ring}`}
    >
      <ShieldCheck className="w-3.5 h-3.5" />
      <span>Trust {score}</span>
      <span className="opacity-60">· {tier.label}</span>
    </div>
  );
}

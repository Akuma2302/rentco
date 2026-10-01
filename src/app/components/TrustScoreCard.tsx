import { useState } from "react";
import { ShieldCheck, ChevronDown, ChevronUp } from "lucide-react";
import type { TrustScoreData } from "../data/trustScore";
import { getTrustTier } from "../data/trustScore";

interface TrustScoreCardProps {
  data: TrustScoreData;
  ownerName?: string;
  compact?: boolean;
}

export function TrustScoreCard({ data, ownerName, compact = false }: TrustScoreCardProps) {
  const [expanded, setExpanded] = useState(false);
  const tier = getTrustTier(data.total);

  const circumference = 2 * Math.PI * 28;
  const offset = circumference - (data.total / 100) * circumference;

  return (
    <div className={`rounded-xl border ${tier.bg} ${tier.ring} ring-1 overflow-hidden`}>
      {/* Score Header */}
      <div className="flex items-center gap-4 p-4">
        {/* Circular gauge */}
        <div className="relative flex-shrink-0 w-16 h-16">
          <svg className="w-16 h-16 -rotate-90" viewBox="0 0 64 64">
            <circle
              cx="32"
              cy="32"
              r="28"
              fill="none"
              stroke="currentColor"
              strokeWidth="5"
              className="text-black/10"
            />
            <circle
              cx="32"
              cy="32"
              r="28"
              fill="none"
              strokeWidth="5"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={offset}
              className={`${tier.bar} transition-all duration-700`}
              style={{ stroke: "currentColor" }}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className={`text-lg font-bold leading-none ${tier.color}`}>{data.total}</span>
            <span className="text-[9px] text-gray-500 leading-tight">/ 100</span>
          </div>
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5 mb-0.5">
            <ShieldCheck className={`w-4 h-4 ${tier.color}`} />
            <span className={`text-sm font-semibold ${tier.color}`}>
              Trust Score — {tier.label}
            </span>
          </div>
          {ownerName && (
            <p className="text-xs text-gray-600 mb-0.5 truncate">{ownerName}</p>
          )}
          <p className="text-xs text-gray-500">{tier.description}</p>
        </div>
      </div>

      {/* Expand toggle */}
      {!compact && (
        <>
          <button
            onClick={() => setExpanded((v) => !v)}
            className="w-full flex items-center justify-center gap-1 py-2 text-xs text-gray-500 border-t border-black/5 hover:bg-black/5 transition-colors"
          >
            {expanded ? (
              <>
                Hide breakdown <ChevronUp className="w-3.5 h-3.5" />
              </>
            ) : (
              <>
                View score breakdown <ChevronDown className="w-3.5 h-3.5" />
              </>
            )}
          </button>

          {expanded && (
            <div className="px-4 pb-4 space-y-3 border-t border-black/5 pt-3">
              <p className="text-[11px] text-gray-400 uppercase tracking-wide font-medium">
                Contributing Factors
              </p>
              {data.factors.map((factor) => (
                <div key={factor.key}>
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs text-gray-700">{factor.label}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className={`text-xs font-semibold ${tier.color}`}>
                        {factor.earned}
                      </span>
                      <span className="text-[10px] text-gray-400">/{factor.max}</span>
                    </div>
                  </div>
                  <div className="h-1.5 bg-black/10 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${tier.bar}`}
                      style={{ width: `${(factor.earned / factor.max) * 100}%` }}
                    />
                  </div>
                  <p className="text-[10px] text-gray-400 mt-0.5">{factor.description}</p>
                </div>
              ))}
              <div className={`mt-2 pt-2 border-t border-black/10 flex items-center justify-between`}>
                <span className="text-xs text-gray-500">Total Trust Score</span>
                <span className={`text-sm font-bold ${tier.color}`}>{data.total} / 100</span>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}

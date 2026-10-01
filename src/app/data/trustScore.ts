export interface TrustFactor {
  key: string;
  label: string;
  earned: number;
  max: number;
  description: string;
  icon: string;
}

export interface TrustScoreData {
  total: number; // 0–100
  factors: TrustFactor[];
  completedRentals: number;
  returnRate: number;
  averageRating: number;
  cancellationRate: number;
  isVerified: boolean;
  hasDisputes: boolean;
  memberSince: string;
}

export type TrustTier = {
  label: string;
  color: string;
  bg: string;
  ring: string;
  bar: string;
  description: string;
};

export function getTrustTier(score: number): TrustTier {
  if (score >= 90)
    return {
      label: "Excellent",
      color: "text-emerald-700",
      bg: "bg-emerald-50",
      ring: "ring-emerald-400",
      bar: "bg-emerald-500",
      description: "Highly trusted by the community",
    };
  if (score >= 75)
    return {
      label: "Very Good",
      color: "text-teal-700",
      bg: "bg-teal-50",
      ring: "ring-teal-400",
      bar: "bg-teal-500",
      description: "Reliable and well-reviewed",
    };
  if (score >= 60)
    return {
      label: "Good",
      color: "text-amber-700",
      bg: "bg-amber-50",
      ring: "ring-amber-400",
      bar: "bg-amber-500",
      description: "Generally dependable",
    };
  if (score >= 40)
    return {
      label: "Fair",
      color: "text-orange-700",
      bg: "bg-orange-50",
      ring: "ring-orange-400",
      bar: "bg-orange-500",
      description: "Some concerns — review carefully",
    };
  return {
    label: "New",
    color: "text-gray-600",
    bg: "bg-gray-50",
    ring: "ring-gray-300",
    bar: "bg-gray-400",
    description: "Limited history available",
  };
}

function buildFactors(data: {
  completedRentals: number;
  returnRate: number;
  averageRating: number;
  cancellationRate: number;
  isVerified: boolean;
  hasDisputes: boolean;
  memberSince: string;
}): TrustFactor[] {
  const rentalEarned = Math.min(30, Math.round((data.completedRentals / 30) * 30));
  const returnEarned = Math.round((data.returnRate / 100) * 20);
  const ratingEarned = Math.round(((data.averageRating - 1) / 4) * 20);
  const cancelEarned = Math.max(0, Math.round((1 - data.cancellationRate / 100) * 10));
  const verifyEarned = data.isVerified ? 10 : 0;
  const disputeEarned = data.hasDisputes ? 0 : 5;
  const memberYears = new Date().getFullYear() - new Date(data.memberSince).getFullYear();
  const activityEarned = Math.min(5, memberYears + 1);

  return [
    {
      key: "rentals",
      label: "Completed Rentals",
      earned: rentalEarned,
      max: 30,
      description: `${data.completedRentals} successful rentals`,
      icon: "📦",
    },
    {
      key: "returns",
      label: "Successful Returns",
      earned: returnEarned,
      max: 20,
      description: `${data.returnRate}% return rate`,
      icon: "↩️",
    },
    {
      key: "rating",
      label: "User Ratings",
      earned: ratingEarned,
      max: 20,
      description: `${data.averageRating.toFixed(1)} average rating`,
      icon: "⭐",
    },
    {
      key: "cancellations",
      label: "Cancellation Record",
      earned: cancelEarned,
      max: 10,
      description: `${data.cancellationRate}% cancellation rate`,
      icon: "❌",
    },
    {
      key: "verification",
      label: "Verification Status",
      earned: verifyEarned,
      max: 10,
      description: data.isVerified ? "Email & student ID verified" : "Not yet verified",
      icon: "✅",
    },
    {
      key: "disputes",
      label: "Dispute History",
      earned: disputeEarned,
      max: 5,
      description: data.hasDisputes ? "Has prior disputes" : "No dispute history",
      icon: "⚖️",
    },
    {
      key: "activity",
      label: "Account Activity",
      earned: activityEarned,
      max: 5,
      description: `Member since ${new Date(data.memberSince).toLocaleDateString("en-MY", { month: "short", year: "numeric" })}`,
      icon: "📅",
    },
  ];
}

function makeTrustScore(raw: Omit<TrustScoreData, "total" | "factors">): TrustScoreData {
  const factors = buildFactors(raw);
  const total = factors.reduce((sum, f) => sum + f.earned, 0);
  return { ...raw, factors, total };
}

// ── Per-owner trust scores keyed by ownerId ────────────────────────────────

export const mockTrustScores: Record<string, TrustScoreData> = {
  // currentUser – Ahmad Faris
  "1": makeTrustScore({
    completedRentals: 24,
    returnRate: 96,
    averageRating: 4.8,
    cancellationRate: 4,
    isVerified: true,
    hasDisputes: false,
    memberSince: "2025-01-10",
  }),
  // Sarah Lee
  "2": makeTrustScore({
    completedRentals: 31,
    returnRate: 98,
    averageRating: 4.9,
    cancellationRate: 2,
    isVerified: true,
    hasDisputes: false,
    memberSince: "2024-08-15",
  }),
  // Raj Kumar
  "3": makeTrustScore({
    completedRentals: 18,
    returnRate: 94,
    averageRating: 4.7,
    cancellationRate: 6,
    isVerified: true,
    hasDisputes: false,
    memberSince: "2024-10-01",
  }),
  // Lisa Tan
  "4": makeTrustScore({
    completedRentals: 42,
    returnRate: 100,
    averageRating: 5.0,
    cancellationRate: 0,
    isVerified: true,
    hasDisputes: false,
    memberSince: "2024-03-20",
  }),
  // David Wong
  "5": makeTrustScore({
    completedRentals: 14,
    returnRate: 92,
    averageRating: 4.6,
    cancellationRate: 8,
    isVerified: true,
    hasDisputes: false,
    memberSince: "2025-02-14",
  }),
  // Emily Chen
  "6": makeTrustScore({
    completedRentals: 22,
    returnRate: 95,
    averageRating: 4.8,
    cancellationRate: 5,
    isVerified: true,
    hasDisputes: false,
    memberSince: "2024-09-05",
  }),
  // Marcus Lim
  "7": makeTrustScore({
    completedRentals: 29,
    returnRate: 97,
    averageRating: 4.9,
    cancellationRate: 3,
    isVerified: true,
    hasDisputes: false,
    memberSince: "2024-07-11",
  }),
  // Priya Singh
  "8": makeTrustScore({
    completedRentals: 16,
    returnRate: 93,
    averageRating: 4.7,
    cancellationRate: 7,
    isVerified: true,
    hasDisputes: false,
    memberSince: "2025-01-22",
  }),
  // Kevin Ng
  "9": makeTrustScore({
    completedRentals: 38,
    returnRate: 99,
    averageRating: 5.0,
    cancellationRate: 1,
    isVerified: true,
    hasDisputes: false,
    memberSince: "2024-05-30",
  }),
  // Aisha Rahman
  "10": makeTrustScore({
    completedRentals: 20,
    returnRate: 95,
    averageRating: 4.8,
    cancellationRate: 5,
    isVerified: true,
    hasDisputes: false,
    memberSince: "2024-11-18",
  }),
  // Jason Tan
  "11": makeTrustScore({
    completedRentals: 10,
    returnRate: 90,
    averageRating: 4.6,
    cancellationRate: 10,
    isVerified: false,
    hasDisputes: true,
    memberSince: "2025-03-01",
  }),
};

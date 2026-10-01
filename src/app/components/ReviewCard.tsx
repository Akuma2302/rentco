import { Star } from "lucide-react";
import type { Review } from "../data/mockData";

interface ReviewCardProps {
  review: Review;
}

export function ReviewCard({ review }: ReviewCardProps) {
  return (
    <div className="bg-brand-sky rounded-2xl p-3">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-brand-blue font-bold rounded-full flex items-center justify-center text-white text-sm">
            {review.userName.charAt(0)}
          </div>
          <div>
            <p className="text-sm">{review.userName}</p>
            <p className="text-xs text-gray-500">{review.date}</p>
          </div>
        </div>
        <div className="flex items-center gap-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={`w-4 h-4 ${
                i < review.rating
                  ? "fill-yellow-400 text-yellow-400"
                  : "text-gray-300"
              }`}
            />
          ))}
        </div>
      </div>
      <p className="text-sm text-gray-700">{review.comment}</p>
    </div>
  );
}

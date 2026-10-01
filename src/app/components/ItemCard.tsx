import { useState } from "react";
import { useNavigate } from "react-router";
import { Star, MapPin, Heart, Pencil } from "lucide-react";
import type { Item } from "../data/mockData";
import { mockTrustScores } from "../data/trustScore";
import { TrustScoreBadge } from "./TrustScoreBadge";

interface ItemCardProps {
  item: Item;
  /** Shows an edit button instead of the save heart, for the owner's own listings. */
  onEdit?: () => void;
}

export function ItemCard({ item, onEdit }: ItemCardProps) {
  const navigate = useNavigate();
  const [saved, setSaved] = useState(false);
  const trustScore = mockTrustScores[item.ownerId];

  return (
    <div
      onClick={() => navigate(`/home/item/${item.id}`)}
      className="group cursor-pointer"
    >
      <div className="relative aspect-[4/3.4] rounded-2xl overflow-hidden bg-brand-sky">
        <img
          src={item.image}
          alt={item.title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
        />
        {onEdit ? (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onEdit();
            }}
            aria-label={`Edit ${item.title}`}
            className="absolute top-2 right-2 z-10 h-8 px-2.5 rounded-full bg-white/95 flex items-center gap-1 text-[11px] font-semibold text-brand-navy shadow-sm cursor-pointer hover:text-brand-blue"
          >
            <Pencil className="w-3.5 h-3.5" />
            Edit
          </button>
        ) : (
          <button
            onClick={(e) => {
              e.stopPropagation();
              setSaved((s) => !s);
            }}
            aria-label={saved ? "Remove from saved" : "Save item"}
            className="absolute top-2 right-2 w-8 h-8 rounded-full bg-white/95 flex items-center justify-center shadow-sm"
          >
            <Heart
              className={`w-4 h-4 ${saved ? "fill-brand-blue text-brand-blue" : "text-brand-navy"}`}
            />
          </button>
        )}
        {trustScore && (
          <div className="absolute bottom-2 left-2">
            <TrustScoreBadge score={trustScore.total} size="sm" />
          </div>
        )}
        {!item.availability && (
          <div className="absolute inset-0 bg-brand-navy/55 flex items-center justify-center">
            <span className="px-2.5 py-1 rounded-full bg-white text-brand-navy text-[11px] font-semibold">
              Unavailable
            </span>
          </div>
        )}
      </div>
      <div className="pt-2 px-0.5">
        <h3 className="text-[13px] font-bold text-brand-navy line-clamp-1 leading-snug">
          {item.title}
        </h3>
        <p className="text-[13px] mt-0.5">
          <span className="font-bold text-brand-blue">RM {item.price}</span>
          <span className="text-muted-foreground"> / {item.period}</span>
        </p>
        <div className="flex items-center gap-1 text-[11px] text-muted-foreground mt-0.5">
          <Star className="w-3 h-3 fill-[#F5B82E] text-[#F5B82E]" />
          <span className="font-semibold text-brand-navy">{item.ownerRating}</span>
          <span>·</span>
          <MapPin className="w-3 h-3" />
          <span className="truncate">{item.location}</span>
        </div>
      </div>
    </div>
  );
}

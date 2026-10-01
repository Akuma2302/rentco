import { useState } from "react";
import { useParams, useNavigate } from "react-router";
import {
  ArrowLeft,
  Star,
  MapPin,
  MessageCircle,
  ShieldCheck,
  FileText,
  Heart,
  Share2,
  BadgeCheck,
  Lock,
  Camera,
} from "lucide-react";
import { toast } from "sonner";
import { Button } from "../components/ui/button";
import { mockReviews } from "../data/mockData";
import { getItem } from "../data/listings";
import { ReviewCard } from "../components/ReviewCard";
import { mockTrustScores } from "../data/trustScore";
import { TrustScoreCard } from "../components/TrustScoreCard";
import { DemandBadge } from "../components/DemandBadge";
import { RentalAgreementModal } from "../components/RentalAgreementModal";
import type { Rental } from "../data/mockData";

export function ItemDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [showAgreement, setShowAgreement] = useState(false);
  const [saved, setSaved] = useState(false);
  const item = getItem(id);
  const itemReviews = mockReviews.filter((r) => r.itemId === id);
  const ownerTrust = item ? mockTrustScores[item.ownerId] : undefined;

  const previewRental: Rental = item
    ? {
        id: "preview",
        itemId: item.id,
        itemTitle: item.title,
        itemImage: item.image,
        renterId: "1",
        renterName: "Ahmad Faris",
        ownerId: item.ownerId,
        ownerName: item.ownerName,
        startDate: new Date().toISOString().split("T")[0],
        endDate: new Date(Date.now() + 86400000).toISOString().split("T")[0],
        status: "pending",
        price: item.price,
      }
    : ({} as Rental);

  if (!item) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-brand-navy font-semibold">Item not found</p>
      </div>
    );
  }

  const reviewCount = ownerTrust?.completedRentals ?? itemReviews.length;

  return (
    <div className="flex flex-col h-full bg-white">
      <div className="flex-1 overflow-y-auto">
        {/* Top bar */}
        <div className="px-5 pt-7 pb-3 flex items-center justify-between">
          <button
            onClick={() => navigate(-1)}
            aria-label="Back"
            className="w-9 h-9 -ml-1 rounded-full flex items-center justify-center text-brand-navy hover:bg-brand-sky"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="flex gap-1">
            <button
              onClick={() => setSaved((s) => !s)}
              aria-label={saved ? "Remove from saved" : "Save item"}
              className="w-9 h-9 rounded-full flex items-center justify-center text-brand-navy hover:bg-brand-sky"
            >
              <Heart className={`w-5 h-5 ${saved ? "fill-brand-blue text-brand-blue" : ""}`} />
            </button>
            <button
              onClick={() => toast.success("Link copied")}
              aria-label="Share"
              className="w-9 h-9 rounded-full flex items-center justify-center text-brand-navy hover:bg-brand-sky"
            >
              <Share2 className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Image */}
        <div className="px-5">
          <div className="relative rounded-3xl overflow-hidden bg-brand-sky aspect-[4/3]">
            <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
            {!item.availability && (
              <div className="absolute inset-0 bg-brand-navy/55 flex items-center justify-center">
                <span className="px-3 py-1.5 rounded-full bg-white text-brand-navy text-xs font-semibold">
                  Currently Unavailable
                </span>
              </div>
            )}
            <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-white/95 text-[11px] font-semibold text-brand-navy">
              {item.category}
            </span>
          </div>
        </div>

        <div className="px-5 pt-4 pb-6 space-y-5">
          {/* Title and price */}
          <div>
            <h1 className="text-[22px] text-brand-navy">{item.title}</h1>
            <p className="mt-1 text-xl">
              <span className="font-extrabold text-brand-blue">RM {item.price}</span>
              <span className="text-base text-muted-foreground"> / {item.period}</span>
            </p>
            <div className="flex items-center gap-1 mt-1.5 text-sm">
              <Star className="w-4 h-4 fill-[#F5B82E] text-[#F5B82E]" />
              <span className="font-semibold text-brand-navy">{item.ownerRating}</span>
              <span className="text-muted-foreground">({reviewCount} reviews)</span>
            </div>
            <div className="flex flex-wrap gap-2 mt-3">
              {ownerTrust?.isVerified && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 text-[11px] font-semibold ring-1 ring-emerald-200">
                  <BadgeCheck className="w-3.5 h-3.5" />
                  Verified Owner
                </span>
              )}
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-brand-sky text-brand-navy text-[11px] font-semibold">
                <MapPin className="w-3.5 h-3.5 text-brand-blue" />
                {item.location}
              </span>
              {item.demand && <DemandBadge demand={item.demand} size="sm" />}
            </div>
          </div>

          {/* About */}
          <div>
            <h2 className="text-base text-brand-navy mb-1.5">About this item</h2>
            <p className="text-sm leading-relaxed text-muted-foreground">{item.description}</p>
          </div>

          {/* Owner */}
          <div>
            <h2 className="text-base text-brand-navy mb-2">Owner</h2>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-brand-blue to-[#5B8BFF] text-white flex items-center justify-center text-lg font-bold">
                {item.ownerName.charAt(0)}
              </div>
              <div className="flex-1">
                <p className="font-bold text-brand-navy">{item.ownerName}</p>
                <p className="text-xs text-muted-foreground">Active 2 hours ago</p>
              </div>
              <button
                onClick={() => navigate("/home/messages")}
                aria-label="Message owner"
                className="w-10 h-10 rounded-full bg-brand-sky text-brand-blue flex items-center justify-center"
              >
                <MessageCircle className="w-5 h-5" />
              </button>
            </div>
            {ownerTrust && (
              <div className="mt-3">
                <TrustScoreCard data={ownerTrust} ownerName={item.ownerName} />
              </div>
            )}
          </div>

          {/* Rental protection */}
          <div className="rounded-2xl bg-brand-sky p-4">
            <div className="flex items-center gap-2 mb-2">
              <ShieldCheck className="w-5 h-5 text-brand-blue" />
              <p className="text-sm font-bold text-brand-navy flex-1">Rental Protection</p>
              <button
                onClick={() => setShowAgreement(true)}
                className="flex items-center gap-1 text-xs font-semibold text-brand-blue"
              >
                <FileText className="w-3.5 h-3.5" />
                View agreement
              </button>
            </div>
            <ul className="space-y-1.5 text-xs text-brand-navy/80">
              {item.deposit && (
                <li className="flex items-center gap-2">
                  <Lock className="w-3.5 h-3.5 text-brand-blue" />
                  Refundable deposit: <strong className="text-brand-navy">RM {item.deposit}</strong>
                </li>
              )}
              <li className="flex items-center gap-2">
                <FileText className="w-3.5 h-3.5 text-brand-blue" />
                Digital rental agreement included
              </li>
              <li className="flex items-center gap-2">
                <Camera className="w-3.5 h-3.5 text-brand-blue" />
                AI condition check before & after rental
              </li>
            </ul>
          </div>

          {/* Reviews */}
          {itemReviews.length > 0 && (
            <div>
              <h2 className="text-base text-brand-navy mb-2">Reviews ({itemReviews.length})</h2>
              <div className="space-y-3">
                {itemReviews.map((review) => (
                  <ReviewCard key={review.id} review={review} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Book bar */}
      <div className="border-t border-border bg-white px-5 py-3 flex items-center gap-4">
        <div>
          <p className="text-[11px] text-muted-foreground">Price</p>
          <p className="text-lg leading-tight">
            <span className="font-extrabold text-brand-blue">RM {item.price}</span>
            <span className="text-xs text-muted-foreground"> / {item.period}</span>
          </p>
        </div>
        <Button
          className="flex-1 h-12 rounded-2xl text-base font-bold"
          disabled={!item.availability}
          onClick={() => navigate(`/home/payment/${item.id}`)}
        >
          {item.availability ? "Book Now" : "Currently Unavailable"}
        </Button>
      </div>

      <RentalAgreementModal
        open={showAgreement}
        onClose={() => setShowAgreement(false)}
        rental={previewRental}
      />
    </div>
  );
}

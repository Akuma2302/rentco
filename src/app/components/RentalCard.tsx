import { useState } from "react";
import { Calendar, User, Camera, FileText } from "lucide-react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import type { Rental } from "../data/mockData";
import { ConditionCheckModal } from "./ConditionCheckModal";
import { RentalAgreementModal } from "./RentalAgreementModal";

interface RentalCardProps {
  rental: Rental;
  type: "renting" | "lending";
}

export function RentalCard({ rental, type }: RentalCardProps) {
  const [showCondition, setShowCondition] = useState(false);
  const [showAgreement, setShowAgreement] = useState(false);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":    return "bg-green-100 text-green-800";
      case "pending":   return "bg-yellow-100 text-yellow-800";
      case "completed": return "bg-blue-100 text-blue-800";
      case "cancelled": return "bg-red-100 text-red-800";
      default:          return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <>
      <div className="bg-white rounded-2xl ring-1 ring-border shadow-[0_6px_20px_-12px_rgba(11,27,63,0.25)] p-3">
        <div className="flex gap-3">
          <img
            src={rental.itemImage}
            alt={rental.itemTitle}
            className="w-20 h-20 object-cover rounded-xl flex-shrink-0"
          />
          <div className="flex-1 min-w-0">
            <h3 className="text-sm font-bold text-brand-navy line-clamp-2 mb-1">{rental.itemTitle}</h3>
            <div className="flex items-center gap-2 text-xs text-gray-600 mb-2">
              <User className="w-3 h-3" />
              <span>{type === "renting" ? rental.ownerName : rental.renterName}</span>
            </div>
            <Badge className={getStatusColor(rental.status)}>
              {rental.status.charAt(0).toUpperCase() + rental.status.slice(1)}
            </Badge>
          </div>
        </div>

        <div className="mt-3 pt-3 border-t space-y-2">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2 text-gray-600">
              <Calendar className="w-4 h-4" />
              <span>{rental.startDate} – {rental.endDate}</span>
            </div>
            <span className="font-bold text-brand-blue">RM {rental.price}</span>
          </div>

          {/* Actions for active rentals */}
          {rental.status === "active" && (
            <div className="grid grid-cols-2 gap-2">
              <Button variant="outline" size="sm" className="text-xs">
                Contact {type === "renting" ? "Owner" : "Renter"}
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="text-xs"
                onClick={() => setShowAgreement(true)}
              >
                <FileText className="w-3.5 h-3.5 mr-1" />
                Agreement
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="col-span-2 text-xs"
                onClick={() => setShowCondition(true)}
              >
                <Camera className="w-3.5 h-3.5 mr-1" />
                {type === "lending" ? "Condition Check (Before/After)" : "View Condition Photos"}
              </Button>
              {type === "lending" && (
                <Button variant="outline" size="sm" className="col-span-2 text-xs border-green-300 text-green-700 hover:bg-green-50">
                  Mark as Returned
                </Button>
              )}
            </div>
          )}

          {/* Actions for completed rentals */}
          {rental.status === "completed" && (
            <div className="grid grid-cols-2 gap-2">
              <Button variant="outline" size="sm" className="text-xs">
                Leave Review
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="text-xs"
                onClick={() => setShowCondition(true)}
              >
                <Camera className="w-3.5 h-3.5 mr-1" />
                AI Check
              </Button>
            </div>
          )}
        </div>
      </div>

      <ConditionCheckModal
        open={showCondition}
        onClose={() => setShowCondition(false)}
        itemTitle={rental.itemTitle}
      />

      <RentalAgreementModal
        open={showAgreement}
        onClose={() => setShowAgreement(false)}
        rental={rental}
      />
    </>
  );
}

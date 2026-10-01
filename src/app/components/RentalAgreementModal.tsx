import { useState } from "react";
import { FileText, Shield, CheckCircle2 } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Button } from "./ui/button";
import type { Rental } from "../data/mockData";

interface RentalAgreementModalProps {
  open: boolean;
  onClose: () => void;
  rental: Rental;
}

export function RentalAgreementModal({ open, onClose, rental }: RentalAgreementModalProps) {
  const [signed, setSigned] = useState(false);

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-[340px] mx-auto max-h-[85vh] flex flex-col">
        <DialogHeader className="flex-shrink-0">
          <DialogTitle className="flex items-center gap-2 text-base">
            <FileText className="w-5 h-5 text-primary" />
            Rental Agreement
          </DialogTitle>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto space-y-3 pr-1">
          {/* Parties & details */}
          <div className="bg-accent rounded-lg p-3 text-xs space-y-1.5">
            <p className="font-semibold text-gray-700 mb-1">Agreement Details</p>
            {[
              { label: "Owner", value: rental.ownerName },
              { label: "Renter", value: rental.renterName },
              { label: "Item", value: rental.itemTitle },
              { label: "Period", value: `${rental.startDate} – ${rental.endDate}` },
              { label: "Rental Fee", value: `RM${rental.price}` },
            ].map(({ label, value }) => (
              <div key={label} className="flex justify-between gap-2">
                <span className="text-gray-500 flex-shrink-0">{label}</span>
                <span className="text-right line-clamp-1">{value}</span>
              </div>
            ))}
          </div>

          {/* Terms */}
          <div className="text-xs text-gray-600 space-y-2 leading-relaxed">
            <p className="font-semibold text-gray-800 text-sm">Terms & Conditions</p>
            {[
              ["Care of Item", "The Renter agrees to use the item with reasonable care and return it in the same condition as received, accounting for normal wear and tear."],
              ["Security Deposit", "A refundable deposit may be held and will be returned within 3 business days of a successful, undamaged return."],
              ["Damage Liability", "The Renter is liable for any damage beyond normal wear and tear. AI condition checks will assist in assessment but are not the sole basis for any decision."],
              ["Return Policy", "The item must be returned by the agreed end date. Late returns may incur additional charges equal to the daily rental rate."],
              ["Cancellation", "Cancellations made 48+ hours before rental start are fully refunded. Cancellations within 48 hours may incur a fee of up to 50% of the rental cost."],
              ["Dispute Resolution", "Disputes are handled through RentCo's mediation process. AI condition photos serve as supporting evidence only. Both parties must raise disputes within 24 hours of item return."],
              ["Platform", "This agreement is facilitated by RentCo, by AFSA FAM VENTURES. RentCo is not responsible for item quality, condition, or individual user conduct."],
            ].map(([title, text], i) => (
              <p key={i}>
                <strong>{i + 1}. {title}:</strong> {text}
              </p>
            ))}
          </div>

          {/* Protection note */}
          <div className="flex items-start gap-2 bg-blue-50 rounded-lg p-3">
            <Shield className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
            <p className="text-xs text-blue-700">
              Both parties are protected under RentCo&apos;s rental protection policy. Disputes must be raised within 24 hours of item return.
            </p>
          </div>
        </div>

        {/* Action */}
        <div className="flex-shrink-0 pt-3 border-t">
          {!signed ? (
            <Button
              onClick={() => setSigned(true)}
              className="w-full bg-primary hover:bg-primary/90"
            >
              Sign Agreement
            </Button>
          ) : (
            <div className="flex items-center gap-2 justify-center text-emerald-600 py-2">
              <CheckCircle2 className="w-5 h-5" />
              <span className="text-sm font-semibold">Agreement Signed</span>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

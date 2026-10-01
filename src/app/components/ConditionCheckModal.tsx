import { useState, useRef } from "react";
import { Camera, Sparkles, AlertTriangle, CheckCircle2, X } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Button } from "./ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";

interface ConditionCheckModalProps {
  open: boolean;
  onClose: () => void;
  itemTitle: string;
}

type AIResult = {
  status: "ok" | "warning";
  summary: string;
  details: string[];
};

const OK_RESULTS: AIResult[] = [
  {
    status: "ok",
    summary: "No significant damage detected",
    details: [
      "Item appears to be in similar condition to before rental",
      "No major visual differences identified",
      "Return condition confirmed as acceptable",
    ],
  },
  {
    status: "ok",
    summary: "Item returned in good condition",
    details: [
      "Surface condition matches pre-rental photos",
      "No scratches, dents, or missing parts detected",
      "Normal wear within acceptable limits",
    ],
  },
];

const WARN_RESULTS: AIResult[] = [
  {
    status: "warning",
    summary: "Potential difference detected",
    details: [
      "A minor surface marking was detected on the right side",
      "This may be pre-existing — compare carefully with before-rental photos",
      "Both parties should agree before raising a dispute",
    ],
  },
  {
    status: "warning",
    summary: "Visual changes require review",
    details: [
      "The AI detected a possible scuff or blemish not visible in the original photos",
      "Lighting differences may account for this — examine the item in person",
      "AI detection is an assistance tool only — human review is recommended",
    ],
  },
];

export function ConditionCheckModal({ open, onClose, itemTitle }: ConditionCheckModalProps) {
  const [beforePhoto, setBeforePhoto] = useState<string | null>(null);
  const [afterPhoto, setAfterPhoto] = useState<string | null>(null);
  const [isAnalysing, setIsAnalysing] = useState(false);
  const [aiResult, setAiResult] = useState<AIResult | null>(null);
  const beforeInputRef = useRef<HTMLInputElement>(null);
  const afterInputRef = useRef<HTMLInputElement>(null);

  const handleBeforePhoto = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setBeforePhoto(URL.createObjectURL(file));
  };

  const handleAfterPhoto = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setAfterPhoto(URL.createObjectURL(file));
  };

  const handleAICheck = () => {
    setIsAnalysing(true);
    setAiResult(null);
    setTimeout(() => {
      const pool = Math.random() < 0.3 ? WARN_RESULTS : OK_RESULTS;
      setAiResult(pool[Math.floor(Math.random() * pool.length)]);
      setIsAnalysing(false);
    }, 2500);
  };

  const handleClose = () => {
    setBeforePhoto(null);
    setAfterPhoto(null);
    setAiResult(null);
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-[340px] mx-auto">
        <DialogHeader>
          <DialogTitle className="text-base flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-brand-blue" />
            AI Condition Check
          </DialogTitle>
          <p className="text-xs text-gray-500 line-clamp-1 mt-0.5">{itemTitle}</p>
        </DialogHeader>

        <Tabs defaultValue="before" className="w-full">
          <TabsList className="w-full">
            <TabsTrigger value="before" className="flex-1 text-xs">Before Rental</TabsTrigger>
            <TabsTrigger value="after" className="flex-1 text-xs">After Return</TabsTrigger>
          </TabsList>

          <TabsContent value="before" className="mt-3">
            <input ref={beforeInputRef} type="file" accept="image/*" onChange={handleBeforePhoto} className="hidden" />
            {beforePhoto ? (
              <div className="relative">
                <img src={beforePhoto} alt="Before" className="w-full h-36 object-cover rounded-lg" />
                <button
                  onClick={() => setBeforePhoto(null)}
                  className="absolute top-2 right-2 w-6 h-6 bg-black/60 text-white rounded-full flex items-center justify-center"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            ) : (
              <button
                onClick={() => beforeInputRef.current?.click()}
                className="w-full h-36 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center gap-2 text-gray-400 hover:border-primary hover:text-primary transition-colors"
              >
                <Camera className="w-8 h-8" />
                <span className="text-sm">Upload pre-rental photo</span>
              </button>
            )}
            <p className="text-[11px] text-gray-400 mt-2 text-center">
              Photograph the item before handing it over
            </p>
          </TabsContent>

          <TabsContent value="after" className="mt-3">
            <input ref={afterInputRef} type="file" accept="image/*" onChange={handleAfterPhoto} className="hidden" />
            {afterPhoto ? (
              <div className="relative">
                <img src={afterPhoto} alt="After" className="w-full h-36 object-cover rounded-lg" />
                <button
                  onClick={() => setAfterPhoto(null)}
                  className="absolute top-2 right-2 w-6 h-6 bg-black/60 text-white rounded-full flex items-center justify-center"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            ) : (
              <button
                onClick={() => afterInputRef.current?.click()}
                className="w-full h-36 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center gap-2 text-gray-400 hover:border-primary hover:text-primary transition-colors"
              >
                <Camera className="w-8 h-8" />
                <span className="text-sm">Upload return photo</span>
              </button>
            )}
            <p className="text-[11px] text-gray-400 mt-2 text-center">
              Photograph the item when it is returned
            </p>
          </TabsContent>
        </Tabs>

        {/* Run check */}
        {beforePhoto && afterPhoto && !aiResult && (
          <Button
            onClick={handleAICheck}
            disabled={isAnalysing}
            className="w-full bg-primary hover:bg-primary/90"
          >
            {isAnalysing ? (
              <>
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                Analysing photos...
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 mr-2" />
                Run AI Condition Check
              </>
            )}
          </Button>
        )}

        {/* Result */}
        {aiResult && (
          <div
            className={`rounded-lg p-3 ring-1 ${
              aiResult.status === "ok"
                ? "bg-emerald-50 ring-emerald-300"
                : "bg-amber-50 ring-amber-300"
            }`}
          >
            <div className="flex items-center gap-2 mb-2">
              {aiResult.status === "ok" ? (
                <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
              ) : (
                <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0" />
              )}
              <p className={`text-sm font-semibold ${aiResult.status === "ok" ? "text-emerald-700" : "text-amber-700"}`}>
                {aiResult.summary}
              </p>
            </div>
            <ul className="space-y-1">
              {aiResult.details.map((d, i) => (
                <li key={i} className="text-xs text-gray-600 flex items-start gap-1">
                  <span className="text-gray-400 mt-0.5 flex-shrink-0">·</span>
                  <span>{d}</span>
                </li>
              ))}
            </ul>
            <p className="text-[10px] text-gray-400 mt-2 border-t border-black/10 pt-2">
              AI detection is an assistance tool only. Both parties must agree before a dispute is raised.
            </p>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}

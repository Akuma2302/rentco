import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router";
import {
  ArrowLeft, Camera, Sparkles, X, Shield, MapPin,
  CheckCircle2, ChevronRight, Info, TrendingUp,
} from "lucide-react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Textarea } from "../components/ui/textarea";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "../components/ui/select";
import { Switch } from "../components/ui/switch";
import { Badge } from "../components/ui/badge";
import { categories } from "../data/mockData";
import { aiProfiles, type AIProfile } from "../data/aiMock";
import { DemandBadge } from "../components/DemandBadge";
import { toast } from "sonner";

type Step = 1 | 2 | 3 | 4 | 5;

const STEP_LABELS = ["Photos", "Details", "Pricing", "Protection"];

const SCAN_MESSAGES = [
  "Scanning photo quality...",
  "Detecting item type...",
  "Extracting brand & model...",
  "Analysing item condition...",
  "Generating listing details...",
];

function AIBadge() {
  return (
    <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 bg-brand-sky text-brand-blue rounded text-[10px] font-medium ring-1 ring-[#C9D8FF]">
      <Sparkles className="w-2.5 h-2.5" />
      AI
    </span>
  );
}

export function AddItemPage() {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [step, setStep] = useState<Step>(1);
  const [photos, setPhotos] = useState<string[]>([]);
  const [scanMsgIdx, setScanMsgIdx] = useState(0);
  const [aiResult, setAiResult] = useState<AIProfile | null>(null);

  // Item fields
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [condition, setCondition] = useState("");
  const [colour, setColour] = useState("");

  // Pricing
  const [price, setPrice] = useState("");
  const [period, setPeriod] = useState("day");

  // Protection
  const [requireDeposit, setRequireDeposit] = useState(true);
  const [depositAmount, setDepositAmount] = useState("");
  const [location, setLocation] = useState("");
  const [includeAgreement, setIncludeAgreement] = useState(true);

  const [published, setPublished] = useState(false);

  useEffect(() => {
    if (step !== 2) return;
    const interval = setInterval(() => {
      setScanMsgIdx(i => Math.min(i + 1, SCAN_MESSAGES.length - 1));
    }, 500);
    return () => clearInterval(interval);
  }, [step]);

  const handlePhotoSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const urls = files.map(f => URL.createObjectURL(f));
    setPhotos(prev => [...prev, ...urls].slice(0, 5));
    e.target.value = "";
  };

  const removePhoto = (idx: number) => {
    setPhotos(prev => prev.filter((_, i) => i !== idx));
  };

  const applyAIProfile = (profile: AIProfile) => {
    setAiResult(profile);
    setTitle(profile.title);
    setCategory(profile.category);
    setDescription(profile.description);
    setBrand(profile.characteristics.brand || "");
    setModel(profile.characteristics.model || "");
    setCondition(profile.characteristics.condition);
    setColour(profile.characteristics.colour || "");
    setPrice(String(profile.priceRecommendation.daily));
    setPeriod("day");
    setDepositAmount(String(profile.priceRecommendation.depositSuggestion));
  };

  const handleAIScan = () => {
    setStep(2);
    setScanMsgIdx(0);
    setTimeout(() => {
      const profile = aiProfiles[Math.floor(Math.random() * aiProfiles.length)];
      applyAIProfile(profile);
      setStep(3);
    }, 2600);
  };

  const handleSkipAI = () => {
    setAiResult(null);
    setStep(3);
  };

  const handlePublish = () => {
    if (!location.trim()) {
      toast.error("Please enter a pickup location");
      return;
    }
    setPublished(true);
    toast.success("Item listed successfully!");
    setTimeout(() => navigate("/home"), 2000);
  };

  const userStep = step <= 2 ? 1 : step - 1;

  const goBack = () => {
    if (step === 1) navigate(-1);
    else if (step === 3) setStep(1);
    else if (step === 4) setStep(3);
    else if (step === 5) setStep(4);
  };

  // ── Published success ───────────────────────────────────────────────────

  if (published) {
    return (
      <div className="flex flex-col h-full bg-white items-center justify-center p-6">
        <div className="text-center">
          <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle2 className="w-10 h-10 text-emerald-600" />
          </div>
          <h1 className="text-2xl text-primary mb-1">Listing Published!</h1>
          <p className="text-gray-500 text-sm mb-5">Your item is now live on RentCo.</p>
          <div className="space-y-2 text-left max-w-xs mx-auto bg-accent rounded-xl p-4">
            {[
              aiResult ? "✨ AI-generated listing" : "✏️ Manually created listing",
              aiResult
                ? `📊 Demand: ${aiResult.demand.charAt(0).toUpperCase() + aiResult.demand.slice(1)}`
                : null,
              requireDeposit && depositAmount ? `🔒 Security deposit: RM${depositAmount}` : null,
              includeAgreement ? "📄 Rental agreement included" : null,
              `📍 Pickup: ${location}`,
            ]
              .filter(Boolean)
              .map((item, i) => (
                <p key={i} className="text-sm text-gray-600">{item}</p>
              ))}
          </div>
        </div>
      </div>
    );
  }

  // ── Scanning screen ─────────────────────────────────────────────────────

  if (step === 2) {
    return (
      <div className="flex flex-col h-full bg-white items-center justify-center p-6">
        <div className="relative w-24 h-24 mb-6">
          <div className="absolute inset-0 border-4 border-primary/20 rounded-full" />
          <div className="absolute inset-0 border-4 border-primary border-t-transparent rounded-full animate-spin" />
          <div className="absolute inset-0 flex items-center justify-center">
            <Sparkles className="w-8 h-8 text-primary" />
          </div>
        </div>
        <h2 className="text-lg text-primary mb-2">Analysing Photos</h2>
        <p className="text-sm text-gray-500 text-center h-5">{SCAN_MESSAGES[scanMsgIdx]}</p>
        <div className="flex gap-1.5 mt-6">
          {SCAN_MESSAGES.map((_, i) => (
            <div
              key={i}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i <= scanMsgIdx ? "w-6 bg-primary" : "w-2 bg-gray-200"
              }`}
            />
          ))}
        </div>
      </div>
    );
  }

  // ── Main wizard frame ───────────────────────────────────────────────────

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Header */}
      <div className="bg-white px-5 pt-7 pb-3 flex-shrink-0">
        <div className="flex items-center gap-3 mb-3">
          <button onClick={goBack} aria-label="Back" className="w-9 h-9 -ml-1 rounded-full bg-brand-sky text-brand-navy flex items-center justify-center">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <span className="flex-1 text-[22px] font-extrabold tracking-tight text-brand-navy">List an Item</span>
          <span className="text-[11px] font-semibold text-muted-foreground">
            Step {userStep} of 4 — {STEP_LABELS[userStep - 1]}
          </span>
        </div>
        <div className="flex gap-1">
          {STEP_LABELS.map((_, i) => (
            <div
              key={i}
              className={`h-1 flex-1 rounded-full transition-all duration-300 ${
                i < userStep ? "bg-brand-blue" : "bg-brand-sky"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto">

        {/* ── STEP 1: Photos ───────────────────────────────────────────── */}
        {step === 1 && (
          <div className="p-4 space-y-4">
            <p className="text-sm text-gray-600">
              Upload clear photos — our AI will identify your item and generate the listing automatically.
            </p>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              multiple
              onChange={handlePhotoSelect}
              className="hidden"
            />

            {photos.length === 0 ? (
              <button
                onClick={() => fileInputRef.current?.click()}
                className="w-full border-2 border-dashed border-gray-300 rounded-xl p-10 flex flex-col items-center gap-3 text-gray-400 hover:border-primary hover:text-primary transition-colors"
              >
                <Camera className="w-12 h-12" />
                <div className="text-center">
                  <p className="text-sm font-medium">Tap to upload photos</p>
                  <p className="text-xs">PNG, JPG up to 10MB each · up to 5 photos</p>
                </div>
              </button>
            ) : (
              <div className="space-y-2">
                <div className="grid grid-cols-3 gap-2">
                  {photos.map((url, i) => (
                    <div key={i} className="relative aspect-square">
                      <img src={url} alt={`Photo ${i + 1}`} className="w-full h-full object-cover rounded-lg" />
                      <button
                        onClick={() => removePhoto(i)}
                        className="absolute top-1 right-1 w-5 h-5 bg-black/60 text-white rounded-full flex items-center justify-center"
                      >
                        <X className="w-3 h-3" />
                      </button>
                      {i === 0 && (
                        <span className="absolute bottom-1 left-1 text-[9px] bg-primary text-white px-1 py-0.5 rounded">
                          Main
                        </span>
                      )}
                    </div>
                  ))}
                  {photos.length < 5 && (
                    <button
                      onClick={() => fileInputRef.current?.click()}
                      className="aspect-square border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center text-gray-400 hover:border-primary hover:text-primary transition-colors"
                    >
                      <Camera className="w-6 h-6" />
                    </button>
                  )}
                </div>
                <p className="text-xs text-gray-400 text-center">{photos.length}/5 photos</p>
              </div>
            )}

            <div className="bg-brand-sky rounded-lg p-3 flex gap-2">
              <Sparkles className="w-4 h-4 text-brand-blue flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-xs font-medium text-brand-blue mb-0.5">AI-Powered Listing</p>
                <p className="text-xs text-brand-blue">
                  Our AI identifies your item, suggests a title, category, description, and recommended rental price instantly.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* ── STEP 3: Item Details ─────────────────────────────────────── */}
        {step === 3 && (
          <div className="p-4 space-y-4">
            {aiResult ? (
              <div className="flex items-center gap-2 p-3 bg-brand-sky rounded-lg">
                <Sparkles className="w-4 h-4 text-brand-blue flex-shrink-0" />
                <p className="text-xs text-brand-blue">
                  <strong>AI identified your item.</strong> Review and edit any details below.
                </p>
              </div>
            ) : (
              <p className="text-sm text-gray-600">Fill in your item details.</p>
            )}

            <div className="space-y-1.5">
              <div className="flex items-center gap-2">
                <Label className="text-sm">Category</Label>
                {aiResult && <AIBadge />}
              </div>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger className="bg-input-background">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.filter(c => c !== "All").map(cat => (
                    <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center gap-2">
                <Label className="text-sm">Item Title</Label>
                {aiResult && <AIBadge />}
              </div>
              <Input value={title} onChange={e => setTitle(e.target.value)} className="bg-input-background" placeholder="e.g. Sony Headphones WH-1000XM4" />
            </div>

            <div className="space-y-1.5">
              <Label className="text-sm">Item Characteristics</Label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { label: "Brand", value: brand, setter: setBrand, placeholder: "e.g. Sony" },
                  { label: "Model", value: model, setter: setModel, placeholder: "e.g. WH-1000XM4" },
                ].map(({ label, value, setter, placeholder }) => (
                  <div key={label}>
                    <p className="text-xs text-gray-500 mb-1 flex items-center gap-1">
                      {label} {aiResult && <AIBadge />}
                    </p>
                    <Input
                      value={value}
                      onChange={e => setter(e.target.value)}
                      placeholder={placeholder}
                      className="bg-input-background text-sm h-9"
                    />
                  </div>
                ))}
                <div>
                  <p className="text-xs text-gray-500 mb-1 flex items-center gap-1">
                    Condition {aiResult && <AIBadge />}
                  </p>
                  <Select value={condition} onValueChange={setCondition}>
                    <SelectTrigger className="bg-input-background h-9 text-sm">
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      {["Excellent", "Very Good", "Good", "Fair"].map(c => (
                        <SelectItem key={c} value={c}>{c}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1 flex items-center gap-1">
                    Colour {aiResult && <AIBadge />}
                  </p>
                  <Input
                    value={colour}
                    onChange={e => setColour(e.target.value)}
                    placeholder="e.g. Black"
                    className="bg-input-background text-sm h-9"
                  />
                </div>
              </div>
            </div>

            {aiResult && aiResult.characteristics.features.length > 0 && (
              <div className="space-y-1.5">
                <p className="text-sm flex items-center gap-2">Key Features <AIBadge /></p>
                <div className="flex flex-wrap gap-1.5">
                  {aiResult.characteristics.features.map(f => (
                    <Badge key={f} variant="secondary" className="text-xs">{f}</Badge>
                  ))}
                </div>
              </div>
            )}

            <div className="space-y-1.5">
              <div className="flex items-center gap-2">
                <Label className="text-sm">Description</Label>
                {aiResult && <AIBadge />}
              </div>
              <Textarea
                value={description}
                onChange={e => setDescription(e.target.value)}
                className="bg-input-background min-h-24 text-sm"
                placeholder="Describe your item..."
              />
            </div>
          </div>
        )}

        {/* ── STEP 4: Pricing ──────────────────────────────────────────── */}
        {step === 4 && (
          <div className="p-4 space-y-4">
            {aiResult && (
              <>
                {/* AI price recommendation */}
                <div className="rounded-xl bg-brand-sky ring-1 ring-[#C9D8FF] p-4 space-y-3">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-brand-blue" />
                    <p className="text-sm font-semibold text-brand-blue">AI Price Recommendation</p>
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { label: "Daily", value: aiResult.priceRecommendation.daily },
                      { label: "Weekly", value: aiResult.priceRecommendation.weekly },
                      { label: "Monthly", value: aiResult.priceRecommendation.monthly },
                    ].map(({ label, value }) => (
                      <div key={label} className="bg-white rounded-lg p-2 text-center">
                        <p className="text-xs text-gray-500">{label}</p>
                        <p className="text-base font-semibold text-primary">RM{value}</p>
                      </div>
                    ))}
                  </div>
                  <div className="bg-white rounded-lg px-3 py-2 flex gap-2">
                    <TrendingUp className="w-4 h-4 text-brand-blue flex-shrink-0 mt-0.5" />
                    <p className="text-xs text-gray-600">{aiResult.priceRecommendation.explanation}</p>
                  </div>
                </div>

                {/* Demand */}
                <div className="space-y-1.5">
                  <p className="text-sm flex items-center gap-2">Current Demand <AIBadge /></p>
                  <DemandBadge demand={aiResult.demand} explanation={aiResult.demandExplanation} />
                  <p className="text-xs text-amber-700 bg-amber-50 rounded-lg px-3 py-2 flex gap-2">
                    <span>💬</span>
                    <span>{aiResult.demandSuggestion}</span>
                  </p>
                </div>
              </>
            )}

            {/* Price override */}
            <div className="space-y-2">
              <Label className="text-sm">
                {aiResult ? "Your Rental Price (override AI)" : "Rental Price"}
              </Label>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <p className="text-xs text-gray-500 mb-1">Price (RM)</p>
                  <Input
                    type="number"
                    value={price}
                    onChange={e => setPrice(e.target.value)}
                    className="bg-input-background"
                    placeholder="e.g. 8"
                    min="1"
                  />
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">Per Period</p>
                  <Select value={period} onValueChange={setPeriod}>
                    <SelectTrigger className="bg-input-background">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="hour">Per Hour</SelectItem>
                      <SelectItem value="day">Per Day</SelectItem>
                      <SelectItem value="week">Per Week</SelectItem>
                      <SelectItem value="month">Per Month</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ── STEP 5: Protection & Location ────────────────────────────── */}
        {step === 5 && (
          <div className="p-4 space-y-4">
            {/* Security Deposit */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">Security Deposit</p>
                  <p className="text-xs text-gray-500">Refundable on successful return</p>
                </div>
                <Switch checked={requireDeposit} onCheckedChange={setRequireDeposit} />
              </div>
              {requireDeposit && (
                <div>
                  <Label className="text-xs text-gray-500 mb-1 flex items-center gap-2">
                    Deposit amount (RM)
                    {aiResult && (
                      <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 bg-brand-sky text-brand-blue rounded text-[10px] ring-1 ring-[#C9D8FF]">
                        <Sparkles className="w-2 h-2" />
                        Suggested: RM{aiResult.priceRecommendation.depositSuggestion}
                      </span>
                    )}
                  </Label>
                  <Input
                    type="number"
                    value={depositAmount}
                    onChange={e => setDepositAmount(e.target.value)}
                    className="bg-input-background"
                    placeholder="e.g. 50"
                  />
                </div>
              )}
            </div>

            {/* Rental Agreement */}
            <div className="p-3 bg-accent rounded-lg space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-primary" />
                  <div>
                    <p className="text-sm font-medium">Rental Agreement</p>
                    <p className="text-xs text-gray-500">Standard RentCo agreement</p>
                  </div>
                </div>
                <Switch checked={includeAgreement} onCheckedChange={setIncludeAgreement} />
              </div>
              {includeAgreement && (
                <p className="text-xs text-gray-500 ml-6">
                  Both parties must accept the agreement before rental begins. Includes damage, cancellation, and dispute policies.
                </p>
              )}
            </div>

            {/* Pickup Location */}
            <div className="space-y-1.5">
              <Label className="text-sm flex items-center gap-1.5">
                <MapPin className="w-4 h-4" />
                Pickup Location*
              </Label>
              <Input
                value={location}
                onChange={e => setLocation(e.target.value)}
                placeholder="e.g. Campus A, Block 3, Room 12"
                className="bg-input-background"
              />
            </div>

            {/* Condition check reminder */}
            <div className="p-3 bg-blue-50 rounded-lg flex gap-2">
              <Info className="w-4 h-4 text-blue-500 flex-shrink-0 mt-0.5" />
              <p className="text-xs text-blue-700">
                After publishing, you can upload before-rental condition photos from My Rentals. Our AI will compare them with return photos to assist in any disputes.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="border-t bg-white p-4 flex-shrink-0">
        {step === 1 && (
          <div className="space-y-2">
            <Button
              onClick={handleAIScan}
              disabled={photos.length === 0}
              className="w-full bg-primary hover:bg-primary/90"
            >
              <Sparkles className="w-4 h-4 mr-2" />
              Scan with AI
              <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
            <button
              onClick={handleSkipAI}
              className="w-full text-xs text-gray-400 underline py-1"
            >
              Skip — fill in details manually
            </button>
          </div>
        )}
        {step === 3 && (
          <Button
            onClick={() => setStep(4)}
            disabled={!title.trim() || !category}
            className="w-full bg-primary hover:bg-primary/90"
          >
            Next: Pricing
            <ChevronRight className="w-4 h-4 ml-1" />
          </Button>
        )}
        {step === 4 && (
          <Button
            onClick={() => setStep(5)}
            disabled={!price}
            className="w-full bg-primary hover:bg-primary/90"
          >
            Next: Protection
            <ChevronRight className="w-4 h-4 ml-1" />
          </Button>
        )}
        {step === 5 && (
          <Button onClick={handlePublish} className="w-full bg-primary hover:bg-primary/90">
            <CheckCircle2 className="w-4 h-4 mr-2" />
            Publish Listing
          </Button>
        )}
      </div>
    </div>
  );
}

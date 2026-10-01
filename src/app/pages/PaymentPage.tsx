import { useState } from "react";
import { useParams, useNavigate } from "react-router";
import { Calendar, CreditCard, Smartphone, QrCode, CheckCircle } from "lucide-react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { mockItems } from "../data/mockData";
import { toast } from "sonner";
import { PageHeader } from "../components/PageHeader";

export function PaymentPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const item = mockItems.find((i) => i.id === id);
  const [paymentMethod, setPaymentMethod] = useState<string | null>(null);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);

  if (!item) {
    return <div>Item not found</div>;
  }

  const handleConfirmPayment = () => {
    if (!startDate || !endDate || !paymentMethod) {
      toast.error("Please complete all fields");
      return;
    }
    setShowSuccess(true);
    setTimeout(() => {
      navigate("/home/my-rentals");
    }, 2000);
  };

  if (showSuccess) {
    return (
      <div className="flex flex-col h-full bg-white items-center justify-center p-6">
        <div className="text-center">
          <CheckCircle className="w-24 h-24 text-green-500 mx-auto mb-4" />
          <h1 className="text-2xl text-primary mb-2">Booking Confirmed!</h1>
          <p className="text-gray-600 mb-4">
            Your rental request has been sent to the owner.
          </p>
          <p className="text-sm text-gray-500">
            Redirecting to My Rentals...
          </p>
        </div>
      </div>
    );
  }

  const paymentMethods = [
    {
      id: "card",
      name: "Debit/Credit Card",
      icon: CreditCard,
      description: "Visa, Mastercard",
    },
    {
      id: "tng",
      name: "Touch 'n Go eWallet",
      icon: Smartphone,
      description: "TNG Digital",
    },
    {
      id: "qr",
      name: "DuitNow QR",
      icon: QrCode,
      description: "Scan to pay",
    },
  ];

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Header */}
      <PageHeader title="Complete Booking" onBack={() => navigate(-1)} />

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {/* Item Summary */}
        <div className="bg-brand-sky rounded-2xl p-4">
          <div className="flex gap-3">
            <img
              src={item.image}
              alt={item.title}
              className="w-20 h-20 object-cover rounded-lg"
            />
            <div className="flex-1">
              <h3 className="text-sm mb-1">{item.title}</h3>
              <p className="text-xs text-gray-600 mb-2">{item.ownerName}</p>
              <div className="text-lg text-primary">
                RM{item.price}
                <span className="text-sm text-gray-500">/{item.period}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Rental Period */}
        <div className="space-y-3">
          <h2 className="flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            Rental Period
          </h2>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2">
              <Label htmlFor="startDate">Start Date</Label>
              <Input
                id="startDate"
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="bg-input-background"
                min={new Date().toISOString().split("T")[0]}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="endDate">End Date</Label>
              <Input
                id="endDate"
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="bg-input-background"
                min={startDate || new Date().toISOString().split("T")[0]}
              />
            </div>
          </div>
        </div>

        {/* Payment Method */}
        <div className="space-y-3">
          <h2>Payment Method</h2>
          <div className="space-y-2">
            {paymentMethods.map((method) => {
              const Icon = method.icon;
              return (
                <button
                  key={method.id}
                  onClick={() => setPaymentMethod(method.id)}
                  className={`w-full p-4 border rounded-lg flex items-center gap-3 transition-colors ${
                    paymentMethod === method.id
                      ? "border-primary bg-accent"
                      : "border-gray-200 hover:bg-accent"
                  }`}
                >
                  <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center border">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex-1 text-left">
                    <p className="text-sm">{method.name}</p>
                    <p className="text-xs text-gray-500">{method.description}</p>
                  </div>
                  <div
                    className={`w-5 h-5 rounded-full border-2 ${
                      paymentMethod === method.id
                        ? "border-primary bg-primary"
                        : "border-gray-300"
                    }`}
                  >
                    {paymentMethod === method.id && (
                      <div className="w-full h-full flex items-center justify-center">
                        <div className="w-2 h-2 bg-white rounded-full" />
                      </div>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Payment Details for Card */}
        {paymentMethod === "card" && (
          <div className="space-y-3 p-4 bg-accent rounded-lg">
            <h3 className="text-sm">Card Details</h3>
            <div className="space-y-2">
              <Label htmlFor="cardNumber">Card Number</Label>
              <Input
                id="cardNumber"
                placeholder="1234 5678 9012 3456"
                className="bg-white"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2">
                <Label htmlFor="expiry">Expiry</Label>
                <Input id="expiry" placeholder="MM/YY" className="bg-white" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="cvv">CVV</Label>
                <Input id="cvv" placeholder="123" className="bg-white" />
              </div>
            </div>
          </div>
        )}

        {/* Summary */}
        {startDate && endDate && (
          <div className="bg-accent rounded-lg p-4 space-y-2">
            <h3 className="text-sm mb-3">Payment Summary</h3>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Rental Fee</span>
              <span>RM{item.price}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Service Fee</span>
              <span>RM2.00</span>
            </div>
            {item.deposit && (
              <div className="flex justify-between text-sm text-amber-700">
                <span className="flex items-center gap-1">🔒 Refundable Deposit</span>
                <span>RM{item.deposit}</span>
              </div>
            )}
            <div className="border-t pt-2 flex justify-between">
              <span>Total charged now</span>
              <span className="text-lg text-primary">
                RM{(Number(item.price) + 2 + (item.deposit ?? 0)).toFixed(2)}
              </span>
            </div>
            {item.deposit && (
              <p className="text-xs text-gray-400">
                * Deposit of RM{item.deposit} is fully refundable upon successful return.
              </p>
            )}
          </div>
        )}
      </div>

      {/* Confirm Button */}
      <div className="border-t bg-white p-4">
        <Button
          onClick={handleConfirmPayment}
          className="w-full bg-primary hover:bg-primary/90"
          disabled={!startDate || !endDate || !paymentMethod}
        >
          Confirm & Pay
        </Button>
      </div>
    </div>
  );
}
import { useState, type FormEvent } from "react";
import { useNavigate, useParams } from "react-router";
import { toast } from "sonner";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Textarea } from "../components/ui/textarea";
import { Switch } from "../components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { PageHeader } from "../components/PageHeader";
import { currentUser } from "../data/mockData";
import { getItem, saveListing } from "../data/listings";

export function EditListingPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const item = getItem(id);

  const [title, setTitle] = useState(item?.title ?? "");
  const [description, setDescription] = useState(item?.description ?? "");
  const [price, setPrice] = useState(String(item?.price ?? ""));
  const [period, setPeriod] = useState(item?.period ?? "day");
  const [deposit, setDeposit] = useState(item?.deposit ? String(item.deposit) : "");
  const [location, setLocation] = useState(item?.location ?? "");
  const [available, setAvailable] = useState(item?.availability ?? true);

  if (!item || item.ownerId !== currentUser.id) {
    return (
      <div className="flex flex-col bg-white items-center justify-center p-6 text-center">
        <p className="text-sm font-semibold text-brand-navy">Listing not found</p>
        <p className="text-xs text-muted-foreground mt-1">You can only edit items you've listed.</p>
        <Button
          onClick={() => navigate("/home/my-listings")}
          className="mt-4 rounded-xl bg-primary hover:bg-primary/90 cursor-pointer"
        >
          Back to My Listings
        </Button>
      </div>
    );
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const priceValue = Number(price);
    if (!title.trim()) {
      toast.error("Please enter a title");
      return;
    }
    if (!priceValue || priceValue < 1) {
      toast.error("Please enter a price of at least RM 1");
      return;
    }
    if (!location.trim()) {
      toast.error("Please enter a pickup location");
      return;
    }
    saveListing(item.id, {
      title: title.trim(),
      description: description.trim(),
      price: priceValue,
      period,
      deposit: deposit ? Number(deposit) : undefined,
      location: location.trim(),
      availability: available,
    });
    toast.success("Listing updated");
    navigate("/home/my-listings");
  };

  return (
    <div className="flex flex-col bg-white">
      <PageHeader title="Edit Listing" subtitle={item.title} onBack={() => navigate(-1)} />

      <form onSubmit={handleSubmit} className="px-5 pb-6 space-y-4">
        <div className="relative aspect-[16/9] rounded-2xl overflow-hidden bg-brand-sky">
          <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
        </div>

        <div className="flex items-center justify-between rounded-2xl bg-brand-sky px-4 py-3">
          <div>
            <p className="text-sm font-semibold text-brand-navy">Available for rent</p>
            <p className="text-xs text-muted-foreground">
              {available ? "Renters can book this item" : "Hidden from new bookings"}
            </p>
          </div>
          <Switch checked={available} onCheckedChange={setAvailable} />
        </div>

        <div className="space-y-2">
          <Label htmlFor="title">Title</Label>
          <Input
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="h-11 rounded-xl bg-input-background"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="min-h-24 rounded-xl bg-input-background"
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-2">
            <Label htmlFor="price">Price (RM)</Label>
            <Input
              id="price"
              type="number"
              inputMode="decimal"
              min="1"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="h-11 rounded-xl bg-input-background"
              required
            />
          </div>
          <div className="space-y-2">
            <Label>Per Period</Label>
            <Select value={period} onValueChange={setPeriod}>
              <SelectTrigger className="!h-11 w-full rounded-xl bg-input-background">
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

        <div className="space-y-2">
          <Label htmlFor="deposit">Security Deposit (RM)</Label>
          <Input
            id="deposit"
            type="number"
            inputMode="decimal"
            min="0"
            placeholder="Leave empty for no deposit"
            value={deposit}
            onChange={(e) => setDeposit(e.target.value)}
            className="h-11 rounded-xl bg-input-background"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="location">Pickup Location</Label>
          <Input
            id="location"
            placeholder="e.g. Campus A, Block 7"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="h-11 rounded-xl bg-input-background"
            required
          />
        </div>

        <div className="flex gap-3 pt-2">
          <Button
            type="button"
            variant="outline"
            onClick={() => navigate(-1)}
            className="flex-1 h-11 rounded-xl cursor-pointer"
          >
            Cancel
          </Button>
          <Button type="submit" className="flex-1 h-11 rounded-xl bg-primary hover:bg-primary/90 cursor-pointer">
            Save Changes
          </Button>
        </div>
      </form>
    </div>
  );
}

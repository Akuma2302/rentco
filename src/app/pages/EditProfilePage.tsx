import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router";
import { BadgeCheck } from "lucide-react";
import { toast } from "sonner";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Textarea } from "../components/ui/textarea";
import { PageHeader } from "../components/PageHeader";
import { useProfile, type ProfileDetails } from "../data/profile";

const BIO_LIMIT = 160;

export function EditProfilePage() {
  const navigate = useNavigate();
  const { profile, saveProfile } = useProfile();
  const [form, setForm] = useState<ProfileDetails>(profile);

  const update = (field: keyof ProfileDetails) => (value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const missing = [
    !form.phone.trim() && "phone number",
    !form.campus.trim() && "campus",
    !form.bio.trim() && "bio",
  ].filter(Boolean) as string[];

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!form.name.trim()) {
      toast.error("Please enter your full name");
      return;
    }
    saveProfile({ ...form, name: form.name.trim() });
    toast.success("Profile updated");
    navigate("/home/profile");
  };

  return (
    <div className="flex flex-col min-h-full bg-white">
      <PageHeader
        title="Edit Profile"
        subtitle="Keep your details up to date"
        onBack={() => navigate(-1)}
      />

      <form onSubmit={handleSubmit} className="px-5 pb-6 space-y-4">
        {/* Avatar */}
        <div className="flex flex-col items-center py-2">
          <div className="w-20 h-20 rounded-full bg-[linear-gradient(135deg,#1F5BFF_0%,#0B1B3F_100%)] text-white text-3xl font-extrabold flex items-center justify-center">
            {(form.name.trim() || "?").charAt(0).toUpperCase()}
          </div>
        </div>

        {missing.length > 0 && (
          <div className="rounded-2xl bg-brand-sky px-4 py-3 text-xs text-brand-navy">
            Complete your profile so renters can trust you. Missing: {missing.join(", ")}.
          </div>
        )}

        <div className="space-y-2">
          <Label htmlFor="name">Full Name</Label>
          <Input
            id="name"
            value={form.name}
            onChange={(e) => update("name")(e.target.value)}
            className="h-11 rounded-xl bg-input-background"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">University Email</Label>
          <div className="relative">
            <Input
              id="email"
              type="email"
              value={form.email}
              readOnly
              className="h-11 rounded-xl bg-input-background pr-24 text-muted-foreground"
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1 text-[11px] font-semibold text-emerald-600">
              <BadgeCheck className="w-3.5 h-3.5" />
              Verified
            </span>
          </div>
          <p className="text-[11px] text-muted-foreground">Your verified email can't be changed.</p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone">Phone Number</Label>
          <Input
            id="phone"
            type="tel"
            inputMode="tel"
            placeholder="012-345 6789"
            value={form.phone}
            onChange={(e) => update("phone")(e.target.value)}
            className="h-11 rounded-xl bg-input-background"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="university">University</Label>
          <Input
            id="university"
            value={form.university}
            onChange={(e) => update("university")(e.target.value)}
            className="h-11 rounded-xl bg-input-background"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="campus">Campus / Residential College</Label>
          <Input
            id="campus"
            placeholder="e.g. Campus A, Block 7"
            value={form.campus}
            onChange={(e) => update("campus")(e.target.value)}
            className="h-11 rounded-xl bg-input-background"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="bio">Bio</Label>
          <Textarea
            id="bio"
            placeholder="Tell renters a little about yourself"
            value={form.bio}
            maxLength={BIO_LIMIT}
            onChange={(e) => update("bio")(e.target.value)}
            className="min-h-24 rounded-xl bg-input-background"
          />
          <p className="text-[11px] text-muted-foreground text-right">
            {form.bio.length}/{BIO_LIMIT}
          </p>
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

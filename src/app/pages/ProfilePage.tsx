import { Star, Mail, MapPin, Phone, Home as HomeIcon, Award, Package, LogOut, Trophy, Zap, BadgeCheck } from "lucide-react";
import { Button } from "../components/ui/button";
import { useNavigate } from "react-router";
import { currentUser, mockItems } from "../data/mockData";
import { useProfile } from "../data/profile";
import { mockTrustScores } from "../data/trustScore";
import { TrustScoreCard } from "../components/TrustScoreCard";

export function ProfilePage() {
  const navigate = useNavigate();
  const { profile } = useProfile();
  const myTrust = mockTrustScores[currentUser.id];
  const myListingsCount = mockItems.filter((item) => item.ownerId === currentUser.id).length;

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Header */}
      <div className="bg-[linear-gradient(135deg,#1F5BFF_0%,#0B1B3F_100%)] text-white px-5 pt-8 pb-6 rounded-b-[28px]">
        <div className="flex items-center gap-4 mb-2">
          <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-brand-blue text-2xl font-extrabold ring-4 ring-white/20">
            {profile.name.charAt(0).toUpperCase()}
          </div>
          <div className="flex-1">
            <h1 className="text-xl mb-1 text-white">{profile.name}</h1>
            <div className="flex items-center gap-1 text-white/90 text-sm">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span>
                {currentUser.rating} ({currentUser.reviewCount} reviews)
              </span>
            </div>
            {profile.bio && <p className="text-xs text-white/80 mt-1.5 line-clamp-2">{profile.bio}</p>}
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3 px-5 pt-4">
        <div className="text-center rounded-2xl bg-brand-sky py-3">
          <div className="text-2xl font-extrabold text-brand-blue mb-0.5">{myListingsCount}</div>
          <div className="text-[11px] font-semibold text-muted-foreground">Items Listed</div>
        </div>
        <div className="text-center rounded-2xl bg-brand-sky py-3">
          <div className="text-2xl font-extrabold text-brand-blue mb-0.5">24</div>
          <div className="text-[11px] font-semibold text-muted-foreground">Rentals</div>
        </div>
        <div className="text-center rounded-2xl bg-brand-sky py-3">
          <div className="text-2xl font-extrabold text-brand-blue mb-0.5">98%</div>
          <div className="text-[11px] font-semibold text-muted-foreground">Response Rate</div>
        </div>
      </div>

      {/* Trust Score */}
      {myTrust && (
        <div className="px-5 pt-5 pb-2">
          <h2 className="text-sm text-gray-500 mb-2">My Trust Score</h2>
          <TrustScoreCard data={myTrust} />
        </div>
      )}

      {/* Profile Details */}
      <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4">
        <div className="space-y-3">
          <h2 className="text-sm text-gray-500">Account Information</h2>
          
          <div className="flex items-center gap-3 p-3 bg-brand-sky rounded-2xl">
            <Mail className="w-5 h-5 text-brand-blue" />
            <div className="flex-1">
              <p className="text-xs text-gray-500">Email</p>
              <p className="text-sm">{profile.email}</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 bg-brand-sky rounded-2xl">
            <MapPin className="w-5 h-5 text-brand-blue" />
            <div className="flex-1">
              <p className="text-xs text-gray-500">University</p>
              <p className="text-sm">{profile.university}</p>
            </div>
          </div>

          {profile.phone && (
            <div className="flex items-center gap-3 p-3 bg-brand-sky rounded-2xl">
              <Phone className="w-5 h-5 text-brand-blue" />
              <div className="flex-1">
                <p className="text-xs text-gray-500">Phone</p>
                <p className="text-sm">{profile.phone}</p>
              </div>
            </div>
          )}

          {profile.campus && (
            <div className="flex items-center gap-3 p-3 bg-brand-sky rounded-2xl">
              <HomeIcon className="w-5 h-5 text-brand-blue" />
              <div className="flex-1">
                <p className="text-xs text-gray-500">Campus</p>
                <p className="text-sm">{profile.campus}</p>
              </div>
            </div>
          )}

          <div className="flex items-center gap-3 p-3 bg-brand-sky rounded-2xl">
            <Award className="w-5 h-5 text-brand-blue" />
            <div className="flex-1">
              <p className="text-xs text-gray-500">Member Since</p>
              <p className="text-sm">January 2025</p>
            </div>
          </div>
        </div>

        {/* Badges */}
        <div className="space-y-3">
          <h2 className="text-sm text-gray-500">Achievements</h2>
          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 bg-brand-sky rounded-2xl text-center">
              <Trophy className="w-6 h-6 mx-auto mb-1 text-brand-blue" strokeWidth={2} />
              <p className="text-xs">Trusted Lender</p>
            </div>
            <div className="p-3 bg-brand-sky rounded-2xl text-center">
              <Star className="w-6 h-6 mx-auto mb-1 text-brand-blue" strokeWidth={2} />
              <p className="text-xs">5-Star Rating</p>
            </div>
            <div className="p-3 bg-brand-sky rounded-2xl text-center">
              <Zap className="w-6 h-6 mx-auto mb-1 text-brand-blue" strokeWidth={2} />
              <p className="text-xs">Quick Responder</p>
            </div>
            <div className="p-3 bg-brand-sky rounded-2xl text-center">
              <BadgeCheck className="w-6 h-6 mx-auto mb-1 text-brand-blue" strokeWidth={2} />
              <p className="text-xs">Verified Student</p>
            </div>
          </div>
        </div>

        {/* Settings */}
        <div className="space-y-2">
          <h2 className="text-sm text-gray-500">Settings</h2>
          <Button variant="outline" className="w-full justify-start cursor-pointer" onClick={() => navigate("/home/my-listings")}>
            <Package className="w-5 h-5 mr-2" />
            My Listings
          </Button>
          <Button variant="outline" className="w-full justify-start cursor-pointer" onClick={() => navigate("/home/edit-profile")}>
            Edit Profile
          </Button>
          <Button variant="outline" className="w-full justify-start">
            Payment Methods
          </Button>
          <Button variant="outline" className="w-full justify-start">
            Notification Settings
          </Button>
          <Button variant="outline" className="w-full justify-start text-destructive hover:text-destructive">
            <LogOut className="w-5 h-5 mr-2" />
            Logout
          </Button>
        </div>
      </div>
    </div>
  );
}
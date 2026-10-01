import { useState } from "react";
import { useNavigate } from "react-router";
import { Search, SlidersHorizontal, Bell, MapPin, ChevronDown, MessageCircle } from "lucide-react";
import { categories } from "../data/mockData";
import { getItems } from "../data/listings";
import { ItemCard } from "../components/ItemCard";
import { Logo } from "../components/Logo";
import { CategoryTile, categoryIcons } from "../components/CategoryIcon";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu";

const malaysianStates = [
  "Johor",
  "Kedah",
  "Kelantan",
  "Melaka",
  "Negeri Sembilan",
  "Pahang",
  "Perak",
  "Perlis",
  "Pulau Pinang",
  "Sabah",
  "Sarawak",
  "Selangor",
  "Terengganu",
];

const federalTerritories = ["Kuala Lumpur", "Labuan", "Putrajaya"];

const LOCATION_KEY = "rentco.location";

function readSavedLocation() {
  try {
    return localStorage.getItem(LOCATION_KEY) ?? "Kuala Lumpur";
  } catch {
    return "Kuala Lumpur";
  }
}

// The deck shows 7 categories plus a "More" tile in a 4x2 grid.
const homeCategories = categories.filter((c) => c !== "All" && c !== "Other");

export function HomePage() {
  const navigate = useNavigate();
  const [location, setLocation] = useState(readSavedLocation);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [showFilters, setShowFilters] = useState(false);
  const [availableOnly, setAvailableOnly] = useState(false);

  const filteredItems = getItems().filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "All" || item.category === selectedCategory;
    const matchesAvailability = !availableOnly || item.availability;
    return matchesSearch && matchesCategory && matchesAvailability;
  });

  // Newest listings first, so the deck's hero items lead the feed
  const featured = [...filteredItems].reverse();
  const isFiltering = searchQuery !== "" || selectedCategory !== "All";

  return (
    <div className="flex flex-col min-h-full bg-white">
      {/* Top bar */}
      <div className="px-5 pt-7 flex items-center gap-2">
        <Logo size="sm" />
        <DropdownMenu>
          <DropdownMenuTrigger className="ml-2 flex items-center gap-1 text-[11px] font-semibold text-brand-navy/80 bg-brand-sky rounded-full px-2.5 py-1 outline-none cursor-pointer hover:bg-[#E0EAFF] data-[state=open]:bg-[#E0EAFF]">
            <MapPin className="w-3 h-3 text-brand-blue" />
            <span className="max-w-[96px] truncate">{location}</span>
            <ChevronDown className="w-3 h-3" />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-56 max-h-80 overflow-y-auto rounded-xl border-[#E3E9F5] shadow-[0_16px_40px_-12px_rgba(11,27,63,0.25)]">
            <DropdownMenuRadioGroup
              value={location}
              onValueChange={(value) => {
                setLocation(value);
                try {
                  localStorage.setItem(LOCATION_KEY, value);
                } catch {
                  // Storage unavailable; keep the choice for this session only.
                }
              }}
            >
              <DropdownMenuLabel className="text-[11px] uppercase tracking-wide text-muted-foreground">
                States
              </DropdownMenuLabel>
              {malaysianStates.map((state) => (
                <DropdownMenuRadioItem key={state} value={state} className="text-sm">
                  {state}
                </DropdownMenuRadioItem>
              ))}
              <DropdownMenuSeparator />
              <DropdownMenuLabel className="text-[11px] uppercase tracking-wide text-muted-foreground">
                Federal Territories
              </DropdownMenuLabel>
              {federalTerritories.map((territory) => (
                <DropdownMenuRadioItem key={territory} value={territory} className="text-sm">
                  {territory}
                </DropdownMenuRadioItem>
              ))}
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>
        <div className="flex-1" />
        <button
          onClick={() => navigate("/home/messages")}
          aria-label="Messages"
          className="w-9 h-9 rounded-full flex items-center justify-center text-brand-navy hover:bg-brand-sky"
        >
          <MessageCircle className="w-5 h-5" />
        </button>
        <button
          aria-label="Notifications"
          className="relative w-9 h-9 rounded-full flex items-center justify-center text-brand-navy hover:bg-brand-sky"
        >
          <Bell className="w-5 h-5" />
          <span className="absolute top-2 right-2.5 w-2 h-2 rounded-full bg-brand-blue ring-2 ring-white" />
        </button>
      </div>

      {/* Hero */}
      <div className="px-5 pt-5">
        <h1 className="text-[26px] leading-[1.15] text-brand-navy">
          Find it. Rent it. <span className="text-brand-blue">Use it.</span>
        </h1>
        <p className="text-[13px] text-muted-foreground mt-1.5">
          Access quality products without having to own them.
        </p>
      </div>

      {/* Search */}
      <div className="px-5 pt-4">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search for anything..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-12 rounded-2xl bg-white pl-11 pr-12 text-sm text-brand-navy placeholder:text-muted-foreground shadow-[0_6px_20px_-8px_rgba(11,27,63,0.25)] ring-1 ring-border outline-none focus:ring-2 focus:ring-brand-blue"
          />
          <button
            onClick={() => setShowFilters(!showFilters)}
            aria-label="Filters"
            className={`absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-xl flex items-center justify-center ${
              showFilters ? "bg-brand-blue text-white" : "bg-brand-sky text-brand-navy"
            }`}
          >
            <SlidersHorizontal className="w-4 h-4" />
          </button>
        </div>

        {showFilters && (
          <div className="flex gap-2 mt-3">
            <button
              onClick={() => setAvailableOnly((v) => !v)}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold ring-1 ${
                availableOnly
                  ? "bg-brand-blue text-white ring-brand-blue"
                  : "bg-white text-brand-navy ring-border"
              }`}
            >
              Available now
            </button>
            {selectedCategory !== "All" && (
              <button
                onClick={() => setSelectedCategory("All")}
                className="px-3 py-1.5 rounded-full text-xs font-semibold bg-brand-sky text-brand-blue"
              >
                {selectedCategory} ✕
              </button>
            )}
          </div>
        )}
      </div>

      {/* Categories */}
      <div className="px-5 pt-5 grid grid-cols-4 gap-y-4">
        {homeCategories.map((cat) => (
          <CategoryTile
            key={cat}
            label={cat}
            icon={categoryIcons[cat]}
            active={selectedCategory === cat}
            onClick={() => setSelectedCategory(selectedCategory === cat ? "All" : cat)}
          />
        ))}
        <CategoryTile
          label="More"
          icon={categoryIcons.Other}
          onClick={() => navigate("/home/explore")}
        />
      </div>

      {/* Featured */}
      <div className="px-5 pt-6 pb-6 flex-1">
        <div className="flex items-baseline justify-between mb-3">
          <h2 className="text-[17px] text-brand-navy">
            {isFiltering ? `${filteredItems.length} result${filteredItems.length === 1 ? "" : "s"}` : "Featured Near You"}
          </h2>
          <button
            onClick={() => navigate("/home/explore")}
            className="text-xs font-semibold text-brand-blue"
          >
            See All
          </button>
        </div>

        {featured.length === 0 ? (
          <div className="text-center py-12 rounded-2xl bg-brand-sky">
            <p className="text-sm font-semibold text-brand-navy">No items found</p>
            <p className="text-xs text-muted-foreground mt-1">Try another search or category.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-x-3 gap-y-4">
            {featured.map((item) => (
              <ItemCard key={item.id} item={item} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

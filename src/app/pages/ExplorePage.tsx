import { useState } from "react";
import { Search } from "lucide-react";
import { mockItems, categories } from "../data/mockData";
import { ItemCard } from "../components/ItemCard";
import { PageHeader } from "../components/PageHeader";
import { categoryIcons } from "../components/CategoryIcon";

type Sort = "recommended" | "price-asc" | "price-desc" | "rating";

const sortLabels: Record<Sort, string> = {
  recommended: "Recommended",
  "price-asc": "Price: Low",
  "price-desc": "Price: High",
  rating: "Top rated",
};

export function ExplorePage() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState<Sort>("recommended");

  const results = mockItems
    .filter(
      (item) =>
        (category === "All" || item.category === category) &&
        (item.title.toLowerCase().includes(query.toLowerCase()) ||
          item.description.toLowerCase().includes(query.toLowerCase())),
    )
    .sort((a, b) => {
      if (sort === "price-asc") return a.price - b.price;
      if (sort === "price-desc") return b.price - a.price;
      if (sort === "rating") return b.ownerRating - a.ownerRating;
      return 0;
    });

  return (
    <div className="flex flex-col min-h-full bg-white">
      <PageHeader title="Explore" subtitle="Browse everything available near campus">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="What do you need today?"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full h-11 rounded-2xl bg-input-background pl-11 pr-4 text-sm text-brand-navy placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-brand-blue"
          />
        </div>
      </PageHeader>

      {/* Category chips */}
      <div className="px-5 overflow-x-auto">
        <div className="flex gap-2 pb-1">
          {categories.map((cat) => {
            const Icon = categoryIcons[cat];
            const active = category === cat;
            return (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`flex items-center gap-1.5 whitespace-nowrap px-3 py-1.5 rounded-full text-xs font-semibold transition-colors ${
                  active ? "bg-brand-blue text-white" : "bg-brand-sky text-brand-navy"
                }`}
              >
                {Icon && <Icon className="w-3.5 h-3.5" />}
                {cat === "Other" ? "More" : cat}
              </button>
            );
          })}
        </div>
      </div>

      {/* Sort */}
      <div className="px-5 pt-3 flex items-center justify-between">
        <span className="text-xs text-muted-foreground">
          {results.length} item{results.length === 1 ? "" : "s"}
        </span>
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value as Sort)}
          className="text-xs font-semibold text-brand-navy bg-transparent outline-none"
        >
          {(Object.keys(sortLabels) as Sort[]).map((s) => (
            <option key={s} value={s}>
              {sortLabels[s]}
            </option>
          ))}
        </select>
      </div>

      <div className="px-5 pt-3 pb-6 flex-1">
        {results.length === 0 ? (
          <div className="text-center py-12 rounded-2xl bg-brand-sky">
            <p className="text-sm font-semibold text-brand-navy">No items found</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-x-3 gap-y-4">
            {results.map((item) => (
              <ItemCard key={item.id} item={item} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

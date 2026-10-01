import { useNavigate } from "react-router";
import { Plus, Package } from "lucide-react";
import { mockItems, currentUser } from "../data/mockData";
import { ItemCard } from "../components/ItemCard";
import { PageHeader } from "../components/PageHeader";

export function MyListingsPage() {
  const navigate = useNavigate();
  const myListings = mockItems.filter((item) => item.ownerId === currentUser.id);
  const availableCount = myListings.filter((item) => item.availability).length;

  return (
    <div className="flex flex-col min-h-full bg-white">
      <PageHeader
        title="My Listings"
        subtitle="Items you're renting out to others"
        onBack={() => navigate(-1)}
      />

      <div className="px-5 flex items-center justify-between">
        <span className="text-xs text-muted-foreground">
          {myListings.length} item{myListings.length === 1 ? "" : "s"} · {availableCount} available
        </span>
        <button
          onClick={() => navigate("/home/add-item")}
          className="flex items-center gap-1 text-xs font-semibold text-brand-blue cursor-pointer hover:underline"
        >
          <Plus className="w-3.5 h-3.5" />
          List new item
        </button>
      </div>

      <div className="px-5 pt-3 pb-6 flex-1">
        {myListings.length === 0 ? (
          <div className="text-center py-12 px-6 rounded-2xl bg-brand-sky">
            <Package className="w-8 h-8 mx-auto mb-2 text-brand-blue" />
            <p className="text-sm font-semibold text-brand-navy">You haven't listed anything yet</p>
            <p className="text-xs text-muted-foreground mt-1">
              Earn from items you're not using. It only takes a minute.
            </p>
            <button
              onClick={() => navigate("/home/add-item")}
              className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-brand-blue text-white text-xs font-semibold px-4 py-2 cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              List your first item
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-x-3 gap-y-4">
            {myListings.map((item) => (
              <ItemCard key={item.id} item={item} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

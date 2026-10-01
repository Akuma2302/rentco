import {
  Camera,
  Dribbble,
  Tent,
  Laptop,
  Wrench,
  CalendarDays,
  Shirt,
  Ellipsis,
  LayoutGrid,
  type LucideIcon,
} from "lucide-react";

export const categoryIcons: Record<string, LucideIcon> = {
  All: LayoutGrid,
  Cameras: Camera,
  Sports: Dribbble,
  Outdoor: Tent,
  Electronics: Laptop,
  Tools: Wrench,
  Events: CalendarDays,
  Fashion: Shirt,
  Other: Ellipsis,
};

interface CategoryTileProps {
  label: string;
  icon: LucideIcon;
  active?: boolean;
  onClick: () => void;
}

export function CategoryTile({ label, icon: Icon, active, onClick }: CategoryTileProps) {
  return (
    <button onClick={onClick} className="flex flex-col items-center gap-1.5 group">
      <span
        className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-colors ${
          active
            ? "bg-brand-blue text-white shadow-[0_8px_16px_-6px_rgba(31,91,255,0.55)]"
            : "bg-brand-sky text-brand-navy group-hover:bg-[#E0EAFF]"
        }`}
      >
        <Icon className="w-6 h-6" strokeWidth={1.8} />
      </span>
      <span className={`text-[11px] font-semibold ${active ? "text-brand-blue" : "text-brand-navy/80"}`}>
        {label}
      </span>
    </button>
  );
}

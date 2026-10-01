import { Home, Search, Plus, CalendarCheck, User } from "lucide-react";
import { useNavigate, useLocation } from "react-router";

const navItems = [
  { icon: Home, label: "Home", path: "/home" },
  { icon: Search, label: "Explore", path: "/home/explore" },
  { icon: Plus, label: "List", path: "/home/add-item", primary: true },
  { icon: CalendarCheck, label: "Bookings", path: "/home/my-rentals" },
  { icon: User, label: "Profile", path: "/home/profile" },
];

export function BottomNav() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="bg-white border-t border-border shadow-[0_-8px_24px_-16px_rgba(11,27,63,0.25)]">
      <div className="flex items-end justify-around px-2 pt-2 pb-3">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;

          if (item.primary) {
            return (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className="flex flex-col items-center gap-1 -mt-6"
              >
                <span className="w-14 h-14 rounded-full bg-brand-blue text-white flex items-center justify-center shadow-[0_10px_20px_-6px_rgba(31,91,255,0.6)] ring-4 ring-white">
                  <Icon className="w-7 h-7" strokeWidth={2.5} />
                </span>
                <span className={`text-[10px] font-semibold ${isActive ? "text-brand-blue" : "text-muted-foreground"}`}>
                  {item.label}
                </span>
              </button>
            );
          }

          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className="flex flex-col items-center gap-1 px-2 py-1 min-w-12"
            >
              <Icon
                className={`w-6 h-6 ${isActive ? "text-brand-blue" : "text-[#8A94AD]"}`}
                strokeWidth={isActive ? 2.4 : 2}
                fill={isActive && item.label === "Home" ? "currentColor" : "none"}
              />
              <span
                className={`text-[10px] font-semibold ${
                  isActive ? "text-brand-blue" : "text-[#8A94AD]"
                }`}
              >
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

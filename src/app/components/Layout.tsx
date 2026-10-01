import { Outlet } from "react-router";
import { BottomNav } from "./BottomNav";
import { PhoneFrame } from "./PhoneFrame";

export function Layout() {
  return (
    <PhoneFrame>
      {/* Content Area */}
      <div className="flex-1 overflow-y-auto">
        <Outlet />
      </div>

      {/* Bottom Navigation */}
      <BottomNav />
    </PhoneFrame>
  );
}

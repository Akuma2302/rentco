import { Outlet } from "react-router";
import { BottomNav } from "./BottomNav";
import { PhoneFrame } from "./PhoneFrame";

export function Layout() {
  return (
    <PhoneFrame>
      {/* Content Area */}
      <div className="flex-1 flex flex-col [&>*]:flex-1 sm:overflow-y-auto">
        <Outlet />
      </div>

      {/* Bottom Navigation */}
      <BottomNav />
    </PhoneFrame>
  );
}

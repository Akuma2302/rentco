import type { ReactNode } from "react";

/**
 * On phones the app fills the whole screen like a native app, and the page itself scrolls
 * so mobile browsers can tuck their address bar away.
 * On larger screens it sits in a phone-sized canvas on the soft blue RentCo backdrop.
 */
export function PhoneFrame({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-dvh bg-white sm:flex sm:items-center sm:justify-center sm:p-4 sm:bg-[radial-gradient(circle_at_20%_10%,#ffffff_0%,#EEF4FF_45%,#DCE7FF_100%)]">
      <div className="relative w-full min-h-dvh bg-white flex flex-col pt-[env(safe-area-inset-top)] sm:pt-0 sm:min-h-0 sm:overflow-hidden sm:max-w-[380px] sm:h-[min(812px,calc(100dvh-2rem))] sm:rounded-[36px] sm:shadow-[0_30px_80px_-20px_rgba(11,27,63,0.35)] sm:ring-1 sm:ring-[#E3E9F5]">
        {children}
      </div>
    </div>
  );
}

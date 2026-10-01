import type { ReactNode } from "react";

/**
 * On phones the app fills the whole screen like a native app.
 * On larger screens it sits in a phone-sized canvas on the soft blue RentCo backdrop.
 */
export function PhoneFrame({ children }: { children: ReactNode }) {
  return (
    <div className="h-dvh bg-white sm:h-auto sm:min-h-dvh sm:flex sm:items-center sm:justify-center sm:p-4 sm:bg-[radial-gradient(circle_at_20%_10%,#ffffff_0%,#EEF4FF_45%,#DCE7FF_100%)]">
      <div className="relative w-full h-dvh bg-white overflow-hidden flex flex-col pt-[env(safe-area-inset-top)] sm:pt-0 sm:max-w-[380px] sm:h-[min(812px,calc(100dvh-2rem))] sm:rounded-[36px] sm:shadow-[0_30px_80px_-20px_rgba(11,27,63,0.35)] sm:ring-1 sm:ring-[#E3E9F5]">
        {children}
      </div>
    </div>
  );
}

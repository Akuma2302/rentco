import type { ReactNode } from "react";

/** Phone-sized canvas on the soft blue RentCo backdrop. */
export function PhoneFrame({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-[radial-gradient(circle_at_20%_10%,#ffffff_0%,#EEF4FF_45%,#DCE7FF_100%)]">
      <div className="relative w-full max-w-[380px] h-[812px] bg-white rounded-[36px] shadow-[0_30px_80px_-20px_rgba(11,27,63,0.35)] ring-1 ring-[#E3E9F5] overflow-hidden flex flex-col">
        {children}
      </div>
    </div>
  );
}

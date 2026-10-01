interface LogoProps {
  size?: "sm" | "md" | "lg";
  showTagline?: boolean;
  inverted?: boolean;
}

const sizes = {
  sm: { word: "text-2xl", tag: "text-[8px]" },
  md: { word: "text-3xl", tag: "text-[9px]" },
  lg: { word: "text-5xl", tag: "text-[11px]" },
};

export function Logo({ size = "md", showTagline = false, inverted = false }: LogoProps) {
  const s = sizes[size];
  return (
    <div className="inline-flex flex-col leading-none">
      <span className={`${s.word} font-extrabold tracking-[-0.04em]`}>
        <span className={inverted ? "text-white" : "text-brand-navy"}>Rent</span>
        <span className="text-brand-blue">Co</span>
      </span>
      {showTagline && (
        <span
          className={`${s.tag} mt-1 font-semibold tracking-[0.18em] uppercase ${
            inverted ? "text-white/70" : "text-brand-navy/70"
          }`}
        >
          by AFSA Fam Ventures
        </span>
      )}
    </div>
  );
}

interface Props {
  variant: "pre" | "post";
  stcgProfits: number;
  stcgLosses: number;
  ltcgProfits: number;
  ltcgLosses: number;
}

const fmt = (n: number) => {
  const abs = Math.abs(n);
  const s = abs.toLocaleString("en-IN", { maximumFractionDigits: 2, minimumFractionDigits: 2 });
  return n < 0 ? `- ${s}` : s;
};

export function CapitalGainsCard({ variant, stcgProfits, stcgLosses, ltcgProfits, ltcgLosses }: Props) {
  const stcgNet = stcgProfits - stcgLosses;
  const ltcgNet = ltcgProfits - ltcgLosses;
  const realised = stcgNet + ltcgNet;

  const isPre = variant === "pre";
  const cardClasses = isPre
    ? "bg-card-dark text-card-dark-foreground border border-card-dark"
    : "bg-card-blue text-card-blue-foreground border border-card-blue";

  const dividerClasses = isPre ? "border-white/10" : "border-white/20";
  const mutedText = isPre ? "text-white/70" : "text-white/80";

  return (
    <div className={`rounded-2xl p-6 ${cardClasses} flex flex-col gap-4 transition-colors`}>
      <h3 className="text-lg font-semibold">
        {isPre ? "Pre Harvesting" : "After Harvesting"}
      </h3>

      <div className="grid grid-cols-3 gap-2 text-sm">
        <div />
        <div className={`font-medium ${mutedText}`}>Short-term</div>
        <div className={`font-medium ${mutedText}`}>Long-term</div>

        <div className={mutedText}>Profits</div>
        <div className="tabular-nums">₹ {fmt(stcgProfits)}</div>
        <div className="tabular-nums">₹ {fmt(ltcgProfits)}</div>

        <div className={mutedText}>Losses</div>
        <div className="tabular-nums">- ₹ {fmt(stcgLosses)}</div>
        <div className="tabular-nums">- ₹ {fmt(ltcgLosses)}</div>

        <div className={`font-semibold ${isPre ? "" : ""}`}>Net Capital Gains</div>
        <div className="tabular-nums font-semibold">₹ {fmt(stcgNet)}</div>
        <div className="tabular-nums font-semibold">₹ {fmt(ltcgNet)}</div>
      </div>

      <div className={`border-t ${dividerClasses} pt-4 flex items-center justify-between`}>
        <span className="font-semibold">
          {isPre ? "Realised Capital Gains" : "Effective Capital Gains"}
        </span>
        <span className="text-xl font-bold tabular-nums">₹ {fmt(realised)}</span>
      </div>
    </div>
  );
}

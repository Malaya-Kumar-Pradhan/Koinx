import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { fetchCapitalGains, fetchHoldings, holdingId, type CapitalGains, type Holding } from "@/lib/taxApi";
import { CapitalGainsCard } from "@/components/tax/CapitalGainsCard";
import { HoldingsTable } from "@/components/tax/HoldingsTable";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "Tax Loss Harvesting — Optimize Your Crypto Taxes" },
      { name: "description", content: "Visualize capital gains and harvest losses to reduce your crypto tax bill in real-time." },
    ],
  }),
});

const fmt = (n: number) =>
  Math.abs(n).toLocaleString("en-IN", { maximumFractionDigits: 2, minimumFractionDigits: 2 });

function Index() {
  const [holdings, setHoldings] = useState<Holding[]>([]);
  const [gains, setGains] = useState<CapitalGains | null>(null);
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([fetchHoldings(), fetchCapitalGains()]).then(([h, g]) => {
      setHoldings(h);
      setGains(g);
      setLoading(false);
    });
  }, []);

  const post = useMemo(() => {
    if (!gains) return null;
    let sp = gains.stcg.profits;
    let sl = gains.stcg.losses;
    let lp = gains.ltcg.profits;
    let ll = gains.ltcg.losses;
    holdings.forEach((h, i) => {
      if (!selected.has(holdingId(h, i))) return;
      if (h.stcg.gain >= 0) sp += h.stcg.gain;
      else sl += -h.stcg.gain;
      if (h.ltcg.gain >= 0) lp += h.ltcg.gain;
      else ll += -h.ltcg.gain;
    });
    return { stcg: { profits: sp, losses: sl }, ltcg: { profits: lp, losses: ll } };
  }, [gains, holdings, selected]);

  const preRealised = gains ? gains.stcg.profits - gains.stcg.losses + gains.ltcg.profits - gains.ltcg.losses : 0;
  const postRealised = post ? post.stcg.profits - post.stcg.losses + post.ltcg.profits - post.ltcg.losses : 0;
  const savings = preRealised - postRealised;
  const showSavings = savings > 0.01;

  const toggle = (id: string) =>
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });

  const toggleAll = (checked: boolean) => {
    if (!checked) setSelected(new Set());
    else setSelected(new Set(holdings.map((h, i) => holdingId(h, i))));
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-lg bg-primary text-primary-foreground grid place-items-center font-bold">
              K
            </div>
            <div>
              <h1 className="font-semibold text-foreground leading-tight">Tax Harvesting</h1>
              <p className="text-xs text-muted-foreground">Lower your tax, smartly.</p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8">
        <section className="space-y-3">
          <details className="rounded-xl border border-border bg-card p-4 text-sm text-muted-foreground" open>
            <summary className="cursor-pointer font-medium text-foreground">
              Important Notes & Disclaimers
            </summary>
            <ul className="list-disc pl-5 mt-3 space-y-1">
              <li>Tax-loss harvesting offsets capital gains by realizing losses on selected assets.</li>
              <li>Selections are simulated — no orders will be placed.</li>
              <li>Short-term and long-term gains are taxed differently in India.</li>
            </ul>
          </details>
        </section>

        <section className="grid gap-5 md:grid-cols-2">
          {loading || !gains || !post ? (
            <>
              <div className="h-64 rounded-2xl bg-muted animate-pulse" />
              <div className="h-64 rounded-2xl bg-muted animate-pulse" />
            </>
          ) : (
            <>
              <CapitalGainsCard
                variant="pre"
                stcgProfits={gains.stcg.profits}
                stcgLosses={gains.stcg.losses}
                ltcgProfits={gains.ltcg.profits}
                ltcgLosses={gains.ltcg.losses}
              />
              <div className="space-y-3">
                <CapitalGainsCard
                  variant="post"
                  stcgProfits={post.stcg.profits}
                  stcgLosses={post.stcg.losses}
                  ltcgProfits={post.ltcg.profits}
                  ltcgLosses={post.ltcg.losses}
                />
                {showSavings && (
                  <div className="rounded-xl bg-success/10 border border-success/30 text-success-foreground px-4 py-3 text-sm font-medium animate-in fade-in slide-in-from-bottom-2">
                    🎉 You're going to save{" "}
                    <span className="font-bold">$ {fmt(savings)}</span> in taxes.
                  </div>
                )}
              </div>
            </>
          )}
        </section>

        <section className="space-y-4">
          <div className="flex items-end justify-between">
            <div>
              <h2 className="text-xl font-semibold text-foreground">Holdings</h2>
              <p className="text-sm text-muted-foreground">
                Select assets to simulate harvesting. {selected.size} selected.
              </p>
            </div>
          </div>
          {loading ? (
            <div className="h-96 rounded-2xl bg-muted animate-pulse" />
          ) : (
            <HoldingsTable
              holdings={holdings}
              selected={selected}
              onToggle={toggle}
              onToggleAll={toggleAll}
            />
          )}
        </section>
      </main>
    </div>
  );
}

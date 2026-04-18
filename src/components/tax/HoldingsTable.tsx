import { useState } from "react";
import type { Holding } from "@/lib/taxApi";
import { holdingId } from "@/lib/taxApi";

interface Props {
  holdings: Holding[];
  selected: Set<string>;
  onToggle: (id: string) => void;
  onToggleAll: (checked: boolean) => void;
}

const fmtNum = (n: number, max = 4) => {
  if (n === 0) return "0";
  if (Math.abs(n) < 0.0001) return n.toExponential(2);
  return n.toLocaleString("en-US", { maximumFractionDigits: max });
};

const fmtMoney = (n: number) => {
  const sign = n < 0 ? "-" : "";
  return `${sign}$ ${Math.abs(n).toLocaleString("en-US", { maximumFractionDigits: 2, minimumFractionDigits: 2 })}`;
};

const FALLBACK = "https://koinx-statics.s3.ap-south-1.amazonaws.com/currencies/DefaultCoin.svg";

function CoinLogo({ src, alt }: { src: string; alt: string }) {
  const [err, setErr] = useState(false);
  return (
    <img
      src={err ? FALLBACK : src}
      alt={alt}
      className="h-9 w-9 rounded-full bg-muted object-contain"
      onError={() => setErr(true)}
    />
  );
}

export function HoldingsTable({ holdings, selected, onToggle, onToggleAll }: Props) {
  const allSelected = holdings.length > 0 && selected.size === holdings.length;
  const someSelected = selected.size > 0 && !allSelected;

  return (
    <div className="rounded-2xl border border-border bg-card overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-muted/60 text-muted-foreground">
            <tr>
              <th className="px-4 py-3 text-left">
                <input
                  type="checkbox"
                  className="h-4 w-4 accent-primary cursor-pointer"
                  checked={allSelected}
                  ref={(el) => {
                    if (el) el.indeterminate = someSelected;
                  }}
                  onChange={(e) => onToggleAll(e.target.checked)}
                />
              </th>
              <th className="px-4 py-3 text-left font-medium">Asset</th>
              <th className="px-4 py-3 text-right font-medium">Holdings</th>
              <th className="px-4 py-3 text-right font-medium">Current Price</th>
              <th className="px-4 py-3 text-right font-medium">Short-Term</th>
              <th className="px-4 py-3 text-right font-medium">Long-Term</th>
              <th className="px-4 py-3 text-right font-medium">Amount to Sell</th>
            </tr>
          </thead>
          <tbody>
            {holdings.map((h, i) => {
              const id = holdingId(h, i);
              const isSel = selected.has(id);
              return (
                <tr
                  key={id}
                  className={`border-t border-border transition-colors cursor-pointer ${
                    isSel ? "bg-primary/5" : "hover:bg-muted/40"
                  }`}
                  onClick={() => onToggle(id)}
                >
                  <td className="px-4 py-3">
                    <input
                      type="checkbox"
                      className="h-4 w-4 accent-primary cursor-pointer"
                      checked={isSel}
                      onChange={() => onToggle(id)}
                      onClick={(e) => e.stopPropagation()}
                    />
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <CoinLogo src={h.logo} alt={h.coin} />
                      <div>
                        <div className="font-medium text-foreground">{h.coinName}</div>
                        <div className="text-xs text-muted-foreground">{h.coin}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="tabular-nums text-foreground">{fmtNum(h.totalHolding)} {h.coin}</div>
                    <div className="text-xs text-muted-foreground tabular-nums">Avg $ {fmtNum(h.averageBuyPrice)}</div>
                  </td>
                  <td className="px-4 py-3 text-right tabular-nums">$ {fmtNum(h.currentPrice, 2)}</td>
                  <td className="px-4 py-3 text-right">
                    <div className={`tabular-nums font-medium ${h.stcg.gain >= 0 ? "text-success" : "text-destructive"}`}>
                      {fmtMoney(h.stcg.gain)}
                    </div>
                    <div className="text-xs text-muted-foreground tabular-nums">{fmtNum(h.stcg.balance)}</div>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className={`tabular-nums font-medium ${h.ltcg.gain >= 0 ? "text-success" : "text-destructive"}`}>
                      {fmtMoney(h.ltcg.gain)}
                    </div>
                    <div className="text-xs text-muted-foreground tabular-nums">{fmtNum(h.ltcg.balance)}</div>
                  </td>
                  <td className="px-4 py-3 text-right tabular-nums">
                    {isSel ? `${fmtNum(h.totalHolding)} ${h.coin}` : "—"}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

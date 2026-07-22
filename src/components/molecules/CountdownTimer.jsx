import { useEffect, useState } from "react";

function getRemaining(target) {
  const total = Math.max(0, target - Date.now());
  return {
    days: Math.floor(total / (1000 * 60 * 60 * 24)),
    hours: Math.floor((total / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((total / (1000 * 60)) % 60),
    seconds: Math.floor((total / 1000) % 60),
  };
}

const UNITS = [
  { key: "days", label: "Days" },
  { key: "hours", label: "Hours" },
  { key: "minutes", label: "Minutes" },
  { key: "seconds", label: "Seconds" },
];

export default function CountdownTimer({ endsAt, variant = "default" }) {
  const [time, setTime] = useState(() => getRemaining(endsAt));

  useEffect(() => {
    const id = setInterval(() => setTime(getRemaining(endsAt)), 1000);
    return () => clearInterval(id);
  }, [endsAt]);

  if (variant === "circle") {
    return (
      <div className="flex items-center gap-4">
        {UNITS.map((u) => (
          <div
            key={u.key}
            className="w-16 h-16 rounded-full bg-white flex flex-col items-center justify-center shrink-0"
          >
            <span className="font-heading text-lg font-bold text-ink tabular-nums leading-none">
              {String(time[u.key]).padStart(2, "0")}
            </span>
            <span className="text-[11px] text-ink mt-1">{u.label}</span>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="flex items-center gap-4">
      {UNITS.map((u, i) => (
        <div key={u.key} className="flex items-center gap-4">
          <div className="text-center">
            <span className="block text-xs text-ink">{u.label}</span>
            <span className="font-heading block text-xl font-bold text-ink tabular-nums">
              {String(time[u.key]).padStart(2, "0")}
            </span>
          </div>
          {i < UNITS.length - 1 && (
            <span className="text-xl font-bold text-primary">:</span>
          )}
        </div>
      ))}
    </div>
  );
}

import { useEffect, useState } from "react";
import { useLang } from "../i18n";

const START = new Date(2025, 8, 28, 18, 0, 0);

function plural(n: number, forms: string[]): string {
  const n10 = n % 10;
  const n100 = n % 100;
  if (n10 === 1 && n100 !== 11) return forms[0];
  if (n10 >= 2 && n10 <= 4 && (n100 < 10 || n100 >= 20)) return forms[1];
  return forms[2];
}

export default function Counter() {
  const { t, lang } = useLang();
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    const id = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(id);
  }, []);

  const elapsed = Math.max(0, now - START.getTime());
  const totalSeconds = Math.floor(elapsed / 1000);

  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor(totalSeconds / 3600) % 24;
  const minutes = Math.floor(totalSeconds / 60) % 60;
  const seconds = totalSeconds % 60;
  const totalMinutes = Math.floor(totalSeconds / 60);

  const units = [
    { value: String(days), label: plural(days, t.counterUnits.days) },
    { value: String(hours).padStart(2, "0"), label: plural(hours, t.counterUnits.hours) },
    { value: String(minutes).padStart(2, "0"), label: plural(minutes, t.counterUnits.minutes) },
    { value: String(seconds).padStart(2, "0"), label: plural(seconds, t.counterUnits.seconds) },
  ];

  return (
    <section id="counter" className="counter">
      <span className="counter__kicker">{t.counterKicker}</span>
      <div className="counter__row">
        {units.map((unit) => (
          <div className="counter__unit" key={unit.label}>
            <span className="counter__value">{unit.value}</span>
            <span className="counter__label">{unit.label}</span>
          </div>
        ))}
      </div>
      <p className="counter__total">
        {t.counterTotal.replace(
          "{n}",
          totalMinutes.toLocaleString(lang === "ru" ? "ru-RU" : "en-US"),
        )}
      </p>
    </section>
  );
}

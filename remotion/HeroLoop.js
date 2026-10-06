import { AbsoluteFill, Easing, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

// 11-second loop for the home page hero: quiz taps -> week board fills -> top pick note -> code copied.
export const HERO = { width: 640, height: 470, fps: 30, durationInFrames: 330 };

const ANSWERS = ["Eat healthier", "Either is fine", "Vegan", "Two of us"];
const TAP_AT = [14, 34, 54, 74];
const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const PICKED = { Tue: 150, Thu: 168 };
const ease = Easing.bezier(0.16, 1, 0.3, 1);

function fade(frame, from, to) {
  return interpolate(frame, [from, to], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: ease });
}

function Quiz({ frame, fps }) {
  const out = interpolate(frame, [96, 116], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: ease });
  return (
    <div style={{ position: "absolute", inset: 0, padding: 40, display: "flex", flexDirection: "column", gap: 14, opacity: 1 - out, transform: `translateY(${-30 * out}px)` }}>
      <div style={{ fontWeight: 700, fontSize: 30, letterSpacing: "-0.02em" }}>
        Find my <span style={{ fontFamily: "var(--font-hand)", color: "var(--teal)", fontSize: 40 }}>match</span>
      </div>
      {ANSWERS.map((a, i) => {
        const shown = fade(frame, TAP_AT[i] - 12, TAP_AT[i] - 2);
        const tap = spring({ frame: frame - TAP_AT[i], fps, config: { damping: 14 } });
        const on = frame >= TAP_AT[i];
        return (
          <div key={a} style={{
            opacity: shown, transform: `translateX(${(1 - shown) * 24}px) scale(${on ? 1 - 0.04 * (1 - tap) : 1})`,
            padding: "16px 20px", borderRadius: 16, fontSize: 22, fontWeight: 600,
            border: `2px solid ${on ? "var(--teal)" : "var(--line)"}`, background: on ? "var(--teal-wash)" : "var(--mist)",
            display: "flex", justifyContent: "space-between", alignItems: "center",
          }}>
            {a}
            <span style={{ width: 26, height: 26, borderRadius: 8, background: on ? "var(--teal)" : "transparent", border: "2px solid var(--teal)", transform: `scale(${on ? tap : 0.6})` }} />
          </div>
        );
      })}
    </div>
  );
}

function Board({ frame, fps }) {
  const inn = fade(frame, 104, 126);
  return (
    <div style={{ position: "absolute", inset: 0, padding: 40, display: "flex", flexDirection: "column", gap: 18, opacity: inn, transform: `translateY(${(1 - inn) * 30}px)` }}>
      <div style={{ fontWeight: 700, fontSize: 20, color: "var(--ink-soft)" }}>This week</div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 8 }}>
        {DAYS.map((d, i) => {
          const pickAt = PICKED[d];
          const flip = pickAt ? spring({ frame: frame - pickAt, fps, config: { damping: 11, mass: 0.7 } }) : 0;
          const appear = fade(frame, 112 + i * 4, 124 + i * 4);
          const meal = pickAt ? (frame >= pickAt ? "Soulara" : "") : ["Kit", "", "Kit", "", "Out", "—", "Plan"][i];
          return (
            <div key={d} style={{
              opacity: appear, borderRadius: 12, padding: "14px 2px", textAlign: "center", fontSize: 15, minHeight: 74,
              border: `1.5px solid ${flip > 0.5 ? "var(--sun-edge)" : "var(--line)"}`,
              background: flip > 0.5 ? "var(--sun)" : "var(--mist)",
              transform: `rotate(${-3 * flip}deg) scale(${1 + 0.08 * Math.sin(Math.PI * Math.min(flip, 1))})`,
              fontWeight: flip > 0.5 ? 700 : 500,
            }}>
              <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.06em", color: "var(--ink-soft)" }}>{d.toUpperCase()}</div>
              {meal}
            </div>
          );
        })}
      </div>
      <Note frame={frame} fps={fps} />
    </div>
  );
}

function Star() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true" fill="var(--sun-edge)">
      <path d="M12 2.8l2.8 5.9 6.4.8-4.7 4.4 1.2 6.3L12 17.1l-5.7 3.1 1.2-6.3L2.8 9.5l6.4-.8z" />
    </svg>
  );
}

function Note({ frame, fps }) {
  const drop = spring({ frame: frame - 196, fps, config: { damping: 12, mass: 0.8 } });
  const codeIn = fade(frame, 236, 250);
  const copied = frame >= 270;
  const pop = spring({ frame: frame - 270, fps, config: { damping: 10 } });
  return (
    <div style={{
      alignSelf: "flex-start", marginLeft: 16, marginTop: 8, padding: "20px 24px", width: 380,
      background: "var(--sun)", borderRadius: 4, boxShadow: "0 10px 22px -10px rgba(16,38,46,0.45)",
      opacity: drop, transform: `translateY(${(1 - drop) * -60}px) rotate(${-1.5 * drop}deg)`,
      display: "flex", flexDirection: "column", gap: 6,
    }}>
      <span style={{ fontFamily: "var(--font-hand)", fontWeight: 700, color: "var(--teal)", fontSize: 34, lineHeight: 1 }}>Try this one!</span>
      <b style={{ fontSize: 22 }}>Soulara Vegan Meals</b>
      <span style={{ fontSize: 18, display: "flex", alignItems: "center", gap: 6 }}>$10.90 per serve · <Star /> 5.0</span>
      <div style={{ display: "flex", gap: 10, alignItems: "center", marginTop: 6, opacity: codeIn }}>
        <span style={{
          fontFamily: "var(--font-data)", fontWeight: 700, fontSize: 18, padding: "6px 12px", borderRadius: 8,
          border: "2px dashed var(--teal)", background: copied ? "var(--teal)" : "#fff", color: copied ? "#fff" : "var(--ink)",
          transform: `scale(${copied ? 1 + 0.08 * Math.sin(Math.PI * Math.min(pop, 1)) : 1})`,
        }}>
          {copied ? "Copied" : "SOUL240OFF"}
        </span>
        <span style={{ fontSize: 16, color: "var(--coral-deep)", fontWeight: 600 }}>$240 off</span>
      </div>
    </div>
  );
}

export function HeroLoop() {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();
  const loopFade = interpolate(frame, [durationInFrames - 14, durationInFrames - 1], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return (
    <AbsoluteFill style={{ background: "var(--card)", color: "var(--ink)", fontFamily: "var(--font-body)", opacity: loopFade }}>
      {frame < 120 && <Quiz frame={frame} fps={fps} />}
      {frame >= 100 && <Board frame={frame} fps={fps} />}
    </AbsoluteFill>
  );
}

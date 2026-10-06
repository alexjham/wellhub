"use client";

import { useEffect, useState } from "react";
import { Player } from "@remotion/player";
import { HeroLoop, HERO } from "../remotion/HeroLoop";

// Plays the hero loop; visitors who prefer reduced motion see its finished frame, still.
export default function HeroPlayer() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const onChange = (e) => setReduced(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  return (
    <div
      role="img"
      aria-label="Animation: answering the quiz fills a week plan, Soulara Vegan Meals is suggested and its code SOUL240OFF is copied."
      style={{ borderRadius: 20, overflow: "hidden", border: "1px solid var(--line)", boxShadow: "var(--shadow)", background: "var(--card)" }}
    >
      <Player
        key={reduced ? "still" : "loop"}
        component={HeroLoop}
        durationInFrames={HERO.durationInFrames}
        compositionWidth={HERO.width}
        compositionHeight={HERO.height}
        fps={HERO.fps}
        autoPlay={!reduced}
        loop={!reduced}
        initialFrame={reduced ? 290 : 0}
        controls={false}
        clickToPlay={false}
        spaceKeyToPlayOrPause={false}
        initiallyMuted
        numberOfSharedAudioTags={0}
        acknowledgeRemotionLicense
        style={{ width: "100%", aspectRatio: `${HERO.width} / ${HERO.height}` }}
      />
    </div>
  );
}

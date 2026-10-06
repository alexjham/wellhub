"use client";

import { useState } from "react";
import { Check } from "./Icons";

export default function CopyCode({ code }) {
  const [state, setState] = useState("idle");

  async function copy() {
    try {
      await navigator.clipboard.writeText(code);
      setState("copied");
    } catch {
      setState("failed");
    }
    setTimeout(() => setState("idle"), 1600);
  }

  return (
    <button
      type="button"
      className={`code${state === "copied" ? " code-copied" : ""}`}
      onClick={copy}
      aria-label={`Copy code ${code}`}
    >
      {state === "copied" ? <><Check size={14} /> Copied</> : state === "failed" ? "Select to copy" : code}
    </button>
  );
}

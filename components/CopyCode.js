"use client";

import { useState } from "react";

export default function CopyCode({ code }) {
  const [label, setLabel] = useState(code);

  async function copy() {
    try {
      await navigator.clipboard.writeText(code);
      setLabel("Copied");
    } catch {
      setLabel("Select to copy");
    }
    setTimeout(() => setLabel(code), 1500);
  }

  return (
    <button type="button" className="code" onClick={copy} aria-label={`Copy code ${code}`}>
      {label}
    </button>
  );
}

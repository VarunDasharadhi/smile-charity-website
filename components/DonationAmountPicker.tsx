"use client";
import { useState } from "react";

const amounts = ["£5", "£10", "£25", "£50", "£100", "Other"];

export default function DonationAmountPicker() {
  const [frequency, setFrequency] = useState<"one-off" | "monthly">("one-off");
  const [selected, setSelected] = useState("£25");

  return (
    <>
      <div className="flex gap-2 mb-8 p-1 bg-gray-100 rounded-full w-fit shadow-inner">
        <button
          type="button"
          onClick={() => setFrequency("one-off")}
          aria-pressed={frequency === "one-off"}
          className={`px-5 py-2 rounded-full text-sm transition-colors ${
            frequency === "one-off"
              ? "bg-black text-white font-bold"
              : "text-gray-600 font-semibold hover:text-black"
          }`}
        >
          One-off
        </button>
        <button
          type="button"
          onClick={() => setFrequency("monthly")}
          aria-pressed={frequency === "monthly"}
          className={`px-5 py-2 rounded-full text-sm transition-colors ${
            frequency === "monthly"
              ? "bg-black text-white font-bold"
              : "text-gray-600 font-semibold hover:text-black"
          }`}
        >
          Monthly
        </button>
      </div>

      <div className="grid grid-cols-3 gap-3 mb-8">
        {amounts.map((a) => (
          <button
            type="button"
            key={a}
            onClick={() => setSelected(a)}
            aria-pressed={selected === a}
            className={`py-4 rounded-2xl font-heading font-bold text-lg transition-all border-2 ${
              selected === a
                ? "bg-yellow border-yellow text-black shadow-[0_12px_24px_rgba(253,215,14,0.3)]"
                : "bg-white border-gray-200 text-black hover:border-yellow"
            }`}
          >
            {a}
          </button>
        ))}
      </div>
    </>
  );
}

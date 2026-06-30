"use client";
import { useEffect, useState } from "react";
import { useInView } from "@/hooks/useInView";

interface AnimatedCounterProps {
  value: string;
  label: string;
}

export default function AnimatedCounter({ value, label }: AnimatedCounterProps) {
  const { ref, inView } = useInView();
  const [display, setDisplay] = useState("0");

  const digits = value.replace(/[^0-9]/g, "");
  const numericValue = parseInt(digits, 10);
  const isNumeric = digits.length > 0 && !isNaN(numericValue);
  const prefix = isNumeric ? value.slice(0, value.indexOf(digits[0])) : "";
  const suffix = isNumeric ? value.slice(value.indexOf(digits[digits.length - 1]) + 1) : "";

  useEffect(() => {
    if (!inView || !isNumeric) {
      setDisplay(value);
      return;
    }
    const duration = 1500;
    const start = performance.now();
    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(eased * numericValue);
      setDisplay(`${prefix}${current.toLocaleString()}${suffix}`);
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [inView]);

  return (
    <div ref={ref} className="text-center">
      <p className="font-heading text-5xl md:text-6xl font-extrabold text-black mb-2">
        {display}
      </p>
      <p className="text-black/70 font-medium text-sm">{label}</p>
    </div>
  );
}

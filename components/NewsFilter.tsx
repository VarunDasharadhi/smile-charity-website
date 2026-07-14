"use client";
import { useState } from "react";
import Link from "next/link";
import PhotoFrame from "./PhotoFrame";

interface Article {
  category: string;
  title: string;
  date: string;
  excerpt: string;
  image: string;
}

const categories = ["All", "Appeal", "Events", "Impact", "Volunteer"];

export default function NewsFilter({ articles }: { articles: Article[] }) {
  const [active, setActive] = useState("All");
  const filtered = active === "All" ? articles : articles.filter((a) => a.category === active);

  return (
    <>
      <div className="flex gap-2 mb-10 overflow-x-auto pb-1">
        {categories.map((c) => (
          <button
            type="button"
            key={c}
            onClick={() => setActive(c)}
            aria-pressed={active === c}
            className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-semibold transition-all ${
              active === c
                ? "bg-black text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            {c}
          </button>
        ))}
      </div>
      {filtered.length > 0 ? (
        <div className="grid md:grid-cols-3 gap-8">
          {filtered.map((a, i) => (
            <Link key={i} href="/news" className="group border border-gray-100 rounded-2xl overflow-hidden hover:shadow-md transition-all">
              <PhotoFrame src={a.image} alt={a.title} aspect="video" accentColor="yellow" />
              <div className="p-5">
                <span className="inline-block px-3 py-1 rounded-full bg-yellow text-black text-xs font-bold mb-3">
                  {a.category}
                </span>
                <h3 className="font-heading font-bold text-black text-base mb-2 group-hover:text-yellow-dark transition-colors line-clamp-2">
                  {a.title}
                </h3>
                <p className="text-gray-500 text-sm line-clamp-3 mb-3">{a.excerpt}</p>
                <p className="text-gray-400 text-xs">{a.date}</p>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <p className="text-gray-500 text-sm">No articles in this category yet.</p>
      )}
    </>
  );
}

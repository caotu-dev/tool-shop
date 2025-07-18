import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

const slides = [
  {
    id: 1,
    title: "Styles Accessories & New Table Lamp",
    subtitle: "Work light, LED, white",
    image: "https://www.insidehook.com/wp-content/uploads/2020/02/BMW.jpg",
    cta: "Shop Now",
    href: "/products",
  },
  {
    id: 2,
    title: "Modern Office Desk Lighting",
    subtitle: "Smart lighting, warm tone",
    image: "https://www.insidehook.com/wp-content/uploads/2020/02/BMW.jpg",
    cta: "Browse",
    href: "/products",
  },
  {
    id: 3,
    title: "Minimalist Bedside Lamps",
    subtitle: "Soft light for cozy nights",
    image: "https://www.insidehook.com/wp-content/uploads/2020/02/BMW.jpg",
    cta: "Discover",
    href: "/products",
  },
];

function HeroSlider() {
  const [index, setIndex] = useState(0);

  // Auto-play effect every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="bg-[#1a1a1a] text-white py-16">
      <div className="max-w-screen-xl mx-auto flex flex-col md:flex-row items-center justify-between px-6 transition-all duration-500">
        {/* Left: Text */}
        <div className="text-center md:text-left md:w-1/2 space-y-4">
          <p className="text-sm text-gray-400">{slides[index].subtitle}</p>
          <h1 className="text-3xl md:text-5xl font-bold leading-tight">
            {slides[index].title.split("&").map((line, i) => (
              <span key={i} className="block">
                {line.trim()}
              </span>
            ))}
          </h1>
          <a
            href={slides[index].href}
            className="inline-block mt-6 bg-white text-black font-medium px-6 py-3 rounded shadow hover:bg-gray-100 transition"
          >
            {slides[index].cta}
          </a>
        </div>

        {/* Right: Image */}
        <div className="mt-10 md:mt-0 md:w-1/2 flex justify-center">
          <img
            src={slides[index].image}
            alt="Lamp hero"
            className="w-full max-w-md object-contain"
          />
        </div>
      </div>

      {/* Dots */}
      <div className="mt-12 flex justify-center gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className={cn(
              "w-3 h-1 rounded-full transition-all duration-300",
              i === index ? "bg-white" : "bg-white/30"
            )}
          ></button>
        ))}
      </div>
    </section>
  );
}

export { HeroSlider };

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const SLIDES = [
  {
    id: 1,
    eyebrow: "iPhone 14 Series",
    title: "Up to 10% off Voucher",
    cta: "Shop Now",
    to: "/search?category=phones",
    image: "/Iphone.png",
  },
  {
    id: 2,
    eyebrow: "Apple Watch Series 8",
    title: "Up to 15% off Voucher",
    cta: "Shop Now",
    to: "/search?category=smartwatch",
    image: "https://picsum.photos/seed/applewatch8/600/400",
  },
  {
    id: 3,
    eyebrow: "JBL Boombox",
    title: "Up to 20% off Voucher",
    cta: "Shop Now",
    to: "/search?category=headphones",
    image: "https://picsum.photos/seed/jblboombox/600/400",
  },
  {
    id: 4,
    eyebrow: "Sony Alpha Cameras",
    title: "Up to 12% off Voucher",
    cta: "Shop Now",
    to: "/search?category=camera",
    image: "https://picsum.photos/seed/sonyalpha/600/400",
  },
  {
    id: 5,
    eyebrow: "Gaming Laptops",
    title: "Up to 18% off Voucher",
    cta: "Shop Now",
    to: "/search?category=computers",
    image: "https://picsum.photos/seed/gaminglaptop/600/400",
  },
];

export default function HeroBanner() {
  const [active, setActive] = useState(0);
  const slide = SLIDES[active];

  useEffect(() => {
    const id = setInterval(() => {
      setActive((prev) => (prev + 1) % SLIDES.length);
    }, 5000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="bg-black text-white rounded-sm overflow-hidden flex flex-col md:flex-row items-center flex-1">
      <div className="p-10 md:p-16 flex-1">
        <p className="text-sm mb-4">{slide.eyebrow}</p>
        <h2 className="font-heading text-3xl md:text-4xl font-semibold mb-6 max-w-xs">
          {slide.title}
        </h2>
        <Link
          to={slide.to}
          className="inline-block border-b border-white pb-1 text-sm"
        >
          {slide.cta} &rarr;
        </Link>
      </div>

      <div className="relative w-full md:w-96 h-64 shrink-0">
        <img
          key={slide.id}
          src={slide.image}
          alt={slide.eyebrow}
          className="w-full h-full object-cover"
        />

        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2">
          {SLIDES.map((s, i) => (
            <button
              key={s.id}
              type="button"
              aria-label={`Go to slide ${i + 1}`}
              onClick={() => setActive(i)}
              className={`w-2.5 h-2.5 rounded-full cursor-pointer transition-colors ${
                i === active ? "bg-primary" : "bg-white/60 hover:bg-white"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

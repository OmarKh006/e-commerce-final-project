import { Link } from "react-router-dom";
import Button from "../atoms/Button";
import CountdownTimer from "../molecules/CountdownTimer";

export function PromoBannerLarge({
  eyebrow,
  title,
  image,
  ctaLabel = "Buy Now",
  to = "#",
  endsAt,
}) {
  return (
    <div className="bg-black text-white rounded-sm overflow-hidden flex flex-col md:flex-row items-center justify-between px-10 md:px-16 py-12 gap-8">
      <div>
        {eyebrow && (
          <p className="text-xs text-secondary-green mb-4">{eyebrow}</p>
        )}
        <h2 className="font-heading text-3xl font-semibold mb-6 max-w-xs">
          {title}
        </h2>
        {endsAt && (
          <div className="mb-8">
            <CountdownTimer endsAt={endsAt} variant="circle" />
          </div>
        )}
        <Link to={to}>
          <Button
            variant="primary"
            className="bg-secondary-green hover:bg-secondary-green"
          >
            {ctaLabel}
          </Button>
        </Link>
      </div>
      <img
        src={image}
        alt={title}
        className="w-full md:w-96 h-56 object-cover rounded-sm"
      />
    </div>
  );
}

export function PromoTile({ title, image = "", to = "#", size = "md" }) {
  return (
    <Link
      to={to}
      className={`relative block rounded-sm overflow-hidden text-white group ${size === "lg" ? "row-span-2" : ""}`}
    >
      {image && (
        <img
          src={image}
          alt={title}
          className={
            title !== "PlayStation 5"
              ? "absolute bottom-0"
              : "absolute bottom-0 left-1/2 -translate-x-1/2"
          }
        />
      )}
      <div className="absolute inset-0 bg-black -z-10" />
      <div className="relative p-6 flex flex-col justify-end h-full min-h-52">
        <h3 className="font-heading text-lg font-semibold mb-2">{title}</h3>
        <span className="text-xs underline underline-offset-4">Shop Now</span>
      </div>
    </Link>
  );
}

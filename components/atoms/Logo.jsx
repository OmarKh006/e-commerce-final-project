import { Link } from "react-router-dom";

export default function Logo({ className = "" }) {
  return (
    <Link
      to="/"
      className={`font-heading text-2xl font-bold text-black tracking-tight ${className}`}
    >
      Exclusive
    </Link>
  );
}

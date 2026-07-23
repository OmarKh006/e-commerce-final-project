// Products and categories now come from Supabase — see src/lib/api and src/hooks/useProducts.js.
// This file only keeps the constants that aren't backed by the database yet.

export const teamMembers = [
  {
    id: "t1",
    name: "Tom Cruise",
    role: "Founder & Chairman",
    image: "/avatar1.png",
  },
  {
    id: "t2",
    name: "Emma Watson",
    role: "Managing Director",
    image: "/avatar2.png",
  },
  {
    id: "t3",
    name: "Will Smith",
    role: "Product Designer",
    image: "/avatar2.png",
  },
];

export const flashSaleEndsAt =
  Date.now() + (3 * 24 + 23) * 60 * 60 * 1000 + 19 * 60 * 1000 + 56 * 1000;

export const jblOfferEndsAt =
  Date.now() + (5 * 24 + 23) * 60 * 60 * 1000 + 59 * 60 * 1000 + 35 * 1000;

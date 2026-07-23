// Mock data — swap for Supabase queries later.
// Image URLs use picsum/placeholder services so the UI has real imagery.

export const categories = [
  { id: "phones", name: "Phones", icon: "FiSmartphone" },
  { id: "computers", name: "Computers", icon: "FiMonitor" },
  { id: "smartwatch", name: "SmartWatch", icon: "FiWatch" },
  { id: "camera", name: "Camera", icon: "FiCamera" },
  { id: "headphones", name: "Headphones", icon: "FiHeadphones" },
  { id: "gaming", name: "Gaming", icon: "FiGamepad" },
];

export const products = [
  {
    id: "p1",
    title: "HAVIT HV-G92 Gamepad",
    price: 120,
    oldPrice: 160,
    discountPct: 25,
    rating: 4.5,
    reviewCount: 88,
    image: "/gamepad.png",
    images: [
      "https://imgs.search.brave.com/eBWB_Bn4IUa2Mf3UBsvRGe4JZi3IZdC18gsLx3I3xxo/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9zLmFs/aWNkbi5jb20vQHNj/MDQva2YvSDU0Mzg5/MmM5NmZiYjRmZjVh/ZDkzMDEyZWRjODQw/NTA3QS5qcGdfNzIw/eDcyMHE1MC5qcGc",
      "https://imgs.search.brave.com/_igcCFOyY4wN0oXz5-Dx41zmGhjRpXyxAvq1ItfGL0c/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly93d3cu/dWx0cmF0ZWNoLmNv/bS5iZC9pbWFnZS9j/YWNoZS9jYXRhbG9n/L2dhbWVwYWQvaGF2/aXQvaHYtZzkyL2hh/dml0LWh2LWc5Mi1n/YW1lcGFkLTItNTAw/eDUwMC5qcGcud2Vi/cA",
    ],
    badge: "sale",
    colors: ["#DB4444", "#2368CC"],
    sizes: [],
    category: "gaming",
    description:
      "PlayStation 5 Controller Skin — high quality vinyl with air channel adhesive for easy bubble-free install & mess-free removal. Pressure sensitive.",
    inStock: true,
  },
  {
    id: "p2",
    title: "AK-900 Wired Keyboard",
    price: 960,
    oldPrice: 1160,
    discountPct: 35,
    rating: 4,
    reviewCount: 75,
    image: "/keyboard.png",
    images: [
      "https://imgs.search.brave.com/EDTrdepMKmnafwhD0xG-yZ2mujCLrg64BThQToCmMl0/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9pbWcu/bXlpcGFkYm94LmNv/bS91cGxvYWQvc3Rv/cmUvZGV0YWlsX2wv/VEJEMDYwMjEyMzgw/MV9CNC5qcGc",
      "https://imgs.search.brave.com/f2P6ZikwgVLUiHm1IAq4S_xBNuXzGulIl22A4iGcW5A/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9pbWcu/bXlpcGFkYm94LmNv/bS91cGxvYWQvc3Rv/cmUvZGV0YWlsX2wv/VEJEMDYwMjEyMzgw/MV9CMi5qcGc",
      "https://imgs.search.brave.com/U0RtQYABl26Clgs7GAJDieGOo8YBXGXPuHL1PIEyv0g/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9pbWcu/bXlpcGFkYm94LmNv/bS91cGxvYWQvc3Rv/cmUvZGV0YWlsX2wv/VEJEMDYwMjEyMzgw/MV9CMS5qcGc",
    ],
    badge: "sale",
    colors: ["#000000"],
    sizes: [],
    category: "computers",
    description:
      "Full-size mechanical keyboard with per-key RGB lighting, hot-swappable switches, and a braided USB-C cable.",
    inStock: true,
  },
  {
    id: "p3",
    title: "IPS LCD Gaming Monitor",
    price: 370,
    oldPrice: 400,
    discountPct: 30,
    rating: 5,
    reviewCount: 99,
    image: "/monitor.png",
    images: [],
    badge: "sale",
    colors: ["#000000"],
    sizes: [],
    category: "computers",
    description:
      '27" IPS panel, 165Hz refresh rate, 1ms response time. FreeSync and G-Sync compatible for tear-free gaming.',
    inStock: true,
  },
  {
    id: "p4",
    title: "S-Series Comfort Chair",
    price: 375,
    oldPrice: 400,
    discountPct: null,
    rating: 4.5,
    reviewCount: 99,
    image: "/chair.png",
    images: [],
    badge: null,
    colors: ["#8B5E3C"],
    sizes: [],
    category: "home",
    description:
      "Ergonomic office chair with adjustable lumbar support, breathable mesh back, and 4D armrests.",
    inStock: true,
  },
];

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

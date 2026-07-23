import { supabase } from "../supabaseClient";

function mapProduct(row) {
  const images = (row.product_images || [])
    .slice()
    .sort((a, b) => a.sort_order - b.sort_order)
    .map((img) => img.url);

  return {
    id: row.id,
    title: row.title,
    description: row.description,
    price: Number(row.price),
    oldPrice: row.old_price != null ? Number(row.old_price) : null,
    discountPct: row.discount_pct,
    rating: Number(row.rating_avg) || 0,
    reviewCount: row.review_count ?? 0,
    image: row.image_url,
    images,
    badge: row.badge,
    colors: row.colors || [],
    sizes: row.sizes || [],
    category: row.category_id,
    inStock: row.in_stock,
  };
}

const PRODUCT_SELECT = "*, product_images(url, sort_order)";

export async function fetchProducts() {
  const { data, error } = await supabase
    .from("products")
    .select(PRODUCT_SELECT)
    .order("created_at", { ascending: false });

  if (error) throw error;
  return (data || []).map(mapProduct);
}

export async function fetchProductById(id) {
  const { data, error } = await supabase
    .from("products")
    .select(PRODUCT_SELECT)
    .eq("id", id)
    .maybeSingle();

  if (error) throw error;
  return data ? mapProduct(data) : null;
}

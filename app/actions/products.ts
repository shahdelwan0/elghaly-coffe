"use server";

import { db } from "@/lib/db";
import { products } from "@/lib/schema";

export async function getProducts() {
  return await db.query.products.findMany({
    with: {
      images: true,
      sizes: true,
      variants: true,
    },
  });
}

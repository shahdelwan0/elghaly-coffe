import { getProducts } from "@/app/actions/products";
import ProductDetails from "./ProductDetails";

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const products = await getProducts();
  const product = products.find((p) => p.id === Number(id));

  if (!product) {
    return <div>Product not found</div>;
  }

  return <ProductDetails product={product} />;
}

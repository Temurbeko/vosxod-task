import ProductDetail from "@/components/product-detail/ProductDetail";
import { getProductById } from "@/api/productService";
import { notFound } from "next/navigation";


export default async function ProductPage({ params }: any) {
  const product = await getProductById(params.id);
  if (!product) {
    notFound();
  }

  return <ProductDetail product={product} />;
}

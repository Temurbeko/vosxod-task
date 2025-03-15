import ProductDetail from "@/components/product-detail/ProductDetail";
import { getProductById } from "@/api/productService";
import { notFound } from "next/navigation";

interface ProductPageProps {
  params: {
    id: string;
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const product = await getProductById(params.id);

  if (!product) {
    notFound();
  }

  return <ProductDetail product={product} />;
}

import ProductList from "@/components/product-list/ProductList";
import { getAllProducts } from "@/api/productService";

export default async function Home() {
  const products = await getAllProducts();

  return (
    <main>
      <ProductList initialProducts={products} />
    </main>
  );
}

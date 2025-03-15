import productData from "@/data/products.json";
import { Product } from "@/types";

export async function getAllProducts(): Promise<Product[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(productData as Product[]);
    }, 200);
  });
}

export async function getProductById(id: string): Promise<Product | null> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const product =
        (productData as Product[]).find((p) => p.id === id) || null;
      resolve(product);
    }, 200);
  });
}

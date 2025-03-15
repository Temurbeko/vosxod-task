import { CartProvider } from "@/context/CartContext";
import Header from "@/components/header/Header";
import "./globals.scss";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Интернет-магазин",
  description: "E-commerce приложение на Next.js",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <CartProvider>
          <Header />
          <div className="container">{children}</div>
        </CartProvider>
      </body>
    </html>
  );
}

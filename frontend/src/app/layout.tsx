import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import Header from "@/components/Header";
import Toast from "@/components/Toast";
import { CartProvider } from "@/context/CartContext";

export const metadata: Metadata = {
  title: "Next_Shop",
  description: "Ecommerce website",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <CartProvider>
            <Header />
            <Toast />
            {children}
          </CartProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

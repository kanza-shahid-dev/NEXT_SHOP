import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import SizePicker from "./SizePicker";
import { toast } from "react-toastify";
import { useCart } from "@/context/CartContext";
import { Product } from "@/types/product";
import ProductGallery from "./ProductGallery";
import ProductImage from "./ProductImage";
import { apiBaseUrl } from "@/lib/utils";
import ColorPicker from "./ColorPicker";
import ExpandableProductDescription from "./ExpandableProductDescription";
import ProductQuanityInput from "./ProductQuanityInput";

type ProductItemProps = {
  product: Product;
};

function ProductItem({ product }: ProductItemProps) {
  const [selectedColor, setSelectedColor] = useState(product.color);
  const [quantity, setQuantity] = useState(1);
  const [openGallery, setOpenGallery] = useState(false);
  const [svgContent, setSvgContent] = useState("");

  const { addItem } = useCart();

  useEffect(() => {
    async function fetchSvg() {
      try {
        const res = await fetch(`${apiBaseUrl}${product.coverImage}`);
        if (!res.ok) {
          throw new Error("Failed to fetch SVG");
        }
        const text = await res.text();
        setSvgContent(text);
        generateRandomColor();
      } catch (error) {
        console.error(error);
      }
    }
    fetchSvg();
  }, [product.coverImage]);

  const changeSvgColor = (svgText: string, color: string) => {
    return svgText.replace(/fill="(.*?)"/g, `fill="${color}"`);
  };

  const generateRandomColor = () => {
    const randomColor = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
    setSelectedColor(randomColor);
  };
  const coloredSvg = changeSvgColor(svgContent, selectedColor);

  const handleAddToCart = () => {
    addItem(product, quantity);
    toast.success("Item added");
  };

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value)) {
      setQuantity(value);
    }
  };

  const handleColorChange = (color: string) => {
    setSelectedColor(color);
  };
  const totalPrice = product.price * quantity;
  console.log("prod", product);

  return (
    <div className="p-4 border rounded-xl shadow hover:shadow-md transition">
      <ProductImage coverImage={coloredSvg} setOpenGallery={setOpenGallery} />
      <ProductGallery
        coverImage={product.coverImage}
        images={product.imagesData}
        openGallery={openGallery}
        setOpenGallery={setOpenGallery}
        alt="Product"
      />

      <div className="mt-4 space-y-2">
        <h2 className="text-xl font-semibold">{product.name}</h2>

        <p className="text-green-600 text-lg">${totalPrice.toFixed(2)}</p>

        <ColorPicker onColorChange={handleColorChange} />

        <SizePicker />

        <ProductQuanityInput
          quantity={quantity}
          handleQuantityChange={handleQuantityChange}
        />

        <Button onClick={handleAddToCart} className="w-full text-lg py-5">
          Add to Cart
        </Button>
      </div>

      <ExpandableProductDescription description={product.description} />
    </div>
  );
}

export default ProductItem;

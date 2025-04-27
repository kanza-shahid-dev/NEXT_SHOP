import React from "react";

interface ProductQuantityProps {
  quantity: number;
  handleQuantityChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
function ProductQuanityInput({
  quantity,
  handleQuantityChange,
}: ProductQuantityProps) {
  return (
    <div className="flex items-center gap-3">
      <label className="font-semibold">Quantity</label>
      <input
        type="number"
        min={1}
        value={quantity}
        onChange={handleQuantityChange}
        className="w-16 border rounded p-1 text-center cursor-pointer"
      />
    </div>
  );
}

export default ProductQuanityInput;

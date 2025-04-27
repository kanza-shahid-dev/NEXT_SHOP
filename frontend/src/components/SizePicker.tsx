import { useState } from "react";
import { Tabs, TabsList, TabsTrigger } from "./ui/tabs";

function SizePicker() {
  const sizes = ["Small", "Medium", "Large"];

  return (
    <Tabs defaultValue={sizes[0]} className="w-full ">
      <p className="font-semibold">Size</p>
      <TabsList>
        {sizes.map((size) => (
          <TabsTrigger key={size} value={size} className="cursor-pointer">
            {size}
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  );
}

export default SizePicker;

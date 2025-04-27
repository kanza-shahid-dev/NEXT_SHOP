import { useEffect, useState } from "react";

interface ColorPickerProps {
  onColorChange: (color: string) => void;
}

const predefinedColors = [
  "#FF0000", // Red
  "#0000FF", // Blue
  "#000000", // Black
];

export default function ColorPicker({ onColorChange }: ColorPickerProps) {
  const [selectedColor, setSelectedColor] = useState<string>("");

  const handleColorChange = (color: string) => {
    setSelectedColor(color);
    onColorChange(color);
  };

  const handleColorPickerChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const color = event.target.value;
    handleColorChange(color);
  };

  return (
    <div className="flex mt-4 gap-3 flex-wrap items-center">
      {predefinedColors?.map((color) => (
        <button
          key={color}
          onClick={() => handleColorChange(color)}
          style={{
            backgroundColor: color,
            width: 32,
            height: 32,
            border:
              selectedColor === color ? "3px solid #444" : "1px solid #ccc",
            borderRadius: "50%",
            cursor: "pointer",
          }}
        />
      ))}
      Color Picker:
      <input
        type="color"
        id="colorPicker"
        data-testid="color-picker-input"
        name="color"
        value={selectedColor}
        onChange={handleColorPickerChange}
        style={{
          width: 32,
          height: 32,
          borderRadius: "50%",
          cursor: "pointer",
        }}
      />
    </div>
  );
}

import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import ColorPicker from "../ColorPicker";

describe("ColorPicker", () => {
  const mockOnColorChange = jest.fn();

  beforeEach(() => {
    mockOnColorChange.mockClear();
  });

  it("renders predefined color buttons and color picker input", () => {
    render(<ColorPicker onColorChange={mockOnColorChange} />);

    // Check for predefined color buttons
    const buttons = screen.getAllByRole("button");
    expect(buttons).toHaveLength(3); // We have 3 predefined colors

    // Check for color picker input
    const colorPickerInput = screen.getByTestId("color-picker-input");
    expect(colorPickerInput).toBeInTheDocument();
    expect(colorPickerInput).toHaveAttribute("type", "color");
  });

  it("calls onColorChange when a predefined color is clicked", () => {
    render(<ColorPicker onColorChange={mockOnColorChange} />);

    // Click the first color button (red)
    const redButton = screen.getAllByRole("button")[0];
    fireEvent.click(redButton);

    // Check if onColorChange was called with the correct color
    expect(mockOnColorChange).toHaveBeenCalledWith("#FF0000");
  });
});

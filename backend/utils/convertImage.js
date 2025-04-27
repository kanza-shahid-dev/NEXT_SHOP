import { trace } from "potrace";
import fs from "fs/promises";

export const convertImageToSvg = async (inputPath, outputPath) => {
  try {
    const svg = await new Promise((resolve, reject) => {
      trace(inputPath, (err, svg) => {
        if (err) return reject(err);
        resolve(svg);
      });
    });

    await fs.writeFile(outputPath, svg);
  } catch (error) {
    console.error("Error during SVG conversion:", error);
  }
};

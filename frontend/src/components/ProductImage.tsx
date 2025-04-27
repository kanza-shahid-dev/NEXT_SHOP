"use client";

export default function ProductImage({ coverImage, setOpenGallery }: any) {
  if (!coverImage) {
    return null;
  }
  const resizedSvg = coverImage
    .replace(/width=".*?"/g, 'width="330"')
    .replace(/height=".*?"/g, 'height="200"');
  return (
    <div
      className="cursor-pointer"
      dangerouslySetInnerHTML={{ __html: resizedSvg }}
      onClick={() => {
        setOpenGallery(true);
      }}
    />
  );
}

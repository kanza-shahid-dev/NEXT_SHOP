import Lightbox from "yet-another-react-lightbox";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import "yet-another-react-lightbox/styles.css";

function ProductGallery({ images, openGallery, setOpenGallery }: any) {
  const slides = images.map((img: string) => ({ src: img }));
  return (
    <>
      {openGallery && (
        <Lightbox
          open={openGallery}
          close={() => setOpenGallery(false)}
          slides={slides}
          plugins={[Zoom]}
          zoom={{
            maxZoomPixelRatio: 4,
          }}
        />
      )}
    </>
  );
}

export default ProductGallery;

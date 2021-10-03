import React, { useCallback, useState } from "react";
import Carousel, { Modal, ModalGateway } from "react-images";
import Gallery, { RenderImageProps } from "react-photo-gallery";
import ImageFadeIn from "react-image-fade-in";
import FadeInSection from "./fadeinsection";

interface PPProps {
  columns: number;
  photos: {
    src: string;
    height: number;
    width: number;
    title: string;
    srcSet: any;
  }[];
}

export default function PhotoPage(props: PPProps) {
  const [currentImage, setCurrentImage] = useState(0);
  const [viewerIsOpen, setViewerIsOpen] = useState(false);

  const openLightbox = useCallback((event, { photo, index }) => {
    setCurrentImage(index);
    setViewerIsOpen(true);
  }, []);

  const openViewer = (index: number) => {
    return () => {
      setCurrentImage(index);
      setViewerIsOpen(true);
    };
  };

  const customContext = (event: any) => {
    event.preventDefault();
    console.log(event);
  };

  const closeLightbox = () => {
    setCurrentImage(0);
    setViewerIsOpen(false);
  };

  const render = (riprops: RenderImageProps): any => {
    return (
      <FadeInSection>
        <ImageFadeIn
          src={props.photos[riprops.index].src}
          width={riprops.photo.width}
          height={riprops.photo.height}
          opacityTransition={1}
          style={{ margin: riprops.margin }}
          onClick={openViewer(riprops.index)}
        />
      </FadeInSection>
    );
  };

  return (
    <div
      className="page-content"
      style={{ paddingBottom: "100px" }}
      onContextMenu={customContext}
    >
      <Gallery
        columns={props.columns}
        photos={props.photos}
        onClick={openLightbox}
        renderImage={render}
      />
      <ModalGateway>
        {viewerIsOpen ? (
          <Modal onClose={closeLightbox}>
            <Carousel
              currentIndex={currentImage}
              views={props.photos.map((x) => ({
                ...x,
                srcset: x.srcSet,
                caption: x.title,
                source: x.src,
              }))}
            />
          </Modal>
        ) : null}
      </ModalGateway>
    </div>
  );
}

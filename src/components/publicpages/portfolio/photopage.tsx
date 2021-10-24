import React, { Suspense, useCallback, useEffect, useState } from "react";
import Carousel, { Modal, ModalGateway } from "react-images";
import Gallery, { RenderImageProps } from "react-photo-gallery";
import ImageFadeIn from "react-image-fade-in";
import FadeInSection from "./fadeinsection";
import { CircularProgress } from "@mui/material";

import backend from "../../../backend/backend";

import { ImageList } from "../../../backend/backendinterface";

interface PPProps {
  title: string;
  serverDir: string;
}

export default function PhotoPage(props: PPProps) {
  const [currentImage, setCurrentImage] = useState(0);
  const [viewerIsOpen, setViewerIsOpen] = useState(false);

  const defLst: ImageList[] = [];
  const [photos, setImgs] = useState(defLst);

  useEffect(() => {
    backend.getImages("couples").then((data) => {
      setImgs(data);
    });
  }, []);

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
  };

  const closeLightbox = () => {
    setCurrentImage(0);
    setViewerIsOpen(false);
  };

  const render = (riprops: RenderImageProps): any => {
    return (
      <Suspense key={riprops.photo.src} fallback={<CircularProgress />}>
        <FadeInSection>
          <ImageFadeIn
            src={photos[riprops.index].src}
            width={riprops.photo.width}
            height={riprops.photo.height}
            opacityTransition={1}
            style={{ margin: riprops.margin }}
            onClick={openViewer(riprops.index)}
          />
        </FadeInSection>
      </Suspense>
    );
  };

  return (
    <div
      className="page-content"
      style={{ paddingBottom: "100px" }}
      onContextMenu={customContext}
    >
      <div className="page-header">{props.title}</div>
      <Gallery photos={photos} onClick={openLightbox} renderImage={render} />
      <ModalGateway>
        {viewerIsOpen ? (
          <Modal onClose={closeLightbox}>
            <Carousel
              currentIndex={currentImage}
              views={photos.map((x) => ({
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

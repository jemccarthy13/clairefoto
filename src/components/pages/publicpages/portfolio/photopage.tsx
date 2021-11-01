import React, { Suspense, useCallback, useEffect, useState } from "react";
import Carousel, { Modal, ModalGateway } from "react-images";
import Gallery, { RenderImageProps } from "react-photo-gallery";
import FadeInSection from "./fadeinsection";

import { CircularProgress, IconButton } from "@mui/material";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

import backend from "../../../../backend/backend";

import { ImageList } from "../../../../backend/backendinterface";
import { AuthContext } from "../../../authcontext";

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
    backend.getImages(props.serverDir).then(async (data) => {
      setImgs(data);
    });
  }, [props.serverDir]);

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

  const deletePhoto = (index: number) => {
    const func = () => {
      const newImgs = photos;
      newImgs.splice(index, 1);
      setImgs(
        newImgs.map((d) => {
          return d;
        })
      );

      console.log("delete from server....");
    };
    return func;
  };

  const render = (riprops: RenderImageProps): any => {
    return (
      <Suspense key={riprops.photo.src} fallback={<CircularProgress />}>
        <FadeInSection>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr",
              gridTemplateRows: "1fr",
            }}
          >
            <img
              alt=""
              src={photos[riprops.index].src}
              width={riprops.photo.width}
              height={riprops.photo.height}
              style={{ margin: riprops.margin, gridArea: "1/-1" }}
              onClick={openViewer(riprops.index)}
            />
            <AuthContext.Consumer>
              {(value) =>
                value.auth && (
                  <IconButton
                    style={{
                      verticalAlign: "baseline",
                      gridArea: "1/-1",
                      backgroundColor: "white",
                      zIndex: 99,
                      width: "min-content",
                      height: "min-content",
                    }}
                    onClick={deletePhoto(riprops.index)}
                  >
                    <DeleteForeverIcon />
                  </IconButton>
                )
              }
            </AuthContext.Consumer>
          </div>
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

import React, { Suspense, useCallback, useEffect, useState } from "react";
import Carousel, { Modal, ModalGateway } from "react-images";
import Gallery, { RenderImageProps } from "react-photo-gallery";
import FadeInSection from "./fadeinsection";

import { CircularProgress, IconButton } from "@mui/material";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

import backend from "../../../../backend/backend";

import { ImageList } from "../../../../backend/backendinterface";
import { AuthContext } from "../../../authcontext";
import SnackActions from "../../../../alert/alert";
import ConfirmDialog from "../../../confirmdialog";

interface PPProps {
  title: string;
  serverDir: string;
}

export default function PhotoPage(props: PPProps) {
  const [currentImage, setCurrentImage] = useState(0);
  const [viewerIsOpen, setViewerIsOpen] = useState(false);

  const defLst: ImageList[] = [];
  const [photos, setImgs] = useState(defLst);

  const [dialogOpen, setDialogOpen] = useState(false);
  const [delCallback, setDelCallback] = useState(() => (b: boolean) => {});

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
      setDelCallback(() => (confirmed: boolean) => {
        setDialogOpen(false);
        if (confirmed) {
          const row = index;
          console.log("confirmed");
          backend.deleteImage(photos[row].src).then((data) => {
            console.log(data);
            if (data.ok) {
              SnackActions.success("Deleted " + photos[row].src);
              const newImgs = photos;
              newImgs.splice(index, 1);
              setImgs(
                newImgs.map((d) => {
                  return d;
                })
              );
            } else {
              SnackActions.error(
                "Unable to delete: error code - " + data.status
              );
            }
          });
        }
      });
      setDialogOpen(true);
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
      <ConfirmDialog
        title={"Confirm delete?"}
        open={dialogOpen}
        callback={delCallback}
        description={
          "You are about to permanently delete this image from this gallery. Are you sure?"
        }
      />
    </div>
  );
}

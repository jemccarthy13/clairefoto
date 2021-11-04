import React, { useEffect, useState } from "react";

import backend from "../../../../backend/backend";

import { ImageList } from "../../../../backend/backendinterface";
import SnackActions from "../../../../alert/alert";

import ModalCarouselAdapter from "./modalcarouseladapter";
import GalleryAdapter from "./galleryadapter";
import { useConfirmDialog } from "../../../useConfirmDialog";
import DropzoneAdapter from "./dropzoneadapter";
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

  const [dialogOpen, setDialogOpen] = useState(false);
  const [delIndex, setDelIndex] = useState(-1);

  useEffect(() => {
    backend.getImages(props.serverDir).then(async (data) => {
      setImgs(data);
    });
  }, [props.serverDir]);

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

  const DelDialog = useConfirmDialog(
    {
      title: "Confirm delete?",
      description:
        "You are about to permanently delete this image from this gallery. " +
        "Are you sure?",
      isOpen: dialogOpen,
      confirmAction: () => {
        if (delIndex > -1) {
          backend.deleteImage(photos[delIndex].src).then((data) => {
            if (data.ok) {
              SnackActions.success("Deleted " + photos[delIndex].src);
              const newImgs = photos;
              newImgs.splice(delIndex, 1);
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
        setDialogOpen(false);
      },
      cancelAction: () => {
        setDialogOpen(false);
      },
    },
    [dialogOpen]
  );

  const deletePhoto = (index: number) => {
    const func = () => {
      console.log("set del index" + index);
      setDelIndex(index);
      setDialogOpen(true);
    };

    return func;
  };

  return (
    <div
      className="page-content"
      style={{ paddingBottom: "100px" }}
      onContextMenu={customContext}
    >
      <div className="page-header">{props.title}</div>

      <AuthContext.Consumer>
        {(value) =>
          value.auth && <DropzoneAdapter destination={props.serverDir} />
        }
      </AuthContext.Consumer>

      <GalleryAdapter
        photos={photos}
        openViewer={openViewer}
        onDelete={deletePhoto}
      />

      <ModalCarouselAdapter
        isOpen={viewerIsOpen}
        photos={photos}
        currentIndex={currentImage}
        onClose={closeLightbox}
      />

      {DelDialog}
    </div>
  );
}

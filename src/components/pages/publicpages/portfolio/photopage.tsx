import { useEffect, useState } from "react";

// Internal Utilities
import backend from "../../../../backend/backend";
import { ImageList } from "../../../../backend/backendinterface";
import SnackActions from "../../../../alert/alert";
import { useConfirmDialog } from "../../../useConfirmDialog";
import { AuthContext } from "../../../authcontext";

// Adapter pattern for external libraries
import ModalCarouselAdapter from "./modalcarouseladapter";
import GalleryAdapter from "./galleryadapter";
import DropzoneAdapter from "./dropzoneadapter";

/**
 * Interface for the photo page props
 *
 * @member {string} title: Title of the Photo Page
 * @member {string} serverDir: Directory for the photos on the server
 */
interface PPProps {
  title: string;
  serverDir: string;
}

/**
 * Functional component for a photo page gallery
 *
 * @param props Title of the page and serverDir where to get the photos
 * @returns JSX.Element to render the photo gallery
 */
export default function PhotoPage(props: PPProps): JSX.Element {
  const defLst: ImageList[] = [];
  // List of images from the server
  const [photos, setImgs] = useState(defLst);

  // Index of the clicked on image
  const [currentImage, setCurrentImage] = useState(0);

  // Flag for whether the modal viewer is open
  const [viewerIsOpen, setViewerIsOpen] = useState(false);

  // Flag for the delete dialog
  const [dialogOpen, setDialogOpen] = useState(false);

  // Index of the photo to delete
  const [delIndex, setDelIndex] = useState(-1);

  /**
   * Custom effect - when the serverDir props changes, fetch
   * images from the server, then set the current list of
   * photos to render
   */
  useEffect(() => {
    backend.getImages(props.serverDir).then(async (data) => {
      setImgs(data);
    });
  }, [props.serverDir]);

  /**
   * Open the modal viewer at the current index by setting state/flags
   *
   * @param index Current index of clicked photo
   * @returns a function to open the viewer
   */
  const openViewer = (index: number) => {
    return () => {
      setCurrentImage(index);
      setViewerIsOpen(true);
    };
  };

  /**
   * Right clicking on an image does nothing, because this
   * function overrides the default context menu
   *
   * @param event a React event for onContextMenu
   */
  const customContextMenu = (event: React.MouseEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  /**
   * Close the modal lightbox viewer by setting state / flags
   */
  const closeLightbox = () => {
    setCurrentImage(0);
    setViewerIsOpen(false);
  };

  /**
   * Custom effect of using a confirmation dialog to
   * perform an action; in this case, delete an image
   *
   * @param dialogOpen Dependancy to toggle the delete dialog
   */
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
              // remove the image from the currently displayed list
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

  /**
   * Delete a photo from the given index when an admin clicks the
   * delete icon.
   *
   * @param index index of the photo to delete
   * @returns function to be used as onClick
   */
  const deletePhoto = (index: number) => {
    const func = () => {
      setDelIndex(index);
      setDialogOpen(true);
    };

    return func;
  };

  return (
    /** Set the context menu for the page */
    <div
      className="page-content"
      style={{ paddingBottom: "100px" }}
      onContextMenu={customContextMenu}
    >
      <div className="page-header">{props.title}</div>

      {/** If authorized, provide the dropzone to add images to the gallery */}
      <AuthContext.Consumer>
        {(value) =>
          value.auth && <DropzoneAdapter destination={props.serverDir} />
        }
      </AuthContext.Consumer>

      {/**
       * Using the photos from the server, render the third-party gallery
       * using the adapter pattern
       */}
      <GalleryAdapter
        photos={photos}
        openViewer={openViewer}
        onDelete={deletePhoto}
      />

      {/** Modal Carousel for when an image is clicked */}
      <ModalCarouselAdapter
        isOpen={viewerIsOpen}
        photos={photos}
        currentIndex={currentImage}
        onClose={closeLightbox}
      />

      {/** Delete dialog when the trash icon button is clicked */}
      {DelDialog}
    </div>
  );
}

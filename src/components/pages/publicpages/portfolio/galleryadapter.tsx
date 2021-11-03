import { Suspense } from "react";

// external
import Gallery, { RenderImageProps } from "react-photo-gallery";

// mui
import { CircularProgress, IconButton } from "@mui/material";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

// internal
import FadeInSection from "./fadeinsection";
import { ImageList } from "../../../../backend/backendinterface";
import { AuthContext } from "../../../authcontext";

interface IGProps {
  photos: ImageList[];
  openViewer: (idx: number) => () => void;
  onDelete: (idx: number) => () => void;
}

export default function GalleryAdapter(props: IGProps) {
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
              src={props.photos[riprops.index].src}
              width={riprops.photo.width}
              height={riprops.photo.height}
              style={{ margin: riprops.margin, gridArea: "1/-1" }}
              onClick={props.openViewer(riprops.index)}
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
                    onClick={props.onDelete(riprops.index)}
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

  return <Gallery photos={props.photos} renderImage={render} />;
}

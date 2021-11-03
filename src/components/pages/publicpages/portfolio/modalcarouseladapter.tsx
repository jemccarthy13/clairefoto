import Carousel, { Modal, ModalGateway } from "react-images";
import { ImageList } from "../../../../backend/backendinterface";

interface IVProps {
  isOpen: boolean;
  photos: ImageList[];
  currentIndex: number;
  onClose: () => void;
}

export default function ModalCarouselAdapter(props: IVProps) {
  return (
    <ModalGateway>
      {props.isOpen ? (
        <Modal onClose={props.onClose}>
          <Carousel
            currentIndex={props.currentIndex}
            views={props.photos.map((x: ImageList) => ({
              ...x,
              srcset: x.srcSet,
              caption: x.title,
              source: x.src,
            }))}
          />
        </Modal>
      ) : null}
    </ModalGateway>
  );
}

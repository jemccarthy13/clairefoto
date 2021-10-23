import React, { useEffect, useState } from "react";
import backend from "../../../backend/backend";
import { ImageList } from "../../../backend/backendinterface";
import PhotoPage from "./photopage";

export default function CouplesPage() {
  const defLst: ImageList[] = [];
  const [photos, setImgs] = useState(defLst);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setImgs(backend.getImages("couples"));
    setLoaded(true);
  }, []);
  // const photos = [
  //   {
  //     src: "/images/couples/1.jpg",
  //     width: 3,
  //     height: 2,
  //     srcSet: "",
  //     title: "",
  //   },
  //   {
  //     src: "/images/couples/2.jpg",
  //     width: 3,
  //     height: 2,
  //     srcSet: "",
  //     title: "",
  //   },
  //   {
  //     src: "/images/couples/3.jpg",
  //     width: 3,
  //     height: 2,
  //     srcSet: "",
  //     title: "",
  //   },
  //   {
  //     src: "/images/couples/4.jpg",
  //     width: 2,
  //     height: 3,
  //     srcSet: "",
  //     title: "",
  //   },
  //   {
  //     src: "/images/couples/5.jpg",
  //     width: 2,
  //     height: 3,
  //     srcSet: "",
  //     title: "",
  //   },
  //   {
  //     src: "/images/couples/6.jpg",
  //     width: 3,
  //     height: 2,
  //     srcSet: "",
  //     title: "",
  //   },
  //   {
  //     src: "/images/couples/7.jpg",
  //     width: 3,
  //     height: 2,
  //     srcSet: "",
  //     title: "",
  //   },
  //   {
  //     src: "/images/couples/8.jpg",
  //     width: 3,
  //     height: 2,
  //     srcSet: "",
  //     title: "",
  //   },
  //   {
  //     src: "/images/couples/9.jpg",
  //     width: 2,
  //     height: 3,
  //     srcSet: "",
  //     title: "",
  //   },
  //   {
  //     src: "/images/couples/10.jpg",
  //     width: 3,
  //     height: 2,
  //     srcSet: "",
  //     title: "",
  //   },
  //   {
  //     src: "/images/couples/11.jpg",
  //     width: 3,
  //     height: 2,
  //     srcSet: "",
  //     title: "",
  //   },
  // ];

  // photos.forEach((x) => {
  //   x.srcSet = "";
  //   x.title = "";
  // });

  return <PhotoPage title={"Couples"} columns={5} photos={photos} />;
}

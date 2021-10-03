import React from "react";
import PhotoPage from "./photopage";

export default function CouplesPage() {
  const photos = [
    {
      src: "/images/couples/1.jpg",
      width: 2,
      height: 1,
      srcSet: "",
      title: "",
    },
    {
      src: "/images/couples/2.jpg",
      width: 2,
      height: 1,
      srcSet: "",
      title: "",
    },
    {
      src: "/images/couples/3.jpg",
      width: 5,
      height: 3,
      srcSet: "",
      title: "",
    },
    {
      src: "/images/couples/4.jpg",
      width: 2,
      height: 4,
      srcSet: "",
      title: "",
    },
    {
      src: "/images/couples/5.jpg",
      width: 2,
      height: 4,
      srcSet: "",
      title: "",
    },
    {
      src: "/images/couples/6.jpg",
      width: 2,
      height: 1,
      srcSet: "",
      title: "",
    },
    {
      src: "/images/couples/7.jpg",
      width: 2,
      height: 1,
      srcSet: "",
      title: "",
    },
    {
      src: "/images/couples/8.jpg",
      width: 1,
      height: 1,
      srcSet: "",
      title: "",
    },
    {
      src: "/images/couples/9.jpg",
      width: 1,
      height: 2,
      srcSet: "",
      title: "",
    },
    {
      src: "/images/couples/10.jpg",
      width: 4,
      height: 3,
      srcSet: "",
      title: "",
    },
    {
      src: "/images/couples/11.jpg",
      width: 1,
      height: 1,
      srcSet: "",
      title: "",
    },
  ];

  photos.forEach((x) => {
    x.srcSet = "";
    x.title = "";
  });

  return <PhotoPage columns={5} photos={photos} />;
}

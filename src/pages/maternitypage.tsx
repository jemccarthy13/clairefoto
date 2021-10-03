import React from "react";
import PhotoPage from "./photopage";

export default function MaternityPage() {
  const photos = [
    {
      src: "/images/maternity/1.jpg",
      width: 2,
      height: 1,
      srcSet: "",
      title: "",
    },
    {
      src: "/images/maternity/2.jpg",
      width: 1,
      height: 1,
      srcSet: "",
      title: "",
    },
    {
      src: "/images/maternity/3.jpg",
      width: 2,
      height: 2,
      srcSet: "",
      title: "",
    },
    {
      src: "/images/maternity/4.jpg",
      width: 3,
      height: 2,
      srcSet: "",
      title: "",
    },
    {
      src: "/images/maternity/5.jpg",
      width: 3,
      height: 4,
      srcSet: "",
      title: "",
    },
    {
      src: "/images/maternity/6.jpg",
      width: 3,
      height: 2,
      srcSet: "",
      title: "",
    },
    {
      src: "/images/maternity/7.jpg",
      width: 3,
      height: 3,
      srcSet: "",
      title: "",
    },
    {
      src: "/images/maternity/8.jpg",
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

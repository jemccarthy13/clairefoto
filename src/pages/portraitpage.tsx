import React from "react";
import PhotoPage from "./photopage";

export default function PortraitPage() {
  const photos = [
    {
      src: "/images/portrait/1.jpg",
      width: 3,
      height: 2,
      srcSet: "",
      title: "",
    },
    {
      src: "/images/portrait/2.jpg",
      width: 1,
      height: 2,
      srcSet: "",
      title: "",
    },
    {
      src: "/images/portrait/3.jpg",
      width: 3,
      height: 2,
      srcSet: "",
      title: "",
    },
    {
      src: "/images/portrait/4.jpg",
      width: 1,
      height: 2,
      srcSet: "",
      title: "",
    },
    {
      src: "/images/portrait/5.jpg",
      width: 4,
      height: 3,
      srcSet: "",
      title: "",
    },
    {
      src: "/images/portrait/6.jpg",
      width: 3,
      height: 2,
      srcSet: "",
      title: "",
    },
    {
      src: "/images/portrait/7.jpg",
      width: 3,
      height: 2,
      srcSet: "",
      title: "",
    },
    {
      src: "/images/portrait/8.jpg",
      width: 2,
      height: 2,
      srcSet: "",
      title: "",
    },
    {
      src: "/images/portrait/9.jpg",
      width: 3,
      height: 2,
      srcSet: "",
      title: "",
    },
    {
      src: "/images/portrait/10.jpg",
      width: 2,
      height: 2,
      srcSet: "",
      title: "",
    },
    {
      src: "/images/portrait/11.jpg",
      width: 3,
      height: 2,
      srcSet: "",
      title: "",
    },
    {
      src: "/images/portrait/12.jpg",
      width: 3,
      height: 2,
      srcSet: "",
      title: "",
    },
    {
      src: "/images/portrait/13.jpg",
      width: 3,
      height: 2,
      srcSet: "",
      title: "",
    },
  ];

  photos.forEach((x) => {
    x.srcSet = "";
    x.title = "";
  });

  return (
    <PhotoPage
      title={"Portraits & Senior Sessions"}
      columns={5}
      photos={photos}
    />
  );
}

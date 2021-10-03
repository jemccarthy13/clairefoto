import React from "react";
import PhotoPage from "./photopage";

export default function FamilyPage() {
  const photos = [
    {
      src: "/images/family/1.jpg",
      width: 2,
      height: 1,
      srcSet: "",
      title: "",
    },
    {
      src: "/images/family/2.jpg",
      width: 2,
      height: 1,
      srcSet: "",
      title: "",
    },
    {
      src: "/images/family/3.jpg",
      width: 2,
      height: 2,
      srcSet: "",
      title: "",
    },
    {
      src: "/images/family/4.jpg",
      width: 3,
      height: 4,
      srcSet: "",
      title: "",
    },
    {
      src: "/images/family/5.jpg",
      width: 1,
      height: 1,
      srcSet: "",
      title: "",
    },
    {
      src: "/images/family/6.jpg",
      width: 3,
      height: 2,
      srcSet: "",
      title: "",
    },
    {
      src: "/images/family/7.jpg",
      width: 4,
      height: 3,
      srcSet: "",
      title: "",
    },
    {
      src: "/images/family/8.jpg",
      width: 1,
      height: 2,
      srcSet: "",
      title: "",
    },
    {
      src: "/images/family/9.jpg",
      width: 1,
      height: 1,
      srcSet: "",
      title: "",
    },
    {
      src: "/images/family/10.jpg",
      width: 2,
      height: 1,
      srcSet: "",
      title: "",
    },
    {
      src: "/images/family/11.jpg",
      width: 1,
      height: 1,
      srcSet: "",
      title: "",
    },
    {
      src: "/images/family/12.jpg",
      width: 2,
      height: 1,
      srcSet: "",
      title: "",
    },
  ];

  photos.forEach((x) => {
    x.srcSet = "";
    x.title = "";
  });

  return <PhotoPage title={"Family"} columns={5} photos={photos} />;
}

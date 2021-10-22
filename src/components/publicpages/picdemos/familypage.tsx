import React from "react";
import PhotoPage from "./photopage";

export default function FamilyPage() {
  const photos = [
    {
      src: "/images/family/1.jpg",
      width: 1560,
      height: 1040,
      srcSet: "",
      title: "",
    },
    {
      src: "/images/family/2.jpg",
      width: 1914,
      height: 1277,
      srcSet: "",
      title: "",
    },
    {
      src: "/images/family/3.jpg",
      width: 2048,
      height: 1365,
      srcSet: "",
      title: "",
    },
    {
      src: "/images/family/4.jpg",
      width: 1040,
      height: 1560,
      srcSet: "",
      title: "",
    },
    {
      src: "/images/family/5.jpg",
      width: 1560,
      height: 1040,
      srcSet: "",
      title: "",
    },
    {
      src: "/images/family/6.jpg",
      width: 1944,
      height: 1296,
      srcSet: "",
      title: "",
    },
    {
      src: "/images/family/7.jpg",
      width: 2048,
      height: 1365,
      srcSet: "",
      title: "",
    },
    {
      src: "/images/family/8.jpg",
      width: 1040,
      height: 1560,
      srcSet: "",
      title: "",
    },
    {
      src: "/images/family/9.jpg",
      width: 2048,
      height: 1365,
      srcSet: "",
      title: "",
    },
    {
      src: "/images/family/10.jpg",
      width: 1944,
      height: 1296,
      srcSet: "",
      title: "",
    },
    {
      src: "/images/family/11.jpg",
      width: 1560,
      height: 1040,
      srcSet: "",
      title: "",
    },
    {
      src: "/images/family/12.jpg",
      width: 1914,
      height: 1277,
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

import React from "react";
// = "image/webp"
const Image = ({ src, fallback, type, alt }:
  { src: any, fallback: any, type: "image/webp", alt: any }
) => {
  return (
    <picture>
      <source srcSet={src} type={type} />
      <img src={fallback} alt={alt} />
    </picture>
  );
};

export default Image;

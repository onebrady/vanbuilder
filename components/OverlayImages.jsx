import Image from "next/image";
import React from "react";

const OverlayImages = ({ vanimage }) => {
  if (vanimage !== "") {
    return (
      <>
        <Image
          src={vanimage}
          alt="Van image"
          fill={true} // This makes the image fill its container
          quality={75} // Adjust quality as needed, lower values can improve performance
          priority // Optional: Use this to prioritize the loading of this image (e.g., for above-the-fold content)
          style={{ objectFit: "cover" }}
        />
      </>
    );
  }
  return "";
};

export default OverlayImages;

// Example function to generate a blurDataURL (this is a placeholder, actual implementation will vary)
function getBase64ImageBlur(imageSrc) {
  // Implement logic to generate or retrieve a small, blurred version of the image
  return "data:image/jpeg;base64,..."; // Placeholder base64 string
}

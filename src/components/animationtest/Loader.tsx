import React from "react";
import { motion } from "framer-motion";

import Image from "./Image";
import { container, item, itemMain } from "./animate";

// Import images


const Loader = ({ setLoading }: { setLoading: any }) => (
  <motion.div className="loader">
    <motion.div
      variants={container}
      onAnimationComplete={() => setLoading(false)}
      initial="hidden"
      animate="show"
      exit="exit"
      className="loader-inner"
    >
      <ImageBlock variants={item} url="/newPost/f9efa5c9-7186-4981-ba20-e07b1e65a994.webp" id="image-1" posX={undefined} posY={undefined} />
      <motion.div variants={itemMain} className="transition-image">
        <motion.img
          layoutId="main-image-1"
          src={'/newPost/01-Ted-Lasso-Airbnb-Exterior-Credit-Henry-Woide-1-1.webp'} />
      </motion.div>
      <ImageBlock url="/newPost/4a5c629b-9c92-450e-8d8f-995875798838.webp" variants={item} id="image-3" posX={undefined} posY={undefined} />
      <ImageBlock url="/newPost/0c7865ec-d2f0-4fd1-8e29-3613d0a86724.webp" variants={item} id="image-4" posX={undefined} posY={undefined} />
      <ImageBlock url="/newPost/aade5646-a9af-443b-aa2e-bfd379c3b73d.webp" variants={item} id="image-5" posX={undefined} posY={undefined} />
    </motion.div>
  </motion.div>
);

export const ImageBlock = ({ posX, posY, variants, id, url }:
  { posX: any, posY: any, variants: any, id: any, url:string }
) => {
  return (
    <motion.div
      variants={variants}
      className={`image-block ${id}`}
      style={{
        top: `${posY}vh`,
        left: `${posX}vw `,
      }}
    >
      <Image
        src={url}
        fallback={url}
        alt={id} type={"image/webp"}      />
    </motion.div>
  );
};
export default Loader;

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
      <ImageBlock variants={item} id="image-1" posX={undefined} posY={undefined} />
      <motion.div variants={itemMain} className="transition-image">
        <motion.img
          layoutId="main-image-1"
          src={'https://i.pinimg.com/originals/06/ab/e2/06abe2da36f22149c98da3e638412f0d.gif'} />
      </motion.div>
      <ImageBlock variants={item} id="image-3" posX={undefined} posY={undefined} />
      <ImageBlock variants={item} id="image-4" posX={undefined} posY={undefined} />
      <ImageBlock variants={item} id="image-5" posX={undefined} posY={undefined} />
    </motion.div>
  </motion.div>
);

export const ImageBlock = ({ posX, posY, variants, id }:
  { posX: any, posY: any, variants: any, id: any }
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
        src={'https://i.pinimg.com/originals/06/ab/e2/06abe2da36f22149c98da3e638412f0d.gif'}
        fallback={'https://i.pinimg.com/originals/06/ab/e2/06abe2da36f22149c98da3e638412f0d.gif'}
        alt={id} type={"image/webp"}      />
    </motion.div>
  );
};
export default Loader;

import { AnimatePresence, Variants, motion, useMotionValue, useTransform } from 'framer-motion';
import { wrap } from 'popmotion';
import { useEffect, useState } from 'react';
import { GrCaretNext, GrCaretPrevious } from 'react-icons/gr';

const variants = {
  enter: (direction: number) => {
    return {
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    };
  },
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1
  },
  exit: (direction: number) => {
    return {
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0
    };
  }
};

const variantsBtn: Variants = {
  hiddenLeft: {
    left: -100
  },
  showLeft: {
    left: 8
  },

  hiddenRight: {
    right: 8
  },
  showRight: {
    right: -100
  }
};

const swipeConfidenceThreshold = 10000;
const swipePower = (offset: number, velocity: number) => {
  return Math.abs(offset) * velocity;
};

interface CarouselProps {
  arrImg: { Path: string }[];
}

const styleBtn =
  'absolute top-[calc(50%-20px)] z-10 bg-white rounded-full w-10 h-10 flex items-center justify-center mobile:invisible tablet:invisible ';

const Carousel = ({ arrImg }: CarouselProps) => {
  const [[page, direction], setPage] = useState([0, 0]);
  const [isHover, setIsHover] = useState(false);

  const imageIndex = wrap(0, arrImg.length, page);

  const paginate = (newDirection: number) => {
    setPage([page + newDirection, newDirection]);
  };

  const handleOnEnter = (event: any) => {
    setIsHover(true);
  };

  const handleOnLeave = (event: any) => {
    setIsHover(false);
  };

  return (
    <>
      <motion.div
        className="w-full h-full relative flex overflow-hidden rounded-xl"
        onHoverStart={handleOnEnter}
        onHoverEnd={handleOnLeave}>
        <AnimatePresence initial={false} custom={direction}>
          <motion.img
            key={page}
            src={arrImg[imageIndex].Path}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            className="w-full h-full absolute object-cover"
            transition={{
              x: { type: 'spring', stiffness: 200, damping: 30 },
              opacity: { duration: 0.5 }
            }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={1}
            onDragEnd={(e, { offset, velocity }) => {
              const swipe = swipePower(offset.x, velocity.x);

              if (swipe < -swipeConfidenceThreshold) {
                paginate(1);
              } else if (swipe > swipeConfidenceThreshold) {
                paginate(-1);
              }
            }}
          />
        </AnimatePresence>
        <motion.button
          variants={variantsBtn}
          onClick={() => paginate(-1)}
          initial={isHover ? 'hiddenLeft' : 'showLeft'}
          animate={isHover ? 'showLeft' : 'hiddenLeft'}
          whileHover={{scale: 1.1, backgroundColor: 'rgba(239, 68, 68, .6)'}}
          transition={{ duration: 0.5, type: 'tween' }}
          className={`${styleBtn} left-[10px]`}>
          <GrCaretPrevious />
        </motion.button>
        <motion.button
          variants={variantsBtn}
          onClick={() => paginate(1)}
          initial={isHover ? 'showRight' : 'hiddenRight'}
          whileHover={{scale: 1.1, backgroundColor: 'rgba(239, 68, 68, .6)'}}
          animate={isHover ? 'hiddenRight' : 'showRight'}
          transition={{ duration: 0.5, type: 'tween' }}
          className={`${styleBtn} right-[10px]`}>
          <GrCaretNext />
        </motion.button>
      </motion.div>
    </>
  );
};

export default Carousel;

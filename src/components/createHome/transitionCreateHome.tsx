import { AnimatePresence, Variants, motion } from "framer-motion";
import { ReactNode, useEffect, useState } from "react";


interface TransitionCreateHomeProps {
  children: ReactNode;
  isShow: boolean
}

const variants: Variants = {
  show: {
    display: 'block',
    scale: [.8, 1],
    opacity: [0, 1],
    transition: {
      delay: .6
    }
  },
  hidden: {
    scale: [1, .8],
    opacity: [1, 0],
    transitionEnd: {
      display: 'none'
    }
  }
}

const TransitionCreateHome = ({ children, isShow }: TransitionCreateHomeProps) => {
  const [shouldAnimate, setShouldAnimate] = useState(false);

  useEffect(() => {
    // Wait for the component to be rendered and then enable the animation
    setShouldAnimate(true);
  }, []);

  return (
    <AnimatePresence initial={false}>
      <motion.div
        variants={variants}
        initial={shouldAnimate ? 'hidden' : false}
        animate={isShow ? 'show' : 'hidden'}
        transition={{ duration: .5 }}
        className="mb-[5rem]">
        {children}
      </motion.div>
    </AnimatePresence>
  )
}

export default TransitionCreateHome;
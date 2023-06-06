import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/router";
import { ReactNode } from "react"

interface AnimateProps {
  children: ReactNode;
}

const Animate = ({ children }: AnimateProps) => {
  const router = useRouter()
  return (
    <div>
      <AnimatePresence mode="wait">
        <motion.div
          key={router.route}
          initial="initialState"
          animate="animateState"
          exit="exitState"
          transition={{ duration: 1 }}
          variants={{
            initialState: {
              opacity: 0,
              clipPath: 'circle(0.2% at 100% 0)'
            },
            animateState: {
              opacity: 1,
              clipPath: 'circle(142.0% at 100% 0)'
            },
            exitState: {
              clipPath: 'circle(0.2% at 100% 0)'
            }
          }}
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

export default Animate;
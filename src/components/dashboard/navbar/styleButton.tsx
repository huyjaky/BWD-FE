import { DashboardContext } from "@/contexts/dashboard";
import { motion } from "framer-motion"
import { ReactNode, useContext, useState } from "react"

interface StyleButtonProps {
  children: ReactNode,
  title: 'Schedule' | 'Piechart' | 'Barchart'
}

const StyleButton = ({ children, title }: StyleButtonProps) => {
  const [isHover, setIsHover] = useState<boolean>(false);
  const { selectOption, setSelectOption } = useContext(DashboardContext);
  return (
    <div className="w-full h-[4rem] hover:text-white transition-all duration-500">
      <motion.button
        onClick={(event) => { setSelectOption(title) }}
        onHoverStart={(event) => { setIsHover(true) }}
        onHoverEnd={(event) => { setIsHover(false) }}
        className="w-full h-full flex relative z-10">
        <motion.div animate={isHover ? { width: ['0%', '100%'] } : { width: ['100%', '0%'] }}
          className="absolute h-full w-0 top-0 left-0 bg-red-400 z-0">
        </motion.div>

        <motion.div
          className="w-[50%] h-fit m-auto flex relative z-10
          justify-start ">
          {children}
          <div className="text-[24px] ">{title}</div>
        </motion.div>


      </motion.button>
    </div>
  )
}

export default StyleButton
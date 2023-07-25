import { ReactNode } from "react"

interface LayoutAnimateProps {
  children: ReactNode
}

const LayoutAnimate = ({children}: LayoutAnimateProps) => {
  return (
    <div className="w-full h-fit box-border px-[7rem] py-[2rem] mobile:px-0 mobile:py-0">
      {children}
    </div>
  )
}

export default LayoutAnimate
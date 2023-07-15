import { ReactNode } from "react"

interface LayoutTitleProps{
  children: ReactNode,
  leftRight: 'left' | 'right'
}
const LayoutTitle = ({children, leftRight}: LayoutTitleProps) => {
  return (
    <div className="w-full h-full flex items-center">
      <div className={`m-auto ${leftRight === 'left' ? 'ml-0' : 'mr-0' } text-ellipsis overflow-hidden whitespace-nowrap`}>
        {children}
      </div>
    </div>
  )
}

export default LayoutTitle;
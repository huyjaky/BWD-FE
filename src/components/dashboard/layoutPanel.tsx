import { DashboardContext } from "@/contexts/dashboard"
import { ReactNode, useContext } from "react"

interface LayoutPanelDasboardProps {
  children: ReactNode,

}

const LayoutPanelDasboard = ({ children }: LayoutPanelDasboardProps) => {
  const { selectOption } = useContext(DashboardContext)
  return (
    <div className="w-full h-full ">
      <div className="w-full h-full rounded-xl shadow-xl overflow-hidden p-10 box-border">
        <div className="w-full h-full">
          {/* title */}
          <div className="w-full h-full flex flex-col overflow-hidden">
            <span className="text-[3rem] font-semibold">{selectOption}</span>
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}

export default LayoutPanelDasboard
import { ReactNode } from "react"

interface FtHouseProps {
  children: ReactNode;
  title: string;
  des: string
}

const FtHouse = ({ children, title, des }: FtHouseProps) => {
  return (
    <div className="w-full h-full flex">
      {/* icon */}
      <div className="text-[1.5rem] my-auto mr-3">
        {children}
      </div>
      {/* title */}
      <div className="h-full text-[1.5rem] flex">
        <div className="my-auto">
          {title+':'}	&#8201;
        </div>
      </div>
      {/* des */}
      <div className=" h-full flex">
        <div className="my-auto text-[1.5rem]">
          {des}{title==='Area' && <span>&#178;</span>}
        </div>
      </div>
    </div>
  )
}

export default FtHouse
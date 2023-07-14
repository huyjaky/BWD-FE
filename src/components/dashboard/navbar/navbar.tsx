import { userAccContext } from "@/contexts/userAcc";
import { motion } from "framer-motion";
import { useSession } from "next-auth/react";
import { useContext, useEffect } from "react";
import StyleButton from "./styleButton";
import { GrSchedules } from "react-icons/gr";
import { AiOutlinePieChart } from "react-icons/ai";
import { BsFillBarChartFill } from "react-icons/bs";



const NavbarDashboard = () => {
  const { user } = useContext(userAccContext)
  useEffect(() => { }, [user])

  return (
    <div className="w-[20rem] h-full border-r-2">
      {/* avar */}
      <div className="w-full h-fit  flex flex-col items-center py-4 ">
        <div className="w-[7rem] h-[7rem] bg-white rounded-full overflow-hidden">
          <img src={'/api/img/path/' + user.Image} className="w-full h-full" />
        </div>

        {/* name user */}
        <div className="w-fit h-fit mt-5 flex text-center flex-col">
          <span>Welcome</span>
          <span className="text-[30px] font-semibold">{user.UserName}</span>
        </div>
      </div>

      <div className="w-full h-auto grid grid-cols-1 grid-rows-3">
        {/* barchart */}
        <div className="w-full">
          <StyleButton title="Schedule">
            <GrSchedules className="text-[25px] my-auto mr-2" />
          </StyleButton>
        </div>

        {/* piechart */}
        <div className="w-full">
          <StyleButton title="Piechart">
            <AiOutlinePieChart className="text-[25px] my-auto mr-2" />
          </StyleButton>
        </div>

        {/* calender */}
        <div className="w-full">
          <StyleButton title="Barchart">
            <BsFillBarChartFill className="text-[25px] my-auto mr-2" />
          </StyleButton>
        </div>

      </div>
    </div>
  )
}

export default NavbarDashboard;
import { houseApi } from "@/api-client/houseApi";
import { houseTempContext } from "@/contexts/houseTemp";
import { selectHouseContext } from "@/contexts/selectHouse";
import { userAccContext } from "@/contexts/userAcc";
import { motion } from "framer-motion";
import { useSession } from "next-auth/react";
import { Dispatch, SetStateAction, useContext, useEffect, useState } from "react";


interface RemoveReqProps {
  isRemoveReq: boolean | undefined;
  setIsRemoveReq: Dispatch<SetStateAction<boolean | undefined>>
}

const RemoveReq = ({ isRemoveReq, setIsRemoveReq }: RemoveReqProps) => {
  const { user } = useContext(userAccContext)
  const { houseTemp, setHouseTemp } = useContext(houseTempContext)
  const { selectHouse, setSelectHouse } = useContext(selectHouseContext)
  const [inputPass, setInputPass] = useState<string>('');
  const [isTruePass, setIsTruePass] = useState<boolean>(true);
  const { data: session, status } = useSession();

  useEffect(() => { }, [isTruePass])
  return (
    <div className="w-fit h-fit bg-white mobile:w-screen mobile:h-screen
    flex flex-col mobile:p-0 p-5 rounded-xl">
      <div className="w-full m-auto flex">
        <div className="w-[150px] h-fit">
          <img src={`/api/img/path/${user.Image}`} alt="" className="rounded-full" />
        </div>

        <div className="w-fit h-full grid grid-cols-1 grid-rows-2 ml-[30px] m-auto gap-5">
          <div className="font-semibold text-[50px] mobile:text-[30px]">Delete house</div>
          <div>
            <input type="password" className={`outline-none
            border-b-2 border-slate-900
            ${isTruePass ? '' : 'border-red-600'} mobile:text-[19px] text-[30px] `} placeholder="Password"
              onChange={(event) => setInputPass(event.target.value)}
            />
          </div>
        </div>
      </div>
      <div className="w-full h-[100px]  grid grid-cols-2 grid-rows-1 ">
        <div className="w-full h-full box-border p-3">
          <motion.button
            onClick={(event) => {
              setIsRemoveReq(false);
            }}
            className="w-full h-full rounded-xl border-2 font-semibold">
            Cancel
          </motion.button>
        </div>
        <div className="w-full h-full box-border p-3">
          <motion.button
            type="button"
            onClick={async (event) => {
              if (inputPass !== session?.userAcc.Password) {
                setIsTruePass(false);
              } else {
                setIsTruePass(true);
                setHouseTemp(houseTemp.filter(item=>item.AddressId !== selectHouse?.AddressId))

                if (selectHouse) {
                  await houseApi.DeleteHouse(selectHouse?.HouseId, selectHouse.AddressId)
                }
                setIsRemoveReq(false);
              }
            }}
            className="w-full h-full rounded-xl border-2 bg-red bg-[#f05123]
          text-white font-semibold
          ">
            Delete
          </motion.button>
        </div>
      </div>

    </div>
  )
}

export default RemoveReq;
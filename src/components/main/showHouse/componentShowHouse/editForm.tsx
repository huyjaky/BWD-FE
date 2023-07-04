import { motion } from "framer-motion";
import MapEach from "../mapEach";
import { useContext } from "react";
import { selectHouseContext } from "@/contexts/selectHouse";


interface EditFormProps {
  keyMapBing: string
}

const EditForm = ({ keyMapBing }: EditFormProps) => {
  const { selectHouse, setSelectHouse } = useContext(selectHouseContext);

  return (
    <>
      <div className='w-[800px] h-[calc(100vh-50px)] bg-white m-auto rounded-3xl
        overflow-hidden flex flex-col
        mobile:mt-0 mobile:rounded-none
        mobile:w-screen mobile:h-screen
        tablet:h-[calc(100vh-90px)] tablet:mt-[10px] '>
        <div className='w-full h-full relative '>
          <div className='w-full absolute h-[40px]  border-b-2  flex'>
            <span className='text-[30px] m-auto'>Edit</span>

          </div>
          <div className="w-full h-[80px] absolute bottom-0 left-0 border-t-2 flex items-center flex-2 py-3">
            <div className="flex-1 flex justify-start">
              <div
                className="m-auto underline cursor-pointer"
              >
                Clear all
              </div>
            </div>
            <div className="flex-1 flex justify-center">
              <motion.button
                className="w-[200px] h-[40px] rounded-lg border-2"
                whileHover={{ backgroundColor: 'rgba(255, 56, 92, 0.8)', color: 'white' }}
                whileTap={{ scale: 0.9 }}
              >
                Submit
              </motion.button>
            </div>
          </div>
          <div className="w-full h-full">
            <div className="w-full h-[40px]"></div>

            <div className="w-full h-[calc(100%-120px)]
              overflow-scroll overflow-x-hidden box-border p-7
              ">
              <div className="w-full h-fit">
                <MapEach formattedAddress="" keyMapBing={keyMapBing}
                  latitude={selectHouse?.address.latitude || 0}
                  longitude={selectHouse?.address.longitude || 0}
                  zoom={18}
                  idMap="1"
                  style="h-[300px]"
                />
              </div>

              <fieldset className="border-2 h-fit rounded-xl pb-2 px-4">
                <legend className="font-semibold text-[22px] ml-5">Locale</legend>
                <div className="w-full h-fit relative before:bottom-0 before:h-[2px] before:absolute
                    before:bg-slate-500 before:w-full before:transition-all before:duration-200">
                  <input type="text" name="" id="" className="w-full h-[50px] outline-none text-[25px]   "
                  /> </div>
              </fieldset>

            </div>


            <div className="w-full h-[80px]"></div>

          </div>
        </div>
      </div>

    </>
  )
}
export default EditForm;
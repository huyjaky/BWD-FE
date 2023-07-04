import { motion } from "framer-motion";



const EditForm = () => {
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

            <div className="w-full h-[calc(100%-120px)] bg-emerald-400
              overflow-scroll overflow-x-hidden
              ">

            </div>

            <div className="w-full h-[80px]"></div>

          </div>
        </div>
      </div>

    </>
  )
}
export default EditForm;
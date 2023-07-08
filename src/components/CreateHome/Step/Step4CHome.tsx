import { motion } from 'framer-motion';
import Map from '../Map/map_';
interface Step4CHomeProps {
  keyMapBing: string;
}

function Step4CHome({ keyMapBing }: Step4CHomeProps): JSX.Element {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
      className="flex justify-start mt-10 md:justify-center w-full h-[100vh -56px]"
    >
      <div className="w-[1000px]">
        <div className="">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: 'spring', stiffness: 35, delay: 0.1 }}
            className="font-sans text-2xl ml-2 md:ml-0 md:text-4xl font-semibold text-[#222222] mb-4"
          >
            Where's your place located?
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: 'spring', stiffness: 35, delay: 0.2 }}
            className="font-sans text-sm ml-2 md:ml-0 md:text-lg text-[#717171]"
          >
            Your address is only shared with guests after they’ve made a reservation.
          </motion.p>
        </div>
        <Map keyMapBing={keyMapBing} />
      </div>
    </motion.div>
  );
}

export default Step4CHome;

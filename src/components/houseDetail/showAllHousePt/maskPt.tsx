import { AnimatePresence, Variants, motion } from 'framer-motion';

interface MaskPtProps {
  Path: string | null;
  setPath: (payload: string | null) => void;
}

const maskVariants: Variants = {
  hidden: {
    opacity: [1, 0],
    transitionEnd: {
      display: 'none'
    }
  }
};

const MaskPt = ({ Path, setPath }: MaskPtProps) => {
  if (!Path)
    return (
      <>
        {/* <AnimatePresence initial={Path }> */}
          <motion.div
            variants={maskVariants}
            initial={Path ? {display: 'flex'} : false}
            animate="hidden"
            className="fixed flex top-0 left-0 w-screen h-screen bg-mask
        box-border py-3
        ">
            <div className="w-[1000px] m-auto h-fit overflow-hidden">
              <img src={Path ? Path : ''} alt="" className="m-auto  rounded-2xl" />
            </div>
          </motion.div>
        {/* </AnimatePresence> */}
      </>
    );
  return (
    <>
      <motion.div
        initial={{ display: 'flex', opacity: 0 }}
        animate={{ opacity: 1 }}
        className="fixed flex top-0 left-0 w-screen h-screen bg-mask
      box-border py-3 z-[50]
      "
        onClick={() => setPath(null)}>
        <div className="w-[1000px] m-auto h-full overflow-hidden flex">
          <motion.img
            transition={{ type: 'spring' }}
            initial={{ y: 200 }}
            animate={{ y: 0 }}
            src={Path ? Path : ''}
            alt=""
            className="m-auto max-w-full max-h-full object-cover rounded-2xl "
          />
        </div>
      </motion.div>
    </>
  );
};

export default MaskPt;

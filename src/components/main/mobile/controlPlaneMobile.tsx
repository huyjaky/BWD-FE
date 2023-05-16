import { mobileContolPanelContext } from '@/contexts/mobileControlPanel';
import {Variants, motion} from 'framer-motion'
import { useContext, useEffect } from 'react';

const variants: Variants = {
  
}

const ControlPlanMobile = () =>{
  const {isShow, setIsShow} = useContext(mobileContolPanelContext);
  useEffect(()=>{}, [isShow])

  return (
    <motion.div className='relative z-40'>
      <motion.div className='fixed right-0 top-0 w-screen h-screen bg-slate-300'>

      </motion.div>
    </motion.div>
  )
}

export default ControlPlanMobile;
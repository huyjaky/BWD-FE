import { StepCreateHomeContext } from "@/contexts/stepCreate"
import { motion } from "framer-motion"
import { useContext } from "react"
import { FaCheck } from "react-icons/fa"

interface StepBallProps {
  step: number,
  currentStep: number,
  title: string
}



const StepBall = ({ step, currentStep, title }: StepBallProps) => {
  let status: 'active' | 'inactive' | 'complete' =
    currentStep === step ? 'active' : currentStep < step ? 'inactive'
      : 'complete'
  const {setStepCreate} = useContext(StepCreateHomeContext)
  return (
    <div className="w-full h-full flex flex-col">
      <motion.div
        onClick={event => setStepCreate(step)}
        animate={{
          backgroundColor: status === 'complete' ? 'rgb(239,68,68)' : 'rgb(255,255,255)',
          borderColor: status === 'complete' || status === 'active' ?
            'rgb(239,68,68)' :
            'rgb(51,65,85)'
        }}
        transition={{duration: 1}}
        className={`w-[4rem] h-[4rem] rounded-full m-auto flex border-2 text-[1.5rem]
      ${status === 'active' ? ' border-red-500 text-red-500 bg-white'
            : status === 'complete' ? 'border-red-500 bg-red-500'
              : 'border-slate-500 bg-white text-slate-700'
          }
      `}>
        <div className={`m-auto font-bold overflow-hidden`}>
          {status === 'complete' ? (
            <div className="flex w-full h-full  ">
              <FaCheck className="m-auto text-white" />
            </div>
          ) :
            <span>
              {step}
            </span>
          }
        </div>

      </motion.div>
      <div className="text-center whitespace-nowrap font-semibold mobile:hidden">
        {title}
      </div>
    </div>
  )
}

export default StepBall
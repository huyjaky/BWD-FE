import { variants as variants_ } from "@/components/main/showHouse/variantsShowHouse";
import { selectPopoverContext } from "@/contexts";
import { AnimatePresence, motion } from "framer-motion";
import { useContext, useRef } from "react";
import HeaderForm from "../headers/headerForm/HeaderForm";
import LoginPanel from "../loginPanel/LoginPanel";



const Header = () => {
  const { isLoginClick, setIsLoginClick } = useContext(selectPopoverContext);
  const loginPanel = useRef<HTMLInputElement>(null);


  const handleOnClickLogin = (event: any) => {
    const isClickInSide = loginPanel.current?.contains(event.target);
    if (!isClickInSide) {
      setIsLoginClick(false);
      return;
    } else {
      return;
    }
  }

  return (
    <>

      <AnimatePresence initial={false}>
        <motion.div
          variants={variants_}
          animate={isLoginClick ? 'showMask' : 'hiddenMask'}
          onClick={handleOnClickLogin}
          className="fixed w-screen h-screen bg-mask z-50 top-0 left-0" >
          <div className='w-fit h-fit m-auto  mobile:w-screen mobile:h-screen
    flex flex-col mobile:p-0 p-5 rounded-xl ' ref={loginPanel}>
            <LoginPanel >
              <div></div>
            </LoginPanel>
          </div>
        </motion.div>
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0, y: -180 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          ease: "easeInOut",
          duration: 1,
          delay: 0.6,
        }}
      >
        <HeaderForm><div></div></HeaderForm>

      </motion.div>
    </>
  );
};

export default Header;

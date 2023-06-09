import React, { useContext, useEffect, useState } from 'react';
import { Resourcesandtips, reservations } from '../utils/constants';
import ButtonReservations from '../ButtonReserations';
import { AnyReview, ContactSupport, SuperHost } from '../../../../public/Icon_BnB_svg';
import ResourceAndTip from '../ResourceAndTip';
import { motion, Variants } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import ShowHouse from '@/components/main/showHouse/showHouse';
import { AmountTabHostingContext } from '@/contexts/amountTabHosting';
import { userAccContext } from '@/contexts/userAcc';
import AnimateTitle from '@/components/main/showHouse/animateTitle';
import { staggerContainer } from '@/utils/motion';
import { getHouseContext } from '@/contexts/getHouse';
interface mainProps {
  keyMapBing: string;
  api_url_path: string
}

function Main({ keyMapBing, api_url_path }: mainProps): JSX.Element {
  const [selected, setSelected] = useState('Currently hosting');
  const { currentHosting } = useContext(AmountTabHostingContext);
  const { isFilter, setIsFilter, reRenderFilter } = useContext(getHouseContext);
  const [refButton, inViewButton] = useInView({
    // Kích hoạt nhiều lần khi vào khung nhìn
    threshold: 0.01 // Ngưỡng nhìn thấy (tỷ lệ của phần tử nằm trong khung nhìn)
  });
  const { user } = useContext(userAccContext)
  useEffect(()=>{
    setIsFilter('main');
  },[])

  const componentVariants: Variants = {
    offscreen: {
      opacity: 0
    },
    onscreen: {
      opacity: 1
    }
  };
  const buttonVariants: Variants = {
    offscreen: {
      opacity: 0,
      y: -50
    },
    onscreen: {
      opacity: 1,
      y: 0
    }
  };

  const animationVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 }
  };

  useEffect(() => {
    console.log(currentHosting);
  }, [currentHosting]);

  return (
    <div className="w-[100%]">
      <div className="w-[100%] px-[5rem] mobile:px-[0]">
        <motion.div
          variants={componentVariants}
          initial="offscreen"
          whileInView="onscreen"
          viewport={{ amount: 0.5 }}
          className="w-[100%] pt-[4rem] mobile:mx-[1rem]"
        >
          <h1 className="text-[2rem] font-semibold">Welcome back {user.UserName}</h1>
        </motion.div>
        <div className="w-[100%] py-[4rem]">
          <div className="">
            <motion.div
              variants={componentVariants}
              initial="offscreen"
              whileInView="onscreen"
              viewport={{ amount: 0.5 }}
              className="flex justify-between mb-[1rem] mobile:mx-[1rem]"
            >
              <h2 className="text-[2rem] font-semibold">Your reservations</h2>
              <div>
                <a className="underline text-[1rem] font-semibold">All reservations (0)</a>
              </div>
            </motion.div>
            <motion.div
              variants={componentVariants}
              initial="offscreen"
              whileInView="onscreen"
              viewport={{ amount: 0.5 }}
              className="flex flex-wrap mobile:mx-[1rem]"
            >
              {reservations.map((reservation, index) => (
                <motion.div
                  initial={{ opacity: 0, y: -30 }}
                  animate={{ opacity: 1, y: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ amount: 0.5 }}
                  className=""
                  key={index}
                  transition={{ type: 'spring', stiffness: 35, delay: 0.1 * index }}
                >
                  <ButtonReservations
                    selected={selected}
                    setSelected={setSelected}
                    content={reservation.title}
                    number={reservation.title === 'Currently hosting' ? currentHosting : 0}
                  />
                </motion.div>
              ))}
            </motion.div>
            <motion.div
              variants={componentVariants}
              initial="offscreen"
              whileInView="onscreen"
              className="bg-[#F7F7F7] h-fit flex items-center justify-center rounded-[1rem] box-border
              px-4 transition-all mobile:px-0
              "
            >
              <div className="w-full h-fit transition-all duration-1000">
                <motion.div
                  className={`w-full h-fit ${selected === 'Currently hosting' ? '' : 'hidden'}`}
                >
                  <ShowHouse infShow="authListHouse" keyMapBing={keyMapBing} api_url_path={api_url_path} />
                </motion.div>

                <div
                  className={`${selected === 'Currently hosting' ? 'hidden' : ''
                    } flex flex-col items-center justify-center gap-4 py-24 `}
                >
                  <AnyReview />
                  <span className="text-[1rem] h-[36px] w-[12.5rem] text-center">
                    You don't have any guest reviews to write.
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
      <motion.div
        variants={componentVariants}
        initial="offscreen"
        whileInView="onscreen"
        viewport={{ amount: 0.01 }}
        className="bg-[#F9F7F4] w-[100%] h-[195px]"
      >
        <motion.div
          variants={componentVariants}
          initial="offscreen"
          whileInView="onscreen"
          viewport={{ amount: 0.5 }}
          className="px-[5rem] mobile:px-0 py-[4rem]"
        >
          <h2 className="text-[2rem] font-semibold">Share more details</h2>
          <p className="text-[15px] font-extralight">
            Check, check, check! You’re all set for now.
          </p>
        </motion.div>
      </motion.div>
      <div className="w-[100%] px-[5rem] mobile:px-0 flex flex-col gap-3 mt-[4rem]">
        <div>
          <motion.h1
            variants={componentVariants}
            initial="offscreen"
            whileInView="onscreen"
            viewport={{ amount: 0.5 }}
            className="text-[2rem] font-semibold mb-3"
          >
            We’re here to help
          </motion.h1>
          <div className="w-[100%] flex mobile:flex-col gap-2 mb-10">
            <motion.div
              variants={buttonVariants}
              className="w-[45%] laptop:w-[50%] mobile:w-[100%] tablet:w-full h-[5.75rem] flex p-[1rem] gap-3 border rounded-[.6rem] cursor-pointer"
            >
              <div className="mb-[.25rem]">
                <SuperHost />
              </div>
              <div className="w-[100%]">
                <h3 className="text-[1rem] font-semibold">Guidance from a Superhost</h3>
                <p className="text-[1rem] text-[#717171] font-thin w-[90%]">
                  We'll match you with an experienced Host who can you get started
                </p>
              </div>
            </motion.div>

            <div className="w-[100%]" ref={refButton}>
              <motion.div
                variants={animationVariants}
                className="w-[45%] laptop:w-[50%] mobile:w-[100%] tablet:w-full h-[5.75rem] flex p-[1rem] gap-3 border rounded-[.6rem] cursor-pointer"
              >
                <div className="mb-[.25rem]">
                  <ContactSupport />
                </div>
                <div className="w-[100%]">
                  <h3 className="text-[1rem] font-semibold">Contact specialized support</h3>
                  <p className="text-[1rem] text-[#717171] font-thin w-[90%]">
                    As a new Host, you get one-tap access to a specially trained support team.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Main;

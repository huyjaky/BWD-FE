import React, { useContext, useEffect, useState } from 'react';
import { Resourcesandtips, reservations } from '../utils/constants';
import ButtonReservations from '../ButtonReserations';
import { AnyReview, ContactSupport, SuperHost } from '../../../../Icon_BnB_svg';
import ResourceAndTip from '../ResourceAndTip';
import { motion, Variants } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import ShowHouse from '@/components/main/showHouse/showHouse';
import { AmountTabHostingContext } from '@/contexts/amountTabHosting';
interface mainProps {
  keyMapBox: string;
}

function Main({ keyMapBox }: mainProps): JSX.Element {
  const [selected, setSelected] = useState('');
  const {currentHosting} = useContext(AmountTabHostingContext)
  const [refButton, inViewButton] = useInView({
    // Kích hoạt nhiều lần khi vào khung nhìn
    threshold: 0.01 // Ngưỡng nhìn thấy (tỷ lệ của phần tử nằm trong khung nhìn)
  });

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

  useEffect(()=>{
    console.log(currentHosting);
  }, [currentHosting])

  return (
    <div className="w-[100%]">
      <div className="w-[100%] px-[80px] mobile:px-[0]">
        <motion.div
          variants={componentVariants}
          initial="offscreen"
          whileInView="onscreen"
          viewport={{ amount: 0.5 }}
          className="w-[100%] pt-[64px]"
        >
          <h1 className="text-[32px] font-semibold">Welcome back, Minh</h1>
        </motion.div>
        <div className="w-[100%] py-[64px]">
          <div className="">
            <motion.div
              variants={componentVariants}
              initial="offscreen"
              whileInView="onscreen"
              viewport={{ amount: 0.5 }}
              className="flex justify-between mb-[16px]"
            >
              <h2 className="text-[26px] font-semibold">Your reservations</h2>
              <div>
                <a className="underline text-[16px] font-semibold">All reservations (0)</a>
              </div>
            </motion.div>
            <motion.div
              variants={componentVariants}
              initial="offscreen"
              whileInView="onscreen"
              viewport={{ amount: 0.5 }}
              className="flex flex-wrap"
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
                    number={reservation.title === 'Currently hosting' ? currentHosting : 0} />
                </motion.div>
              ))}
            </motion.div>
            <motion.div
              variants={componentVariants}
              initial="offscreen"
              whileInView="onscreen"
              className="bg-[#F7F7F7] h-fit flex items-center justify-center rounded-[12px] box-border
              px-4 transition-all
              "
            >
              <div className='w-full h-fit transition-all duration-1000'>
                <motion.div className={`w-full h-fit ${selected === 'Currently hosting' ? '' : 'hidden'}`}>
                  <ShowHouse infShow='authListHouse' keyMapBox={keyMapBox} />
                </motion.div>

                <div className={`${selected === 'Currently hosting' ? 'hidden' : ''} flex flex-col items-center justify-center gap-4 py-24 `}>
                  <AnyReview />
                  <span className='text-[14px] h-[36px] w-[200px] text-center'>
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
          className="px-[80px] mobile:px-0 py-[64px]"
        >
          <h2 className="text-[26px] font-semibold">Share more details</h2>
          <p className="text-[15px] font-extralight">
            Check, check, check! You’re all set for now.
          </p>
        </motion.div>
      </motion.div>
      <div className="w-[100%] px-[80px] mobile:px-0 flex flex-col gap-3 mt-[64px]">
        <div>
          <motion.h1
            variants={componentVariants}
            initial="offscreen"
            whileInView="onscreen"
            viewport={{ amount: 0.5 }}
            className="text-[26px] font-semibold mb-3"
          >
            We’re here to help
          </motion.h1>
          <div className="w-[100%] flex mobile:flex-col gap-2">
            <motion.div
              variants={buttonVariants}
              initial="offscreen"
              whileInView="onscreen"
              viewport={{ amount: 0.8 }}
              className="w-[45%] laptop:w-[50%] mobile:w-[100%] tablet:w-[50%] h-[92px] flex p-[16px] gap-3 border rounded-[10px] cursor-pointer"
            >
              <div className="mb-[4px]">
                <SuperHost />
              </div>
              <div className="w-[100%]">
                <h3 className="text-[16px] font-semibold">Guidance from a Superhost</h3>
                <p className="text-[13px] text-[#717171] font-thin w-[90%]">
                  We'll match you with an experienced Host who can you get started
                </p>
              </div>
            </motion.div>

            <div className="w-[100%]" ref={refButton}>
              <motion.div
                initial="hidden"
                animate={inViewButton ? 'visible' : 'hidden'}
                variants={animationVariants}
                transition={{
                  type: 'spring',
                  duration: 1
                }}
                className="w-[45%] laptop:w-[50%] mobile:w-[100%] tablet:w-[50%] h-[92px] flex p-[16px] gap-3 border rounded-[10px] cursor-pointer"
              >
                <div className="mb-[4px]">
                  <ContactSupport />
                </div>
                <div className="w-[100%]">
                  <h3 className="text-[16px] font-semibold">Contact specialized support</h3>
                  <p className="text-[13px] text-[#717171] font-thin w-[90%]">
                    As a new Host, you get one-tap access to a specially trained support team.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
        <div>
          <div className="pb-[64px]">
            <motion.h1
              variants={componentVariants}
              initial="offscreen"
              whileInView="onscreen"
              viewport={{ amount: 0.5 }}
              className="text-[26px] font-semibold mb-[24px]"
            >
              Resources and tips
            </motion.h1>
            <div className="flex h-[293px] mobile:h-fit w-[full] gap-5 mobile:gap-0 mobile:flex-col mobile:items-center mobile:justify-center tablet:justify-center ">
              {Resourcesandtips.map((Resourceandtip, index) => (
                <motion.div
                  className="w-[100%]  flex items-center justify-center "
                  variants={buttonVariants}
                  key={index}
                  initial="offscreen"
                  whileInView="onscreen"
                  transition={{ type: 'spring', delay: 0.1 * index }}
                >
                  <ResourceAndTip ImgLink={Resourceandtip.ImgLink} title={Resourceandtip.title} />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Main;

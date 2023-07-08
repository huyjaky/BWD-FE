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
interface mainProps {
  keyMapBing: string;
  api_url_path: string
}

function Main({ keyMapBing, api_url_path }: mainProps): JSX.Element {
  const [selected, setSelected] = useState('Currently hosting');
  const { currentHosting } = useContext(AmountTabHostingContext);
  const [refButton, inViewButton] = useInView({
    // Kích hoạt nhiều lần khi vào khung nhìn
    threshold: 0.01 // Ngưỡng nhìn thấy (tỷ lệ của phần tử nằm trong khung nhìn)
  });
  const { user } = useContext(userAccContext)

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
      <div className="w-[100%] px-[80px] mobile:px-[0]">
        <motion.div
          variants={componentVariants}
          initial="offscreen"
          whileInView="onscreen"
          viewport={{ amount: 0.5 }}
          className="w-[100%] pt-[64px] mobile:mx-[20px]"
        >
          <h1 className="text-[32px] font-semibold">Welcome back {user.UserName}</h1>
        </motion.div>
        <div className="w-[100%] py-[64px]">
          <div className="">
            <motion.div
              variants={componentVariants}
              initial="offscreen"
              whileInView="onscreen"
              viewport={{ amount: 0.5 }}
              className="flex justify-between mb-[16px] mobile:mx-[20px]"
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
              className="flex flex-wrap mobile:mx-[20px]"
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
              className="bg-[#F7F7F7] h-fit flex items-center justify-center rounded-[12px] box-border
              px-4 transition-all mobile:px-0
              "
            >
              <div className="w-full h-fit transition-all duration-1000">
                <motion.div
                  className={`w-full h-fit ${selected === 'Currently hosting' ? '' : 'hidden'}`}
                >

                  {/* house for rent */}
                  <motion.div
                    variants={staggerContainer(null, null)}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: false, amount: 0.25 }}
                    className={` mx-auto flex-col `}
                  >
                    <AnimateTitle
                      title={'House for rent'}
                      textStyles=" w-full h-fit "
                    />

                  </motion.div>

                  <ShowHouse infShow="houseForRent" keyMapBing={keyMapBing} api_url_path={api_url_path} />

                  {/* house for sale */}
                  <motion.div
                    variants={staggerContainer(null, null)}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: false, amount: 0.25 }}
                    className={` mx-auto flex-col `}
                  >
                    <AnimateTitle
                      title={'House for sale'}
                      textStyles=" w-full h-fit "
                    />

                  </motion.div>

                  <ShowHouse infShow="houseForSale" keyMapBing={keyMapBing} api_url_path={api_url_path} />
                </motion.div>

                <div
                  className={`${selected === 'Currently hosting' ? 'hidden' : ''
                    } flex flex-col items-center justify-center gap-4 py-24 `}
                >
                  <AnyReview />
                  <span className="text-[14px] h-[36px] w-[200px] text-center">
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
          <div className="w-[100%] flex mobile:flex-col gap-2 mb-10">
            <motion.div
              variants={buttonVariants}
              className="w-[45%] laptop:w-[50%] mobile:w-[100%] tablet:w-full h-[92px] flex p-[16px] gap-3 border rounded-[10px] cursor-pointer"
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
                variants={animationVariants}
                className="w-[45%] laptop:w-[50%] mobile:w-[100%] tablet:w-full h-[92px] flex p-[16px] gap-3 border rounded-[10px] cursor-pointer"
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
      </div>
    </div>
  );
}

export default Main;

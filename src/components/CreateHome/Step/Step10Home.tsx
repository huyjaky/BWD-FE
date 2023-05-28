import React, { useState, useContext, useEffect } from 'react';
import { categoriesStep10, safetyitems, standoutamenities } from '../utils/constant';
import { useInView } from 'react-intersection-observer';
import ChooDesPl from '../ChooDesPl';
import { motion } from 'framer-motion';
import { newHouseContext } from '../../../contexts/createHome';

export default function Step10Home() {
    const { state, dispatch } = useContext(newHouseContext);
  // set Active thì để ngoài như này kh đc để trong lớp con
  // để trong lớp con thì khi render ra mỗi class sẽ có 1 state
  const [selectedMany, setselectedMany] = useState<string[]>(state.amenities);

  useEffect(() => {
    dispatch({type: 'STEP10', payload: selectedMany})
  }, [selectedMany])

  const type = 'selectMany';

  const [refButton, inViewButton] = useInView({
    triggerOnce: true, // Kích hoạt chỉ một lần khi vào khung nhìn
    threshold: 0.01 // Ngưỡng nhìn thấy (tỷ lệ của phần tử nằm trong khung nhìn)
  });

  const [refButton2, inViewButton2] = useInView({
    triggerOnce: true, // Kích hoạt chỉ một lần khi vào khung nhìn
    threshold: 0.01 // Ngưỡng nhìn thấy (tỷ lệ của phần tử nằm trong khung nhìn)
  });

  const [ref2, inView2] = useInView({
    triggerOnce: true, // Kích hoạt chỉ một lần khi vào khung nhìn
    threshold: 0.02 // Ngưỡng nhìn thấy (tỷ lệ của phần tử nằm trong khung nhìn)
  });

  const animationVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
      className="w-[98vw] px-[80px]
                        mobile:px-0
                        
        ">
      <div
        className="w-[60%] ml-auto mr-auto pl-[70px] mb-[150px]
            mobile:pl-0
            laptop:w-[90%]
            tablet:w-[90%]
            mobile:w-full
            ">
        <div className="flex flex-col px-10 w-[100%]">
          <div className="mb-[32px]">
            <div className="mb-[32px] h-[82px] tablet:mb-[62px] mobile:mb-[100px] w-[100%] ml-auto mr-auto ">
              <motion.h1
                initial={{ opacity: 0, y: -30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ type: 'spring', stiffness: 35, delay: 0.2 }}
                className="text-[32px] font-semibold w-[100%] leading-10 mb-3">
                Tell guests what your place has to offer
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ type: 'spring', stiffness: 35, delay: 0.2 }}
                className="text-[18px] text-[#717171]">
                You can add more amenities after you publish your listing.
              </motion.p>
            </div>
            <div
              className="grid grid-cols-3 gap-[15px] w-[110%]
                                    laptop:grid-cols-2
                                    tablet:grid-cols-2
                                    mobile:grid-cols-2
                    ">
              {categoriesStep10.map((category, index) => (
                <motion.div
                  variants={animationVariants}
                  initial="hidden"
                  animate="visible"
                  transition={{ type: 'spring', stiffness: 35, delay: 0.1 * index }}>
                  <ChooDesPl
                    title={category.name}
                    icon={category.icon}
                    type={type}
                    selectedMany={selectedMany}
                    setselectedMany={setselectedMany}
                    selected={''}
                    setselected={() => {}}
                  />
                </motion.div>
              ))}
            </div>
          </div>
          <div className="mb-[22px]">
            <motion.div
              transition={{ type: 'spring', stiffness: 35, delay: 0.2 }}
              className="h-[24px] mb-[22px] tablet:mb-[62px] mobile:mb-[40px] w-[100%]  ml-auto mr-auto ">
              <p className="text-[18px] text-black font-semibold">
                Do you have any standout amenities?
              </p>
            </motion.div>
            <div
              ref={refButton2}
              className="grid grid-cols-3 gap-[15px] w-[100%]
                                    laptop:grid-cols-2
                                    tablet:grid-cols-2
                                    mobile:grid-cols-2
                    ">
              {standoutamenities.map((category, index) => (
                <div ref={refButton2}>
                  <motion.div
                    initial="hidden"
                    animate={inViewButton2 ? 'visible' : 'hidden'}
                    variants={animationVariants}
                    transition={{ type: 'spring', stiffness: 35, delay: 0.1 * index }}>
                    <ChooDesPl
                      title={category.name}
                      icon={category.icon}
                      type={type}
                      selectedMany={selectedMany}
                      setselectedMany={setselectedMany}
                      selected={''}
                      setselected={() => {}}
                    />
                  </motion.div>
                </div>
              ))}
            </div>
          </div>
          <div>
            <div ref={ref2}>
              <motion.div
                initial="hidden"
                animate={inView2 ? 'visible' : 'hidden'}
                variants={animationVariants}
                transition={{ type: 'spring', stiffness: 35, delay: 0.1 }}
                className="h-[24px] mb-[22px] tablet:mb-[62px] mobile:mb-[92px] w-[100%]  ml-auto mr-auto ">
                <p className="text-[18px] text-black font-semibold">
                  Do you have any of the following safety amenities?
                </p>
              </motion.div>
            </div>
            <div
              className="grid grid-cols-3 gap-[15px] w-[100%]
                                    laptop:grid-cols-2
                                    tablet:grid-cols-2
                                    mobile:grid-cols-2
                    ">
              {safetyitems.map((category, index) => (
                <div ref={refButton}>
                  <motion.div
                    initial="hidden"
                    animate={inViewButton ? 'visible' : 'hidden'}
                    variants={animationVariants}
                    transition={{ type: 'spring', stiffness: 35, delay: 0.1 * index }}>
                    <ChooDesPl
                      title={category.name}
                      icon={category.icon}
                      type={type}
                      selectedMany={selectedMany}
                      setselectedMany={setselectedMany}
                      selected={''}
                      setselected={() => {}}
                    />
                  </motion.div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

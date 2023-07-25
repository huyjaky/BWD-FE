// import required modules

import { AnimatePresence, LayoutGroup, motion } from 'framer-motion';
import { useContext, useEffect, useState } from 'react';


import Banner from '@/components/animationtest/Banner';
import Header from '@/components/animationtest/Header';
import Loader from '@/components/animationtest/Loader';
import { isLoadingAnimateContext } from '@/contexts/isLoadingAnimate';
import LatestNews from './latestNews';
import FooterMainRes from '@/components/footers/footerMainRes';
import FooterRooms from '@/components/footers/footerRooms';

const AnimateTest = () => {
  const [loading, setLoading] = useState(true);
  const { isLoading, setIsLoading } = useContext(isLoadingAnimateContext);

  useEffect(() => {
    // if (!document.querySelector("body"))return;
    isLoading
      ? document.querySelector("body")?.classList.add("loading")
      : document.querySelector("body")?.classList.remove("loading");
  }, [isLoading]);


  return (
    <div className='overflow-hidden'>

      <LayoutGroup>
        <AnimatePresence>
          {isLoading ? (
            <motion.div key='loader'>
              <Loader setLoading={setIsLoading} />
            </motion.div>
          ) : (
            <>
              <Header />
              <Banner />
              {!isLoading && (
                <>
                  <div className='transition-image final'>
                    <motion.img
                      transition={{ ease: [0.6, 0.01, -0.05, 0.9], duration: 1.6 }}
                      src={'/newPost/01-Ted-Lasso-Airbnb-Exterior-Credit-Henry-Woide-1-1.webp'}
                      layoutId='main-image-1' className='w-full h-[50vh] object-cover object-bottom overflow-hidden'
                    />
                  </div>


                  <div className='w-full h-fit'>
                    <LatestNews />
                  </div>

                  
                  <FooterMainRes/>
                  <FooterRooms />
                </>

              )}
            </>
          )}

        </AnimatePresence>
      </LayoutGroup>
    </div>
  );
}

export default AnimateTest;
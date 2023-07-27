// import required modules

import { AnimatePresence, LayoutGroup, motion } from 'framer-motion';
import { useContext, useEffect, useState } from 'react';


import Banner from '@/components/animationtest/Banner';
import Header from '@/components/animationtest/Header';
import Loader from '@/components/animationtest/Loader';
import FooterMainRes from '@/components/footers/footerMainRes';
import FooterRooms from '@/components/footers/footerRooms';
import { isLoadingAnimateContext } from '@/contexts/isLoadingAnimate';
import { newsPost } from '@/utils/newsPost';
import Contact from './contact';
import LatestNews from './latestNews';
import SlideTab from './slideTab/slideTab';

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


                  <div className='w-full h-fit mb-20'>
                    <LatestNews />
                  </div>

                  <div className='w-full h-fit bg-slate-200 mb-20'>
                    <SlideTab arrPost={newsPost.economic} title='The economic opportunities of hosting'
                      des='More people are turning to hosting for the first time. From community stories, to the latest Host earnings data and trends, discover how it has never been easier to host and earn on Airbnb.' />
                  </div>

                  <div className='w-full h-fit mb-20'>
                    <Contact />
                  </div>


                  <div className='w-full h-fit bg-slate-200 mb-20'>
                    <SlideTab arrPost={newsPost.only} title='One-of-a-kind stays, only on Airbnb'
                      des='Explore the unique, limited-time stays that give guests a rare glimpse into some of the most iconic places in pop culture.' />
                  </div>

                  <FooterMainRes />
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
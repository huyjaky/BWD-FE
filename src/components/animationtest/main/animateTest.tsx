// import required modules

import { AnimatePresence, LayoutGroup, motion } from 'framer-motion';
import { useEffect, useState } from 'react';


import Banner from '@/components/animationtest/Banner';
import Header from '@/components/animationtest/Header';
import Loader from '@/components/animationtest/Loader';

const AnimateTest = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // if (!document.querySelector("body"))return;
    loading
      ? document.querySelector("body")?.classList.add("loading")
      : document.querySelector("body")?.classList.remove("loading");
  }, [loading]);

  return (
    <LayoutGroup>
      <AnimatePresence>
        {loading ? (
          <motion.div key='loader'>
            <Loader setLoading={setLoading} />
          </motion.div>
        ) : (
          <>
            <Header />
            <Banner />
            {!loading && (
              <div className='transition-image final'>
                <motion.img
                  transition={{ ease: [0.6, 0.01, -0.05, 0.9], duration: 1.6 }}
                  src={'https://i.pinimg.com/originals/06/ab/e2/06abe2da36f22149c98da3e638412f0d.gif'}
                  layoutId='main-image-1'
                />
              </div>
            )}
          </>
        )}
        {/* <motion.div key='loader'>
          <Loader setLoading={setLoading} />
        </motion.div> */}

      </AnimatePresence>
    </LayoutGroup>
  );
}

export default AnimateTest;
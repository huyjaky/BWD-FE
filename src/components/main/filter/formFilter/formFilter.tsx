import { filterFormAnimateContext } from '@/contexts/filterFormAnimate';
import { AnimatePresence, Variants, motion } from 'framer-motion';
import { useContext, useEffect, useRef, useState } from 'react';
import { IoMdClose } from 'react-icons/io';
import Amenities from './filterFormComponent/amenities/amenities';
import BedsBathRooms from './filterFormComponent/bedsBathrooms';
import PriceRange from './filterFormComponent/priceRange';
import PropertyHouse from './filterFormComponent/property';

const variantsAmenities: Variants = {
  showMore: {
    height: 100,
  },

}

const FormFilter = () => {
  const [show, setShow] = useState(false);
  const { isClickOutSide, setIsClickOutSide } = useContext(filterFormAnimateContext);
  const formFilter = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleOnClickOutSide = (event: any) => {
      if (formFilter.current) {
        const formFilter_ = formFilter.current;
        const isClickOutSide_ = formFilter_.contains(event.target);
        if (!isClickOutSide_) {
          setIsClickOutSide(false);
        }
      }
    };

    document.addEventListener('mousedown', handleOnClickOutSide);
  }, []);

  return (
    <>
      <AnimatePresence initial={false}>
        <motion.div
          initial={
            isClickOutSide
              ? { visibility: 'hidden', translateY: 2000 }
              : { translateY: 0, visibility: 'visible' }
          }
          animate={isClickOutSide ? { translateY: 0, visibility: 'visible' } : { translateY: 2000 }}
          transition={{ duration: 0.5, type: 'spring' }}
          className="w-[800px] h-[90vh] bg-white m-auto rounded-3xl overflow-hidden"
          ref={formFilter}
        >
          {/* header formfilter */}
          <div className="h-[70px] w-full border-b-2 flex relative">
            {/* button */}
            <div className="absolute w-[70px] h-full left-0 bottom-0 flex">
              <IoMdClose className="m-auto text-[35px]" />
            </div>
            <span className="m-auto font-semibold text-[23px]">Filter</span>
          </div>

          {/* content formfilter */}
          <div className="w-full h-[75vh] overflow-x-hidden  overflow-scroll box-border p-10">
            {/* price range */}
            <div className="w-full h-fit mb-5">
              {/* header pricerange */}
              <div className="w-full h-fit flex flex-col">
                <span className="font-bold text-[25px]">Price range</span>
                <span className="text-[18px]">
                  The average nightly price is &#36;79, not including fees or taxes.
                </span>
              </div>
              <PriceRange />
            </div>

            {/* bed and bathrooms */}
            <div className="w-full h-fit border-b-2 border-slate-500 py-10">
              {/* header bed&bathrooms */}
              <div className="w-full h-fit flex flex-col  pb-3">
                <span className="font-bold text-[25px] mb-5">Beds & Bathrooms</span>
                <BedsBathRooms />
              </div>
            </div>

            {/* property type */}
            <div className="w-full h-fit mb-5 border-b-2 border-slate-500 py-10">
              <div className="w-full h-fit flex flex-col ">
                <span className="font-bold text-[25px] mb-5">Property type</span>
                <PropertyHouse />
              </div>
            </div>

            <div className="w-full h-fit mb-5 border-b-2 border-slate-500 py-10">
              <div className="w-full h-fit flex flex-col ">
                <span className="font-bold text-[25px] mb-5">Amenities</span>
                <Amenities typeAmenities="essentials" />
                <motion.div
                  variants={variantsAmenities}

                >
                  <Amenities typeAmenities="features" />
                  <Amenities typeAmenities="location" />
                  <Amenities typeAmenities="safety" />
                </motion.div>
                <motion.button
                  className="w-[300px] rounded-lg border-2"
                  whileHover={{ backgroundColor: 'rgba(255, 56, 92, 0.8)', color: 'white' }}
                  whileTap={{ scale: 0.9 }}
                  onClick={event=> setShow(!show)}>

                  <span className="text-[20px]">{show ? 'Show less' : 'Show more'}</span>
                </motion.button>
              </div>
            </div>
          </div>
          <div className="w-full h-[100px] border-t-2"></div>
        </motion.div>
      </AnimatePresence>
    </>
  );
};
export default FormFilter;

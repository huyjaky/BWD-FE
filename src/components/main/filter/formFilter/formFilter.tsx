import { filterContext } from '@/contexts/filter';
import { filterFormAnimateContext } from '@/contexts/filterFormAnimate';
import { getHouseContext } from '@/contexts/getHouse';
import { IsShowPtContext } from '@/contexts/isShowPt';
import { selectPlaceContext } from '@/contexts/selectPlace';
import { filterForm } from '@/models/filter';
import { AnimatePresence, Variants, motion } from 'framer-motion';
import { useContext, useEffect, useRef, useState } from 'react';
import { GrClose } from 'react-icons/gr';
import Amenities from './filterFormComponent/amenities/amenities';
import BedsBathRooms from './filterFormComponent/bedsBathrooms';
import HostLanguage from './filterFormComponent/hostLanguage';
import PriceRange from './filterFormComponent/priceRange';
import PropertyHouse from './filterFormComponent/property';

const variantsAmenities: Variants = {
  showMore: {
    height: 100
  },
  show: {
    translateY: [2000, 0]
  },
  hidden: {
    translateY: [0, 2000]
  }
};

const FormFilter = () => {
  const [show, setShow] = useState(false);
  const { filterForm, setFilterForm } = useContext(filterContext);
  const { setIsFilter, isFilter } = useContext(getHouseContext);
  const { isClickOutSide, setIsClickOutSide } = useContext(filterFormAnimateContext);
  const { address, setAddress } = useContext(selectPlaceContext);
  const { isShowAllPt } = useContext(IsShowPtContext);
  const formFilter = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleOnClickOutSide = (event: any) => {
      if (formFilter.current) {
        const formFilter_ = formFilter.current;
        const isClickOutSide_ = formFilter_.contains(event.target);
        if (!isClickOutSide_) {
          document.body.style.overflow = 'scroll';
          document.body.style.overflowX = 'hidden';
          setIsClickOutSide(false);
        }
      }
    };

    document.addEventListener('mousedown', handleOnClickOutSide);
  }, [isShowAllPt]);

  const isEmpty = () => {
    const emptyObj = {
      maxPrice: 250,
      minPrice: 10,
      beds: 0,
      bathRooms: 0,
      typeHouse: [],
      amenities: {
        essentials: [],
        features: [],
        location: [],
        safety: []
      },
      hostLanguage: ''
    };

    const emptyObjJson = JSON.stringify(emptyObj);
    const filterFormJson = JSON.stringify(filterForm);

    if (emptyObjJson === filterFormJson) return true;
    return false;
  };

  const fetchData = async () => {
    setIsClickOutSide(false);
    document.body.style.overflow = 'scroll';
    document.body.style.overflowX = 'hidden';

    // neu du lieu co ton tai thi la fetch lai du lieu neu khong thi bo qua
    if (!isEmpty()) {
      setIsFilter('noneAuthFilter');
      return;
    } else {
      setIsFilter('main');
      return;
    }
  };

  return (
    <>
      <AnimatePresence initial={false}>
        <motion.div
          variants={variantsAmenities}
          animate={isClickOutSide ? 'show' : 'hidden'}
          transition={{ duration: 0.5, type: 'spring' }}
          className="w-[800px] h-[calc(100vh-50px)] bg-white m-auto rounded-3xl overflow-hidden
          flex flex-col
          mobile:mt-0 mobile:rounded-none mobile:w-screen mobile:h-[calc(100vh-70px)]
          tablet:h-[calc(100vh-90px)] tablet:mt-[10px] z-40
          "
          ref={formFilter}
        >
          {/* header formfilter */}
          <div className=" flex-2 w-full border-b-2 flex relative">
            <span className="m-auto font-semibold text-[23px]">Filter</span>
            <motion.button
              className="absolute w-[70px] h-full flex desktop:hidden laptop:hidden"
              onClick={(event) => setIsClickOutSide(false)}
            >
              <div className="w-fit h-full m-auto">
                <GrClose className="text-[30px]" />
              </div>
            </motion.button>
          </div>

          {/* content formfilter */}
          <div className="w-full flex-[9] h-[75vh] overflow-x-hidden  overflow-scroll box-border p-10">
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
                  className="overflow-hidden"
                  variants={variantsAmenities}
                  animate={show ? { height: 700, opacity: 1 } : { height: 0, opacity: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  <Amenities typeAmenities="features" />
                  <Amenities typeAmenities="location" />
                  <Amenities typeAmenities="safety" />
                </motion.div>
                <div className="w-fit h-fit flex items-center">
                  <motion.button
                    className="w-[300px] rounded-lg border-2 mr-2"
                    whileHover={{ backgroundColor: 'rgba(255, 56, 92, 0.8)', color: 'white' }}
                    whileTap={{ scale: 0.9 }}
                    onClick={(event) => setShow(!show)}
                  >
                    <span className="text-[20px]">{show ? 'Show less' : 'Show more'}</span>
                  </motion.button>
                  <span className="">
                    {!show &&
                    (filterForm.amenities.features.length != 0 ||
                      filterForm.amenities.location.length != 0 ||
                      filterForm.amenities.safety.length != 0)
                      ? ` you have filled in ${
                          filterForm.amenities.features.length +
                          filterForm.amenities.location.length +
                          filterForm.amenities.safety.length
                        } options`
                      : ''}
                  </span>
                </div>
              </div>
            </div>

            {/* host language */}
            <div className="w-full h-fit mb-5 py-10">
              <div className="w-full h-fit flex flex-col ">
                <span className="font-bold text-[25px] mb-5">Host language</span>
                <HostLanguage />
              </div>
            </div>
          </div>

          <div className="w-full border-t-2 flex items-center flex-2 py-3">
            <div className="flex-1 flex justify-start">
              <div
                className="m-auto underline cursor-pointer"
                onClick={(event) => {
                  const filterFormTemp: filterForm = {
                    ...filterForm,
                    maxPrice: 250,
                    minPrice: 10,
                    beds: 0,
                    bathRooms: 0,
                    typeHouse: [],
                    amenities: {
                      essentials: [],
                      features: [],
                      location: [],
                      safety: []
                    },
                    hostLanguage: ''
                  };
                  const addressTemp = {
                    countryRegion: '',
                    locality: '',
                    adminDistrict: '',
                    adminDistrict2: '',
                    countryRegionIso2: '',
                    houseNumber: '',
                    postalCode: '',
                    addressLine: '',
                    streetName: '',
                    formattedAddress: '',
                    latitude: 0,
                    longitude: 0
                  };
                  setFilterForm(filterFormTemp);
                  setAddress({ ...address, address: { ...address.address, ...addressTemp } });
                }}
              >
                Clear all
              </div>
            </div>
            <div className="flex-1 flex justify-center">
              <motion.button
                className="w-[200px] h-[40px] rounded-lg border-2"
                whileHover={{ backgroundColor: 'rgba(255, 56, 92, 0.8)', color: 'white' }}
                onClick={fetchData}
                whileTap={{ scale: 0.9 }}
              >
                Submit
              </motion.button>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </>
  );
};
export default FormFilter;

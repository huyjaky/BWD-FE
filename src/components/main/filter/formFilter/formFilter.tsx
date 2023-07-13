import { filterContext } from '@/contexts/filter';
import { filterFormAnimateContext } from '@/contexts/filterFormAnimate';
import { getHouseContext } from '@/contexts/getHouse';
import { IsShowPtContext } from '@/contexts/isShowPt';
import { selectPlaceContext } from '@/contexts/selectPlace';
import { address } from '@/models/address';
import { filterForm } from '@/models/filter';
import { AnimatePresence, Variants, motion } from 'framer-motion';
import { useContext, useEffect, useRef, useState } from 'react';
import { GrClose } from 'react-icons/gr';
import MapFilter from './filterFormComponent/Mapfilter';
import Amenities from './filterFormComponent/amenities/amenities';
import BedsBathRooms from './filterFormComponent/bedsBathrooms';
import CompassFilter from './filterFormComponent/compass';
import HostLanguage from './filterFormComponent/hostLanguage';
import PriceRange from './filterFormComponent/priceRange';
import PropertyHouse from './filterFormComponent/property';

export const variantsAmenities: Variants = {
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

interface FormFilterProps {
  keyMapBing: string
}

const FormFilter = ({ keyMapBing }: FormFilterProps) => {
  const [show, setShow] = useState(false);
  const { filterForm, setFilterForm } = useContext(filterContext);
  const { setIsFilter, isFilter, setReRenderFilter, reRenderFilter } = useContext(getHouseContext);
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
    const emptyObj: filterForm = {
      maxPrice: 250,
      minPrice: 10,
      beds: 0,
      bathRooms: 0,
      typeHouse: [],
      amenities: [],
      hostLanguage: '',
      orientation: ''
    };

    const emptyAddress: address = {
      countryRegion: '',
      locality: '',
      adminDistrict: '',
      countryRegionIso2: '',
      postalCode: '',
      addressLine: '',
      streetName: '',
      formattedAddress: '',
      latitude: 0,
      longitude: 0,
      title: ''
    };
    const emptyObjJson = JSON.stringify(emptyObj);
    const filterFormJson = JSON.stringify(filterForm);
    const emptyAddressJson = JSON.stringify(emptyAddress);
    const addressJson = JSON.stringify(address.address);


    if (emptyObjJson === filterFormJson && emptyAddressJson === addressJson) return true;
    return false;
  };

  const fetchData = async () => {
    setIsClickOutSide(false);
    document.body.style.overflow = 'scroll';
    document.body.style.overflowX = 'hidden';

    const element = document.getElementById('slideShowHouse');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }

    // neu du lieu co ton tai thi la fetch lai du lieu neu khong thi bo qua
    if (!isEmpty()) {
      setIsFilter('noneAuthFilter');
      setReRenderFilter(reRenderFilter + 1);
      return;
    } else {
      setIsFilter('main');
      return;
    }
  };
  useEffect(() => { console.log(filterForm); }, [filterForm])

  return (
    <>
      <AnimatePresence initial={false}>
        <motion.div
          variants={variantsAmenities}
          animate={isClickOutSide ? 'show' : 'hidden'}
          transition={{ duration: 0.5, type: 'tween' }}
          className="w-[800px] h-[calc(100vh-3rem)] bg-white m-auto rounded-3xl
          flex flex-col
          mobile:mt-0 mobile:rounded-none mobile:w-screen mobile:h-screen
          tablet:h-[calc(100vh-5.625rem)] tablet:mt-[.6rem] z-30
          "
          ref={formFilter}
        >
          {/* header formfilter */}
          <div className=" flex-2 w-full border-b-2 flex relative">
            <span className="m-auto font-semibold text-[1rem]">Filter</span>
            <motion.button
              className="absolute w-[4.5rem] h-full flex desktop:hidden laptop:hidden"
              onClick={(event) => setIsClickOutSide(false)}
            >
              <div className="w-fit h-full m-auto">
                <GrClose className="text-[2rem]" />
              </div>
            </motion.button>
          </div>

          {/* content formfilter */}
          <div className="w-full flex-[9] h-[75vh] overflow-x-hidden  overflow-scroll box-border p-10">
            {/* price range */}
            <div className="w-full h-fit mb-5">
              {/* header pricerange */}
              <div className="w-full h-fit flex flex-col">
                <span className="font-bold text-[2rem]">Price range</span>
                <span className="text-[1rem]">
                  The average nightly price is &#36;79, not including fees or taxes.
                </span>
              </div>
              <PriceRange />
            </div>

            {/* Map */}
            <div className="w-full h-fit border-b-2 border-slate-500 py-10">
              {/* header bed&bathrooms */}
              <div className="w-full h-fit flex flex-col  pb-3">
                <span className="font-bold text-[2rem] mb-5">Map</span>
                <MapFilter keyMapBing={keyMapBing} />
              </div>
            </div>

            {/* bed and bathrooms */}
            <div className="w-full h-fit border-b-2 border-slate-500 py-10">
              {/* header bed&bathrooms */}
              <div className="w-full h-fit flex flex-col  pb-3">
                <span className="font-bold text-[2rem] mb-5">Beds & Bathrooms</span>
                <BedsBathRooms />
              </div>
            </div>

            {/* property type */}
            <div className="w-full h-fit mb-5 border-b-2 border-slate-500 py-10">
              <div className="w-full h-fit flex flex-col ">
                <span className="font-bold text-[2rem] mb-5">Property type</span>
                <PropertyHouse />
              </div>
            </div>

            <div className="w-full h-fit mb-5 border-b-2 border-slate-500 py-10">
              <div className="w-full h-fit flex flex-col ">
                <span className="font-bold text-[2rem] mb-5">Amenities</span>
                <Amenities />
              </div>
            </div>

            {/* compass */}
            <div className="w-full h-fit mb-5 border-b-2 border-slate-500 py-10">
              <div className="w-full h-fit flex flex-col ">
                <span className="font-bold text-[2rem] mb-5">Orientation</span>
                <CompassFilter />
              </div>
            </div>

            {/* host language */}
            <div className="w-full h-fit mb-5 py-10">
              <div className="w-full h-fit flex flex-col ">
                <span className="font-bold text-[2rem] mb-5">Host language</span>
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
                    amenities: [],
                    hostLanguage: ''
                  };
                  const addressTemp: address = {
                    countryRegion: '',
                    locality: '',
                    adminDistrict: '',
                    countryRegionIso2: '',
                    postalCode: '',
                    addressLine: '',
                    streetName: '',
                    formattedAddress: '',
                    latitude: 0,
                    longitude: 0,
                    title: ''
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
                className="w-[12.5rem] h-[2.4rem] rounded-lg border-2"
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

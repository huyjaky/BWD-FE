import SearchBox from '@/components/searchBox/searchBox';
import { selectPopoverContext } from '@/contexts';
import { filterFormAnimateContext } from '@/contexts/filterFormAnimate';
import { getHouseContext } from '@/contexts/getHouse';
import { selectPlaceContext } from '@/contexts/selectPlace';
import { format } from 'date-fns';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { BiSearch } from 'react-icons/bi';
interface Place {
  address: string;
  latitude: number | null;
  longitude: number | null;
}

const ControlBar = () => {
  const [submit, setSubmit] = useState(false);
  const { setSelected } = useContext(selectPopoverContext);
  const { address } = useContext(selectPlaceContext);
  // const { isFilter, setIsFilter } = useContext(getHouseContext;
  const { setIsFilter, isFilter, setReRenderFilter, reRenderFilter } = useContext(getHouseContext);
  const { setIsShowHeader } = useContext(filterFormAnimateContext);
  const router = useRouter();

  const isEmpty = () => {
    if (
      !address.address.formattedAddress &&
      !address.guest.adults &&
      !address.guest.childrens &&
      !address.guest.infants
    ) {
      return true;
    } else {
      return false;
    }
  };

  const fetchData = (event: any) => {
    if (router.asPath !== '/homepage') {
      setIsShowHeader(false);
      router.push('/homepage', undefined, { shallow: true });
    }
    if (isEmpty()) {
      return;
    } else {
      setIsShowHeader(false);
      setIsFilter('noneAuthFilter');
      setReRenderFilter(reRenderFilter+1);
      return;
    }
  };

  const onSelected = (event: any) => {
    setSelected(event.currentTarget.id);
  };

  // validate while submit
  const onSubmit = (data: Place) => {
    setSubmit(true);
    handleCreate(data);
  };

  // form validate
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    watch
  } = useForm<Place>({ defaultValues: {} });

  const handleCreate = async (data: Place) => {};

  return (
    <div className="w-full h-full flex relative mobile:text-[1rem] mobile:flex-col">
      <div className="flex-[0.6] flex mobile:text-[1rem]">
        {/* animation where */}
        <div
          className="flex-col flex m-auto w-full rounded-full box-border pl-7
                z-10 relative mobile:pl-0
                "
          id="where"
          onClick={onSelected}
        >
          <span>Where</span>

          {/* the input cho nay lam sau */}
          <form action="" onSubmit={handleSubmit(onSubmit)}>
            <SearchBox styleBox={null} />
            <div>{errors.address && <p>{errors.address.message}</p>}</div>
          </form>
        </div>
      </div>
      <div className="flex-1 flex mobile:flex-col">
        <div className="flex-1 flex ">
          <div
            className="flex flex-col m-auto flex-1 box-border pl-3
                z-10 relative mobile:pl-0 mobile:text-[1rem] mobile:mt-5
                "
            id="checkin"
            onClick={onSelected}
          >
            <span>Appointment schedule</span>
            <span className="text-[1rem]">{format(address.checkInDay, 'eeee, ddMMM')}</span>
          </div>
        </div>
        <div className="flex-1 flex mobile:flex-col">
          <div
            className="flex-1 flex flex-col m-auto box-border pl-3
                z-10 relative mobile:text-[1rem] mobile:pl-0 mobile:mt-5
                mobile:ml-0
                "
            id="who"
            onClick={onSelected}
          >
            <span>Who</span>
            <span>
              {address.guest.adults != 0 || address.guest.childrens != 0
                ? address.guest.adults + address.guest.childrens + ' guests'
                : 'Add guests '}

              {address.guest.infants != 0 && ', ' + address.guest.infants + ' infants'}
            </span>
          </div>

          <div className="flex-1 flex box-border p-3 w-full relative z-10 mobile:py-5 tablet:py-5 ">
            <motion.div
              whileTap={{ scale: 0.8 }}
              className="rounded-full w-full h-full bg-red-500 flex "
              id="btn-search-header"
              onClick={fetchData}
            >
              <BiSearch className="w-[2rem] h-[2rem] m-auto text-white tablet:w-[1rem] tablet:h-[1rem] mobile:w-[1rem] mobile:h-[1rem]" />
              <span className="text-white font-semibold m-auto ml-0 tablet:hidden mobile:hidden">
                Search
              </span>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ControlBar;

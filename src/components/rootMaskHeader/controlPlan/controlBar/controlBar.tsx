import SearchBox from '@/components/searchBox/searchBox';
import { selectPopoverContext } from '@/contexts';
import { getHouseContext } from '@/contexts/getHouse';
import { selectPlaceContext } from '@/contexts/selectPlace';
import { format } from 'date-fns';
import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { BiSearch } from 'react-icons/bi';
import {motion} from 'framer-motion';
import { filterFormAnimateContext } from '@/contexts/filterFormAnimate';
interface Place {
  address: string;
  latitude: number | null;
  longitude: number | null;
}

const ControlBar = () => {
  const [submit, setSubmit] = useState(false);
  const {isShowHeader, setIsShowHeader} = useContext(filterFormAnimateContext)
  const { setSelected } = useContext(selectPopoverContext);
  const { address } = useContext(selectPlaceContext);
  const { isFilter, setIsFilter } = useContext(getHouseContext);
  const router = useRouter();

  const handleOnMask = (event: any) => {

    if (router.asPath !== '/') {
      router.push('/', undefined, { shallow: true });
    }
  };

  const isEmpty = () => {
    if (!address.address.formattedAddress) {
      return true;
    } else {
      return false;
    }
  };

  const fetchData = (event: any) => {
    if (isEmpty()) {
      return;
    } else {
      setIsFilter(isFilter + 1);
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

  useEffect(() => {
    const temp = document.getElementById('btn-search-header');
    temp?.addEventListener('click', handleOnMask);
  }, []);

  return (
    <div className="w-full h-full flex relative mobile:text-[12px]">
      <div className="flex-[0.6] flex">

        {/* animation where */}
        <div
          className="flex-col flex m-auto w-full rounded-full box-border pl-7
                z-10 relative before:absolute before:w-full before:h-[calc(100%+25px)] before:-translate-y-[calc(15%+1px)]
                before:-translate-x-9 before:-z-10 before:rounded-full transition-all duration-500
                before:shadow-xl
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
      <div className="flex-1 flex">
        <div className="flex-1 flex">
          <div
            className="flex flex-col m-auto flex-1 box-border pl-3
                z-10 relative before:absolute before:w-full before:h-[calc(100%+25px)] before:-translate-y-[calc(15%+1px)]
                before:-translate-x-3 before:-z-10 before:rounded-full transition-all duration-500
                before:shadow-xl
                "
            id="checkin"
            onClick={onSelected}
          >
            <span>Check in</span>
            <span className="text-[12px]">{format(address.checkInDay, 'eeee, ddMMM')}</span>
          </div>
          <div
            className="flex flex-col m-auto flex-1 box-border pl-3
                z-10 relative before:absolute before:w-full before:h-[calc(100%+25px)] before:-translate-y-[calc(15%+1px)]
                before:-translate-x-3 before:-z-10 before:rounded-full transition-all duration-500
                before:shadow-xl
                "
            id="checkout"
            onClick={onSelected}
          >
            <span>Check out</span>
            <span className="text-[12px]">{format(address.checkOutDay, 'eeee, ddMMM')}</span>
          </div>
        </div>
        <div className="flex-1 flex">
          <div
            className="flex-1 flex flex-col m-auto box-border pl-3
                z-10 relative before:absolute before:w-[calc(200%+30px)] before:h-[calc(100%+25px)] before:-translate-y-[calc(15%+1px)]
                before:-translate-x-3 before:-z-10 before:rounded-full transition-all duration-500
                before:shadow-xl
                "
            id="who"
            onClick={onSelected}
          >
            <span>Who</span>
            <span>Add guests</span>
          </div>

          <div className="flex-1 flex box-border p-3 w-full relative z-10 mobile:py-5 tablet:py-5 ">
            <div
              className="rounded-full w-full h-full bg-red-500 flex "
              id="btn-search-header"
              onClick={fetchData}
            >
              <BiSearch className="w-[30px] h-[30px] m-auto text-white tablet:w-[20px] tablet:h-[20px] mobile:w-[20px] mobile:h-[20px]" />
              <span className="text-white font-semibold m-auto ml-0 tablet:hidden mobile:hidden">
                Search
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ControlBar;

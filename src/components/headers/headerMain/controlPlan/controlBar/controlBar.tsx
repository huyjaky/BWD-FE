import { useEffect, useState } from 'react';
import { BiSearch } from 'react-icons/bi';
import { useForm } from 'react-hook-form';
import SearchBox from '../../../../searchBox/searchBox';

interface Place {
  address: string;
  latitude: number | null;
  longitude: number | null;
}

const ControlBar = () => {
  const [submit, setSubmit] = useState(false);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    watch
  } = useForm<Place>({ defaultValues: {} });

  useEffect(() => {
    register('address', { required: 'Please enter your address' });
    register('latitude', { required: true, min: -90, max: 90 });
    register('longitude', { required: true, min: -90, max: 90 });
  }, [register]);

  const handleCreate = async (data: Place) => {};

  const onSubmit = (data: Place) => {
    setSubmit(true);
    handleCreate(data);
  };

  return (
    <div className="w-full h-full flex">
      <div className="flex-[0.6] flex">
        <div
          className="flex-col flex m-auto w-full rounded-full box-border pl-7
                z-10 relative before:absolute before:w-full before:h-[calc(100%+25px)] before:-translate-y-[calc(15%+1px)]
                before:-translate-x-9 before:-z-10 before:rounded-full transition-all duration-500
                before:shadow-xl
                "
          id="header-control_bar-index-1"
        >
          <span>Where</span>

          {/* the input cho nay lam sau */}
          <form action="" onSubmit={handleSubmit(onSubmit)}>
            <SearchBox
              onSelectAddress={(address, latitude, longitude) => {
                setValue('address', address);
                setValue('latitude', latitude);
                setValue('longitude', longitude);
              }}
              defaultValue=""
            />
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
          >
            <span>Check in</span>
            <span>Add dates</span>
          </div>
          <div
            className="flex flex-col m-auto flex-1 box-border pl-3
                z-10 relative before:absolute before:w-full before:h-[calc(100%+25px)] before:-translate-y-[calc(15%+1px)]
                before:-translate-x-3 before:-z-10 before:rounded-full transition-all duration-500
                before:shadow-xl
                "
            id="header-control_bar-index-3"
          >
            <span>Check out</span>
            <span>Add dates</span>
          </div>
        </div>
        <div className="flex-1 flex">
          <div
            className="flex-1 flex flex-col m-auto box-border pl-3
                z-10 relative before:absolute before:w-[calc(200%+30px)] before:h-[calc(100%+25px)] before:-translate-y-[calc(15%+1px)]
                before:-translate-x-3 before:-z-10 before:rounded-full transition-all duration-500
                before:shadow-xl
                "
            id="header-control_bar-index-4"
          >
            <span>Who</span>
            <span>Add guests</span>
          </div>

          <div className="flex-1 flex box-border p-3 w-full relative z-10">
            <div className="rounded-full w-full h-full bg-red-500 flex ">
              <BiSearch className="w-[30px] h-[30px] m-auto text-white" />
              <span className="text-white font-semibold m-auto ml-0">Search</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ControlBar;

import { selectHouseContext } from "@/contexts/selectHouse";
import { house_ } from "@/models/house";
import { motion } from "framer-motion";
import { useContext, useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import MapEach from "../mapEach";
import InputFormEdit from "./inputForm/inputFormEdit";
import Slider from "rc-slider";
import { number } from "yup";
import Amenities from "../../filter/formFilter/filterFormComponent/amenities/amenities";
import { variantsAmenities } from "../../filter/formFilter/formFilter";

interface EditFormProps {
  keyMapBing: string
}



const EditForm = ({ keyMapBing }: EditFormProps) => {
  const { selectHouse, setSelectHouse, } = useContext(selectHouseContext);
  const styleInput = 'box-border p-3';
  const compass: string[] = ['West', 'South', 'East', 'North']
  const [tempHouse, setTempHouse] = useState<house_ | undefined>(selectHouse)
  const [show, setShow] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    reset,
    setError,
    formState: { errors }
  } = useForm<house_>({
    defaultValues: tempHouse,
    // resolver: yupResolver<any>(schema)
  });

  useEffect(() => {
    setTempHouse(selectHouse);
    reset(selectHouse);
  }, [selectHouse]);

  const onSubmit: SubmitHandler<house_> = (data) => {
    console.log('item', selectHouse);
  }

  const handleOnChange = async (value: any) => {
    const temp: house_ | undefined = selectHouse;
    if (temp) {
      setTempHouse({ ...temp, Price: value });
    }
  }

  return (
    <>
      <div className='w-[800px] h-[calc(100vh-50px)] bg-white m-auto rounded-3xl
        overflow-hidden flex flex-col
        mobile:mt-0 mobile:rounded-none
        mobile:w-screen mobile:h-screen
        tablet:h-[calc(100vh-90px)] tablet:mt-[10px] '>
        <form className='w-full h-full relative '
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className='w-full absolute h-[40px]  border-b-2  flex'>
            <span className='text-[30px] m-auto'>Edit</span>

          </div>
          <div className="w-full h-[80px] absolute bottom-0 left-0 border-t-2 flex items-center flex-2 py-3">
            <div className="flex-1 flex justify-start">
              <div
                className="m-auto underline cursor-pointer"
              >
                Clear all
              </div>
            </div>
            <div className="flex-1 flex justify-center">
              <motion.button
                type="submit"
                className="w-[200px] h-[40px] rounded-lg border-2"
                whileHover={{ backgroundColor: 'rgba(255, 56, 92, 0.8)', color: 'white' }}
                whileTap={{ scale: 0.9 }}
              >
                Submit
              </motion.button>
            </div>
          </div>
          <div className="w-full h-full">
            <div className="w-full h-[40px]"></div>

            <div className="w-full h-[calc(100%-120px)]
              overflow-scroll overflow-x-hidden box-border p-7
              mobile:p-0
              ">
              <div className="w-full h-fit">
                <MapEach formattedAddress="" keyMapBing={keyMapBing}
                  latitude={selectHouse?.address.latitude || 0}
                  longitude={selectHouse?.address.longitude || 0}
                  zoom={18}
                  idMap="1"
                  style="h-[300px]"
                />
              </div>

              {/* form  */}
              <div className="w-full h-fit grid text-[25px] desktop:grid-areas-layoutEditDesktopLaptop
              laptop:grid-areas-layoutEditDesktopLaptop

              tablet:grid-areas-layoutEditTabletMobile
              mobile:grid-areas-layoutEditTabletMobile
              ">
                <div className={`grid-in-locale ${styleInput}`}>
                  <InputFormEdit styleDivAround="" styleFieldset="" styleLegend="" title="Address">
                    <input {...register('address.formattedAddress')} type="text" className="w-full h-[50px] outline-none text-[25px]" />
                  </InputFormEdit>
                </div>

                <div className={`grid-in-capacity ${styleInput}`}>
                  <InputFormEdit styleDivAround="" styleFieldset="" styleLegend="" title="Capacity">
                    <input type="number" {...register('Capacity')} className="w-full h-[50px] outline-none text-[25px]" />
                  </InputFormEdit>
                </div>

                <div className={`grid-in-baths ${styleInput}`}>
                  <InputFormEdit styleDivAround="" styleFieldset="" styleLegend="" title="Baths">
                    <input type="number" {...register('NumsOfBath')} className="w-full h-[50px] outline-none text-[25px]" />
                  </InputFormEdit>
                </div>

                <div className={`grid-in-beds ${styleInput}`}>
                  <InputFormEdit styleDivAround="" styleFieldset="" styleLegend="" title="Beds">
                    <input type="number" {...register('NumsOfBed')} className="w-full h-[50px] outline-none text-[25px]" />
                  </InputFormEdit>
                </div>

                {/* huong dong tay nam bac */}
                <div className={`grid-in-orientation ${styleInput}`}>
                  <InputFormEdit styleDivAround="" styleFieldset="" styleLegend="" title="Orientation">
                    {/* <input type="text" className="w-full h-[50px] outline-none text-[25px]" /> */}
                    <select {...register('Orientation')} className="select w-full outline-none text-[25px]">
                      <option disabled selected>West</option>
                      {compass.map((item: string, index: number) => {
                        return (
                          <option key={index}>
                            {item}
                          </option>
                        )
                      })}
                    </select>
                  </InputFormEdit>
                </div>

                {/* chua lam phan nay */}
                <div className={`grid-in-price ${styleInput}`}>
                  <InputFormEdit styleDivAround="" styleFieldset="" styleLegend="" title="Price">
                    {/* <input type="number" {...register('Price')} className="w-full h-[50px] outline-none text-[25px]" /> */}
                    <div className="w-full h-[50px] flex mr-0">
                      <Slider
                        // range
                        allowCross={false}
                        draggableTrack
                        defaultValue={tempHouse?.Price}
                        onChange={handleOnChange}
                        value={tempHouse?.Price}
                        className="m-auto "
                        min={10}
                        max={5000}
                        trackStyle={{ backgroundColor: 'black', height: 2 }}
                        railStyle={{ height: 2 }}
                        handleStyle={{
                          backgroundColor: '#FFFFFF',
                          opacity: 1,
                          border: '1px solid grey',
                          width: 30,
                          height: 30,
                          marginTop: -13
                        }}
                      />
                      <div className="w-[150px] h-full flex ml-5">
                        <input type="number" {...register('Price')} className="w-[120px] h-full m-auto
                        outline-none "
                          value={tempHouse?.Price}
                          onChange={(event) => {
                            if (!tempHouse) return
                            const temp: number = parseFloat(event.target.value);
                            setTempHouse({ ...tempHouse, Price: temp });
                          }}
                        />
                      </div>
                    </div>
                  </InputFormEdit>
                </div>

                <div className={`grid-in-title ${styleInput}`}>
                  <InputFormEdit styleDivAround="" styleFieldset="" styleLegend="" title="Title">
                    <input type="text" {...register('Title')} className="w-full h-[50px] outline-none text-[25px]" />
                  </InputFormEdit>
                </div>

                <div className={`grid-in-des ${styleInput}`}>
                  <InputFormEdit styleDivAround="" styleFieldset="" styleLegend="" title="Description">
                    <textarea {...register('Des')} className="w-full h-fit  outline-none text-[25px]" />
                  </InputFormEdit>
                </div>

                {/* chua lam phan nay */}
                <div className={`grid-in-placeoffer ${styleInput}`}>
                  <InputFormEdit styleDivAround="" styleFieldset="" styleLegend="" title="PlaceOffer">
                    {/* <input type="text" className="w-full h-[50px] outline-none text-[25px]" /> */}
                    <div className="w-full h-fit mb-5 border-b-2 border-slate-500 py-10">
                      <div className="w-full h-fit flex flex-col ">
                        <span className="font-bold text-[25px] mb-5">Amenities</span>
                        <Amenities typeAmenities="essentials" />
                        <motion.div
                          className="overflow-hidden "
                          variants={variantsAmenities}
                          animate={show ? { height: 'fit-content', opacity: 1 } : { height: 0, opacity: 0 }}
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
                          {/* <span className="">
                            {!show &&
                              (filterForm.amenities.features.length != 0 ||
                                filterForm.amenities.location.length != 0 ||
                                filterForm.amenities.safety.length != 0)
                              ? ` you have filled in ${filterForm.amenities.features.length +
                              filterForm.amenities.location.length +
                              filterForm.amenities.safety.length
                              } options`
                              : ''}
                          </span> */}
                        </div>
                      </div>
                    </div>
                  </InputFormEdit>
                </div>

                {/* chua lam phan nay */}
                <div className={`grid-in-img ${styleInput}`}>
                  <InputFormEdit styleDivAround="" styleFieldset="" styleLegend="" title="locale">
                    {/* <input type="text" className="w-full h-[50px] outline-none text-[25px]" /> */}
                  </InputFormEdit>
                </div>


              </div>
              {/* <fieldset className="border-2 h-fit rounded-xl pb-2 px-4">
                <legend className="font-semibold text-[22px] ml-5">Locale</legend>
                <div className="w-full h-fit relative before:bottom-0 before:h-[2px] before:absolute
                    before:bg-slate-500 before:w-full before:transition-all before:duration-200">
                  <input type="text" name="" id="" className="w-full h-[50px] outline-none text-[25px]" />
                </div>
              </fieldset> */}


            </div>


            <div className="w-full h-[80px]"></div>

          </div>
        </form>
      </div>

    </>
  )
}
export default EditForm;
import EditAmenities from "@/components/main/showHouse/componentShowHouse/amenities/editAmenities";
import InputFormEdit from "@/components/main/showHouse/componentShowHouse/inputForm/inputFormEdit";
import createHouseForm, { createHouseFormContext } from "@/contexts/createHouseForm";
import { getHouseContext } from "@/contexts/getHouse";
import { houseTempContext } from "@/contexts/houseTemp";
import { house_ } from "@/models/house";
import { motion } from "framer-motion";
import Slider from "rc-slider";
import { useContext, useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { GrClose } from "react-icons/gr";
import MapCreateHouse from "./mapCreateHouse";

interface HousePropertiesProps {
  keyMapBing: string;
  api_url_path: string | undefined;
}

const HouseProperties = ({ keyMapBing, api_url_path }: HousePropertiesProps) => {
  const { createHouseForm, emptyCreateHouseForm, setCreateHouseForm } = useContext(createHouseFormContext);
  const { houseTemp, setHouseTemp } = useContext(houseTempContext)
  const styleInput = 'box-border p-3';
  const compass: string[] = ['West', 'South', 'East', 'North']
  const tempPrice = createHouseForm?.Price;
  const [tempHouse, setTempHouse] = useState<house_ | undefined>(createHouseForm)
  const [imgArr, setImgArr] = useState<any>([]);
  const { setReRenderFilter, reRenderFilter } = useContext(getHouseContext);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    setError,
    formState: { errors }
  } = useForm<house_>({
    defaultValues: tempHouse,
  });

  useEffect(() => {
    reset(createHouseForm);
    setTempHouse(createHouseForm);
  }, [createHouseForm]);

  const onSubmit: SubmitHandler<house_> = async (data) => {


    // if (tempHouse) {
    //   console.log('data', data);
    //   const data0: house_ = {
    //     ...data, placeOffer: tempHouse?.placeOffer,
    //     Price: tempHouse.Price,
    //     address: tempHouse.address,
    //     arrImg: tempHouse.arrImg
    //   }
    //   console.log('data0', data0);
    //   const editStatus = await houseApi.editHouse(data0);
    //   // setReRenderFilter(reRenderFilter + 1);
    //   setHouseTemp([...houseTemp.map((item, index) => {
    //     if (item.AddressId === data0.AddressId) {
    //       return data0;
    //     }
    //     return item;
    //   })]);
    //   setIsEdit(false);
  }

  const handleOnChange = async (value: any) => {
    const temp: house_ | undefined = createHouseForm;
    if (temp) {
      setTempHouse({ ...temp, Price: value });
    }
  }





  return (
    <>
      {/* <ShowAllHouse/> */}
      <div className='w-full h-fit bg-white m-auto rounded-3xl
        overflow-hidden flex flex-col '>
        <form className='w-full h-full relative '
          onSubmit={handleSubmit(onSubmit)}
        >

          <div className="w-full h-fit">
            <div className="w-full h-[2.4rem]"></div>

            <div className="w-full h-fit
              box-border p-7
              mobile:p-0
              ">

              {/* form  */}
              <div className="w-full h-fit grid text-[2rem]
              desktop:grid-areas-layoutCreateHouseDesktopLaptop
              laptop:grid-areas-layoutEditDesktopLaptop
              tablet:grid-areas-layoutEditTabletMobile
              mobile:grid-areas-layoutEditMobile

              desktop:grid-cols-3 laptop:grid-cols-3
              tablet:grid-cols-2 mobile:grid-cols-1
              ">

                <div className={`grid-in-capacity ${styleInput}`}>
                  <InputFormEdit styleDivAround="" styleFieldset="" styleLegend="" title="Capacity">
                    <input type="number" {...register('Capacity')} className="w-full h-[3rem] outline-none text-[2rem]" />
                  </InputFormEdit>
                </div>

                <div className={`grid-in-baths ${styleInput}`}>
                  <InputFormEdit styleDivAround="" styleFieldset="" styleLegend="" title="Baths">
                    <input type="number" {...register('NumsOfBath')} className="w-full h-[3rem] outline-none text-[2rem]" />
                  </InputFormEdit>
                </div>

                <div className={`grid-in-beds ${styleInput}`}>
                  <InputFormEdit styleDivAround="" styleFieldset="" styleLegend="" title="Beds">
                    <input type="number" {...register('NumsOfBed')} className="w-full h-[3rem] outline-none text-[2rem]" />
                  </InputFormEdit>
                </div>

                {/* huong dong tay nam bac */}
                <div className={`grid-in-orientation ${styleInput}`}>
                  <InputFormEdit styleDivAround="" styleFieldset="" styleLegend="" title="Orientation">
                    {/* <input type="text" className="w-full h-[3rem] outline-none text-[2rem]" /> */}
                    <select {...register('Orientation')} className="select px-0 w-full outline-none text-[2rem]">
                      {compass.map((item: string, index: number) => {
                        if (index == 0) {
                          return (
                            <option key={index} selected>
                              {item}
                            </option>
                          )
                        }
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
                  <InputFormEdit styleDivAround=" before:hidden" styleFieldset="" styleLegend="" title="Price">
                    {/* <input type="number" {...register('Price')} className="w-full h-[3rem] outline-none text-[2rem]" /> */}
                    <div className="w-full h-[3rem] flex mr-0">
                      <Slider
                        // range
                        allowCross={false}
                        draggableTrack
                        defaultValue={tempHouse?.Price}
                        onChange={handleOnChange}
                        value={tempHouse?.Price}
                        className="m-auto "
                        min={10}
                        max={7000}
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
                      <div className="w-[9.375rem] h-full flex ml-5">
                        <input type="number" {...register('Price')} className="w-[7.5rem] h-full m-auto
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
                    <input type="text" {...register('Title')} className="w-full h-[3rem] outline-none text-[2rem]"
                      placeholder="Enter your house title..."
                    />
                  </InputFormEdit>
                </div>

                <div className={`grid-in-des ${styleInput}`}>
                  <InputFormEdit styleDivAround="" styleFieldset="" styleLegend="" title="Description">
                    <textarea {...register('Description')}
                      placeholder="Enter the description..."
                      className="w-full h-fit  outline-none text-[2rem]" />
                  </InputFormEdit>
                </div>

                {/* chua lam phan nay */}
                <div className={`grid-in-placeoffer ${styleInput}`}>
                  <InputFormEdit styleDivAround="" styleFieldset="" styleLegend="" title="Amenities">
                    {/* <input type="text" className="w-full h-[3rem] outline-none text-[2rem]" /> */}
                    <div className="w-full h-full mb-5 border-b-2 border-slate-500 py-10">
                      <div className="w-full h-fit flex flex-col ">
                        <EditAmenities setTempHouse={setTempHouse} tempHouse={tempHouse} />
                      </div>
                    </div>
                  </InputFormEdit>
                </div>
              </div>
            </div>
            <div className="w-full h-[5rem]"></div>

          </div>


          <div className="w-full h-[5rem] bottom-0 left-0 border-t-2 flex items-center flex-2 py-3">
            <button type="button" className="flex-1 flex justify-start"
              onClick={(event) => {


              }}
            >
              <div className="m-auto underline cursor-pointer" >
                Clear all
              </div>
            </button>
            <div className="flex-1 flex justify-center">
              <motion.button
                type="submit"
                className="w-[12.5rem] h-[2.4rem] rounded-lg border-2"
                whileHover={{ backgroundColor: 'rgba(255, 56, 92, 0.8)', color: 'white' }}
                whileTap={{ scale: 0.9 }}
              >
                Submit
              </motion.button>
            </div>
          </div>
        </form>
      </div>

    </>
  );
}
export default HouseProperties;
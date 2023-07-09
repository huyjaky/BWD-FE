import EditAmenities from "@/components/main/showHouse/componentShowHouse/amenities/editAmenities";
import InputFormEdit from "@/components/main/showHouse/componentShowHouse/inputForm/inputFormEdit";
import { createHouseFormContext } from "@/contexts/createHouseForm";
import { house_ } from "@/models/house";
import { motion } from "framer-motion";
import Slider from "rc-slider";
import { useContext, useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import PropertyCreateHouse from "./propertyCreateHouse";

interface HousePropertiesProps {
  keyMapBing: string;
  api_url_path: string | undefined;
}

const HouseProperties = ({ keyMapBing, api_url_path }: HousePropertiesProps) => {
  const { createHouseForm, emptyCreateHouseForm, setCreateHouseForm } = useContext(createHouseFormContext);
  const [typeHouseId, setTypeHouseId] = useState<string[]>([]);
  const styleInput = 'box-border p-3';
  const compass: string[] = ['West', 'South', 'East', 'North']
  const [tempHouse, setTempHouse] = useState<house_ | undefined>(createHouseForm)

  useEffect(() => {
    setTempHouse(createHouseForm);
  }, [createHouseForm]);

  useEffect(()=>{
    console.log(createHouseForm);
  },[createHouseForm])

  const onSubmit: SubmitHandler<house_> = async (data) => {

    // console.log('data', data);
    // console.log('temphouse', tempHouse);
    // console.log('typehouseid', typeHouseId);

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
        <div className='w-full h-full relative '>

          <div className="w-full h-fit">
            <div className="w-full h-[2.4rem]"></div>

            <div className="w-full h-fit
              box-border p-7
              mobile:p-0
              ">

              {/* form  */}
              <div className="w-full h-fit grid text-[2rem]
              desktop:grid-areas-layoutCreateHouseDesktopLaptop
              laptop:grid-areas-layoutCreateHouseDesktopLaptop
              tablet:grid-areas-layoutCreateHouseTabletMobile
              mobile:grid-areas-layoutCreateHouseTabletMobile

              desktop:grid-cols-3 laptop:grid-cols-3
              tablet:grid-cols-3 mobile:grid-cols-3
              ">

                <div className={`grid-in-capacity ${styleInput}`}>
                  <InputFormEdit styleDivAround="" styleFieldset="" styleLegend="" title="Capacity">
                    <input type="number"  className="w-full h-[3rem] outline-none text-[2rem]" />
                  </InputFormEdit>
                </div>

                <div className={`grid-in-baths ${styleInput}`}>
                  <InputFormEdit styleDivAround="" styleFieldset="" styleLegend="" title="Baths">
                    <input type="number"  className="w-full h-[3rem] outline-none text-[2rem]" />
                  </InputFormEdit>
                </div>

                <div className={`grid-in-beds ${styleInput}`}>
                  <InputFormEdit styleDivAround="" styleFieldset="" styleLegend="" title="Beds">
                    <input type="number"  className="w-full h-[3rem] outline-none text-[2rem]" />
                  </InputFormEdit>
                </div>

                {/* huong dong tay nam bac */}
                <div className={`grid-in-orientation ${styleInput}`}>
                  <InputFormEdit styleDivAround="" styleFieldset="" styleLegend="" title="Orientation">
                    {/* <input type="text" className="w-full h-[3rem] outline-none text-[2rem]" /> */}
                    <select  className="select px-0 w-full outline-none text-[2rem]">
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
                        <input type="number" className="w-[7.5rem] h-full m-auto
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
                    <input type="text"  className="w-full h-[3rem] outline-none text-[2rem]"
                      placeholder="Enter your house title..."
                    />
                  </InputFormEdit>
                </div>

                <div className={`grid-in-des ${styleInput}`}>
                  <InputFormEdit styleDivAround="" styleFieldset="" styleLegend="" title="Description">
                    <textarea
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

                <div className={`grid-in-typehouse ${styleInput}`}>
                  <InputFormEdit styleDivAround="" styleFieldset="" styleLegend="" title="Type">
                    {/* <input type="text" className="w-full h-[3rem] outline-none text-[2rem]" /> */}
                    <div className="w-full h-full mb-5 border-b-2 border-slate-500 py-10">
                      <div className="w-full h-fit flex flex-col ">
                        <PropertyCreateHouse setTypeHouseId={setTypeHouseId} typeHouseId={typeHouseId} />
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

          </div>
        </div>
      </div>

    </>
  );
}
export default HouseProperties;
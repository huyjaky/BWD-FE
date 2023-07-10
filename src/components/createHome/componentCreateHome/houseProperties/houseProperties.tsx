import EditAmenities from "@/components/main/showHouse/componentShowHouse/amenities/editAmenities";
import InputFormEdit from "@/components/main/showHouse/componentShowHouse/inputForm/inputFormEdit";
import { createHouseFormContext } from "@/contexts/createHouseForm";
import { house_ } from "@/models/house";
import Slider from "rc-slider";
import { useContext, useEffect, useState } from "react";
import PropertyCreateHouse from "./propertyCreateHouse";

interface HousePropertiesProps {
  // keyMapBing: string;
  // api_url_path: string | undefined;
}

const HouseProperties = ({ }: HousePropertiesProps) => {
  const { createHouseForm, emptyCreateHouseForm, setCreateHouseForm,
    typeHouseId, setTypeHouseId
  } = useContext(createHouseFormContext);
  // const [typeHouseId, setTypeHouseId] = useState<string[]>([]);

  const styleInput = 'box-border p-3';
  const compass: string[] = ['West', 'South', 'East', 'North']
  const [tempHouse, setTempHouse] = useState<house_ | undefined>(createHouseForm)

  useEffect(() => {
    setTempHouse(createHouseForm);
    console.log(createHouseForm);
  }, [createHouseForm]);

  const handleOnChange = async (value: any) => {
    if (createHouseForm) {
      setCreateHouseForm({ ...createHouseForm, Price: value });
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
                    <input type="number"
                      value={createHouseForm?.Capacity}
                      onChange={event => {
                        if (createHouseForm) {
                          setCreateHouseForm({ ...createHouseForm, Capacity: parseInt(event.target.value) })
                        }
                      }
                      }
                      className="w-full h-[3rem] outline-none text-[2rem]" />
                  </InputFormEdit>
                </div>

                <div className={`grid-in-baths ${styleInput}`}>
                  <InputFormEdit styleDivAround="" styleFieldset="" styleLegend="" title="Baths">
                    <input
                      value={createHouseForm?.NumsOfBath}
                      onChange={event => {
                        if (createHouseForm) {
                          setCreateHouseForm({ ...createHouseForm, NumsOfBath: parseInt(event.target.value) })
                        }
                      }}
                      type="number" className="w-full h-[3rem] outline-none text-[2rem]" />
                  </InputFormEdit>
                </div>

                <div className={`grid-in-beds ${styleInput}`}>
                  <InputFormEdit styleDivAround="" styleFieldset="" styleLegend="" title="Beds">
                    <input
                      value={createHouseForm?.NumsOfBed}
                      onChange={event => {
                        if (createHouseForm) {
                          setCreateHouseForm({ ...createHouseForm, NumsOfBed: parseInt(event.target.value) })
                        }
                      }}
                      type="number" className="w-full h-[3rem] outline-none text-[2rem]" />
                  </InputFormEdit>
                </div>

                {/* huong dong tay nam bac */}
                <div className={`grid-in-orientation ${styleInput}`}>
                  <InputFormEdit styleDivAround="" styleFieldset="" styleLegend="" title="Orientation">
                    {/* <input type="text" className="w-full h-[3rem] outline-none text-[2rem]" /> */}
                    <select
                      onChange={event => {
                        if (createHouseForm) {
                          setCreateHouseForm({ ...createHouseForm, Orientation: event.target.value })
                        }
                      }}
                      value={createHouseForm?.Orientation}
                      className="select px-0 w-full outline-none text-[2rem]">
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
                        defaultValue={createHouseForm?.Price}
                        onChange={handleOnChange}
                        value={createHouseForm?.Price}
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
                          value={createHouseForm?.Price}
                          onChange={(event) => {
                            if (!createHouseForm) return
                            const temp: number = parseFloat(event.target.value);
                            setCreateHouseForm({ ...createHouseForm, Price: temp });
                          }}
                        />
                      </div>
                    </div>
                  </InputFormEdit>
                </div>

                <div className={`grid-in-title ${styleInput}`}>
                  <InputFormEdit styleDivAround="" styleFieldset="" styleLegend="" title="Title">
                    <input type="text" className="w-full h-[3rem] outline-none text-[2rem]"
                      value={createHouseForm?.Title}
                      onChange={event => {
                        if (createHouseForm) {
                          setCreateHouseForm({ ...createHouseForm, Title: event.target.value })
                        }
                      }}
                      placeholder="Enter your house title..."
                    />
                  </InputFormEdit>
                </div>

                <div className={`grid-in-des ${styleInput}`}>
                  <InputFormEdit styleDivAround="" styleFieldset="" styleLegend="" title="Description">
                    <textarea
                      value={createHouseForm?.Description}
                      onChange={event => {
                        if (createHouseForm) {
                          setCreateHouseForm({ ...createHouseForm, Description: event.target.value })
                        }
                      }}
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
                        <EditAmenities setTempHouse={setCreateHouseForm} tempHouse={createHouseForm} />
                      </div>
                    </div>
                  </InputFormEdit>
                </div>

                <div className={`grid-in-typehouse ${styleInput}`}>
                  <InputFormEdit styleDivAround="" styleFieldset="" styleLegend="" title="Type">
                    {/* <input type="text" className="w-full h-[3rem] outline-none text-[2rem]" /> */}
                    <div className="w-full h-full mb-5 border-b-2 border-slate-500 py-10">
                      <div className="w-full h-fit flex flex-col ">
                        <PropertyCreateHouse
                          setTypeHouseId={setTypeHouseId}
                          typeHouseId={typeHouseId}
                        />
                      </div>
                    </div>
                  </InputFormEdit>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </>
  );
}
export default HouseProperties;
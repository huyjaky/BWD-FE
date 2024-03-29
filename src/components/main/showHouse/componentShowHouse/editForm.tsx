import axiosClient from "@/api-client/axiosClient";
import { houseApi } from "@/api-client/houseApi";
import { getHouseContext, isFilter_ } from "@/contexts/getHouse";
import { houseTempContext } from "@/contexts/houseTemp";
import { selectHouseContext } from "@/contexts/selectHouse";
import { house_ } from "@/models/house";
import { FilePondErrorDescription, FilePondFile } from 'filepond';
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';
import 'filepond/dist/filepond.min.css';
import { motion } from "framer-motion";
import Slider from "rc-slider";
import { Dispatch, SetStateAction, useContext, useEffect, useRef, useState } from "react";
import { FilePond, registerPlugin } from 'react-filepond';
import { SubmitHandler, useForm } from "react-hook-form";
import { GrClose } from "react-icons/gr";
import EditAmenities from "./amenities/editAmenities";
import InputFormEdit from "./inputForm/inputFormEdit";
import MapEdit from "./inputForm/map";
import RemoveImg from "./removeImg/removeImg";
import { compassUtils } from "@/utils/compass";
import nProgress from "nprogress";

interface EditFormProps {
  keyMapBing: string;
  api_url_path: string | undefined;
  setIsEdit: Dispatch<SetStateAction<boolean>>;
  infShow:isFilter_['isFilter_']
}

registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);

const EditForm = ({ keyMapBing, api_url_path, setIsEdit, infShow }: EditFormProps) => {
  const { selectHouse } = useContext(selectHouseContext);
  const { houseTemp, setHouseTemp } = useContext(houseTempContext)
  const styleInput = 'box-border p-3';
  const compass: string[] = compassUtils;
  const tempPrice = selectHouse?.Price;
  const [tempHouse, setTempHouse] = useState<house_ | undefined>(selectHouse)
  const [imgArr, setImgArr] = useState<any>([]);
  const filePondRef = useRef<FilePond>(null);
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
    reset(selectHouse);
    setTempHouse(selectHouse);
  }, [selectHouse]);

  const onSubmit: SubmitHandler<house_> = async (data) => {

    console.log('temp', tempHouse?.arrImg);
    nProgress.set(.6);
    if (filePondRef.current) {
      await filePondRef.current.processFiles();
    }
    if (tempHouse) {
      console.log('data', data);
      const data0: house_ = {
        ...data, placeOffer: tempHouse?.placeOffer,
        Price: tempHouse.Price,
        address: tempHouse.address,
        arrImg: tempHouse.arrImg
      }
      console.log('data0', data0);
      const editStatus = await houseApi.editHouse(data0);
      // setReRenderFilter(reRenderFilter + 1);
      setHouseTemp([...houseTemp.map((item, index) => {
        if (item.AddressId === data0.AddressId) {
          return data0;
        }
        return item;
      })]);
      nProgress.done();
      setIsEdit(false);
    }
  }


  const handleOnChange = async (value: any) => {
    const temp: house_ | undefined = selectHouse;
    if (temp) {
      setTempHouse({ ...temp, Price: value });
    }
  }


  return (
    <>
      {/* <ShowAllHouse/> */}
      <div className='w-[800px] h-[calc(100vh-3rem)] bg-white m-auto rounded-3xl
        overflow-hidden flex flex-col
        mobile:mt-0 mobile:rounded-none
        mobile:w-screen mobile:h-screen
        tablet:h-[calc(100vh-5.625rem)] tablet:mt-[.6rem] '>
        <form className='w-full h-full relative '
          onSubmit={handleSubmit(onSubmit)}
        >
          <motion.button
            className="absolute w-[4.5rem] h-[4.5rem] flex desktop:hidden laptop:hidden z-20"
            onClick={(event) => {
              if (setIsEdit) {
                setIsEdit(false)
              }
            }}
          >
            <div className="w-fit h-full m-auto">
              <GrClose className="text-[2rem]" />
            </div>
          </motion.button>

          <div className='w-full absolute h-[2.4rem]  border-b-2  flex'>
            <span className='text-[2rem] m-auto'>Edit</span>

          </div>
          <div className="w-full h-[5rem] absolute bottom-0 left-0 border-t-2 flex items-center flex-2 py-3">

            <button type="button" className="flex-1 flex justify-start"
              onClick={(event) => {

                if (selectHouse) {
                  setTempHouse({ ...selectHouse, placeOffer: watch().placeOffer })
                }

                reset(selectHouse);
                setImgArr([]);
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
          <div className="w-full h-full">
            <div className="w-full h-[2.4rem]"></div>

            <div className="w-full h-[calc(100%-7.5rem)]
              overflow-scroll overflow-x-hidden box-border p-7
              mobile:p-0
              ">

              {/* form  */}
              <div className="w-full h-fit grid text-[2rem] desktop:grid-areas-layoutEditDesktopLaptop
              laptop:grid-areas-layoutEditDesktopLaptop
              tablet:grid-areas-layoutEditTabletMobile
              mobile:grid-areas-layoutEditMobile

              desktop:grid-cols-3 laptop:grid-cols-3
              tablet:grid-cols-2 mobile:grid-cols-1
              ">

                <div className={`grid-in-locale ${styleInput}`}>
                  <InputFormEdit styleDivAround="" styleFieldset="" styleLegend="" title="Address">
                    <MapEdit
                      id={infShow==='houseForRent' ? 'rent' : 'sale'}
                      value={tempHouse?.address.formattedAddress || ''}
                      keyMapBing={keyMapBing} tempHouse={tempHouse} setTempHouse={setTempHouse} />
                  </InputFormEdit>
                </div>

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
                        max={tempPrice ? tempPrice * 2 : 5000}
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
                    <input type="text" {...register('Title')} className="w-full h-[3rem] outline-none text-[2rem]" />
                  </InputFormEdit>
                </div>

                <div className={`grid-in-des ${styleInput}`}>
                  <InputFormEdit styleDivAround="" styleFieldset="" styleLegend="" title="Description">
                    <textarea {...register('Description')} className="w-full h-fit  outline-none text-[2rem]" />
                  </InputFormEdit>
                </div>

                {/* chua lam phan nay */}
                <div className={`grid-in-placeoffer ${styleInput}`}>
                  <InputFormEdit styleDivAround="" styleFieldset="" styleLegend="" title="Amenities">
                    {/* <input type="text" className="w-full h-[3rem] outline-none text-[2rem]" /> */}
                    <div className="w-full h-fit mb-5 border-b-2 border-slate-500 py-10">
                      <div className="w-full h-fit flex flex-col ">
                        <EditAmenities setTempHouse={setTempHouse} tempHouse={tempHouse} />
                      </div>
                    </div>
                  </InputFormEdit>
                </div>

                {/* chua lam phan nay */}
                <div className={`grid-in-img ${styleInput}`}>
                  <InputFormEdit styleDivAround=" before:hidden" styleFieldset="" styleLegend="" title="Images">
                    {/* <input type="text" className="w-full h-[3rem] outline-none text-[2rem]" /> */}

                    <RemoveImg arrImg={tempHouse ? tempHouse.arrImg : []} tempHouse={tempHouse}
                      setTempHouse={setTempHouse}
                    />

                    {api_url_path !== undefined &&
                      <div className="mb-4">
                        <FilePond
                          ref={filePondRef}
                          files={imgArr}
                          allowMultiple={true}
                          instantUpload={false}
                          onaddfile={(error: FilePondErrorDescription | null, file: FilePondFile) => {
                            if (error) return;
                            let temp = imgArr;
                            temp.push(file);
                            setImgArr(temp);
                          }}
                          beforeAddFile={async (file: FilePondFile) => {
                            if (imgArr.length > 0) {
                              const isExist = await imgArr.some(
                                (items: any) => items.filename === file.filename
                              );
                              console.log(isExist);
                              return !isExist;
                            }
                            return true;
                          }}
                          onprocessfilerevert={async (file: FilePondFile) => {
                            try {
                              const temp = await axiosClient.post(`/delete/img`, {
                                nameImg: file.filename
                              });
                              if (temp.status == 200) {
                                console.log(temp.data);
                              }
                            } catch (error) {
                              console.log(error);
                              return;
                            }
                          }}
                          maxFiles={30}
                          maxParallelUploads={30}
                          // server={`${api_url_path}/api/post/img`}
                          server={{
                            url: api_url_path + '/api',
                            process: {
                              url: '/get/house/modifier',
                              method: 'POST',
                              timeout: 120000,
                              withCredentials:true
                            }
                          }}
                          name="files" /* sets the file input name, it's filepond by default */
                          labelIdle='Drag and drop files <span class="filepond--label-action">Browse</span>'
                          acceptedFileTypes={[
                            'image/jpeg',
                            'image/jpg',
                            'image/png',
                            'image/gif',
                            'image/bmp',
                            'image/svg+xml',
                            'image/webp',
                            'image/tiff',
                            'image/x-icon',
                            'application/pdf'
                          ]}
                        />

                      </div>
                    }
                  </InputFormEdit>
                </div>


              </div>



            </div>


            <div className="w-full h-[5rem]"></div>

          </div>
        </form>
      </div>

    </>
  )
}
export default EditForm;
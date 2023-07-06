import { selectHouseContext } from "@/contexts/selectHouse";
import { house_ } from "@/models/house";
import { motion } from "framer-motion";
import { useContext, useEffect, useRef, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import MapEach from "../mapEach";
import InputFormEdit from "./inputForm/inputFormEdit";
import Slider from "rc-slider";
import { number } from "yup";
import Amenities from "../../filter/formFilter/filterFormComponent/amenities/amenities";
import { variantsAmenities } from "../../filter/formFilter/formFilter";
import { whenLoaded } from "bing-maps-loader";
import MapEdit from "./inputForm/map";
import { FilePond, FilePondProps, registerPlugin } from 'react-filepond';
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';
import { FilePondErrorDescription, FilePondFile } from 'filepond';
import 'filepond/dist/filepond.min.css';
import axiosClient from "@/api-client/axiosClient";

interface EditFormProps {
  keyMapBing: string;
  api_url_path: string | undefined
}

registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);

const EditForm = ({ keyMapBing, api_url_path }: EditFormProps) => {
  const { selectHouse, setSelectHouse, } = useContext(selectHouseContext);
  const styleInput = 'box-border p-3';
  const compass: string[] = ['West', 'South', 'East', 'North']
  const [tempHouse, setTempHouse] = useState<house_ | undefined>(selectHouse)
  const [imgArr, setImgArr] = useState<any>([]);
  const [show, setShow] = useState(false);
  const [reRender, setReRender] = useState<boolean>(false);
  const filePondRef = useRef<FilePond>(null);
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
    if (filePondRef.current) {
      filePondRef.current.processFiles();
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

              {/* form  */}
              <div className="w-full h-fit grid text-[25px] desktop:grid-areas-layoutEditDesktopLaptop
              laptop:grid-areas-layoutEditDesktopLaptop
              tablet:grid-areas-layoutEditTabletMobile
              mobile:grid-areas-layoutEditMobile

              desktop:grid-cols-3 laptop:grid-cols-3
              tablet:grid-cols-2 mobile:grid-cols-1
              ">

                <div className={`grid-in-locale ${styleInput}`}>
                  <InputFormEdit styleDivAround="" styleFieldset="" styleLegend="" title="Address">
                    <MapEdit
                      value={tempHouse?.address.formattedAddress || ''}
                      keyMapBing={keyMapBing} tempHouse={tempHouse} setTempHouse={setTempHouse} />
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
                    <select {...register('Orientation')} className="select px-0 w-full outline-none text-[25px]">
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
                        </div>
                      </div>
                    </div>
                  </InputFormEdit>
                </div>

                {/* chua lam phan nay */}
                <div className={`grid-in-img ${styleInput}`}>
                  <InputFormEdit styleDivAround=" before:hidden" styleFieldset="" styleLegend="" title="Images">
                    {/* <input type="text" className="w-full h-[50px] outline-none text-[25px]" /> */}

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
                              url: '/post/img',
                              method: 'POST',
                              timeout: 120000
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


            <div className="w-full h-[80px]"></div>

          </div>
        </form>
      </div>

    </>
  )
}
export default EditForm;
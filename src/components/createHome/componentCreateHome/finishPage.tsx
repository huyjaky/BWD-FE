import { createHouseFormContext } from "@/contexts/createHouseForm";
import { StepCreateHomeContext } from "@/contexts/stepCreate";
import { motion } from "framer-motion";
import { useContext, useEffect, useRef, useState } from "react";

import axiosClient from "@/api-client/axiosClient";
import { FilePondErrorDescription, FilePondFile } from 'filepond';
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';
import 'filepond/dist/filepond.min.css';
import { FilePond, registerPlugin } from 'react-filepond';
import axios from "axios";
import ImgCreateHouse from "./imgCreateHouse";
import { house_ } from "@/models/house";
import { useSession } from "next-auth/react";
import { houseApi } from "@/api-client/houseApi";
import nProgress from "nprogress";

registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);
interface FinishPageProps {
  api_url_path: string
}

const FinishPage = ({ api_url_path }: FinishPageProps) => {
  const [key, setKey] = useState(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { createHouseForm, imgArr, typeHouseId, Address
    , setCreateHouseForm, setImgArr, setTypeHouseId, setAddress, emptyCreateHouseForm
  } = useContext(createHouseFormContext)
  const { stepCreate, setStepCreate } = useContext(StepCreateHomeContext)
  const filePondRef = useRef<FilePond>(null);
  const [isClick, setIsClick] = useState<number>(0);
  const { data: session, status } = useSession();
  useEffect(() => {
    setKey((prevKey) => prevKey + 1);
  }, [stepCreate]);




  const handleOnClick = async (event: any) => {
    if (isClick === 1) return
    await setIsClick(1);

    nProgress.set(0.6);
    setIsLoading(true);
    if (filePondRef.current) {
      await filePondRef.current.processFiles();
    }
    try {
      if (createHouseForm) {
        const data0: house_ = { ...createHouseForm, address: Address, useracc: session?.userAcc }

        if (data0 === emptyCreateHouseForm) {
          setIsClick(0);
          nProgress.done();
          return
        }

        await houseApi.createHouse(data0, typeHouseId);
      }
      setCreateHouseForm(emptyCreateHouseForm)
    } catch (error) {
      console.log(error);
      return
    }
    if (emptyCreateHouseForm) {
      setImgArr([]);
      setTypeHouseId([]);
      setAddress({ ...emptyCreateHouseForm.address });
      setStepCreate(1);
      setIsLoading(false);
    }
    setIsClick(0);
    nProgress.done();
  }

  return (
    <>
      <motion.div
        animate={isLoading ? { opacity: [0, 1], display: 'flex' } : { opacity: [1, 0], display: 'none' }}
        className={`fixed bg-mask top-0 left-0 w-screen z-50 hidden
      h-screen`}></motion.div>

      <div className="hidden">
        <FilePond
          ref={filePondRef}
          files={imgArr}
          allowMultiple={true}
          instantUpload={false}
          maxFiles={30}
          maxParallelUploads={30}
          // server={`${api_url_path}/api/post/img`}
          server={{
            url: api_url_path + '/api',
            process: {
              url: '/create/house/img',
              method: 'POST',
              timeout: 120000,
              withCredentials: true
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

      <div className="w-full h-full grid grid-cols-2 ">
        <div className="w-full h-full overflow-hidden flex">
          <video key={key} className="w-[calc(100%-15rem)] h-full m-auto" preload="auto" autoPlay={true} muted={true}>
            <source src="./Step3.mp4" className="w-full h-full" />
          </video>
        </div>
        <div className="w-full h-full flex">
          <motion.button onClick={handleOnClick} className="w-[30rem] h-[3rem] border-2 border-slate-600 m-auto">
            Done
          </motion.button>
        </div>
      </div>
    </>
  )
}

export default FinishPage;
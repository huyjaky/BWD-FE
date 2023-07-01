import React, { useContext, useState } from 'react';
import { motion } from 'framer-motion';
// Import React FilePond
import { FilePond, FilePondProps, registerPlugin } from 'react-filepond';

// Import FilePond styles
import 'filepond/dist/filepond.min.css';

// Import the Image EXIF Orientation and Image Preview plugins
// Note: These need to be installed separately
// `npm i filepond-plugin-image-preview filepond-plugin-image-exif-orientation --save`
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';
import { FilePondErrorDescription, FilePondFile } from 'filepond';
import { imgFileContext } from '@/contexts/imgFile';
import { isExists } from 'date-fns';
import { url } from 'inspector';
import axiosClient from '@/api-client/axiosClient';

registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);
interface Step11CHomeProps {
  api_url_path: string;
}

export default function Step11CHome({ api_url_path }: Step11CHomeProps) {
  const { imgArr, setImgArr } = useContext(imgFileContext);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
      className="w-[98vw] px-[80px]
                        mobile:px-0
        "
    >
      <div
        className="w-[65%] ml-auto mr-auto pl-[70px] mt-[30px]
            mobile:pl-0
            laptop:w-[90%]
            tablet:w-[90%]
            "
      >
        <div className="flex flex-col px-10 w-[100%]">
          <div className="mb-[32px]">
            <div className="mb-[32px] h-[82px] tablet:mb-[62px] mobile:mb-[152px] w-[100%] ml-auto mr-auto ">
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ type: 'spring', stiffness: 35, delay: 0.2 }}
                className="text-[32px] font-semibold w-[100%] leading-10 mb-3
                        "
              >
                Add some photos of your cabin
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: -30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ type: 'spring', stiffness: 35, delay: 0.2 }}
                className="text-[18px] text-[#717171]"
              >
                You'll need 5 photos to get started. You can add more or make changes later.
              </motion.p>
              <div className="mt-10">
                <FilePond
                  files={imgArr}
                  allowMultiple={true}
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
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

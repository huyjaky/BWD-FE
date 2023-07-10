import axiosClient from "@/api-client/axiosClient";
import { createHouseFormContext } from "@/contexts/createHouseForm";
import { FilePondErrorDescription, FilePondFile } from 'filepond';
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';
import 'filepond/dist/filepond.min.css';
import { useContext, useRef } from "react";
import { FilePond, registerPlugin } from 'react-filepond';


interface ImgCreateHouseProps {
  api_url_path: string
}
registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);
const ImgCreateHouse = ({ api_url_path }: ImgCreateHouseProps) => {
  // const [imgArr, setImgArr] = useState<any>([]);
  const {imgArr, setImgArr} = useContext(createHouseFormContext)
  const filePondRef = useRef<FilePond>(null);

  return (
    <div>
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
  )
}

export default ImgCreateHouse;
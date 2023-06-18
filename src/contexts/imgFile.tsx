import { ReactNode, createContext, useState } from "react";


interface imgFileProps{
  children: ReactNode;
}

interface imgFileData{
  imgArr: any;
  setImgArr: (payload: any) => void;
}

const imgFileDefaultData: imgFileData =  {
  imgArr: [],
  setImgArr: () => {}
}

export const imgFileContext = createContext<imgFileData>(imgFileDefaultData);

const ImgFileProvider = ({children}: imgFileProps) =>{
  const [imgArr, setImgArr_] = useState(imgFileDefaultData.imgArr);
  const setImgArr = (payload: any) => setImgArr_(payload);

  const imgFileDynamicData = {imgArr, setImgArr};
  return (
    <imgFileContext.Provider value={imgFileDynamicData}>
      {children}
    </imgFileContext.Provider>
  )
}

export default ImgFileProvider
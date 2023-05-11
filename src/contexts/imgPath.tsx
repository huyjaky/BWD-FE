import { ReactNode, createContext, useState } from "react";


interface imgPathProps {
  children: ReactNode
}

interface imgPathData {
  imgPath: string[]
  setImgPath: (payload: string[]) => void
}

const imgPathDefaultData: imgPathData = {
  imgPath: [''],
  setImgPath: () => {}
}

export const imgPathContext = createContext<imgPathData>(imgPathDefaultData)

const ImgPahtProvider = ({children}: imgPathProps) => {
  const [imgPath, setImgPath_] = useState(imgPathDefaultData.imgPath);
  const setImgPath = (payload: string[]) => setImgPath_(payload);

  const imgPathDynamicData = {imgPath, setImgPath};

  return <imgPathContext.Provider value={imgPathDynamicData}>
    {children}
  </imgPathContext.Provider>
}

export default ImgPahtProvider;
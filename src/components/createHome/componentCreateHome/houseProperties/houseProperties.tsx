import EditForm from "@/components/main/showHouse/componentShowHouse/editForm";
import { Dispatch, SetStateAction, useState } from "react";

interface HousePropertiesProps {
  keyMapBing: string;
  api_url_path: string | undefined;
}

const HouseProperties = ({keyMapBing, api_url_path}: HousePropertiesProps) => {
  const [isEdit, setIsEdit] = useState<boolean>(false);
  return(
    <div>
      
    </div>
  )
}
export default HouseProperties;
import { filterContext } from "@/contexts/filter";
import { compassUtils } from "@/utils/compass";
import { useContext } from "react";


const CompassFilter = () => {
  const compass: string[] = compassUtils
  const { filterForm, setFilterForm } = useContext(filterContext);

  const handeOcClick = (item:string)=>{
    setFilterForm({...filterForm, orientation: item})
    console.log(filterForm);
  }

  return (
    <div className="w-full h-fit border-2 rounded-xl overflow-hidden">
      <select className="select px-0 w-full outline-none text-[2rem]  text-center"
      onChange={(event)=>handeOcClick(event.target.value)}
      >
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
    </div>
  )
}

export default CompassFilter;
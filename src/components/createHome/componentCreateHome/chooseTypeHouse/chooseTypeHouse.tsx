import { BsHouses } from "react-icons/bs";
import TypeCard from "./typeCard";
import { HiOutlineKey } from "react-icons/hi";




const ChooseTypeHouse = () => {
  return (
    <div className="w-full h-fit grid grid-cols-2 grid-rows-1 mt-[6rem]
    mobile:grid-cols-1 mobile:gap-y-3
    mobile:grid-rows-2
    ">
      <div className="border-r-2 mobile:border-0">
        <TypeCard title="House For Rent">
          <HiOutlineKey />
        </TypeCard>
      </div>
      <TypeCard title="House For Sale">
        <BsHouses />
      </TypeCard>
    </div>
  )
}

export default ChooseTypeHouse;
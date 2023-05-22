import { address } from "@/models/address";


interface TitleHouseProps {
  title: string,
  address: address
}

const TitleHouse = ({title, address}: TitleHouseProps) =>{
  return (
    <div className="w-full h-fit flex flex-col box-border px-10 mt-7 ">
      <div className="flex-1 mb-3">
        <span className="text-[30px] font-semibold">{title}</span>
      </div>
      <div className="flex-1">
        <span>{address.formattedAddress}</span>
      </div>


    </div>
  )
}

export default TitleHouse;
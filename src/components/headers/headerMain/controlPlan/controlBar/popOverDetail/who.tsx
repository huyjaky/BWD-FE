import { selectPopoverContext } from "@/contexts";
import { useContext, useEffect } from 'react';

const Who = () => {
  const {selected} = useContext(selectPopoverContext);
  useEffect(() => {}, [selected])
  return (
      <div className="w-full h-full flex justify-end">
        <div className="w-[350px] h-full bg-white rounded-2xl pointer-events-auto" id="who-popup">

        </div>
      </div>
  );
};
export default Who;

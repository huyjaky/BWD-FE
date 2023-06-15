import Step11CHome from "@/components/CreateHome/Step/Step11CHome"
import { useEffect } from "react";

const Test  = () =>{
  useEffect(()=>{
    document.getElementById('tram')?.classList.add('tram2');
  },[])
  return  (
    <>
    {/* class tram 2 se duoc them vao the div co id la tram khi cau lenh
    document.getElementById('tram')?.classList.add('tram2'); duoc thuc hien */}
    <div id="tram" className="w-full h-full"></div>
      <Step11CHome api_url_path={process.env.API_URL_PATH || ''}/>
    </>
  )
}

export default Test;
import Step11CHome from "@/components/CreateHome/Step/Step11CHome"

const Test  = () =>{
  return  (
    <>
    <div className="w-full h-full"></div>
      <Step11CHome api_url_path={process.env.API_URL_PATH || ''}/>
    </>
  )
}

export default Test;
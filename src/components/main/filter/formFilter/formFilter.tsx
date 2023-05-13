import {IoMdClose} from 'react-icons/io'
const FormFilter = () => {

  return (
    <div className="w-[800px] h-[90%] bg-white m-auto rounded-3xl" id='formFilter'>
      {/* header formfilter */}
      <div className="h-[70px] w-full border-b-2 flex relative">
        {/* button */}
        <div className="absolute w-[70px] h-full left-0 bottom-0 flex">
          <IoMdClose className='m-auto text-[35px]'/>
        </div>
        <span className="m-auto font-semibold text-[23px]">Filter</span>
      </div>
      {/* content formfilter */}
      <div className='w-full h-auto overflow-scroll overflow-x-hidden box-border p-5'>

        {/* price range */}
        <div className='w-full h-[300px]'>
          {/* header pricerange */}
          <div className='w-full h-fit flex flex-col'>
            <span className='font-bold text-[25px]'>Price range</span>
            <span className='text-[18px]'>The average nightly price is &#36;79, not including fees or taxes.</span>
          </div>
          {/* content price range */}
          <div>
            
          </div>

        </div>
      </div>
    </div>
  )
}
export default FormFilter;
import { MdLanguage } from 'react-icons/md';
import { TiArrowSortedUp } from 'react-icons/ti';
const FooterTest = () => {
  return (
    <div className="flex justify-between px-[80px] bg-ColorBgFooter">
      <div>
        <ul className="flex flex-wrap justify-between relative">
          <li>
            <span className="text-[14px]"> 2023 Olympus,Inc</span>
          </li>
          <li className="ml-5">
            <span className="absolute left-[120px] bottom-1 laptop:hidden tablet:hidden">.</span>
            <a className="text-[14px] hover:underline hover:decoration-solid hover:cursor-pointer ">
              {' '}
              Term
            </a>
          </li>
          <li className="ml-5">
            <span className="absolute left-[175px] bottom-1 laptop:hidden tablet:hidden mobile:hidden">
              .
            </span>
            <a className="text-[14px] hover:underline hover:decoration-solid hover:cursor-pointer">
              {' '}
              Sitemap
            </a>
          </li>
          <li className="ml-5">
            <span className="absolute left-[255px] bottom-1 laptop:hidden tablet:hidden mobile:hidden">
              .
            </span>
            <a className="text-[14px] hover:underline hover:decoration-solid hover:cursor-pointer">
              {' '}
              Privacy
            </a>
          </li>
          <li className="ml-5">
            <span className="absolute left-[325px] bottom-1 laptop:hidden tablet:hidden mobile:hidden">
              .
            </span>
            <a className="text-[14px] hover:underline hover:decoration-solid hover:cursor-pointer">
              {' '}
              Your Privacy Choices
            </a>
          </li>
          <li className="ml-5">
            <span className="absolute left-[490px] bottom-1 laptop:hidden tablet:hidden mobile:hidden">
              .
            </span>
            <a className="text-[14px] hover:underline hover:decoration-solid hover:cursor-pointer">
              {' '}
              Destinations
            </a>
          </li>
        </ul>
      </div>
      <div>
        <ul className="flex font-semibold">
          <li className="flex items-center hover:underline hover:decoration-solid hover:cursor-pointer ">
            <MdLanguage className="mr-2" /> English(US)
          </li>
          <li className="ml-4">
            ${' '}
            <span className="hover:underline hover:decoration-solid hover:cursor-pointer">USD</span>
          </li>
          <li className="ml-4 flex items-center">
            <span className="hover:underline hover:decoration-solid hover:cursor-pointer">
              Support & resources{' '}
            </span>
            <TiArrowSortedUp className="ml-2" />{' '}
          </li>
        </ul>
      </div>
    </div>
  );
};

export default FooterTest;

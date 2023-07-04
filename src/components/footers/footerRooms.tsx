import React from 'react';
import { MdLanguage } from 'react-icons/md';
import { AiFillFacebook, AiFillTwitterSquare, AiFillInstagram } from 'react-icons/ai';
export default function FooterRooms() {
  return (
    <div
      className="bg-ColorBgFooter px-[24px] desktop:px-[80px] pt-4 laptop:px-[80px]
    mobile:mb-[70px] tablet:mb-[70px]
    "
    >
      <div
        className="desktop:flex desktop:justify-between desktop:border-b desktop:border-colorBorderBottom
                laptop:flex laptop:justify-between laptop:border-b laptop:border-colorBorderBottom
                "
      >
        <div
          className="border-b border-colorBorderBottom pb-[24px] mb-[24px] leading-7
                desktop:border-none
                latop: border-none
            "
        >
          <h1 className="font-semibold">Support</h1>
          <p className="text-[13px] font-thin hover:underline hover:decoration-solid hover:cursor-pointer">
            Help Center
          </p>
          <p className="text-[13px] font-thin hover:underline hover:decoration-solid hover:cursor-pointer">
            OlympusCover
          </p>
          <p className="text-[13px] font-thin hover:underline hover:decoration-solid hover:cursor-pointer">
            Supporting people with disabilities
          </p>
          <p className="text-[13px] font-thin hover:underline hover:decoration-solid hover:cursor-pointer">
            Cancellation options
          </p>
          <p className="text-[13px] font-thin hover:underline hover:decoration-solid hover:cursor-pointer">
            Our COVID-19 Response
          </p>
          <p className="text-[13px] font-thin hover:underline hover:decoration-solid hover:cursor-pointer">
            Report a neighborhood concern
          </p>
        </div>
        <div
          className="border-b border-colorBorderBottom  pb-[24px] mb-[24px] leading-7
                    desktop:border-none
                    laptop:border-none
                "
        >
          <h1 className="font-semibold">Community</h1>
          <p className="text-[13px] font-thin hover:underline hover:decoration-solid hover:cursor-pointer">
            Olympus.org: disaster relief housing
          </p>
          <p className="text-[13px] font-thin hover:underline hover:decoration-solid hover:cursor-pointer">
            Combating discrimination
          </p>
        </div>
        <div
          className="border-b border-colorBorderBottom  pb-[24px] mb-[24px] leading-7
                    desktop:border-none
                    laptop:border-none
                "
        >
          <h1 className="font-semibold">Hosting</h1>
          <p className="text-[13px] font-thin hover:underline hover:decoration-solid hover:cursor-pointer">
            Olympus your home
          </p>
          <p className="text-[13px] font-thin hover:underline hover:decoration-solid hover:cursor-pointer">
            OlympusCover for Hosts
          </p>
          <p className="text-[13px] font-thin hover:underline hover:decoration-solid hover:cursor-pointer">
            Explore hosting resources
          </p>
          <p className="text-[13px] font-thin hover:underline hover:decoration-solid hover:cursor-pointer">
            Visit our community forum
          </p>
          <p className="text-[13px] font-thin hover:underline hover:decoration-solid hover:cursor-pointer">
            How to host responsibly
          </p>
          <p className="text-[13px] font-thin hover:underline hover:decoration-solid hover:cursor-pointer">
            Olympus-friendly apartments
          </p>
        </div>
        <div
          className="border-b border-colorBorderBottom  pb-[24px] mb-[24px] leading-7
                    desktop:border-none
                    laptop:border-none
                "
        >
          <h1 className="font-semibold">Olympus</h1>
          <p className="text-[13px] font-thin hover:underline hover:decoration-solid hover:cursor-pointer">
            Newsroom
          </p>
          <p className="text-[13px] font-thin hover:underline hover:decoration-solid hover:cursor-pointer">
            Learn about new features
          </p>
          <p className="text-[13px] font-thin hover:underline hover:decoration-solid hover:cursor-pointer">
            Letter from our founders
          </p>
          <p className="text-[13px] font-thin hover:underline hover:decoration-solid hover:cursor-pointer">
            Careers
          </p>
          <p className="text-[13px] font-thin hover:underline hover:decoration-solid hover:cursor-pointer">
            Investors
          </p>
          <p className="text-[13px] font-thin hover:underline hover:decoration-solid hover:cursor-pointer">
            Gift cards
          </p>
        </div>
      </div>
      <div
        className="desktop:flex desktop:justify-between desktop:py-3
                    laptop:flex laptop:justify-between laptop:py-3
            "
      >
        <div className="">
          <ul
            className="font-semibold flex desktop:items-center
                    laptop: items-center
                    "
          >
            <li className="text-[14px] flex items-center ">
              <MdLanguage />{' '}
              <span className="hover:underline hover:decoration-solid hover:cursor-pointer">
                English (US)
              </span>
            </li>
            <li className="ml-3 text-[14px]">
              ${' '}
              <span className="hover:underline hover:decoration-solid hover:cursor-pointer">
                USD
              </span>
            </li>
            <li className="hidden ml-3 desktop:block laptop:block hover:cursor-pointer">
              <AiFillFacebook />{' '}
            </li>
            <li className="hidden ml-3 desktop:block laptop:block  hover:cursor-pointer">
              <AiFillTwitterSquare />{' '}
            </li>
            <li className="hidden ml-3 desktop:block laptop:block  hover:cursor-pointer">
              <AiFillInstagram />{' '}
            </li>
          </ul>
        </div>
        <div className="">
          <ul className="flex flex-col desktop:flex-row laptop:flex-row relative">
            <li className="flex items-center mt-1">
              <p className="text-[13px] font-thin">&copy; 2023 Olympus,Inc.</p>
            </li>

            <li>
              <ul className="flex relative">
                <li>
                  <span className="absolute left-[5px] bottom-1 ">.</span>
                  <a className="text-[13px] font-thin ml-3 hover:underline hover:decoration-solid hover:cursor-pointer">
                    Term
                  </a>
                </li>
                <li className="ml-3 ">
                  <span className="absolute left-[58px] bottom-1">.</span>
                  <a className="text-[13px] font-thin hover:underline hover:decoration-solid hover:cursor-pointer">
                    Sitemap
                  </a>
                </li>
                <li className="ml-4">
                  <span className="absolute left-[138px] bottom-1">.</span>
                  <a className="text-[13px] font-thin hover:underline hover:decoration-solid hover:cursor-pointer">
                    Privacy
                  </a>
                </li>
                <li className="ml-4">
                  <span className="absolute left-[212px] bottom-1">.</span>
                  <a className="text-[13px] font-thin hover:underline hover:decoration-solid hover:cursor-pointer">
                    Your Privacy Choices
                  </a>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

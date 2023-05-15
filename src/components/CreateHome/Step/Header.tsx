import React from 'react';
import Logo from '../img/logo.svg';
import ButtonHeader from '../ButtonHeader';

export default function Header() {
  return (
    <div className="px-[48px] pt-[32px] flex justify-between">
      {/* <img src={logo} alt="logo" className="w-[32px] h-[32px]" /> */}
      <Logo />
      <div>
        <ButtonHeader content="Questions?" />
        <ButtonHeader content="Save & exit" />
      </div>
    </div>
  );
}

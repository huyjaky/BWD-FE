import Header from '@/components/Hosting/components/Header';
import Main from '@/components/Hosting/components/Main';
import FooterRooms from '@/components/footers/footerRooms';
import React from 'react';

function index(): JSX.Element {
  return (
    <div>
      <Header />
      <Main />
      <FooterRooms />
    </div>
  );
}

export default index;

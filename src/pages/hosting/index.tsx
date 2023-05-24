import Header from '@/components/Hosting/components/Header';
import Main from '@/components/Hosting/components/Main';
import FooterTest from '@/components/footers/footerMain';
import FooterRooms from '@/components/footers/footerRooms';
import React from 'react'

function index(): JSX.Element {
    return (
        <div>
            <Header />
            <Main />
            <FooterRooms />
        </div>
    )
}

export default index;

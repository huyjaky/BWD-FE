import Header from '@/components/Hosting/components/Header';
import Main from '@/components/Hosting/components/Main';
import FooterRooms from '@/components/footers/footerRooms';
import React from 'react'
import { motion, useScroll, useSpring } from "framer-motion";
function index(): JSX.Element {
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });
    return (
        <>
            <motion.div className='fixed top-0 left-0 right-0 h-[7px] bg-black rounded-[30px]' style={{ scaleX }} />
            <Header />
            <Main />
            <FooterRooms />
        </>

    )
}

export default index;

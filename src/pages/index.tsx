import { sessionOptions } from '@/api-client/session';
import HeaderMain from '@/components/headers/headerMain/headerMain';
import EmptyLayout from '@/components/layouts/empty';
import { userAccContext } from '@/contexts/userAcc';
import { NextPageWithLayout } from '@/models/layoutprops';
import { userAcc } from '@/models/userAcc';
import { withIronSessionSsr } from 'iron-session/next';
import { GetServerSideProps } from 'next';
import { Montserrat } from 'next/font/google';
import { useContext, useEffect, useState } from 'react';
import fs from 'fs';
import useSWR from 'swr';
import path from 'path';
import { imgPathContext } from '@/contexts/imgPath';
import TypeHouse from '@/components/main/typeHouse';
const monsterrat = Montserrat({
  subsets: ['latin'],
  weight: ['200', '400', '600', '800'],
  variable: '--font-monsterrat'
});
interface HomeProps {
  user_: userAcc;
  props: any;
}

const Home: NextPageWithLayout<HomeProps> = ({ user_, props }: HomeProps) => {
  const { user, setUser } = useContext(userAccContext);
  const { imgPath, setImgPath } = useContext(imgPathContext);

  if (props) {
    setImgPath(props);
  }

  if (!user_?.UserId) {
    const { data, error, mutate, isValidating } = useSWR(`/get/useracc/UserName/${user.UserName}`, {
      revalidateOnFocus: false,
      revalidateOnMount: false
    });
    useEffect(() => {
      setUser({ ...user, ...data?.data });
      return () => {};
    }, [data]);
  } else if (user_?.UserId && !user.UserId) {
    setUser({ ...user, ...user_ });
  }

  return (
    <>
      <main className={`${monsterrat.className} relative`} id="root">
        <HeaderMain />
        <div className="w-full h-[100px]">
          <TypeHouse />
        </div>
      </main>
    </>
  );
};

Home.Layout = EmptyLayout;

export default Home;

export const getServerSideProps: GetServerSideProps = withIronSessionSsr(
  async ({ req, res, params }) => {
    const user = req.session.props?.user_;

    // get path all icon from folder bnb_svg
    function getImagePaths(directory: string) {
      const fileNames = fs.readdirSync(directory);
      return fileNames
        .filter((fileName) => fileName.endsWith('.svg'))
        .map((fileName) => `${directory}/${fileName}`);
    }

    // change to directly path for search place folder
    const relativePath = './Icon_BnB_svg';
    const absolutePath = path.resolve(relativePath);
    const imgPath = getImagePaths(absolutePath);

    // save path in session
    req.session = req.session ?? {};
    req.session.props = {
      user_: user,
      props: imgPath
    };
    const wait = await req.session.save();

    // if user available not callback api from server
    if (user?.UserId) {
      console.log(req.session.props.props);
      return {
        props: { ...req.session.props }
      };
    }
    return { props: {} };
  },
  sessionOptions
);

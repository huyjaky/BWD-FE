import FooterTest from '@/components/footers/footerMain';
import FooterRooms from '@/components/footers/footerRooms';
import HeaderLogin from '@/components/headers/headerLogin/headerLogin';
import EmptyLayout from '@/components/layouts/empty';
import useAuth from '@/hooks/useAuth';
import { NextPageWithLayout } from '@/models/layoutprops';
import { yupResolver } from '@hookform/resolvers/yup';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import { RefObject, useEffect, useRef, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { IoIosClose } from 'react-icons/io';
import * as yup from 'yup';

const schema = yup
  .object({
    userName: yup.string().required(),
    password: yup.string().required()
  })
  .required();

type LoginInterface = yup.InferType<typeof schema>;

const Login: NextPageWithLayout = () => {
  const router = useRouter();
  const { login } = useAuth();
  const divRef = useRef<HTMLInputElement>(null);
  const title_username = useRef<HTMLInputElement>(null);
  const input_username = useRef<HTMLInputElement>(null);

  const divRef2 = useRef<HTMLInputElement>(null);
  const title_password = useRef<HTMLInputElement>(null);
  const input_password = useRef<HTMLInputElement>(null);

  useEffect(() => {
    let handleOnClickOutSide = (event: any) => {
      const isContain1 = divRef?.current?.contains(event.target);
      if (isContain1) {
        title_username?.current?.classList.add('animate-boxInputLoginFocus_title');
        input_username?.current?.classList.add('animate-boxInputLoginFocus_input');
        // input_username?.current?.classList.add('border-b-2');
        title_username?.current?.classList.remove('animate-boxInputLoginFocus_titleReverse');
        input_username?.current?.classList.remove('animate-boxInputLoginFocus_inputReverse');
        input_username?.current?.focus();
        console.log('check contain1');
        return;
      } else if (!isContain1){
        console.log('cehck conatin 1');
        title_username?.current?.classList.remove('animate-boxInputLoginFocus_title');
        input_username?.current?.classList.remove('animate-boxInputLoginFocus_input');
        title_username?.current?.classList.add('animate-boxInputLoginFocus_titleReverse');
        input_username?.current?.classList.add('animate-boxInputLoginFocus_inputReverse');
      }

      const isContain2 = divRef2?.current?.contains(event.target);
      if (isContain2) {
        title_password?.current?.classList.add('animate-boxInputLoginFocus_title');
        input_password?.current?.classList.add('animate-boxInputLoginFocus_input');
        title_password?.current?.classList.remove('animate-boxInputLoginFocus_titleReverse');
        input_password?.current?.classList.remove('animate-boxInputLoginFocus_inputReverse');
        input_password?.current?.focus();
        return;
      } else if (!isContain2){
        title_password?.current?.classList.remove('animate-boxInputLoginFocus_title');
        input_password?.current?.classList.remove('animate-boxInputLoginFocus_input');
        title_password?.current?.classList.add('animate-boxInputLoginFocus_titleReverse');
        input_password?.current?.classList.add('animate-boxInputLoginFocus_inputReverse');
        return
      }
    };
    document.addEventListener('mousedown', handleOnClickOutSide);
  }, []);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm<LoginInterface>({
    defaultValues: {
      userName: '',
      password: ''
    },
    resolver: yupResolver(schema)
  });
  const onSubmit: SubmitHandler<LoginInterface> = (data) => console.log(data);

  return (
    <main>
      <HeaderLogin />
      <div className="w-full h-[calc(100vh-80px)] ">
        <div className="w-full h-full flex">
          <div className="w-[600px] h-fit m-auto shadow-2xl rounded-3xl box-border p-10">
            <div className="w-full h-fit flex justify-end border-b-2 mb-5">
              <div className="w-full h-full text-center m-auto">
                <span className="font-bold">Login or Sign Up</span>
              </div>
              <button>
                <IoIosClose className="w-[50px] h-[50px]" />
              </button>
            </div>
            <span className="font-semibold text-[24px] w-full">Welcome to Airbnb</span>

            <div className="mt-5 w-full h-fit" >
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="w-full h-full grid grid-cols-1 grid-rows-2 mb-3
            ">
                <div className={`border-2 rounded-t-xl box-border p-3 ${errors?.userName ? 'border-red-500' : ''}`} ref={divRef}>
                  <div className="w-full h-full flex items-center" ref={title_username}>
                    <span>UserName</span>
                  </div>
                  <input
                    {...register('userName')}
                    type="text"
                    ref={input_username}
                    className="w-full h-0 border-b shadow-2xl outline-none"
                  />
                </div>

                <div className={`border-2 rounded-b-xl box-border p-3 ${errors?.password ? 'border-red-500' : ''}`} ref={divRef2}>
                  <div className="w-full h-full flex items-center" ref={title_password}>
                    <span>Password</span>
                  </div>
                  <input
                    {...register('password')}
                    type="text"
                    ref={input_password}
                    className="w-full h-0 border-b shadow-2xl outline-none"
                  />
                </div>
                <button type='submit' className='w-full h-[40px] bg-red-600 mt-5 rounded-xl'>
                  <span className='text-white font-semibold text-[25px]'>Login</span>
                </button>
              </form>
              <span className='font-light text-[15px]'>We&#39;ll call or text you to confirm your number. Standard message and data rates apply.</span>
            </div>
          </div>
        </div>
      </div>
      <FooterRooms />
    </main>
  );
};

Login.Layout = EmptyLayout;

export default Login;

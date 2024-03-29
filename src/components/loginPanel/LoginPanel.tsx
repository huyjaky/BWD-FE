import { selectPopoverContext } from '@/contexts';
import { getHouseContext } from '@/contexts/getHouse';
import { userAccContext } from '@/contexts/userAcc';
import { yupResolver } from '@hookform/resolvers/yup';
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { ReactNode, useContext, useEffect, useRef, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';
import nProgress from 'nprogress';
import { IoCloseOutline } from 'react-icons/io5';
import axiosClient from '@/api-client/axiosClient';
import axios from 'axios';
import { motion } from 'framer-motion';
import { variants } from '../main/showHouse/variantsShowHouse';

interface LoginPanelProps {
  children: ReactNode;
}

const passwordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;

const schema = yup
  .object({
    username: yup.string().required(),
    password: yup.string().required()
  })
  .required();

type LoginInterface = yup.InferType<typeof schema>;

const LoginPanel = ({ children }: LoginPanelProps) => {
  const { data: session } = useSession();
  const { user, setUser } = useContext(userAccContext);
  const { setIsLoginClick,isLoginClick } = useContext(selectPopoverContext);
  const router = useRouter();
  const divRef = useRef<HTMLInputElement>(null);
  const title_username = useRef<HTMLInputElement>(null);
  const input_username = useRef<HTMLInputElement>(null);
  const { setIsFilter, isFilter } = useContext(getHouseContext);

  const divRef2 = useRef<HTMLInputElement>(null);
  const title_password = useRef<HTMLInputElement>(null);
  const input_password = useRef<HTMLInputElement>(null);

  // just animate
  useEffect(() => {
    let handleOnClickOutSide = (event: any) => {
      const isContain1 = divRef?.current?.contains(event.target);
      if (isContain1) {
        title_username?.current?.classList.add('animate-boxInputLoginFocus_title');
        input_username?.current?.classList.add('animate-boxInputLoginFocus_input');
        title_username?.current?.classList.remove('animate-boxInputLoginFocus_titleReverse');
        input_username?.current?.classList.remove('animate-boxInputLoginFocus_inputReverse');
        input_username?.current?.focus();
        return;
      }

      const isContain2 = divRef2?.current?.contains(event.target);
      if (isContain2) {
        title_password?.current?.classList.add('animate-boxInputLoginFocus_title');
        input_password?.current?.classList.add('animate-boxInputLoginFocus_input');
        title_password?.current?.classList.remove('animate-boxInputLoginFocus_titleReverse');
        input_password?.current?.classList.remove('animate-boxInputLoginFocus_inputReverse');
        input_password?.current?.focus();
        return;
      }
    };
    document.addEventListener('mousedown', handleOnClickOutSide);
  }, []);

  const {
    register,
    handleSubmit,
    watch,
    setError,
    formState: { errors }
  } = useForm<LoginInterface>({
    defaultValues: {
      username: '',
      password: ''
    },
    resolver: yupResolver<any>(schema)
  });

  // fetch accesstoken , navigate as well as do animte
  const onSubmit: SubmitHandler<LoginInterface> = async (data_) => {
    nProgress.set(0.6);
    const login_ = await signIn('credentials', {
      username: data_.username,
      password: data_.password,
      redirect: false
    });

    if (!login_?.ok) {
      setError('username', { type: 'validate', message: 'Wrong username or password!' });
      setError('password', { type: 'validate', message: 'Wrong username or password!' });
      return;
    }

    if (login_?.ok) {
      setUser({ ...user, ...session?.userAcc });
      setIsLoginClick(session?.userAcc?.UserName);

    }
    setIsFilter('main');
    if (router.asPath === '/login') {
      router.push('/', undefined, { shallow: true });
    }
    nProgress.done();
    return;
  };

  return (
    <motion.div
    variants={variants}
    animate={isLoginClick ? 'showMaskLogin' : 'hiddenMaskLogin'}
    transition={{ duration: 0.5, type: 'tween' }}
    className="w-[600px] h-fit m-auto shadow-2xl rounded-3xl box-border p-10
    mobile:w-full mobile:h-full relative bg-white flex-col
    ">
      <button
        onClick={() => { setIsLoginClick(false) }}
        className='top-5 left-5 absolute '>
        <IoCloseOutline className='h-full text-[2.4rem] text-left' />
      </button>
      <div className="w-full h-fit flex justify-end border-b-2 mb-5">
        <div className="w-full h-full text-center m-auto relative">

          <span className="font-bold">Login or Sign Up</span>
        </div>

        {children}
      </div>
      <span className="font-semibold text-[2rem] w-full">Welcome to Candy</span>
      <div className="mt-5 w-full h-fit">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full h-full grid grid-cols-1 grid-rows-2 mb-3
            "
        >
          {/* form input username */}
          <div
            className={`border-2 rounded-t-xl box-border p-3 h-[5.625rem] ${errors?.username?.message ? 'border-red-500' : ''
              }`}
            ref={divRef}
          >
            <div className="w-full h-full m-auto">
              <div className="w-full h-full flex items-center" ref={title_username}>
                <span>
                  User name
                  <span className="italic text-red-500">
                    {' '}
                    | {errors.username?.message ? ` ${errors.username.message}` : ''}
                  </span>
                </span>
              </div>
              <div className="w-full h-0 mt-2 overflow-hidden" ref={input_username}>
                <input
                  {...register('username')}
                  type="text"
                  className="w-full h-[2.4rem] outline-none border-b shadow-2xl text-[1rem]"
                />
              </div>
            </div>
          </div>

          {/* form input password */}
          <div
            className={`border-2 rounded-b-xl box-border flex p-3 h-[5.625rem] ${errors?.password?.message ? 'border-red-500' : ''
              }`}
            ref={divRef2}
          >
            <div className="w-full h-full m-auto">
              <div className="w-full h-full flex items-center" ref={title_password}>
                <span>
                  Password
                  <span className="italic text-red-500">
                    {' '}
                    | {errors.password?.message ? ` ${errors.password.message}` : ''}
                  </span>
                </span>
              </div>
              <div className="w-full h-0 mt-2 overflow-hidden" ref={input_password}>
                <input
                  {...register('password')}
                  type="password"
                  className="w-full h-[2.4rem] outline-none border-b shadow-2xl text-[1rem]"
                />
              </div>
            </div>
          </div>
          <button type="submit" className="w-full h-fit py-3 bg-red-600 mt-5 rounded-xl">
            <span className="text-white font-semibold text-[2rem]">Login</span>
          </button>
        </form>

        <span className="font-light text-[15px]">
          We&#39;ll call or text you to confirm your number. Standard message and data rates apply.
        </span>
      </div>
    </motion.div>
  );
};
export default LoginPanel;

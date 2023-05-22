import { authApi } from '@/api-client';
import { userApi } from '@/api-client/userApi';
import { selectPopoverContext } from '@/contexts';
import { userAccContext } from '@/contexts/userAcc';
import useAuth from '@/hooks/useAuth';
import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'next/router';
import { ReactNode, useContext, useEffect, useRef } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import useSWR from 'swr';
import * as yup from 'yup';

interface LoginPanelProps {
  children: ReactNode;
}

// const passwordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;

const schema = yup
  .object({
    username: yup.string().required(),
    password: yup.string().required()
  })
  .required();

type LoginInterface = yup.InferType<typeof schema>;

const LoginPanel = ({ children }: LoginPanelProps) => {
  const { login } = useAuth();
  const { user, setUser } = useContext(userAccContext);
  const { setIsLoginClick } = useContext(selectPopoverContext);
  const router = useRouter();
  const divRef = useRef<HTMLInputElement>(null);
  const title_username = useRef<HTMLInputElement>(null);
  const input_username = useRef<HTMLInputElement>(null);

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
        // input_username?.current?.classList.add('border-b-2');
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
    const login_ = await authApi.login(data_);

    if (login_?.status != 200) {
      console.log(login_);
      setError('username', { type: 'validate', message: 'Wrong username or password!' });
      setError('password', { type: 'validate', message: 'Wrong username or password!' });
      return;
    }

    if (router.asPath === '/login') {
      router.push('/', undefined, { shallow: true });
      setUser({ ...user, UserName: data_.username });
      if (login_?.status == 200 && login_?.data) {
        setIsLoginClick(false);
      }
      return;
    }

    const user_ = await userApi.userInfor(data_.username, 'UserName' );
    if (user_.status != 200) {
      setError('username', { type: 'validate', message: 'Have error!' });
      setError('password', { type: 'validate', message: 'Have error!' });
      return;
    }
    setUser({...user, ...user_?.data?.data});
    if (user_?.status == 200 && user_?.data?.data) {
        setIsLoginClick(false);
      }
  };

  return (
    <div className="w-[600px] h-fit m-auto shadow-2xl rounded-3xl box-border p-10">
      <div className="w-full h-fit flex justify-end border-b-2 mb-5">
        <div className="w-full h-full text-center m-auto">
          <span className="font-bold">Login or Sign Up</span>
        </div>

        {children}
      </div>
      <span className="font-semibold text-[24px] w-full">Welcome to Airbnb</span>
      <div className="mt-5 w-full h-fit">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full h-full grid grid-cols-1 grid-rows-2 mb-3
            "
        >
          {/* form input username */}
          <div
            className={`border-2 rounded-t-xl box-border p-3 h-[70px] ${
              errors?.username?.message ? 'border-red-500' : ''
            }`}
            ref={divRef}
          >
            <div className="w-full h-full flex items-center" ref={title_username}>
              <span>
                User name
                <span className="italic text-red-500">
                  {' '}
                  | {errors.username?.message ? ` ${errors.username.message}` : ''}
                </span>
              </span>
            </div>
            <div className="w-full h-0 mt-1 overflow-hidden" ref={input_username}>
              <input
                {...register('username')}
                type="text"
                className="w-full h-full outline-none border-b shadow-2xl"
              />
            </div>
          </div>

          {/* form input password */}
          <div
            className={`border-2 rounded-b-xl box-border p-3 h-[70px] ${
              errors?.password?.message ? 'border-red-500' : ''
            }`}
            ref={divRef2}
          >
            <div className="w-full h-full flex items-center" ref={title_password}>
              <span>
                Password
                <span className="italic text-red-500">
                  {' '}
                  | {errors.password?.message ? ` ${errors.password.message}` : ''}
                </span>
              </span>
            </div>
            <div className="w-full h-0 mt-1 overflow-hidden" ref={input_password}>
              <input
                {...register('password')}
                type="password"
                className="w-full h-full outline-none border-b shadow-2xl"
              />
            </div>
          </div>
          <button type="submit" className="w-full h-[40px] bg-red-600 mt-5 rounded-xl">
            <span className="text-white font-semibold text-[25px]">Login</span>
          </button>
        </form>

        <span className="font-light text-[15px]">
          We&#39;ll call or text you to confirm your number. Standard message and data rates apply.
        </span>
      </div>
    </div>
  );
};
export default LoginPanel;

import { schedule } from '@/api-client/schedule';
import AuthWithAnimate from '@/components/layouts/authWithAnimate';
import CheckIn_Out from '@/components/rootMaskHeader/controlPlan/controlBar/popOverDetail/checkIn_Out';
import Who from '@/components/rootMaskHeader/controlPlan/controlBar/popOverDetail/who';
import { BillContext } from '@/contexts/bill';
import { selectPlaceContext } from '@/contexts/selectPlace';
import { userAccContext } from '@/contexts/userAcc';
import { house_ } from '@/models/house';
import { NextPageWithLayout } from '@/models/layoutprops';
import { yupResolver } from '@hookform/resolvers/yup';
import { AnimatePresence, Variants, motion } from 'framer-motion';
import moment from 'moment';
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from 'next';
import { Montserrat } from 'next/font/google';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useContext, useEffect, useRef, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { BiMessageSquareError } from 'react-icons/bi';
import { GrClose, GrPrevious } from 'react-icons/gr';
import * as yup from 'yup';
import https from 'https';
import fetch from 'node-fetch';
import { houseTempContext } from '@/contexts/houseTemp';
interface ConfirmProps {
  houseDetail: house_;
  keyMapBox: string;
}

const variants: Variants = {
  showMask: {
    display: 'flex',
    opacity: [0, 1]
  },
  hiddenMask: {
    opacity: [1, 0],
    transitionEnd: {
      display: 'none'
    }
  }
};

const phonePattern = /(84|0[3|5|7|8|9])+([0-9]{8})\b/g;

const monsterrat = Montserrat({
  subsets: ['latin'],
  weight: ['200', '400', '600', '800'],
  variable: '--font-monsterrat'
});

const schema = yup
  .object({
    guests: yup
      .object({
        adults: yup.number(),
        childrens: yup.number(),
        infants: yup.number()
      })
      .required(),
    phoneNumber: yup.string().required().matches(phonePattern, 'Invalid phone number')
  })
  .required();

type ConfirmSchema = yup.InferType<typeof schema>;

const Confirm: NextPageWithLayout<ConfirmProps> = ({ houseDetail, keyMapBox }: ConfirmProps) => {
  const { Bill, setBill } = useContext(BillContext);

  const { address } = useContext(selectPlaceContext);
  const { user } = useContext(userAccContext);
  const guestRef = useRef<HTMLDivElement>(null);
  const calenderRef = useRef<HTMLDivElement>(null);
  const notificateRef = useRef<HTMLDivElement>(null);
  const [maskNotificate, setMaskNotificate] = useState<boolean>(false);
  const [maskGuests, setMaskGuests] = useState<boolean>(false);
  const [maskCalender, setMaskCalender] = useState<boolean>(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors }
  } = useForm<ConfirmSchema>({
    defaultValues: {
      guests: Bill.guest,
      phoneNumber: ''
    },
    resolver: yupResolver<any>(schema)
  });

  useEffect(() => {
    setBill({ ...Bill, guest: { ...Bill.guest, ...address.guest } });
  }, [address.guest]);

  const onSubmit: SubmitHandler<ConfirmSchema> = async (data) => {
    console.log('housedetail',houseDetail);

    const createSchedule = await schedule.createSchedule({
      EventId: '',
      HouseId: houseDetail.HouseId,
      UserId: user.UserId,
      PhoneNumber: data.phoneNumber + '',
      Date: Bill.checkInDay,
      Adults: Bill.guest.adults,
      Childrens: Bill.guest.childrens,
      Infants: Bill.guest.infants,
      Host: houseDetail?.PostBy,
      house: undefined,
    });

    if (createSchedule.status != 200) {

      console.log('have err with create schedule');
      return;
    } else {
      // if (createSchedule.data.isExist == true) {
      //   setMaskNotificate(true);
      //   return;
      // }
      // router.push(
      //   {
      //     pathname: '/homepage',
      //     query: { slug: 'your-slug-value' }
      //   },
      //   undefined,
      //   { shallow: true }
      // );

    }
  };

  const maskGuests_ = (event: any) => {
    const isClickGuests = guestRef.current?.contains(event.target);
    if (!isClickGuests) {
      setMaskGuests(false);
      return;
    }
  };

  const maskCalender_ = (event: any) => {
    const isClickCalender = calenderRef.current?.contains(event.target);
    if (!isClickCalender) {
      setMaskCalender(false);
      return;
    }
  };

  const maskNotificate_ = (event: any) => {
    const isClickMaskNotificate = notificateRef.current?.contains(event.target);
    if (!isClickMaskNotificate) {
      setMaskNotificate(false);
      return;
    }
  };

  return (
    <>
      <AnimatePresence initial={false}>
        <motion.div
          variants={variants}
          animate={maskGuests ? 'showMask' : 'hiddenMask'}
          onClick={maskGuests_}
          className="fixed w-screen h-screen bg-mask flex z-30"
        >
          <motion.div className="w-fit h-fit m-auto" ref={guestRef}>
            <Who styleWho={'justify-center w-[800px] h-[32rem]'} />
          </motion.div>
        </motion.div>
      </AnimatePresence>

      <AnimatePresence initial={false}>
        <motion.div
          variants={variants}
          animate={maskCalender ? 'showMask' : 'hiddenMask'}
          onClick={maskCalender_}
          className="fixed w-screen h-screen bg-mask flex z-30"
        >
          <motion.div className="w-fit h-fit m-auto" ref={notificateRef}>
            <CheckIn_Out
              styleHorizontal={'mobile:hidden tablet:hidden'}
              styleVerical={'laptop:hidden desktop:hidden'}
            />
          </motion.div>
        </motion.div>
      </AnimatePresence>

      <AnimatePresence initial={false}>
        <motion.div
          variants={variants}
          animate={maskNotificate ? 'showMask' : 'hiddenMask'}
          onClick={maskNotificate_}
          className="fixed w-screen h-screen bg-mask flex z-30"
        >
          <motion.div className="w-fit h-fit m-auto" ref={notificateRef}>
            <motion.div
              className="w-fit relative h-fit text-center bg-white rounded-2xl p-7 border-2 border-red-500
            "
            >
              <button
                onClick={(event) => setMaskNotificate(false)}
                className="absolute right-3 top-2"
              >
                <GrClose />
              </button>
              <div className="flex items-center">
                <BiMessageSquareError className="mr-2 text-[2rem] text-red-500" /> you must be
                cancelled before create new one schedule apointment
              </div>

              <Link
                href={{
                  pathname: `/house/${houseDetail?.HouseId}`
                }}
              >
                <button className="w-full mt-2 bg-red-400 rounded-2xl text-white">
                  Go to your schedule
                </button>
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>
      </AnimatePresence>

      <div className={`w-full h-fit box-border flex ${monsterrat.className}`}>
        <div className="w-[calc(100vw-20rem)] h-fit m-auto mt-5 mobile:w-screen">
          {/* header */}
          <div className="w-full h-fit flex items-center ">
            <Link href={`/house/${houseDetail?.HouseId}`}>
              <motion.button className="w-[3rem] h-[2.4rem]">
                <GrPrevious className="text-[28px] m-auto" />
              </motion.button>
            </Link>
            <span className="text-[2rem]">Confirm and pay</span>
          </div>

          <form className="w-full flex mt-5" onSubmit={handleSubmit(onSubmit)}>
            {/* pay method */}
            <div className="flex-[7] flex flex-col box-border tablet:px-5 mobile:px-5">
              <div className="w-full flex-1">
                <span className="text-[2rem]">Make an appointment</span>
              </div>
              <div className="w-full mt-5 flex-1  cursor-pointer">
                <div className="w-full flex justify-between">
                  <div className="flex flex-col w-fit h-fit ">
                    <span className="font-semibold">Dates</span>
                    <span>{moment(Bill.checkInDay).format('MMM D - D, YYYY')}</span>
                  </div>
                  <div>
                    <button
                      onClick={(event) => setMaskCalender(true)}
                      className="text-[22px] underline"
                    >
                      Edit
                    </button>
                  </div>
                </div>

                <div className="w-full mt-5 flex-1">
                  <div className="w-full flex justify-between">
                    <div className="w-fit h-fit flex flex-col">
                      <span className="font-semibold">Guests</span>
                      <span>
                        {Bill.guest.adults != 0 || Bill.guest.childrens != 0
                          ? Bill.guest.adults + Bill.guest.childrens + ' guests'
                          : 'Guests '}

                        {Bill.guest.infants != 0 && ', ' + Bill.guest.infants + ' infants'}
                      </span>
                    </div>

                    <div>
                      <div>
                        <button
                          onClick={() => setMaskGuests(true)}
                          className="text-[22px] underline"
                        >
                          Edit
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="w-full h-fit flex flex-col mt-10 border-t-2 relative">
                <div className="w-full flex-1 mt-10">
                  <span className="text-[2rem]">Enter your phone number</span>
                </div>

                <div
                  className={`w-full h-fit  relative
              after:absolute after:bottom-0 after:w-full after:h-[.25rem]  mt-5
              after:right-0  rounded-xl ${errors.phoneNumber?.message !== undefined
                      ? 'after:bg-red-500'
                      : 'after:bg-slate-800'
                    }
              `}
                >
                  <input
                    {...register('phoneNumber')}
                    type="text"
                    className="w-full h-[3rem] outline-none
                "
                    placeholder="Phone number"
                  />
                </div>
                <div className="absolute -bottom-6 text-red-500">{errors.phoneNumber?.message}</div>
              </div>

              <div className="w-full h-fit flex flex-col border-t-2 mt-10">
                <div className="w-full flex-1 mt-10">
                  <span className="text-[17px] font-semibold"> Cancellation policy: </span>
                  <span>Free cancellation for 48 hours</span>
                </div>
              </div>

              <div className="w-full h-fit flex flex-col border-t-2 mt-10">
                <div className="w-full flex-1 mt-10">
                  <span>
                    By selecting the button below, I agree to the Host's House Rules, Ground rules
                    for guests, Refund Policy, and that can charge my payment method if I’m
                    responsible for damage.
                  </span>
                </div>
              </div>

              <motion.button
                whileTap={{ scale: 0.8 }}
                type="submit"
                className="w-[12.5rem] h-[4rem] bg-red-500 text-white mt-5 rounded-xl"
              >
                <span className="font-semibold text-[2rem]">Confirm</span>
              </motion.button>
            </div>

            <div className="flex-[6]  box-border p-6 tablet:hidden mobile:hidden">
              <div className="w-full h-full ">
                <div
                  className="w-full h-fit bg-white rounded-2xl shadow-2xl overflow-hidden box-border
                p-5
              "
                >
                  <img
                    // src={'/api/img/path'+houseDetail?.arrImg[0].Path}
                    src={'/api/img/path/' + houseDetail?.arrImg[0].Path}
                    alt=""
                    className="w-full h-[18.75rem] rounded-2xl object-cover"
                  />
                  <div className="w-full flex justify-between">
                    <div className="w-fit h-fit flex flex-col">
                      <span className="font-semibold text-[1rem]">{houseDetail?.Title}</span>
                      <span>{houseDetail?.address.formattedAddress}</span>
                    </div>
                    <div className="w-fit h-full flex">
                      <span className="text-[34px] m-auto">&#36;{houseDetail?.Price}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

Confirm.Layout = AuthWithAnimate;

let cachedHouseDetail: house_[] = [];

const agent = new https.Agent({
  rejectUnauthorized: false,
});

const options = {
  method: 'GET',
  headers: { 'Content-Type': 'application/json' },
  agent
}

export const getStaticPaths: GetStaticPaths = async () => {
  const link = process.env.API_URL_PATH;

  const slug = await fetch(`${link}/api/get/house/page`, options);
  cachedHouseDetail = await slug.json() as house_[];

  const paths = cachedHouseDetail.map((house: house_) => ({ params: { slug: house.HouseId } }));
  return {
    paths,
    fallback: true
  };
};

export const getStaticProps: GetStaticProps = async ({ params }: GetStaticPropsContext) => {
  const link = process.env.API_URL_PATH;

  const slug = await fetch(`${link}/api/get/house/page`,options);
  cachedHouseDetail = await slug.json() as house_[];

  const houseDetailData = cachedHouseDetail.find((house: house_) => house.HouseId === params?.slug);
  return {
    props: {
      houseDetail: houseDetailData
    },
    revalidate: 600
  };
};

export default Confirm;

import CheckIn_Out from "@/components/rootMaskHeader/controlPlan/controlBar/popOverDetail/checkIn_Out";
import Who from "@/components/rootMaskHeader/controlPlan/controlBar/popOverDetail/who";
import { BillContext } from "@/contexts/bill";
import { selectPlaceContext } from "@/contexts/selectPlace";
import { house_ } from "@/models/house";
import { yupResolver } from "@hookform/resolvers/yup";
import { AnimatePresence, Variants, motion } from 'framer-motion';
import moment from "moment";
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { useContext, useEffect, useRef, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { GrPrevious } from 'react-icons/gr';
import * as yup from 'yup';

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
  },
}

const phonePattern = /(84|0[3|5|7|8|9])+([0-9]{8})\b/g

const schema = yup
  .object({
    guests: yup.object({
      adults: yup.number(),
      childrens: yup.number(),
      infants: yup.number()
    }).required(),
    phoneNumber: yup.string().required().matches(phonePattern, 'Invalid phone number')
  })
  .required();

type ConfirmSchema = yup.InferType<typeof schema>;

const Confirm = ({ houseDetail, keyMapBox }: ConfirmProps) => {
  const { Bill, setBill } = useContext(BillContext)
  const { address } = useContext(selectPlaceContext);
  const guestRef = useRef<HTMLDivElement>(null);
  const calenderRef = useRef<HTMLDivElement>(null);
  const [maskGuests, setMaskGuests] = useState<boolean>(false);
  const [maskCalender, setMaskCalender] = useState<boolean>(false);

  const { register, handleSubmit, setError, formState: { errors } } = useForm<ConfirmSchema>({
    defaultValues: {
      guests: Bill.guest,
      phoneNumber: '',
    },
    resolver: yupResolver<any>(schema)
  })

  useEffect(() => {
    setBill({ ...Bill, guest: { ...Bill.guest, ...address.guest } });
  }, [address.guest])


  const onSubmit: SubmitHandler<ConfirmSchema> = async (data) => {
    if (Bill.guest.adults === 0) {
      setMaskGuests(true);
      return;
    }
    
  };

  const maskGuests_ = (event: any) => {
    const isClickGuests = guestRef.current?.contains(event.target);
    if (!isClickGuests) {
      setMaskGuests(false);
      return;
    }
  }

  const maskCalender_ = (event: any) => {
    const isClickCalender = calenderRef.current?.contains(event.target);
    if (!isClickCalender) {
      setMaskCalender(false)
      return;
    }
  }

  return (
    <>
      <AnimatePresence initial={false}>

        <motion.div
          variants={variants}
          animate={maskGuests ? 'showMask' : 'hiddenMask'}
          onClick={maskGuests_}
          className="fixed w-screen h-screen bg-mask flex z-30">
          <motion.div className="w-fit h-fit m-auto"
            ref={guestRef}>
            <Who styleWho={'justify-center'} />
          </motion.div>
        </motion.div>
      </AnimatePresence>

      <AnimatePresence initial={false}>
        <motion.div
          variants={variants}
          animate={maskCalender ? 'showMask' : 'hiddenMask'}
          onClick={maskCalender_}
          className="fixed w-screen h-screen bg-mask flex z-30">
          <motion.div className="w-fit h-fit m-auto"
            ref={calenderRef}>
            <CheckIn_Out styleHorizontal={'mobile:hidden tablet:hidden'}
              styleVerical={'laptop:hidden desktop:hidden'}
            />
          </motion.div>
        </motion.div>
      </AnimatePresence>

      <div className="w-full h-fit box-border flex">
        <div className="w-[1100px] h-fit m-auto mt-5">
          {/* header */}
          <div className="w-full h-fit flex items-center ">
            <Link href={`/house/${houseDetail.HouseId}`}>
              <motion.button
                className="w-[50px] h-[40px]" >
                <GrPrevious className="text-[28px] m-auto" />
              </motion.button>
            </Link>
            <span className="text-[32px]">Confirm and pay</span>
          </div>

          <form className="w-full flex mt-5" onSubmit={handleSubmit(onSubmit)}>
            {/* pay method */}
            <div className="flex-[7] flex flex-col box-border tablet:px-5 mobile:px-5">
              <div className="w-full flex-1">
                <span className="text-[24px]">Make an appointment</span>
              </div>
              <div className="w-full mt-5 flex-1  cursor-pointer">
                <div className="w-full flex justify-between">
                  <div className="flex flex-col w-fit h-fit ">
                    <span className="font-semibold">Dates</span>
                    <span>{moment(Bill.checkInDay).format("MMM D - D, YYYY")}</span>
                  </div>
                  <div>
                    <button
                      onClick={(event) => setMaskCalender(true)}
                      className="text-[22px] underline">Edit</button>
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
                          className="text-[22px] underline">Edit</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="w-full h-fit flex flex-col mt-10 border-t-2 relative">
                <div className="w-full flex-1 mt-10">
                  <span className="text-[24px]">Enter your phone number</span>
                </div>

                <div className={`w-full h-fit  relative
              after:absolute after:bottom-0 after:w-full after:h-[4px]  mt-5
              after:bg-slate-700 after:right-0  rounded-xl ${errors.phoneNumber?.message ?
                    'after:bg-red-500' : ''
                  }
              `}>
                  <input {...register('phoneNumber')} type="text" className="w-full h-[50px] outline-none
                " placeholder='Phone number' />
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
                    By selecting the button below, I agree to the Host's House Rules, Ground rules for guests, Refund Policy, and that can charge my payment method if I’m responsible for damage.
                  </span>
                </div>
              </div>

              <motion.button
                whileTap={{ scale: .8 }}
                type="submit" className="w-[200px] h-[60px] bg-red-500 text-white mt-5 rounded-xl">
                <span className="font-semibold text-[25px]">Confirm</span>
              </motion.button>

            </div>

            <div className="flex-[6]  box-border p-6 tablet:hidden mobile:hidden">
              <div className="w-full h-full ">
                <div className="w-full h-fit bg-white rounded-2xl shadow-2xl overflow-hidden box-border
                p-5
              ">
                  <img src={houseDetail.arrImg[0].Path} alt="" className="w-full h-[300px] rounded-2xl" />
                  <div className="w-full flex justify-between">
                    <div className="w-fit h-fit flex flex-col">
                      <span className="font-semibold text-[23px]">{houseDetail.Title}</span>
                      <span>{houseDetail.address.formattedAddress}</span>
                    </div>
                    <div className="w-fit h-full flex">
                      <span className="text-[34px] m-auto">
                        &#36;{houseDetail.Price}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

let cachedHouseDetail: house_[] = [];

export const getStaticPaths: GetStaticPaths = async () => {
  if (cachedHouseDetail.length == 0) {
    const slug = await fetch('http://localhost:4000/api/get/house/page');
    cachedHouseDetail = await slug.json();
  }

  const paths = cachedHouseDetail.map((house: house_) => ({ params: { slug: house.HouseId } }));
  return {
    paths,
    fallback: true
  };
};

export const getStaticProps: GetStaticProps = async ({ params }: GetStaticPropsContext) => {
  if (cachedHouseDetail.length == 0) {
    const slug = await fetch('http://localhost:4000/api/get/house/page');
    cachedHouseDetail = await slug.json();
  }
  const houseDetailData = cachedHouseDetail.find((house: house_) => house.HouseId === params?.slug);
  return {
    props: {
      houseDetail: houseDetailData,
    },
    revalidate: 60
  };
};

export default Confirm;
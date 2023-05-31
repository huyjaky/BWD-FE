import React, { ChangeEvent, useState, useContext, useEffect } from 'react';
import { BsPlusLg } from 'react-icons/bs';
import { RxMinus } from 'react-icons/rx';
import { RiErrorWarningFill } from 'react-icons/ri';
import { HiOutlineInformationCircle } from 'react-icons/hi';
import { motion } from 'framer-motion';
import { newHouseContext } from '../../../contexts/createHome';

export default function Step16CHome() {
  const { state, dispatch } = useContext(newHouseContext);

  const [money, setMoney] = useState<number>(state.price);

  const [error, setError] = useState<boolean>(false);



  // hàm handleInput đc chạy vào khi mình chỉnh tiền bằng tay, nhấn nút tăng giảm onChange không có tác dụng
  const handleMoney = (event: ChangeEvent<HTMLInputElement>) => {

    const inputValue = event.target.value;

    const moneyValue = parseInt(inputValue.slice(1));

    if (moneyValue <= 0 || isNaN(moneyValue)) {
      setError(true);
      setMoney(0);
    } else if (moneyValue >= 0 && moneyValue < 10) {
      setError(true);
      setMoney(moneyValue);
    } else {
      setError(false);
      setMoney(moneyValue);
    }
  };

  function cre() {
    if (money >= 10) {
      setError(false)
      setMoney(prev => prev + 1)
    } else if (money < 10 && money >= 0) {
      setError(true)
      setMoney(prev => prev + 1)
    }

  }
  function incre() {
    if (money > 10) {
      setError(false)
      setMoney(prev => prev - 1)
    }
    else if (money <= 10 && money > 0) {
      setError(true)
      setMoney(prev => prev - 1)
    }
    else {
      setError(true)
      setMoney(0)
    }
  }

  useEffect(() => {
    dispatch({ type: 'STEP16', payload: money })
  }, [money])
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
      className="w-[98vw] px-[80px]
                        mobile:px-0
        "
    >
      <div
        className="w-[830px] ml-auto mr-auto pl-[70px] mt-[30px] h-[700px]
                mobile:w-[530px]
            mobile:pl-0

            "
      >
        <div className="flex flex-col px-10 w-[100%] ">
          <div className="mb-[32px]">
            <div className="mb-[32px] h-[82px] tablet:mb-[62px] mobile:mb-[152px] w-[100%] ml-auto mr-auto ">
              <div className="mb-[22px]">
                <motion.h1
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ type: 'spring', stiffness: 35, delay: 0.2 }}
                  className="text-[32px] font-semibold w-[100%] leading-10 mb-3
                        "
                >
                  Now, set your price
                </motion.h1>
                <motion.p
                  initial={{ opacity: 0, y: -30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ type: 'spring', stiffness: 35, delay: 0.2 }}
                  className="text-[18px] text-[#717171] "
                >
                  You can change it anytime.
                </motion.p>
              </div>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ type: 'spring', stiffness: 35, delay: 0.2 }}
                className="w-[95%] bg-[#F7F7F7] h-[320px] border rounded-[12px] p-[32px] flex flex-col items-center
                                            mobile:h-[260px]
                            "
              >
                <div className=" flex items-center flex-col w-[100%]">
                  <div className="flex items-center justify-around w-[430px] pb-[16px]">
                    <button
                      disabled={money < 1}
                      onClick={incre} className={`border w-[55px] h-[48px] flex justify-center items-center rounded-full ${money >= 1 ? 'hover:border-black text-black border-[#717171]' : 'bg-[#FFF] text-[#EBEBEB] border-[#EBEBEB]'}`}>
                      <span>
                        <RxMinus />
                      </span>
                    </button>

                    <div
                      className={`w-[400px] h-[96px]
                                  mobile:w-[200px] mobile:h-[56px]
                                        `}
                    >
                      <input
                        placeholder="$00"
                        type="text"
                        value={`$${money}`}
                        onChange={handleMoney}
                        className={`my-[8px] mx-[12px] w-[98%] h-[98%] border border-black rounded-[8px] text-[48px] text-center ${error ? ' bg-red-50 border border-red-500 text-red-900' : ''
                          }
                                            `}
                      />
                    </div>

                    <button
                      disabled={money > 10000}
                      onClick={cre}
                      className={`border ml-3 w-[55px] h-[48px] flex justify-center items-center rounded-full ${money <= 10000 ? 'hover:border-black text-black border-[#717171]' : 'bg-[#FFF] text-[#EBEBEB] border-[#EBEBEB]'}`}
                    >
                      <BsPlusLg />
                    </button>
                  </div>
                  <div className="mt-4">
                    <span>per night</span>
                  </div>
                  {error && (
                    <div className="flex justify-center items-center pt-3">
                      <RiErrorWarningFill className="text-[14px] text-[#C13515]" />{' '}
                      <span className="text-[12px] text-[#C13515]">
                        Please enter a base price between $10 and $10,000.
                      </span>
                    </div>
                  )}
                </div>
                <div className="flex items-center text-[18px] relative pt-[16px] text-center">
                  Places like yours in your area usually <br /> range from $10 to $42.5
                  <button>
                    <HiOutlineInformationCircle className="absolute right-3 bottom-[5px]" />
                  </button>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

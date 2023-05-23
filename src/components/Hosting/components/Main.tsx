import React, { useState } from 'react'
import { Resourcesandtips, reservations } from '../utils/constants';
import ButtonReservations from '../ButtonReserations';
import { AnyReview, ContactSupport, SuperHost } from '../../../../Icon_BnB_svg';
import ResourceAndTip from '../ResourceAndTip';

function Main(): JSX.Element {

    const [selected, setSelected] = useState('');

    return (
        <div className='w-[100%]'>
            <div className='w-[100%] px-[80px] mobile:px-[0]'>
                <div className='w-[100%] pt-[64px]'>
                    <h1 className='text-[32px] font-semibold'>Welcome back, Minh</h1>
                </div>
                <div className='w-[100%] py-[64px]'>
                    <div className=''>
                        <div className='flex justify-between mb-[16px]'>
                            <h2 className='text-[26px] font-semibold'>Your reservations</h2>
                            <div>
                                <a className='underline text-[16px] font-semibold'>All reservations (0)</a>
                            </div>
                        </div>
                        <div>
                            {reservations.map(reservation => (
                                <ButtonReservations selected={selected} setSelected={setSelected} content={reservation.title} number={reservation.number} />
                            ))}
                        </div>
                        <div className='bg-[#F7F7F7] h-[200px] flex items-center justify-center rounded-[12px]'>
                            <div>
                                <div className='flex flex-col items-center justify-center gap-4 '>
                                    <AnyReview />
                                    <span className='text-[14px] h-[36px] w-[200px] text-center'>
                                        You don't have any guest reviews to write.
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='bg-[#F9F7F4] w-[100%] h-[195px]'>
                <div className='px-[80px] mobile:px-0 py-[64px]'>
                    <h2 className='text-[26px] font-semibold'>Share more details</h2>
                    <p className='text-[15px] font-extralight'>Check, check, check! You’re all set for now.</p>
                </div>
            </div>
            <div className='w-[100%] px-[80px] mobile:px-0 flex flex-col gap-3 mt-[64px]'>
                <div>
                    <h1 className='text-[26px] font-semibold mb-3'>We’re here to help</h1>
                    <div className='w-[100%] flex mobile:flex-col gap-2'>
                        <div className='w-[35%] laptop:w-[50%] mobile:w-[100%] tablet:w-[50%] h-[92px] flex p-[16px] gap-3 border rounded-[10px] cursor-pointer'>
                            <div className='mb-[4px]'>
                                <SuperHost />
                            </div>
                            <div className='w-[100%]'>
                                <h3 className='text-[16px] font-semibold'>Guidance from a Superhost</h3>
                                <p className='text-[13px] text-[#717171] font-thin w-[90%]'>
                                    We'll match you with an experienced Host who can you
                                    get started
                                </p>
                            </div>
                        </div>

                        <div className='w-[35%] laptop:w-[50%] mobile:w-[100%] tablet:w-[50%] h-[92px] flex p-[16px] gap-3 border rounded-[10px] cursor-pointer'>
                            <div className='mb-[4px]'>
                                <ContactSupport />
                            </div>
                            <div className='w-[100%]'>
                                <h3 className='text-[16px] font-semibold'>Guidance from a Superhost</h3>
                                <p className='text-[13px] text-[#717171] font-thin w-[90%]'>
                                    We'll match you with an experienced Host who can you
                                    get started
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <div>
                        <h1 className='text-[26px] font-semibold mb-[24px]'>Resources and tips</h1>
                        <div className='flex tablet:flex-wrap mobile:flex-wrap h-[293px] w-[100%] gap-5 mobile:justify-center tablet:justify-center'>
                            {
                                Resourcesandtips.map(Resourceandtip => (
                                    <ResourceAndTip ImgLink={Resourceandtip.ImgLink} title={Resourceandtip.title} />
                                ))
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Main;
import Container from '@/components/shared/Container'

import { Link, SquareArrowOutUpRight } from 'lucide-react'
import Image from 'next/image'
import React from 'react'
import SubmitButton from '../../Campaigns/ChampaignDetails/SubmitButton'
import { Progress } from '@/components/ui/progress'

const PromotorCampaignDetails = () => {
  return (
    <Container>
            <div className=" w-full  p-4 md:p-8 flex flex-col items-center">
            <div className="w-full max-w-4xl">
                {/* Image */}
                <div className="w-full rounded-2xl overflow-hidden">
                    <Image
                        src="https://img.freepik.com/free-photo/3d-music-related-scene_23-2151125037.jpg?semt=ais_hybrid&w=740&q=80"
                        alt="Feel The Vibe"
                        width={1200}
                        height={700}
                        className="w-full h-auto"
                    />
                </div>

                {/* Title */}
                <h1 className="text-center text-2xl md:text-3xl font-bold mt-4 text-primary">
                    "Feel the Vibe"
                </h1>

                {/* Info Banner */}
                <div className="bg-secondary  shadow-md text-white rounded-xl p-4 mt-4 text-sm text-center">
                    Only views after you submit count towards payout. Submit as soon as you post to get paid for all of your views.
                </div>
                <div className="bg-secondary  shadow-md text-white rounded-xl p-4 mt-4 text-sm text-center">
                    View All Submi
                </div>

                {/* Paid Out */}
                <div className="mt-6 text-lg font-semibold">Paid Out</div>
                <div className="flex items-end gap-1">
                    <span className="text-3xl font-semibold">$2087.40</span>
                    <span className="text-slate-400  text-xl font-medium">of $4087.40 paid out</span>
                </div>
                <Progress value={55} className="h-3 mt-2" />
                <div className="p-5 mt-7 glassBg shadow-lg!">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center  items-start ">
                        <div className="text-start">
                            <p className="text-lg pb-1">Reward</p>
                            <span className="text-sm p-1 rounded bg-blue-700 text-white">$0.10 / 1K</span>
                        </div>
                        <div className="text-start">
                            <p className="text-lg pb-1">Maximum Profit</p>
                            <p className="font-semibold text-lg text-primary">$100.00</p>
                        </div>
                        <div className="text-start">
                            <p className="text-lg pb-1">Minimum Profit</p>
                            <p className="font-semibold text-lg text-primary">$0.50</p>
                        </div>
                    </div>
                    <div className="mt-6">
                        <div className="mt-6 text-lg font-semibold">Paid Out</div>
                        <div className="flex gap-3">
                            <Image src="/tiktokBlack.png" height={20} width={40} alt="logo" className="rounded-md" />
                            <Image src="/instagram.png" height={20} width={40} alt="logo" className="rounded-md" />
                        </div>
                    </div>
                </div>
                <p className="font-semibold  text-2xl mt-7 mb-6">Requirements</p>
                <div className="p-5  glassBg shadow-lg!">
                    <ul className="text-md text-gray-500 list-disc ml-5 space-y-1">
                        <li>Same guidelines as the standard audio clipping in "learn" tab</li>
                        <li>5k min views to be eligible for payout</li>
                        <li>Must adhere to content types in "learn" tab</li>
                    </ul>
                </div>

                <p className="font-semibold  text-2xl mt-7 mb-6">Assets</p>
                <div className="p-5  glassBg shadow-lg! text-blue-600 font-semibold">
                    <a href="https://whop.com/dashboard/biz_uYZpwzLVni7EDx" className="text-wrap">https://whop.com/dashboard/biz_uYZpwzLVni7EDx</a>
                </div>

                <p className="font-semibold  text-2xl mt-7 mb-6">Audio Requirements</p>
                <div className="p-5  glassBg shadow-lg! text-gray-500 font-semibold flex items-center gap-5">
                    <a href="https://www.tiktok.com/en/" className="flex items-center gap-2">
                        <Image src="/instagram.png" height={20} width={30} alt="logo" className="rounded-sm" />
                        <span className="text-xl">Sound</span>
                        <SquareArrowOutUpRight size={20} />
                    </a>
                    <a href="https://www.tiktok.com/en/" className="flex items-center gap-2">
                        <Image src="/tiktokBlack.png" height={20} width={30} alt="logo" className="rounded-sm" />
                        <span className="text-xl">Audio</span>
                        <SquareArrowOutUpRight size={20} />
                    </a>
                </div>

                <p className="font-semibold  text-2xl mt-7 mb-6">Disclaimer</p>
                <div className="p-5 text-justify bg-secondary rounded-lg shadow-lg! text-white ">
                    <p>Creators may reject submissions that don't meet requirements. By submitting, you grant full usage rights and agree to follow the <Link href="#" className="text-blue-500 underline font-medium">FTC Guidelines</Link>  and <Link href="#" className="text-blue-500 underline font-medium"> the Content Rewards Terms</Link></p>
                </div>
                <SubmitButton />

                 {/* <div className="flex justify-end mt-5">
                    <Modal
                        dialogTitle="Campaign Form"
                        open={open}
                        setOpen={setOpen}
                        width="900px"
                        height="85vh"
                        dialogTrigger={
                            <button className="btn px-20 text-white bg-blue-700 rounded-full">
                                Submit
                            </button>
                        }
                    >
                        <CampaignSubmitForm closeModal={() => setOpen(false)} setOpenAccVerifyModal={setOpenAccVerifyModal} />
                    </Modal>
                </div> */}
                {/* {!open && !openVerifiedModal && openAccVerifyModal &&
                    <Modal
                        dialogTitle="Link Account"
                        open={openAccVerifyModal}
                        setOpen={setOpenAccVerifyModal}
                        width="700px"                        
                    >
                        <AcccountConnectModal closeModal={() => setOpen(false)} setOpenVerifiedModal={setOpenVerifiedModal} />
                    </Modal>
                } */}
                {/* { openVerifiedModal &&
                    <Modal
                        open={openVerifiedModal}
                        setOpen={setOpenVerifiedModal}
                        width="900px"
                        height="85vh"
                    >
                        <AccountVerified closeModal={() => setOpen(false)} />
                    </Modal>
                } */}
            </div>
        </div >
    </Container>
  )
}

export default PromotorCampaignDetails
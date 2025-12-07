import Container from '@/components/shared/Container'

import { Link, SquareArrowOutUpRight } from 'lucide-react'
import Image from 'next/image'
import React from 'react'
import SubmitButton from '../../Campaigns/ChampaignDetails/SubmitButton'
import { Progress } from '@/components/ui/progress'
import ViewAllSubmittionBtn from './ViewAllSubmittionBtn'
import CampaignSubmission from './CampaignSubmission'
import CampaignData from './CampaignData'
import { DropDownMenu } from './DropDownMenu'

const PromotorCampaignDetails = ({ status, openTab }: { status?: string, openTab?: string }) => {
    return (
        <Container>
            <div className="glassBg p-4 my-10">
            <div className="flex justify-end mt-5">
            <DropDownMenu />
            </div>
            <div className="relative w-full  p-4 md:p-8 flex flex-col items-center">
                <div className="w-full">
                    {/* Image */}                    
                        <Image
                            src="https://img.freepik.com/free-photo/3d-music-related-scene_23-2151125037.jpg?semt=ais_hybrid&w=740&q=80"
                            alt="Feel The Vibe"
                            width={1000}
                            height={400}
                            className="w-full md:w-3/5 h-[250px] mx-auto rounded-2xl"
                        />       
                        

                    {/* Title */}
                    <h1 className="text-center text-2xl md:text-3xl font-bold mt-4 text-primary">
                        "Feel the Vibe"
                    </h1>

                    {/* Info Banner */}
                    <div className="text-blue-500 text-md text-center pt-4">
                        Only views after you submit count towards payout. Submit as soon as you post to get paid for all of your views.
                    </div>
                    <ViewAllSubmittionBtn />
                    {openTab ? <CampaignSubmission status={status} /> :
                        <CampaignData />
                    }                   
                </div>
            </div >
            </div>
        </Container>
    )
}

export default PromotorCampaignDetails



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
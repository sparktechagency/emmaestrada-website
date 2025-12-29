'use client'
import Modal from '@/components/modals/Modal';
import React, { useState } from 'react'
import CampaignSubmitForm from '../../Influencer/InfluencerCampaign/CampaignSubmitForm';
import AcccountConnectModal from '../../Influencer/InfluencerCampaign/AcccountConnectModal';
import AccountVerified from '../../Influencer/InfluencerCampaign/AccountVerified';

const SubmitButton = () => {
    const [open, setOpen] = useState(false);
    
    const [openAccVerifyModal, setOpenAccVerifyModal] = useState(false);
    const [openVerifiedModal, setOpenVerifiedModal] = useState(false);
    return (
        <div className='mt-10'>            
            <Modal
                dialogTitle="Campaign Form"
                open={open}
                setOpen={setOpen}
                width="900px"
                height="85vh"
                dialogTrigger={
                    <div className='flex items-center justify-end'>
                    <button className="btn px-20 text-white bg-blue-700 rounded-full">
                        Submit
                    </button>
                    </div>
                }
            >
                <CampaignSubmitForm closeModal={() => setOpen(false)} setOpenAccVerifyModal={setOpenAccVerifyModal} />
            </Modal>
            {/* {!open && !openVerifiedModal && openAccVerifyModal &&
                <Modal
                    dialogTitle="Link Account"
                    open={openAccVerifyModal}
                    setOpen={setOpenAccVerifyModal}
                    width="700px"
                >
                    <AcccountConnectModal closeModal={() => setOpen(false)} setOpenVerifiedModal={setOpenVerifiedModal} />
                </Modal>
            }
            {openVerifiedModal &&
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
    )
}

export default SubmitButton
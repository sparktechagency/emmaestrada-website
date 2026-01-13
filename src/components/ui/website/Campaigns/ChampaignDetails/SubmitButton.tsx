'use client'
import Modal from '@/components/modals/Modal';
import React, { useState } from 'react'
import CampaignSubmitForm from '../../Influencer/InfluencerCampaign/CampaignSubmitForm';
import AcccountConnectModal from '../../Influencer/InfluencerCampaign/AcccountConnectModal';
import AccountVerified from '../../Influencer/InfluencerCampaign/AccountVerified';
import ConnectAccountModal from '@/components/shared/ConnectAccountModal';
import { Button } from '@/components/ui/button';

const SubmitButton = ({user}: any) => {
    const [open, setOpen] = useState(false);    

    const [openAccConnect, setOpenAccConnect] = useState(false);    
    return (
        <div className='mt-10 flex items-center justify-center md:justify-end gap-5'>
            <Modal
                dialogTitle="Campaign Form"
                open={open}
                setOpen={setOpen}
                width="900px"                
                dialogTrigger={
                    <div className='flex items-center justify-end'>
                        <Button size="lg" className="px-14 md:px-20 w-full  text-white ">
                            Submit
                        </Button>
                    </div>
                }
            >
                <CampaignSubmitForm user={user} closeModal={() => setOpen(false)} setOpenAccConnect={true} />
            </Modal>
            <ConnectAccountModal user={user} open={openAccConnect} setOpen={setOpenAccConnect} />
        </div>
    )
}

export default SubmitButton
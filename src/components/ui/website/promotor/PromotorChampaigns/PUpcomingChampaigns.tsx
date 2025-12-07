'use client';

import CampaignCard from '@/components/shared/CampaignCard'
import { ArrowLeft, Plus } from 'lucide-react'
import React, { useState } from 'react'
import AddButton from './AddButton'
import CampaingsAddForm from '../CampaingsAddForm';

const PUpcomingChampaigns = () => {
    const [openAddForm, setAddForm] = useState(false)
    return (
        <div className=''>
            {openAddForm && <p onClick={() => setAddForm(false)} className="mb-5 cursor-pointer flex items-center  gap-2"><ArrowLeft /> Back</p> }
            <div className="flex flex-col items-center justify-center">
                {!openAddForm && <div className="">
                    <h2 className='text-2xl font-semibold text-center'>No compaigns yet</h2>
                    <p className='text-lg text-gray-400 my-3'>A product is needed to organize access to your offering</p>
                </div>}

                {/* <AddButton /> */}

                {openAddForm ? <CampaingsAddForm /> :
                    <button onClick={() => setAddForm(true)} className='btn bg-primary rounded-full text-white flex items-center mt-5'><Plus /> Create Campaign </button>

                }
            </div>
        </div>
    )
}

export default PUpcomingChampaigns
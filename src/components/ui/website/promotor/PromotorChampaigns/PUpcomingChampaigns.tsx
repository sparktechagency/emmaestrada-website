'use client';

import CampaignCard from '@/components/shared/CampaignCard'
import { Plus } from 'lucide-react'
import React, { useState } from 'react'
import AddButton from './AddButton'
import CampaingsAddForm from '../CampaingsAddForm';

const PUpcomingChampaigns = () => {
    const [openAddForm, setAddForm] = useState(false)
    return (
        <div className=''>
            <div className="flex flex-col items-center justify-center">
                <h2 className='text-2xl font-semibold'>No compaigns yet</h2>
                <p className='text-lg text-gray-400 my-3'>A product is needed to organize access to your offering</p>
                {/* <AddButton /> */}

                {openAddForm ? <button onClick={() => setAddForm(true)} className='btn bg-primary rounded-full text-white flex items-center mt-5'><Plus /> Create Campaign </button> :
                    <CampaingsAddForm />
                }
            </div>
        </div>
    )
}

export default PUpcomingChampaigns
import Container from '@/components/shared/Container'
import ManagePagination from '@/components/shared/ManagePagination'
import { myFetch } from '@/utils/myFetch'
import CampaignCreateButton from '../../Influencer/InfluencerCampaign/CampaignCreateButton'
import { CampaignTabGroup } from '../../Influencer/InfluencerCampaign/CampaignTabGroup'
import CampaingsAddForm from '../CampaingsAddForm'
import PCampaignHeader from './PCampaignHeader'
import PMyCampaigns from './PMyCampaigns'
import { Megaphone, Calendar, CheckCircle2 } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

const PromotorChampaigns = async ({ queryString, status = "active" }: { queryString?: string, status?: string }) => {

  const baseUrl = 
    status === "upcoming" ? "/campaigns/unpaid-campaigns" 
    : status ? `/campaigns/my-campaigns?status=${status}` 
    : `/campaigns/my-campaigns?status=active`;
  
  const url = queryString ? `${baseUrl}&${queryString}` : baseUrl;  
  const campaignsData = await myFetch(url, {tags: ['promotor-campaigns']});
  
  const hasCampaigns = campaignsData?.data && campaignsData.data.length > 0;

  // Status-specific empty state configuration
  const emptyStateConfig = {
    active: {
      icon: Megaphone,
      title: "No Active Campaigns",
      description: "You don't have any active campaigns running at the moment. Create a new campaign to start reaching your audience.",
      showButton: true
    },
    upcoming: {
      icon: Calendar,
      title: "No Upcoming Campaigns",
      description: "You don't have any unpaid or upcoming campaigns. Complete payment to activate your campaigns.",
      showButton: true
    },
    ended: {
      icon: CheckCircle2,
      title: "No Completed Campaigns",
      description: "You haven't completed any campaigns yet. Your finished campaigns will appear here.",
      showButton: false
    }
  };

  const currentStatus = status === "upcoming" ? "upcoming" : status || "active";
  const emptyConfig = emptyStateConfig[currentStatus as keyof typeof emptyStateConfig] || emptyStateConfig.active;
  const EmptyIcon = emptyConfig.icon;
  
  return (
    <Container>
      <div className="pb-16">
        <PCampaignHeader />
        <div className="grid md:flex grid-cols-1 gap-2 items-center justify-between">
          <CampaignTabGroup
            tabs={[
              { label: 'Active', value: 'active' },
              { label: 'Upcoming', value: 'upcoming' },
              { label: 'Completed', value: 'ended' },
            ]}
            queryParam="status"
          />
          <CampaignCreateButton />
        </div>

        {status === 'create-campaign' ? (
          <CampaingsAddForm />
        ) : hasCampaigns ? (
          <PMyCampaigns campaigns={campaignsData?.data} />
        ) : (
          <div className="flex flex-col items-center justify-center min-h-[400px] text-center px-4 py-12">
            <div className="bg-gray-100 rounded-full p-6 mb-6">
              <EmptyIcon className="w-16 h-16 text-gray-400" />
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">
              {emptyConfig.title}
            </h3>
            <p className="text-gray-600 max-w-md mb-6">
              {emptyConfig.description}
            </p>           
          </div>
        )}
      </div>
      
      {status && !['create-campaign'].includes(status) && hasCampaigns && (
        <ManagePagination meta={campaignsData?.meta} />
      )}

    </Container>
  )
}

export default PromotorChampaigns
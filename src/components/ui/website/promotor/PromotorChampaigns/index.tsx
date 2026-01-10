import Container from '@/components/shared/Container'
import ManagePagination from '@/components/shared/ManagePagination'
import { myFetch } from '@/utils/myFetch'
import CampaignCreateButton from '../../Influencer/InfluencerCampaign/CampaignCreateButton'
import { CampaignTabGroup } from '../../Influencer/InfluencerCampaign/CampaignTabGroup'
import CampaingsAddForm from '../CampaingsAddForm'
import PCampaignHeader from './PCampaignHeader'
import PMyCampaigns from './PMyCampaigns'

const PromotorChampaigns = async ({ queryString, status }: { queryString?: string, status?: string }) => {

  
  const baseUrl = 
  status === "upcoming" ? "/campaigns/unpaid-campaigns" 
  : status ? `/campaigns/my-campaigns?status=${status}` 
  : `/campaigns/my-campaigns?status=active`
  ;
  
  const url = queryString ? `${baseUrl}&${queryString}` : baseUrl;  
  const campaignsData = await myFetch(url, { tags: ['promotor-campaigns'] });
    
  console.log("campaignsData", campaignsData);
  
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

        {status === 'create-campaign' ? <CampaingsAddForm /> :          
          <PMyCampaigns campaigns={campaignsData?.data} />}
      </div>
      
      {status && !['create-campaign'].includes(status) && (
        <ManagePagination meta={campaignsData?.meta} />
      )}

    </Container>
  )
}

export default PromotorChampaigns
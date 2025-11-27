import AllCampaigns from './AllCampaigns'
import CampaignHeader from './CampaignHeader'
import Container from '@/components/shared/Container'
import MyCampaigns from './MyCampaigns'


const InfluencerCampaign = ({campaignType, status }: any) => {
  
  return (
    <div>
      <Container>
        <CampaignHeader />      
        {campaignType === 'campaigns' ? <AllCampaigns status={status}/> : campaignType === 'my-campaigns' ? < MyCampaigns status={status}/> : <AllCampaigns status={status}/>}  
      </Container>
    </div>
  )
}

export default InfluencerCampaign


import InfluencerCampaign from '@/components/ui/website/Influencer/InfluencerCampaign'

type PageProps = {
  searchParams: Promise<{
    campaignType?: string
    status?: string
  }>
}

const Page = async ({ searchParams }: PageProps) => {
  const params = await searchParams  
  return (    
      <InfluencerCampaign 
        campaignType={params.campaignType}
        status={params.status}
      />    
  )
}

export default Page

import InfluencerCampaign from '@/components/ui/website/Influencer/InfluencerCampaign'

type PageProps = {
  searchParams: Promise<{
    campaignType?: string,
    status?: string
  }>
}

const Page = async ({ searchParams }: PageProps) => {
  const { campaignType, status } = await searchParams
  return (
    <div>
      <InfluencerCampaign campaignType={campaignType} status={status}/>
    </div>
  )
}

export default Page

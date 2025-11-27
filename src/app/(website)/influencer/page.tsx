import InfluencerCampaign from '@/components/ui/website/Influencer/InfluencerCampaign'

type pageProps = {
  searchParams: Promise<{
    campaignType?: string,
    status?: string
  }>
}

const page = async ({ searchParams }: pageProps) => {
  const { campaignType, status } = await searchParams
  return (
    <div>
      <InfluencerCampaign campaignType={campaignType} status={status}/>
    </div>
  )
}

export default page

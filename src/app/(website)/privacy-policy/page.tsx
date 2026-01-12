// app/(website)/privacy-policy/page.tsx
import PrivacyPolicy from '@/components/ui/website/PrivacyPolicy'
import { myFetch } from '@/utils/myFetch'

const page = async () => {
  const response = await myFetch('/settings?key=privacyPolicy')

  return (
    <PrivacyPolicy content={response.data.data} />
  )
}

export default page

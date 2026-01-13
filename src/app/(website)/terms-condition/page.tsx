// app/(website)/terms-condition/page.tsx
import TermsCondition from '@/components/ui/website/TermsCondition'
import { myFetch } from '@/utils/myFetch'

const page = async () => {
  const response = await myFetch('/settings?key=termsOfService')
  return <TermsCondition content={response?.data} />
}

export default page

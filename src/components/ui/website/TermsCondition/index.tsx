// components/ui/website/TermsCondition/index.tsx
import CommonHeader from '@/components/shared/CommonHeader'
import Container from '@/components/shared/Container'
import FooterBanner from '@/components/shared/FooterBanner'
import TermsContent from './TermsContent'

interface TermsConditionProps {
  content: string
}

const TermsCondition = ({ content }: TermsConditionProps) => {
  return (
    <div>
      <CommonHeader title="Terms & Condition" />

      <Container>
        <TermsContent content={content} />
      </Container>

      <FooterBanner />
    </div>
  )
}

export default TermsCondition


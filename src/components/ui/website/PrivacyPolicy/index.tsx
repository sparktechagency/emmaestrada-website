// components/ui/website/PrivacyPolicy/index.tsx
import CommonHeader from '@/components/shared/CommonHeader'
import Container from '@/components/shared/Container'
import FooterBanner from '@/components/shared/FooterBanner'
import PolicyContent from './PolicyContent'

interface PrivacyPolicyProps {
  content: string
}

const PrivacyPolicy = ({ content }: PrivacyPolicyProps) => {
  return (
    <div>
      <CommonHeader title="Privacy Policy" />

      <Container>
        <PolicyContent content={content} />
      </Container>

      <FooterBanner />
    </div>
  )
}

export default PrivacyPolicy

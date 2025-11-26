import React from 'react'

const PolicyContent = () => {
    return (
        <div className="p-8 mt-10">
            <div
                className="rich-text-content
          prose prose-lg max-w-none
          prose-headings:text-gray-900
          prose-headings:font-semibold
          prose-h1:text-3xl
          prose-h2:text-2xl
          prose-h3:text-xl
          prose-p:text-gray-700 prose-p:leading-relaxed
          prose-ul:text-gray-700
          prose-li:text-gray-700
          prose-li:leading-relaxed
          prose-strong:text-gray-900
          prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline
          prose-hr:border-gray-200"
                dangerouslySetInnerHTML={{ __html: EditorContent }}
            />
        </div>
    )
}

export default PolicyContent

  const EditorContent = `
    <p>Welcome to Whoa! These Terms and Conditions ("Terms") govern your use of our platform, including the website, mobile application, and any related services (collectively, "the Service"). By accessing or using Musiconic, you agree to comply with and be bound by these Terms. If you do not agree to these Terms, do not use our platform.</p>

    <h3>1. Eligibility</h3>
    <ul>
    <li>To use Whoa, you must be at least 18 years old or have the legal capacity to form a binding contract.</li>
    <li>By registering, you represent that you meet these eligibility requirements.</li>
    </ul>

    <h3>2. Account Registration</h3>
    <ul>
    <li>Artists and influencers must create an account to access the platform's features.</li>
    <li>You must provide accurate, current, and complete information during registration.</li>
    <li>You are responsible for maintaining the confidentiality of your account credentials.</li>
    </ul>

    <h3>3. Platform Use</h3>
    <ul>
    <li>Artists can create campaigns to promote their music by collaborating with influencers.</li>
    <li>Influencers can apply to campaigns, create content, and receive payment for promotions.</li>
    <li>Both roles must comply with all applicable laws and regulations while using Musiconic.</li>
    </ul>

    <h3>4. Content</h3>
    <ul>
    <li>Artists: You retain ownership of your music and any content you upload to the platform.</li>
    <li>Influencers: You retain ownership of your original content, but grant Musiconic a non-exclusive, worldwide license to use, display, and share your content as part of the platform's features.</li>
    <li>Both parties agree not to upload content that is illegal, infringing, or violates the rights of others.</li>
    </ul>

    <h3>5. Payments</h3>
    <ul>
    <li>Artists will pay influencers based on agreed rates (fixed or performance-based).</li>
    <li>Influencers will receive payments via the platform's payout system.</li>
    <li>All transactions are subject to applicable fees, including platform fees (e.g., 10% for Artists, 7% for Influencers).</li>
    </ul>

    <h3>6. Prohibited Use</h3>
    <p>You agree not to use Whoa for:</p>
    <ul>
    <li>Engaging in fraudulent activity.</li>
    <li>Uploading harmful, offensive, or defamatory content.</li>
    <li>Violating any intellectual property rights.</li>
    <li>Disrupting the platform's operation or attempting to gain unauthorized access.</li>
    </ul>

    <h3>7. Termination</h3>
    <ul>
    <li>We reserve the right to suspend or terminate your account if you violate these Terms or for any other reason, at our discretion.</li>
    <li>You can deactivate your account at any time.</li>
    </ul>

    <h3>8. Privacy</h3>
    <ul>
    <li>Your use of the platform is also governed by our Privacy Policy, which outlines how we collect, use, and protect your data.</li>
    </ul>

    <h3>9. Limitation of Liability</h3>
    <ul>
    <li>Whoa is not responsible for any loss or damage resulting from your use of the platform, including any direct or indirect consequences.</li>
    <li>We do not guarantee the accuracy or reliability of content posted by users or the success of any campaigns.</li>
    </ul>

    <h3>10. Indemnification</h3>
    <ul>
    <li>You agree to indemnify and hold harmless Whoa, its employees, partners, and affiliates from any claims, bases, or damages arising from your use of the platform or violation of these Terms.</li>
    </ul>

    <h3>11. Dispute Resolution</h3>
    <ul>
    <li>Any disputes between Whoa and users will be governed by [insert Jurisdiction, e.g., the laws of the United States, State of California].</li>
    <li>Users agree to resolve disputes through binding arbitration if necessary.</li>
    </ul>

    <h3>12. Modifications</h3>
    <ul>
    <li>Whoa reserves the right to modify these Terms at any time. Any changes will be posted on this page with an updated effective date.</li>
    <li>By continuing to use the platform after changes are posted, you agree to the updated Terms.</li>
    </ul>

    <h3>13. Contact Information</h3>
    <p>If you have any questions or concerns about these Terms, please contact us at:</p>
    <ul>
    <li>Email:</li>
    <li>Phone:</li>
    </ul>
  `
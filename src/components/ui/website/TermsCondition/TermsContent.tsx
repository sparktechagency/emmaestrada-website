'use client'

interface TermsContentProps {
  content: string
}

const TermsContent = ({ content }: TermsContentProps) => {
  if (!content) {
    return (
      <div className="p-8 text-center text-muted-foreground">
        No terms content available
      </div>
    )
  }

  return (
    <div className="p-8 mt-10">
      <div
        className="
          rich-text-content
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
          prose-hr:border-gray-200
        "
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </div>
  )
}

export default TermsContent

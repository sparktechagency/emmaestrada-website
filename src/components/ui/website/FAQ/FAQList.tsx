'use client'

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { IFaq } from '@/types/faq'
import { Plus, Minus } from 'lucide-react'


interface FAQListProps {
  faqs: IFaq[]
}

const FAQList = ({ faqs }: FAQListProps) => {
  if (!faqs?.length) {
    return (
      <div className="pt-[150px] text-center text-lg text-muted-foreground">
        No FAQs available
      </div>
    )
  }

  return (
    <div className="pt-[150px]">
      {/* Header */}
      <div className="text-center mb-10">
        <h1 className="text-4xl font-extrabold text-gray-900">
          Frequently Asked Questions
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Find quick answers to common questions about our platform.
        </p>
      </div>

      {/* Accordion */}
      <Accordion
        type="single"
        collapsible
        defaultValue={faqs[0]._id}
        className="rounded-xl"
      >
        {faqs.map((faq) => (
          <AccordionItem
            key={faq._id}
            value={faq._id}
            className="mb-4 last:mb-0 glassBg shadow-lg py-5"
          >
            <AccordionTrigger className="group px-6 py-4 text-lg font-semibold hover:no-underline [&>svg]:hidden">
              <span>{faq.question}</span>

              <span className="flex items-center ml-3">
                <Plus className="h-5 w-5 group-data-[state=open]:hidden" />
                <Minus className="h-5 w-5 hidden group-data-[state=open]:block" />
              </span>
            </AccordionTrigger>

            <AccordionContent className="px-6 pb-5 text-gray-700 text-lg leading-relaxed">
              {faq.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  )
}

export default FAQList

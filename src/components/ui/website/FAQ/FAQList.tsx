'use client'

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@/components/ui/accordion'
import clsx from 'clsx'
import { Plus, Minus, ChevronDown } from 'lucide-react'

const faqs = [
    {
        id: 'q1',
        question: 'How do I create an account?',
        answer:
            'Simply visit our website or mobile app and click "Sign Up." You can register using your email address, phone number, or a third-party service like Google or Apple.',
    },
    {
        id: 'q2',
        question: 'Is there any fee to use this platform?',
        answer:
            'No, creating an account and browsing our general services is completely free. Transaction fees may apply to premium services.',
    },
    {
        id: 'q3',
        question: 'What payment methods do you accept?',
        answer:
            'We accept Visa, Mastercard, Amex, PayPal, and local payment methods depending on your region.',
    },
    {
        id: 'q4',
        question: 'How long does shipping take?',
        answer:
            'Standard delivery takes 5–7 business days. Express shipping is available within 1–3 business days.',
    },
    {
        id: 'q5',
        question: 'Can I change my order after placing it?',
        answer:
            'Please contact support within 30 minutes of placing the order. Changes are not always guaranteed.',
    },
    {
        id: 'q6',
        question: 'What is your return policy?',
        answer:
            'We offer a 30-day return policy for unused items in original packaging.',
    },
]

const FAQList = () => {

    return (
        <div className='pt-[150px]'>
            {/* Header */}
            <div className="text-center mb-10 ">
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
                defaultValue="q1"
                className=" rounded-xl"
            >
                {faqs.map((faq) => (
                    <AccordionItem value={faq.id} className="mb-4 last:mb-0 glassBg shadow-lg py-5">
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

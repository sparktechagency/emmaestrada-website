'use client'

import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Star } from 'lucide-react'

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from '@/components/ui/form'

import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import clsx from 'clsx'
import { Avatar } from '../ui/avatar'
import { AvatarFallback, AvatarImage } from '@radix-ui/react-avatar'

const ReviewModal = ({ closeModal, submitReview }: {  closeModal: () => void, submitReview?:any}) => {
    const [rating, setRating] = useState(0)

    const form = useForm({
        defaultValues: {
            review: '',
        },
    })

    const onSubmit = async (values: any) => {
        try {                        
            const data = { ratingValue: rating, feedback: values.review, type: "CREATOR" }
            
            await submitReview(data)
            closeModal()
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <div className='w-full'>
            {/* Header */}
            <h2 className="text-xl font-semibold text-center">Rate and Review</h2>

            {/* Institute Info */}
            <div className="flex items-center gap-2 bg-secondary/40 rounded-lg px-4 py-3 mt-4">
                <Avatar className="h-10 w-10">
                    <AvatarImage src="/images/profile21.jpg" />
                    <AvatarFallback className="bg-orange-500 text-white text-2xl">LR</AvatarFallback>
                </Avatar>
                <div className="gap-3 mb-2">
                    <p className="text-md font-medium">Sarah Jhonson</p>
                    <p className="text-sm text-slate-400">152 days ago by <span className="font-semibold text-primary">Pokiee Ttv</span></p>
                </div>
            </div>

            {/* Rating */}
            <div className="mt-6">
                <p className="text-sm mb-2 text-center">Tap a star to rate it!</p>

                <div className="flex items-center justify-center gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                            key={star}
                            size={28}
                            onClick={() => setRating(star)}
                            className={clsx(
                                'cursor-pointer',
                                rating >= star
                                    ? 'fill-orange-400 text-orange-400'
                                    : 'text-slate-300'
                            )}
                        />
                    ))}

                    {rating > 0 && (
                        <span className="ml-3 text-sm bg-orange-100 text-orange-600 px-2 py-1 rounded">
                            {rating} stars
                        </span>
                    )}
                </div>
            </div>

            {/* Review Form */}
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-4 mt-6"
                >
                    <FormField
                        control={form.control}
                        name="review"
                        rules={{ required: 'Review is required' }}
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Textarea
                                        {...field}
                                        placeholder="Review your experience"
                                        className="min-h-[120px]"
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <Button
                        type="submit"
                        className="w-full bg-orange-500 hover:bg-orange-600"
                        disabled={rating === 0}
                    >
                        Post Review
                    </Button>
                </form>
            </Form>
        </div>
    )
}

export default ReviewModal

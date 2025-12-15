'use client'

import React from 'react'
import { useForm } from 'react-hook-form'

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form'

import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'

const CreatorReportForm = ({ closeModal }: { closeModal: () => void }) => {
  const form = useForm({
    defaultValues: {
      message: '',
      requiresAttention: false,
    },
  })

  const onSubmit = async (values: any) => {
    try {
      console.log('Report to creator:', values)

      // 👉 call API here
      // await sendReportToCreator(values)

      closeModal()
    } catch (error) {
      console.error('Report failed:', error)
    }
  }

  return (
    <div>
      <h2 className="text-xl font-semibold text-center">
        Report an issue to the creator
      </h2>

      <p className="text-sm text-slate-500 text-center mt-2">
        Use this form to inform the creator about an issue with this campaign or
        submission. Your message will be reviewed by the creator.
      </p>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4 mt-6"
        >
          <FormField
            control={form.control}
            name="message"
            rules={{ required: 'Message is required' }}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Textarea
                    {...field}
                    placeholder="Describe the issue you want to report to the creator"
                    className="min-h-[120px]"
                    maxLength={255}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="requiresAttention"
            render={({ field }) => (
              <label className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={field.value}
                  onChange={field.onChange}
                />
                This issue requires urgent attention
              </label>
            )}
          />

          <div className="flex justify-end gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={closeModal}
            >
              Cancel
            </Button>

            <Button type="submit">
              Send Report
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}

export default CreatorReportForm

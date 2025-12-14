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

const RejectSubmissionModal = ({ closeModal }: { closeModal: () => void }) => {
  const form = useForm({
    defaultValues: {
      reason: '',
      banUser: false,
    },
  })

  const onSubmit = async (values: any) => {
    try {
      console.log('Reject Data:', values)

      // 👉 call API here
      // await rejectSubmission(values)

      closeModal()
    } catch (error) {
      console.error('Reject failed:', error)
    }
  }

  return (
    <div>
      <h2 className="text-xl font-semibold text-center">
        Reject submission by Pookie Ttv?
      </h2>

      <p className="text-sm text-slate-500 text-center mt-2">
        If you catch a user botting, please ban them. Banning users will ban them
        from this whop and reject all their submissions in your organization.
      </p>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4 mt-6"
        >
          <FormField
            control={form.control}
            name="reason"
            rules={{ required: 'Reason is required' }}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Textarea
                    {...field}
                    placeholder="Provide a brief explanation for why you are rejecting this submission"
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
            name="banUser"
            render={({ field }) => (
              <label className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={field.value}
                  onChange={field.onChange}
                />
                Also ban this user for botting
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

            <Button type="submit" variant="destructive">
              Reject
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}

export default RejectSubmissionModal

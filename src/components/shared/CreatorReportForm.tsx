'use client'

import { useForm } from 'react-hook-form'

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form'

import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'

const CreatorReportForm = ({creatorId, closeModal }: {creatorId?: string, closeModal: () => void }) => {
  const form = useForm({
    defaultValues: {
      message: '',
      requiresAttention: false,
    },
  })

  const onSubmit = async (values: any) => {
    try {
      console.log('Report to creator:', {target: creatorId, type: "CREATOR", ...values})

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
                    className="min-h-[120px] placeholder:text-xs "
                    maxLength={255}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
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

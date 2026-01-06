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

const CreatorReportForm = ({ handleReport, promotor, creator, closeModal }: { handleReport?: any, promotor?: any, creator?:any, closeModal: () => void }) => {


  const form = useForm({
    defaultValues: {
      reason: '',      
    },
  })

  const onSubmit = async (values: any) => {
    try {
      await handleReport(values)      
      // closeModal()
    } catch (error) {
      console.error('Report failed:', error)
    }
  }

  return (
    <div>
      <h2 className="text-xl font-semibold text-center">
        Report an issue to the <span className='text-primary'>{promotor ? promotor?.name ?? promotor?.userName : creator?.name ?? creator?.userName}</span>
      </h2>

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

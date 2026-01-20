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
import { myFetch } from '@/utils/myFetch'
import { toast } from 'sonner'
import { revalidate } from '@/helpers/revalidateHelper'

const RejectSubmissionForm = ({submission,  closeModal }: { submission?: any,  closeModal: () => void }) => {
  const form = useForm({
    defaultValues: {
      reason: '',  
    },
  })

  const handleSubmit = async (values: any) => {
    try {            
      const response = await myFetch(`/submissions/update-status/${submission?._id}`, {method: "PATCH", body: {status: "cancelled", reason: values.reason }});
      
      if(response?.success) {        
        revalidate("campaign-submissions")
        toast.success(response?.message);
        closeModal();
      }else{
        toast.error(response?.message);
      }
      // closeModal()
    } catch (error) {
      console.error('Reject failed:', error)
    }
  }    

  return (
    <div>
      <h2 className="text-xl font-semibold text-center">
        Reject submission by <span className='text-primary'>{submission?.influencerId?.name ?? submission?.influencerId?.userName}?</span>
      </h2>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
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
                    className="min-h-[120px] placeholder:text-xs"
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

            <Button type="submit" variant="destructive">
              Reject
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}

export default RejectSubmissionForm

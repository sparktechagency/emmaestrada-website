import { Button } from '@/components/ui/button'
import { Asterisk, Copy, ShieldCheck, SquareArrowOutUpRight } from 'lucide-react'
import React from 'react'
import { Form, useForm } from 'react-hook-form'

const AccountVerified = ({ closeModal }: any) => {
      const form = useForm({
        defaultValues: {
          username: '',
        },
      })

    const onSubmit = async (values: any) => {
    try {
      console.log(values)
      closeModal()      
    } catch (error) {
      console.error('Error creating user:', error)
    }
  }
    return (
        <div>
             <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4 mt-6"
      >
            <p className="font-semibold  text-xl mt-7 pb-3">Verify account</p>
            <p className='text-md mt-2 text-slate-500 mb-10'>A verified TikTok account is required when performing actions such as claiming Content Rewards on Whop.</p>
            <div className="p-5 text-justify bg-secondary rounded-lg shadow-lg! text-white mb-5">
                <p className='text-xl pb-2'>Copy this verification code</p>
                <div className="flex items-center gap-2">
                    <Button variant="ghost" className='bg-slate-200 text-black'>HWBZPI</Button>
                    <Copy />
                </div>
            </div>
            <div className="p-5 text-justify bg-secondary rounded-lg shadow-lg! text-white mb-5">
                <p className='text-xl pb-2'>Go to your TikTok profile</p>
                <div className="flex items-center gap-2">
                <p className='text-xs'>Navigate to your bio or description settings</p>                    
                    <SquareArrowOutUpRight size={20}/>
                </div>
            </div>
            <div className="p-5 text-justify bg-secondary rounded-lg shadow-lg! text-white mb-5">
                <p className='text-xl pb-2'>Add the verification code</p>
                 <div className="flex items-center gap-2">
                <p className='text-xs '>To verify ownership of your account you must include the 6 digits code within your profile's bio or description temporarily</p>                    
                
                    <Asterisk size={20}/>
                </div>
            </div>
            <div className="p-5 text-justify bg-secondary rounded-lg shadow-lg! text-white mb-5">
                <p className='text-xl pb-2'>Verify account</p>
                <div className="flex items-center gap-2">
                    <p className='text-xs '>Click verify once you've added the code to your profile</p>                    
                    <ShieldCheck size={20}/>
                </div>
            </div>
            <button onClick={closeModal} className="btn w-full bg-blue-700 text-white">
                Submit
            </button>
            </form>
            </Form>
        </div>
    )
}

export default AccountVerified
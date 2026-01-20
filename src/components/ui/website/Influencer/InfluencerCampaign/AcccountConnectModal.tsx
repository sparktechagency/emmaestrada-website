'use client'

import React from 'react'
import { useForm } from 'react-hook-form'

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'

import { Input } from '@/components/ui/input'

const AcccountConnectModal = ({ closeModal, setOpenVerifiedModal }: any) => {
  const form = useForm({
    defaultValues: {
      username: '',
    },
  })

  const onSubmit = async () => {
    try {      
      closeModal()
      setOpenVerifiedModal(true)
    } catch (error) {
      console.error('Error creating user:', error)
    }
  }

  return (
    <div className="">
        <h1 className='text-center text-2xl font-semibold'>Link your tiktok</h1>
        <p className='text-md mt-2 text-slate-500 text-center'>Enter your tiktok account URL to connect your account,and generate a verification code</p>
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4 mt-6"
      >
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>              
              <FormControl>
                <Input
                  placeholder="Enter tiktok username"
                  {...field}
                  className="bg-secondary/20 h-12"
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <button
          type="submit"
          className="btn w-full bg-blue-700 text-white"
        >
          Submit
        </button>
      </form>
    </Form>
    </div>
  )
}

export default AcccountConnectModal

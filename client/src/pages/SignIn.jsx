import { Button } from '@/components/ui/Button';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import React from 'react'

const SignIn = () => {
  return (
    <div className='flex justify-center items-center h-screen w-screen' >
         
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} >
        <div className='mb-3'>
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="shadcn" {...field} />
              </FormControl>
              
              <FormMessage />
            </FormItem>
          )}
        />
        </div>
       
        <Button type="submit">Submit</Button>
      </form>
    </Form>

    </div>
  )
}

export default SignIn;
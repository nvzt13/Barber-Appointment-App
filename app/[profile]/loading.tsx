import { Loader2Icon } from 'lucide-react'
import React from 'react'

const loading = () => {
  return (
    <div className='flex items-center justify-center w-screen h-screen'>
        <Loader2Icon className='animate-spin' />
    </div>
  )
}

export default loading
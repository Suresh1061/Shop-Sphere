import { Loader } from 'lucide-react'
import React from 'react'

const Loading = () => {
    return (
        <div className='h-screen  w-full flex justify-center items-center fixed top-0 left-0'>
            <Loader className=' h-10 w-10 text-slate-800 animate-spin' />
        </div>
    )
}

export default Loading;
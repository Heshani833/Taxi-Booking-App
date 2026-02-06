import React from 'react'
import Image from 'next/image'
import { UserButton } from '@clerk/nextjs'

export const NavBar = () => {
  return (
    <div className='flex justify-between items-center px-6 py-3 shadow-sm border-b border-gray-100 bg-white'>
        <div className='flex items-center gap-3'>
            <Image src='/logo.png'
            alt='logo'
            width={80}
            height={80}
            className='rounded-2xl'
            />
            <span className='text-xl font-bold text-blue-500 tracking-tight'>TaxiGo</span>
        </div>
        <div className='flex gap-8 items-center'>
            <h2 className='text-lg font-medium text-gray-700 hover:text-blue-500 cursor-pointer transition-colors'>Home</h2>
            <h2 className='text-lg font-medium text-gray-700 hover:text-blue-500 cursor-pointer transition-colors'>History</h2>
            <h2 className='text-lg font-medium text-gray-700 hover:text-blue-500 cursor-pointer transition-colors'>Help</h2>
        </div>
        <div>
            <UserButton />
        </div>
    </div>
  )
}

'use client'

import React, { useState, useEffect } from 'react'
import AutoCompleteAddress from './AutoCompleteAddress'

const Booking = () => {
  const [screenHeight, setScreenHeight] = useState(0)

  useEffect(() => {
    setScreenHeight(window.innerHeight*0.75)
  }, [])

  return (
    <div className='p-5'>
        <h2 className='text-[20px] font-semibold text-black'>Booking</h2>
        <div className='border-[1px] p-5 rounded-md'
        style={{height: screenHeight}}
        >

        <AutoCompleteAddress/>
    </div>
    </div>
  )
}

export default Booking
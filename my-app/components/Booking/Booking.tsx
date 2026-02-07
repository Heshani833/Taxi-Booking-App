'use client'

import React, { useState, useEffect } from 'react'
import AutoCompleteAddress from './AutoCompleteAddress'

interface BookingProps {
  onSearch: (
    from: string,
    to: string,
    fromCoords: [number, number] | null,
    toCoords: [number, number] | null
  ) => void
  distance?: number | null
  duration?: number | null
}

const Booking = ({ onSearch, distance, duration }: BookingProps) => {
  const [screenHeight, setScreenHeight] = useState(0)

  useEffect(() => {
    setScreenHeight(window.innerHeight * 0.75)
  }, [])

  return (
    <div className='p-5'>
      <h2 className='text-[20px] font-semibold text-black'>Booking</h2>
      <div
        className='border-[1px] p-5 rounded-md'
        style={{ height: screenHeight }}
      >
        <AutoCompleteAddress onSearch={onSearch} />

        {/* Distance & Time info */}
        {distance != null && duration != null && (
          <div className='mt-5 p-4 bg-white rounded-lg border border-gray-200 shadow-sm'>
            <h3 className='font-semibold text-gray-800 mb-2'>Trip Estimate</h3>
            <div className='flex justify-between text-sm'>
              <div>
                <span className='text-gray-500'>Distance:</span>
                <span className='ml-2 font-medium text-gray-800'>
                  {distance.toFixed(1)} km
                </span>
              </div>
              <div>
                <span className='text-gray-500'>Time:</span>
                <span className='ml-2 font-medium text-gray-800'>
                  ~{duration} min
                </span>
              </div>
            </div>
            <div className='mt-2 pt-2 border-t border-gray-100'>
              <span className='text-gray-500 text-sm'>Estimated Fare:</span>
              <span className='ml-2 font-bold text-blue-600'>
                LKR {(distance * 60).toFixed(0)}
              </span>
              <span className='text-gray-400 text-xs ml-1'>(~60 LKR/km)</span>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Booking
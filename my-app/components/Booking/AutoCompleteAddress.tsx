import React from 'react'

const AutoCompleteAddress = () => {
  return (
    <div>
    <div className='mt-5'>
        <div className='text-black'>
            <label className='text-gray-500'> Where From ? </label>
            <input type='text' className='bg-white p-1 border border-gray-300 w-full rounded-md outline-none shadow-none focus:outline-none focus:ring-0 focus:border-gray-300'/>
        </div>
    </div>
    <div className='mt-3'>
        <div className='text-black'>
            <label className='text-gray-500'> Where To ? </label>
            <input type='text' className='bg-white p-1 border border-gray-300 w-full rounded-md outline-none shadow-none focus:outline-none focus:ring-0 focus:border-gray-300'/>
        </div>
    </div>
    </div>
    
  )
}

export default AutoCompleteAddress
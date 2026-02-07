'use client'

import React, { useState, useCallback } from 'react'
import Booking from '@/components/Booking/Booking'
import Map from '@/components/Map/Map'

export default function Home() {
  const [fromCoords, setFromCoords] = useState<[number, number] | null>(null)
  const [toCoords, setToCoords] = useState<[number, number] | null>(null)
  const [distance, setDistance] = useState<number | null>(null)
  const [duration, setDuration] = useState<number | null>(null)

  const handleSearch = useCallback(
    (
      _from: string,
      _to: string,
      fromCoords: [number, number] | null,
      toCoords: [number, number] | null
    ) => {
      setFromCoords(fromCoords)
      setToCoords(toCoords)
      // Reset distance/duration when new search is triggered
      setDistance(null)
      setDuration(null)
    },
    []
  )

  const handleRouteFound = useCallback((dist: number, time: number) => {
    setDistance(dist)
    setDuration(time)
  }, [])

  return (
    <div className="h-full">
      <div className="grid grid-cols-1 md:grid-cols-3 h-full">
        <div className="bg-blue-200 overflow-auto">
          <Booking
            onSearch={handleSearch}
            distance={distance}
            duration={duration}
          />
        </div>
        <div className="col-span-2 bg-amber-100">
          <Map
            fromCoords={fromCoords}
            toCoords={toCoords}
            onRouteFound={handleRouteFound}
          />
        </div>
      </div>
    </div>
  )
}

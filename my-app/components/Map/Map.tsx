'use client'

import React from 'react'
import dynamic from 'next/dynamic'

// Dynamically import MapView with SSR disabled (Leaflet requires window/document)
const MapView = dynamic(() => import('./MapView'), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center h-full w-full bg-gray-100">
      <div className="text-gray-500 text-lg">Loading Map...</div>
    </div>
  ),
})

interface MapProps {
  fromCoords?: [number, number] | null
  toCoords?: [number, number] | null
  onRouteFound?: (distance: number, time: number) => void
}

const Map = ({ fromCoords, toCoords, onRouteFound }: MapProps) => {
  return (
    <div className="h-full w-full">
      <MapView
        fromCoords={fromCoords}
        toCoords={toCoords}
        onRouteFound={onRouteFound}
      />
    </div>
  )
}

export default Map

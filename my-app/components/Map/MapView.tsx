'use client'

import React, { useEffect, useRef, useState } from 'react'
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet-routing-machine'

// Fix default marker icons for Leaflet in Next.js
delete (L.Icon.Default.prototype as any)._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
})

// Component to handle routing inside the map
function RoutingControl({
  fromCoords,
  toCoords,
  onRouteFound,
}: {
  fromCoords: [number, number]
  toCoords: [number, number]
  onRouteFound?: (distance: number, time: number) => void
}) {
  const map = useMap()
  const routingControlRef = useRef<any>(null)

  useEffect(() => {
    if (!map || !fromCoords || !toCoords) return

    // Remove old routing control
    if (routingControlRef.current) {
      try {
        map.removeControl(routingControlRef.current)
      } catch {
        // ignore
      }
    }

    const control = (L as any).Routing.control({
      waypoints: [
        L.latLng(fromCoords[0], fromCoords[1]),
        L.latLng(toCoords[0], toCoords[1]),
      ],
      routeWhileDragging: false,
      addWaypoints: false,
      router: (L as any).Routing.osrmv1({
        serviceUrl: 'https://router.project-osrm.org/route/v1',
      }),
      showAlternatives: true,
      lineOptions: {
        styles: [{ color: '#3b82f6', weight: 5, opacity: 0.8 }],
        extendToWaypoints: true,
        missingRouteTolerance: 0,
      },
      fitSelectedRoutes: true,
      show: false, // Hide the text directions panel
    })

    // Monkey-patch _clearLines to guard against null _map
    // (async XHR callbacks can fire after the control is removed)
    const origClearLines = control._clearLines?.bind(control)
    if (origClearLines) {
      control._clearLines = function () {
        if (this._map) {
          origClearLines()
        }
      }
    }

    control.addTo(map)

    control.on('routesfound', (e: any) => {
      const route = e.routes[0]
      const distanceKm = route.summary.totalDistance / 1000
      const timeMin = Math.round(route.summary.totalTime / 60)
      if (onRouteFound) {
        onRouteFound(distanceKm, timeMin)
      }
    })

    routingControlRef.current = control

    // Fit bounds to show both markers
    const bounds = L.latLngBounds([fromCoords, toCoords])
    map.fitBounds(bounds, { padding: [50, 50] })

    return () => {
      const ctrl = routingControlRef.current
      routingControlRef.current = null
      if (ctrl) {
        try {
          // Set waypoints to empty to abort pending route requests
          ctrl.setWaypoints([])
          if (ctrl._map) {
            map.removeControl(ctrl)
          }
        } catch {
          // ignore – map may already be destroyed
        }
      }
    }
  }, [map, fromCoords, toCoords, onRouteFound])

  return null
}

interface MapViewProps {
  fromCoords?: [number, number] | null
  toCoords?: [number, number] | null
  onRouteFound?: (distance: number, time: number) => void
  center?: [number, number]
  zoom?: number
}

const MapView = ({
  fromCoords,
  toCoords,
  onRouteFound,
  center = [7.45, 81.87],
  zoom = 8,
}: MapViewProps) => {
  return (
    <MapContainer
      center={center}
      zoom={zoom}
      style={{ height: '100%', width: '100%' }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {fromCoords && (
        <Marker position={fromCoords}>
          <Popup>Pickup Location</Popup>
        </Marker>
      )}
      {toCoords && (
        <Marker position={toCoords}>
          <Popup>Drop-off Location</Popup>
        </Marker>
      )}
      {fromCoords && toCoords && (
        <RoutingControl
          fromCoords={fromCoords}
          toCoords={toCoords}
          onRouteFound={onRouteFound}
        />
      )}
    </MapContainer>
  )
}

export default MapView

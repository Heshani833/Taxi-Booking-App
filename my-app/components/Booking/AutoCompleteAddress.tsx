'use client'

import React, { useState, useRef, useCallback } from 'react'

interface Suggestion {
  place_id: number
  display_name: string
  lat: string
  lon: string
}

interface AutoCompleteAddressProps {
  onSearch: (
    from: string,
    to: string,
    fromCoords: [number, number] | null,
    toCoords: [number, number] | null
  ) => void
}

const AutoCompleteAddress = ({ onSearch }: AutoCompleteAddressProps) => {
  const [from, setFrom] = useState('')
  const [to, setTo] = useState('')
  const [fromSuggestions, setFromSuggestions] = useState<Suggestion[]>([])
  const [toSuggestions, setToSuggestions] = useState<Suggestion[]>([])
  const [fromCoords, setFromCoords] = useState<[number, number] | null>(null)
  const [toCoords, setToCoords] = useState<[number, number] | null>(null)
  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null)

  const fetchSuggestions = useCallback(
    (query: string, setSuggestions: React.Dispatch<React.SetStateAction<Suggestion[]>>) => {
      if (debounceTimerRef.current) clearTimeout(debounceTimerRef.current)
      if (query.length < 3) {
        setSuggestions([])
        return
      }
      debounceTimerRef.current = setTimeout(async () => {
        try {
          const res = await fetch(
            `https://nominatim.openstreetmap.org/search?format=json&countrycodes=lk&q=${encodeURIComponent(query)}`
          )
          const data = await res.json()
          setSuggestions(data.slice(0, 5))
        } catch (error) {
          console.error('Error fetching suggestions:', error)
        }
      }, 500) // Debounce 500ms to respect Nominatim rate limits
    },
    []
  )

  return (
    <div>
      {/* From Address */}
      <div className="mt-5 relative">
        <label className="text-gray-500">Where From?</label>
        <input
          type="text"
          value={from}
          onChange={(e) => {
            setFrom(e.target.value)
            setFromCoords(null)
            fetchSuggestions(e.target.value, setFromSuggestions)
          }}
          className="bg-white p-1 border border-gray-300 w-full rounded-md outline-none shadow-none focus:outline-none focus:ring-0 focus:border-gray-300"
          placeholder="Enter pickup location"
        />
        {fromSuggestions.length > 0 && (
          <ul className="absolute z-10 bg-white border border-gray-300 rounded-md mt-1 max-h-40 overflow-auto w-full shadow-lg">
            {fromSuggestions.map((sug) => (
              <li
                key={sug.place_id}
                onClick={() => {
                  setFrom(sug.display_name)
                  setFromCoords([parseFloat(sug.lat), parseFloat(sug.lon)])
                  setFromSuggestions([])
                }}
                className="p-2 hover:bg-blue-50 cursor-pointer text-sm text-gray-700 border-b border-gray-100 last:border-b-0"
              >
                {sug.display_name}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* To Address */}
      <div className="mt-3 relative">
        <label className="text-gray-500">Where To?</label>
        <input
          type="text"
          value={to}
          onChange={(e) => {
            setTo(e.target.value)
            setToCoords(null)
            fetchSuggestions(e.target.value, setToSuggestions)
          }}
          className="bg-white p-1 border border-gray-300 w-full rounded-md outline-none shadow-none focus:outline-none focus:ring-0 focus:border-gray-300"
          placeholder="Enter drop-off location"
        />
        {toSuggestions.length > 0 && (
          <ul className="absolute z-10 bg-white border border-gray-300 rounded-md mt-1 max-h-40 overflow-auto w-full shadow-lg">
            {toSuggestions.map((sug) => (
              <li
                key={sug.place_id}
                onClick={() => {
                  setTo(sug.display_name)
                  setToCoords([parseFloat(sug.lat), parseFloat(sug.lon)])
                  setToSuggestions([])
                }}
                className="p-2 hover:bg-blue-50 cursor-pointer text-sm text-gray-700 border-b border-gray-100 last:border-b-0"
              >
                {sug.display_name}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Search Button */}
      <button
        onClick={() => onSearch(from, to, fromCoords, toCoords)}
        className="p-3 w-full mt-5 bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-700 active:scale-92 transition-all duration-200"
      >
        Search
      </button>
    </div>
  )
}

export default AutoCompleteAddress
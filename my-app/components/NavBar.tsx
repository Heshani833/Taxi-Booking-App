'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { UserButton } from '@clerk/nextjs'
import { HiMenu, HiX } from 'react-icons/hi'

const navItems = [
  { name: 'Home', href: '/' },
  { name: 'History', href: '/history' },
  { name: 'Help', href: '/help' },
]

export const NavBar = () => {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <nav className='sticky top-0 z-50 bg-white/80 backdrop-blur-md shadow-md border-b border-gray-200'>
      <div className='flex justify-between items-center px-8 py-3'>
        {/* Logo */}
        <Link href='/' className='flex items-center gap-3'>
          <Image
            src='/logo.png'
            alt='logo'
            width={70}
            height={70}
            className='rounded-xl drop-shadow-sm'
          />
          <span className='text-2xl font-extrabold bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent tracking-tight select-none'>
            TaxiGo
          </span>
        </Link>

        {/* Desktop Nav Links */}
        <div className='hidden md:flex gap-1 items-center'>
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`px-4 py-2 text-sm font-semibold rounded-full transition-all duration-200 ${
                pathname === item.href
                  ? 'bg-blue-100 text-blue-600'
                  : 'text-gray-600 hover:bg-blue-50 hover:text-blue-600'
              }`}
            >
              {item.name}
            </Link>
          ))}
        </div>

        {/* Right side: UserButton + Mobile Toggle */}
        <div className='flex items-center gap-4'>
          <UserButton afterSignOutUrl='/' />
          <button
            className='md:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors'
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label='Toggle menu'
          >
            {mobileOpen ? <HiX size={24} /> : <HiMenu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Nav Links */}
      {mobileOpen && (
        <div className='md:hidden flex flex-col gap-1 px-6 pb-4 animate-in slide-in-from-top'>
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              className={`px-4 py-3 text-sm font-semibold rounded-lg transition-all duration-200 ${
                pathname === item.href
                  ? 'bg-blue-100 text-blue-600'
                  : 'text-gray-600 hover:bg-blue-50 hover:text-blue-600'
              }`}
            >
              {item.name}
            </Link>
          ))}
        </div>
      )}
    </nav>
  )
}

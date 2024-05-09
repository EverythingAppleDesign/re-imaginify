"use client"

import { navLinks } from '@/constants'
import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs'
import { link } from 'fs'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Button } from '../ui/button'
// import React from 'react'

const Sidebar = () => {
    const pathname = usePathname();

  return (
    <aside className='sidebar'>
        <div className='flex size-full flex-col gap-4'>
            <Link href="/" className='sidebar-logo'>
                <Image src="/assets/images/logo-text.svg" alt="logo" width={180} height={28} />
            </Link>

            <nav className='sidebar-nav'>
                {/* Use only when a user is signed in... */}
                <SignedIn>
                    <ul className='sidebar-nav_elements'>
                        {navLinks.slice(0, 6).map((link) => {
                            const isActive = link.route === pathname

                            return (
                                <li key={link.route} className={`sidebar-nav_element group ${isActive ? 'bg-purple-gradient text-white' : 'text-gray-700'
                                }`}>
                                    {/* Sidebar Navigation Links */}
                                    <Link className='sidebar-link' href={link.route}>
                                        <Image
                                        src={link.icon}
                                        alt='logo'
                                        width={24}
                                        height={24}
                                        className={`${isActive && 'brightness-200'}`} 
                                        />
                                        {link.label}
                                    </Link>
                                </li>
                            )
                        })}
                    </ul>

                    <ul className='sidebar-nav_elements'>

                        {navLinks.slice(6).map((link) => {
                                const isActive = link.route === pathname

                                return (
                                    <li key={link.route} className={`sidebar-nav_element group ${isActive ? 'bg-purple-gradient text-white' : 'text-gray-700'
                                    }`}>
                                        {/* Sidebar Navigation Links */}
                                        <Link className='sidebar-link' href={link.route}>
                                            <Image
                                            src={link.icon}
                                            alt='logo'
                                            width={24}
                                            height={24}
                                            className={`${isActive && 'brightness-200'}`} 
                                            />
                                            {link.label}
                                        </Link>
                                    </li>
                                )
                            })}

                        <li className='flex-center cursor-pointer gap-2 p-4'>
                            <UserButton afterSignOutUrl='/' showName />
                        </li>
                    </ul>
                </SignedIn>

                <SignedOut>
                    <Button asChild className='button bg-orange-400 bg-cover transition-all hover:bg-orange-500'>
                        <Link href="/dashboard">Login</Link>
                    </Button>
                </SignedOut>
            </nav>
        </div>
    </aside>
  )
}

export default Sidebar
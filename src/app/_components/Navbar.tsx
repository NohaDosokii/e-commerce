'use client'
import Link from 'next/link'
import React, { useContext, useState } from 'react'
import logo from '@/images/freshcart-logo.svg'
import Image from 'next/image'
import { signOut, useSession } from 'next-auth/react'
import { cartContext } from '../providers/cartContextProvider'
import { Badge } from '@/components/ui/badge'
import { usePathname } from 'next/navigation'
import { Menu, X } from 'lucide-react'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  function handleLogOut() {
    signOut({ redirect: true, callbackUrl: '/login' })
  }

  const session = useSession()
  const cart = useContext(cartContext);

  if (!cart) return null;

  const { numOfCartItems } = cart;

  const pathname = usePathname()

  const linkStyle = (path: string) =>
    pathname === path ? "border-b-2 border-black pb-1" : ""

  return (
    <>
      <nav className='fixed top-0 left-0 w-full z-50 bg-[#f6f3e8] flex items-center p-5'>


        <div>
          <Image src={logo} alt="logo" />
        </div>


        <div className='hidden md:flex justify-center grow'>
          <ul className='flex items-center gap-4'>

            <li>
              <Link className={linkStyle('/')} href="/">Home</Link>
            </li>

            <li className='relative pr-3'>
              <Badge className='absolute -top-2 -right-2 min-w-4.5 h-4.5 flex items-center justify-center p-0 text-xs'>
                {numOfCartItems}
              </Badge>
              <Link className={linkStyle('/cart')} href="/cart">Cart</Link>
            </li>

            <li>
              <Link className={linkStyle('/wishlist')} href="/wishlist">Wish list</Link>
            </li>

            <li>
              <Link className={linkStyle('/products')} href="/products">Products</Link>
            </li>

            <li>
              <Link className={linkStyle('/categories')} href="/categories">Categories</Link>
            </li>

            <li>
              <Link className={linkStyle('/brands')} href="/brands">Brands</Link>
            </li>

          </ul>
        </div>

        <div className='flex items-center gap-3 ml-auto'>

          <ul className='hidden md:flex gap-3'>
            {session.data ? (
              <li><button onClick={handleLogOut}>Logout</button></li>
            ) : (
              <>
                <li><Link href="/login">login</Link></li>
                <li><Link href="/signup">signup</Link></li>
              </>
            )}
          </ul>


          <button
            onClick={() => setIsOpen(!isOpen)}
            className='md:hidden'
          >
            {isOpen ? <X /> : <Menu />}
          </button>
        </div>
      </nav>

      {isOpen && (
        <div className='md:hidden fixed top-20 left-0 w-full bg-[#f6f3e8] shadow-md p-5 z-9999'>


          <ul className='flex flex-col gap-4'>

            <li><Link onClick={() => setIsOpen(false)} className={linkStyle('/')} href="/">Home</Link></li>

            <li className='relative'>
              <Badge className='absolute -top-2 left-12 min-w-4.5 h-4.5 flex items-center justify-center p-0 text-xs'>
                {numOfCartItems}
              </Badge>
              <Link onClick={() => setIsOpen(false)} className={linkStyle('/cart')} href="/cart">Cart</Link>
            </li>

            <li>
              <Link onClick={() => setIsOpen(false)} className={linkStyle('/wishlist')} href="/wishlist">
                Wish list
              </Link>
            </li>
            <li><Link onClick={() => setIsOpen(false)} className={linkStyle('/products')} href="/products">Products</Link></li>
            <li><Link onClick={() => setIsOpen(false)} className={linkStyle('/categories')} href="/categories">Categories</Link></li>
            <li><Link onClick={() => setIsOpen(false)} className={linkStyle('/brands')} href="/brands">Brands</Link></li>

            <hr />

            {session.data ? (
              <li><button onClick={handleLogOut}>Logout</button></li>
            ) : (
              <>
                <li><Link onClick={() => setIsOpen(false)} href="/login">login</Link></li>
                <li><Link onClick={() => setIsOpen(false)} href="/signup">signup</Link></li>
              </>
            )}

          </ul>
        </div>
      )}
    </>
  )
}

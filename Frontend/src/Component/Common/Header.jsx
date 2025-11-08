import React from 'react'
import Topbar from '../Layout/Topbar'
import Navbar from './Navbar'

const Header = () => {
  return (
     <>
     <header className='top-0 z-50 bg-white border-b border-gray-300'>
       <Topbar/>
       <Navbar/>
     </header>
     </>
  )
}

export default Header

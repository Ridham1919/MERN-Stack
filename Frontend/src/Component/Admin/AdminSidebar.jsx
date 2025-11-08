import React from 'react'
import { FaBoxOpen, FaSignInAlt, FaStore, FaUser } from 'react-icons/fa'
import { FaClipboardList } from 'react-icons/fa6'
import { useDispatch } from 'react-redux'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { logout } from '../../redux/slices/authSlice'
import { clearCart } from '../../redux/slices/cartSlice'

const AdminSidebar = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(logout());
        dispatch(clearCart());
        navigate("/");
    }
  return (
    <div className='p-6'>
      {/* Logo */}
      <div className='mb-6 text-center'>
        <Link to="/admin" className="text-3xl  font-medium">
          ShopMart
        </Link>
      </div>

      {/* Gray Line */}
      <div className="border-t border-gray-300 my-5"></div>

      {/* Heading */}
      <h2 className='text-xl text-gray-400 font-medium mb-6 text-center'>
        Admin Dashboard
      </h2>

      {/* Navigation Links */}
      <nav className='flex flex-col space-y-2'>
        <NavLink
          to="/admin/users"
          className={({ isActive }) =>
            isActive
              ? "bg-gray-700 text-white py-3 px-4 rounded flex items-center space-x-2"
              : "text-gray-300 hover:bg-gray-700 hover:text-white py-3 px-4 rounded flex items-center space-x-2"
          }
        >
          <FaUser />
          <span>Users</span>
        </NavLink>
        <NavLink
          to="/admin/products"
          className={({ isActive }) =>
            isActive
              ? "bg-gray-700 text-white py-3 px-4 rounded flex items-center space-x-2"
              : "text-gray-300 hover:bg-gray-700 hover:text-white py-3 px-4 rounded flex items-center space-x-2"
          }
        >
          <FaBoxOpen />
          <span>Products</span>
        </NavLink>
        <NavLink
          to="/admin/orders"
          className={({ isActive }) =>
            isActive
              ? "bg-gray-700 text-white py-3 px-4 rounded flex items-center space-x-2"
              : "text-gray-300 hover:bg-gray-700 hover:text-white py-3 px-4 rounded flex items-center space-x-2"
          }
        >
          <FaClipboardList/>
          <span>Orders</span>
        </NavLink>
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive
              ? "bg-gray-700 text-white py-3 px-4 rounded flex items-center space-x-2"
              : "text-gray-300 hover:bg-gray-700 hover:text-white py-3 px-4 rounded flex items-center space-x-2"
          }
        >
          <FaStore />
          <span>Shop</span>
        </NavLink>
      </nav>
      <div className='mt-6'>
        <button onClick={handleLogout} className='w-full bg-red-600 hover:bg-red-500 text-white py-2 px-4 rounded flex items-center
        justify-center space-x-2'>
            <FaSignInAlt/>
            <span>Logout</span>
        </button>
      </div>
    </div>
  )
}

export default AdminSidebar

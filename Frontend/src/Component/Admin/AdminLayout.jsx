import React, { useState } from 'react';
import { FaBars } from 'react-icons/fa';
import AdminSidebar from './AdminSidebar';
import { Outlet } from 'react-router-dom';

const AdminLayout = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        <div className="min-h-screen flex flex-col md:flex-row bg-gray-100 relative overflow-hidden">
            {/* Mobile Header */}
            <div className="flex items-center justify-between md:hidden p-4 bg-gray-900 text-white z-30">
                <button onClick={toggleSidebar} className="flex items-center space-x-3">
                    <FaBars size={24} />
                    <h1 className="text-xl font-medium">Admin Dashboard</h1>
                </button>
            </div>

            {/* Overlay (visible only when sidebar open on mobile) */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden"
                    onClick={toggleSidebar}
                ></div>
            )}

            {/* Sidebar */}
            <div
                className={`bg-gray-900 w-60 min-h-screen text-white fixed md:relative top-0 left-0 transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
                    } transition-transform duration-300 ease-in-out md:translate-x-0 md:static z-30`}
            >
                <AdminSidebar />
            </div>

            {/* Main Content */}
            <div className="flex-grow p-6 overflow-auto">
                <Outlet/>
            </div>
        </div>
    );
};

export default AdminLayout;

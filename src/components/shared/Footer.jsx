import React from 'react'
import mainLogo from '../../assets/main-icon-white.png'
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedinIn, FaYoutube, FaPinterest } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer className='bg-[#1a1a1a] text-gray-400 text-xs mt-auto'>
            <div className='border-t border-gray-700 w-full' />

            <div className='flex flex-col items-center py-6'>
                <img src={mainLogo} alt="BookMyScreen Logo" className='h-8 w-auto mb-4' />
            </div>
            
            <div className='flex justify-center gap-3 mb-4'>
                <FaFacebook className='w-8 h-8 rounded-full bg-gray-700 text-white p-1.5 hover:bg-red-500 transition cursor-pointer' />
                <FaTwitter className='w-8 h-8 rounded-full bg-gray-700 text-white p-1.5 hover:bg-red-500 transition cursor-pointer' />
                <FaInstagram className='w-8 h-8 rounded-full bg-gray-700 text-white p-1.5 hover:bg-red-500 transition cursor-pointer' />
                <FaLinkedinIn className='w-8 h-8 rounded-full bg-gray-700 text-white p-1.5 hover:bg-red-500 transition cursor-pointer' />
                <FaYoutube className='w-8 h-8 rounded-full bg-gray-700 text-white p-1.5 hover:bg-red-500 transition cursor-pointer' />
                <FaPinterest className='w-8 h-8 rounded-full bg-gray-700 text-white p-1.5 hover:bg-red-500 transition cursor-pointer' />
            </div>

            <div className='max-w-3xl mx-auto px-4 pb-6 text-center space-y-2'>
                <p className='text-gray-300'>
                    &copy; 2026 BookMyScreen. All rights reserved.
                </p>
                <p className='text-gray-500 text-xs'>
                    Designed and developed by BookMyScreen. Content is provided for personal use only.
                </p>
                <p className='text-gray-500 text-xs'>
                    Use of this site constitutes acceptance of our
                    <a href="#" className='text-red-500 hover:underline ml-1'>Privacy Policy</a> and
                    <a href="#" className='text-red-500 hover:underline ml-1'>Terms of Service</a>.
                </p>
            </div>
        </footer>
    )
}
export default Footer
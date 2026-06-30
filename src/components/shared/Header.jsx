import React from 'react';
import { Link } from 'react-router-dom';
import mainLogo from '../../assets/main-icon.png';
import { FaSearch } from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext';

const Header = () => {
  const { isAuthenticated, user, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
  };

  return (
    <div className='w-full text-sm bg-white shadow-lg relative z-50'>
      {/* Top Navbar */}
      <div className='px-4 md:px-6 lg:px-8'>
        <div className='max-w-7xl mx-auto flex justify-between items-center py-2.5 lg:py-3'>
          {/* left part */}
          <div className='flex items-center gap-3 lg:gap-4'>
            <Link to='/' className='cursor-pointer hover:opacity-80 transition'>
              <img src={mainLogo} alt='logo' className='h-7 lg:h-8 object-contain' />
            </Link>

            <div className='relative hidden md:block'>
              <input
                type='text'
                placeholder='Search movies, events, plays, sports'
                className='border border-gray-300 rounded-lg px-4 py-1.5 w-72 lg:w-80 text-xs lg:text-sm outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition'
              />
              <FaSearch className='absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs' />
            </div>
          </div>
          
          {/* right part */}
          <div className='flex items-center gap-2'>
            <div className='flex items-center text-xs lg:text-sm font-medium gap-2'>
              {isAuthenticated ? (
                <>
                  <span className='text-gray-600 hidden sm:inline'>Hi, {user?.name?.split(' ')[0]}</span>
                  {user?.role === 'admin' && (
                    <Link
                      to='/admin'
                      className='bg-gradient-to-r from-purple-600 to-purple-700 cursor-pointer text-white px-3 lg:px-4 py-1.5 lg:py-2 rounded-lg text-xs lg:text-sm font-medium hover:from-purple-700 hover:to-purple-800 transition shadow-md'
                    >
                      Admin
                    </Link>
                  )}
                  <Link
                    to='/profile'
                    className='bg-gradient-to-r from-[#f84464] to-[#ea4456] cursor-pointer text-white px-3 lg:px-4 py-1.5 lg:py-2 rounded-lg text-xs lg:text-sm font-medium hover:from-red-600 hover:to-red-700 transition shadow-md'
                  >
                    Profile
                  </Link>
                  <button
                    onClick={handleLogout}
                    className='bg-gradient-to-r from-gray-500 to-gray-600 cursor-pointer text-white px-3 lg:px-4 py-1.5 lg:py-2 rounded-lg text-xs lg:text-sm font-medium hover:from-gray-600 hover:to-gray-700 transition shadow-md'
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to='/login'
                    className='bg-gradient-to-r from-gray-500 to-gray-600 cursor-pointer text-white px-3 lg:px-4 py-1.5 lg:py-2 rounded-lg text-xs lg:text-sm font-medium hover:from-gray-600 hover:to-gray-700 transition shadow-md'
                  >
                    Login
                  </Link>
                  <Link
                    to='/signup'
                    className='bg-gradient-to-r from-[#f84464] to-[#ea4456] cursor-pointer text-white px-3 lg:px-4 py-1.5 lg:py-2 rounded-lg text-xs lg:text-sm font-medium hover:from-red-600 hover:to-red-700 transition shadow-md'
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
      
      {/* Bottom Navbar */}
      <div className='bg-gray-100 border-t border-gray-200 py-2'>
        <div className='max-w-7xl mx-auto flex items-center justify-between px-4 md:px-6 lg:px-8 text-xs lg:text-sm'>
          <div className='flex items-center gap-4 lg:gap-6 font-medium text-gray-700'>
            <Link to='/' className='cursor-pointer hover:text-red-500 transition'>Home</Link>
            <Link to='/movies' className='cursor-pointer hover:text-red-500 transition'>Movies</Link>
            <span className='cursor-pointer hover:text-red-500 transition hidden sm:inline'>Events</span>
            <span className='cursor-pointer hover:text-red-500 transition hidden sm:inline'>Plays</span>
            <span className='cursor-pointer hover:text-red-500 transition hidden md:inline'>Sports</span>
            <span className='cursor-pointer hover:text-red-500 transition hidden md:inline'>Activities</span>
          </div>

          <div className='flex items-center gap-4 lg:gap-6 text-xs lg:text-sm text-gray-600'>
            <span className='cursor-pointer hover:text-red-500 transition'>ListYourShow</span>
            <span className='cursor-pointer hover:text-red-500 transition hidden lg:inline'>Corporates</span>
            <span className='cursor-pointer hover:text-red-500 transition hidden sm:inline'>Offers</span>
            <span className='cursor-pointer hover:text-red-500 transition'>Gift Cards</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
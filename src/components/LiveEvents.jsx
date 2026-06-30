import React from 'react'
import { events } from '../utils/constants'

const LiveEvents = () => {
    return (
        <div className='max-w-screen-xl mx-auto px-4 py-10'>
            <h2 className='text-2xl font-semibold mb-4'>The Best of Live Events</h2>
            <div className='grid grid-cols-2 sm:grid-cols-3 
            md:grid-cols-4 lg:grid-cols-5 gap-4'>
                {events.map((event, index) => (
                    <div className='rounded overflow-hidden relative group 
                    shadow-lg cursor-pointer' key={index}>
                        <img src={event.img}
                         alt={event.title}
                         className='w-full h-56 object-cover transition-transform duration-300 group-hover:scale-105'
                           />
                    </div>

                  ))  }
            </div>
        </div>
    )
}

export default LiveEvents
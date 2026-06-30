import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getAllMovies } from '../apis/index'

const Recommended = () => {
    const [movies, setMovies] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                setLoading(true)
                const response = await getAllMovies()
                setMovies(response.data.movies || [])
                setError(null)
            } catch (err) {
                console.error('Error fetching movies:', err)
                setError('Failed to load movies')
                setMovies([])
            } finally {
                setLoading(false)
            }
        }

        fetchMovies()
    }, [])

    if (loading) {
        return (
            <div className='w-full py-6 bg-white'>
                <div className='max-w-screen-xl mx-auto px-4'>
                    <div className='text-center py-8'>
                        <p className='text-gray-500'>Loading movies...</p>
                    </div>
                </div>
            </div>
        )
    }

    if (error) {
        return (
            <div className='w-full py-6 bg-white'>
                <div className='max-w-screen-xl mx-auto px-4'>
                    <div className='text-center py-8'>
                        <p className='text-red-500'>{error}</p>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className='w-full py-6 bg-white'>
            <div className='max-w-screen-xl mx-auto px-4'>
                <div className='items-center flex justify-between mb-4'>
                    <h2 className='text-2xl font-semibold'
                    >Recommended Movies</h2>
                    <Link to="/movies" className='text-sm text-red-500 cursor-pointer hover:underline 
                    font-medium'>See All</Link>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4
                    xl:grid-cols-5 gap-4">
                        {
                            movies.map((movie) => (
                                <Link key={movie._id} to={`/movies/${movie._id}`} className='rounded overflow-hidden cursor-pointer hover:shadow-lg hover:scale-105 transition-all duration-300'>
                                    <div className='relative'>
                                        <img 
                                        src={movie.posterUrl}
                                        alt={movie.title} 
                                        className='w-full h-[300px] object-cover rounded'
                                        />
                                    </div>
                                    <div className='bg-black text-white text-sm px-2 py-1 flex items-center
                                    justify-between'>
                                        <span>{movie.rating}</span>
                                        <span>{movie.votes ? movie.votes.toLocaleString() : 0}</span>
                                         </div>
                                         <div className='px-2 py-1'>
                                            <h3 className='font-semibold text-lg'>{movie.title}</h3>
                                            <p className='text-sm text-gray-600'>{movie.genre?.join(' | ') || 'N/A'}</p>

                                         </div>


                                    </Link>
                            ))

                        }
                    </div>

            </div>
        </div>
    )
}

export default Recommended
import { axiosWrapper } from "./axiosWrapper";

// Export axiosWrapper as api for backward compatibility
export const api = axiosWrapper;

//List all the endpoints

export const getRecommendedMovies = () =>  axiosWrapper.get("/movies/recommended");
export const getAllMovies = () =>  axiosWrapper.get("/movies");
export const getMoviesById = (data) =>  axiosWrapper.get(`/movies/${data}`);
export const getShowsByMovieIdAndLocation = (movieId, state, date) =>
    axiosWrapper.get(`/shows`, {
        params: { movieId, state, date }
    });

export const getShowById = (data) =>  axiosWrapper.get(`/shows/${data}`);

// Theater endpoints
export const getTheatersByLocation = (state) =>
    axiosWrapper.get("/theaters", {
        params: { state }
    });

export const getAllTheaters = () =>
    axiosWrapper.get("/theaters");

// Shows by movie, date, and location
export const getShowsByMovieDateLocation = (movieId, date, location) =>
    axiosWrapper.get("/shows/search/filter", {
        params: { movieId, date, location }
    });

// Admin endpoints
export const getAdminDashboardStats = () => axiosWrapper.get("/admin/dashboard/stats");
export const getAdminUsers = (page = 1, limit = 10) => 
    axiosWrapper.get("/admin/users", { params: { page, limit } });
export const getAdminMovies = (page = 1, limit = 10) => 
    axiosWrapper.get("/admin/movies", { params: { page, limit } });
export const getAdminTheaters = (page = 1, limit = 10) => 
    axiosWrapper.get("/admin/theaters", { params: { page, limit } });
export const getAdminShows = (page = 1, limit = 10) => 
    axiosWrapper.get("/admin/shows", { params: { page, limit } });
export const toggleUserStatus = (userId) => 
    axiosWrapper.patch(`/admin/users/${userId}/toggle-status`);
export const deleteUser = (userId) => 
    axiosWrapper.delete(`/admin/users/${userId}`);
export const deleteMovie = (movieId) => 
    axiosWrapper.delete(`/admin/movies/${movieId}`);
export const deleteTheater = (theaterId) => 
    axiosWrapper.delete(`/admin/theaters/${theaterId}`);
export const deleteShow = (showId) => 
    axiosWrapper.delete(`/admin/shows/${showId}`);
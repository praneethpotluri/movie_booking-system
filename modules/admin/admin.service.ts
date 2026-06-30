import User from '../auth/auth.model';
import { MovieModel } from '../movie/movie.model';
import { TheaterModel } from '../theater/theater.model';
import { ShowModel } from '../show/show.model';

export interface DashboardStats {
  totalUsers: number;
  totalMovies: number;
  totalTheaters: number;
  totalShows: number;
  totalBookings: number;
  recentUsers: any[];
  recentMovies: any[];
}

class AdminService {
  async getDashboardStats(): Promise<DashboardStats> {
    try {
      const [totalUsers, totalMovies, totalTheaters, totalShows] = await Promise.all([
        User.countDocuments(),
        MovieModel.countDocuments(),
        TheaterModel.countDocuments(),
        ShowModel.countDocuments(),
      ]);

      const recentUsers = await User.find()
        .sort({ createdAt: -1 })
        .limit(5)
        .select('-password');

      const recentMovies = await MovieModel.find()
        .sort({ createdAt: -1 })
        .limit(5);

      return {
        totalUsers,
        totalMovies,
        totalTheaters,
        totalShows,
        totalBookings: 0, // Will be updated when booking module is added
        recentUsers,
        recentMovies,
      };
    } catch (error) {
      throw error;
    }
  }

  async getAllUsers(page: number = 1, limit: number = 10) {
    const skip = (page - 1) * limit;
    
    const [users, total] = await Promise.all([
      User.find()
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .select('-password'),
      User.countDocuments(),
    ]);

    return {
      users,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    };
  }

  async getAllMovies(page: number = 1, limit: number = 10) {
    const skip = (page - 1) * limit;
    
    const [movies, total] = await Promise.all([
      MovieModel.find()
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit),
      MovieModel.countDocuments(),
    ]);

    return {
      movies,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    };
  }

  async getAllTheaters(page: number = 1, limit: number = 10) {
    const skip = (page - 1) * limit;
    
    const [theaters, total] = await Promise.all([
      TheaterModel.find()
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit),
      TheaterModel.countDocuments(),
    ]);

    return {
      theaters,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    };
  }

  async getAllShows(page: number = 1, limit: number = 10) {
    const skip = (page - 1) * limit;
    
    const [shows, total] = await Promise.all([
      ShowModel.find()
        .populate('movie', 'title poster')
        .populate('theater', 'name location')
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit),
      ShowModel.countDocuments(),
    ]);

    return {
      shows,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    };
  }

  async toggleUserStatus(userId: string) {
    const user = await User.findById(userId);
    if (!user) {
      throw new Error('User not found');
    }
    user.isActive = !user.isActive;
    await user.save();
    return user;
  }

  async deleteUser(userId: string) {
    const user = await User.findByIdAndDelete(userId);
    if (!user) {
      throw new Error('User not found');
    }
    return { message: 'User deleted successfully' };
  }

  async deleteMovie(movieId: string) {
    const movie = await MovieModel.findByIdAndDelete(movieId);
    if (!movie) {
      throw new Error('Movie not found');
    }
    return { message: 'Movie deleted successfully' };
  }

  async deleteTheater(theaterId: string) {
    const theater = await TheaterModel.findByIdAndDelete(theaterId);
    if (!theater) {
      throw new Error('Theater not found');
    }
    return { message: 'Theater deleted successfully' };
  }

  async deleteShow(showId: string) {
    const show = await ShowModel.findByIdAndDelete(showId);
    if (!show) {
      throw new Error('Show not found');
    }
    return { message: 'Show deleted successfully' };
  }
}

export default new AdminService();
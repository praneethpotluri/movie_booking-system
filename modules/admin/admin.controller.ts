import { Request, Response } from 'express';
import adminService from './admin.service';

class AdminController {
  async getDashboardStats(req: Request, res: Response) {
    try {
      const stats = await adminService.getDashboardStats();
      res.status(200).json({
        success: true,
        data: stats,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error instanceof Error ? error.message : 'Server error',
      });
    }
  }

  async getAllUsers(req: Request, res: Response) {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;
      
      const result = await adminService.getAllUsers(page, limit);
      res.status(200).json({
        success: true,
        data: result,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error instanceof Error ? error.message : 'Server error',
      });
    }
  }

  async getAllMovies(req: Request, res: Response) {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;
      
      const result = await adminService.getAllMovies(page, limit);
      res.status(200).json({
        success: true,
        data: result,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error instanceof Error ? error.message : 'Server error',
      });
    }
  }

  async getAllTheaters(req: Request, res: Response) {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;
      
      const result = await adminService.getAllTheaters(page, limit);
      res.status(200).json({
        success: true,
        data: result,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error instanceof Error ? error.message : 'Server error',
      });
    }
  }

  async getAllShows(req: Request, res: Response) {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;
      
      const result = await adminService.getAllShows(page, limit);
      res.status(200).json({
        success: true,
        data: result,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error instanceof Error ? error.message : 'Server error',
      });
    }
  }

  async toggleUserStatus(req: Request, res: Response) {
    try {
      const { userId } = req.params;
      const result = await adminService.toggleUserStatus(userId);
      res.status(200).json({
        success: true,
        data: result,
        message: 'User status updated',
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error instanceof Error ? error.message : 'Server error',
      });
    }
  }

  async deleteUser(req: Request, res: Response) {
    try {
      const { userId } = req.params;
      const result = await adminService.deleteUser(userId);
      res.status(200).json({
        success: true,
        ...result,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error instanceof Error ? error.message : 'Server error',
      });
    }
  }

  async deleteMovie(req: Request, res: Response) {
    try {
      const { movieId } = req.params;
      const result = await adminService.deleteMovie(movieId);
      res.status(200).json({
        success: true,
        ...result,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error instanceof Error ? error.message : 'Server error',
      });
    }
  }

  async deleteTheater(req: Request, res: Response) {
    try {
      const { theaterId } = req.params;
      const result = await adminService.deleteTheater(theaterId);
      res.status(200).json({
        success: true,
        ...result,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error instanceof Error ? error.message : 'Server error',
      });
    }
  }

  async deleteShow(req: Request, res: Response) {
    try {
      const { showId } = req.params;
      const result = await adminService.deleteShow(showId);
      res.status(200).json({
        success: true,
        ...result,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error instanceof Error ? error.message : 'Server error',
      });
    }
  }
}

export default new AdminController();
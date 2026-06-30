import { Router } from 'express';
import adminController from './admin.controller';
import { authenticate, authorize } from '../../middlewares/auth.middleware';

const router = Router();

// All admin routes require authentication and admin role
router.use(authenticate);
router.use(authorize(['admin']));

// Dashboard
router.get('/dashboard/stats', adminController.getDashboardStats);

// Users management
router.get('/users', adminController.getAllUsers);
router.patch('/users/:userId/toggle-status', adminController.toggleUserStatus);
router.delete('/users/:userId', adminController.deleteUser);

// Movies management
router.get('/movies', adminController.getAllMovies);
router.delete('/movies/:movieId', adminController.deleteMovie);

// Theaters management
router.get('/theaters', adminController.getAllTheaters);
router.delete('/theaters/:theaterId', adminController.deleteTheater);

// Shows management
router.get('/shows', adminController.getAllShows);
router.delete('/shows/:showId', adminController.deleteShow);

export default router;
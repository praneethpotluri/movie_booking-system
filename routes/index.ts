import express from 'express';
import movieRouter from '../modules/movie/movie.route';
import theaterRouter from '../modules/theater/theater.routes';
import showRouter from '../modules/show/show.routes';
import authRouter from '../modules/auth/auth.route';
import adminRouter from '../modules/admin/admin.routes';

const router = express.Router();

router.use('/auth', authRouter);
router.use('/movies', movieRouter);
router.use('/theaters', theaterRouter);
router.use('/shows', showRouter);
router.use('/admin', adminRouter);

export default router;
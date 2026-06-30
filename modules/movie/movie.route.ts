import express from 'express';
import * as movieController from './movie.controller';
import validate from '../../middlewares/validate';
import { MovieSchema } from './movie.validation';

const router = express.Router();

router.post('/',  validate(MovieSchema), movieController.createMovie);
router.get('/', movieController.getMovies);
router.get('/top-recommended', movieController.getTopRecommendedMovies);
router.get('/:id', movieController.getMovieById);

export default router;
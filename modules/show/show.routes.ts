import express from 'express';
import * as showController from './show.controller';
import validate from '../../middlewares/validate';
import { 
    ShowSchema, 
    UpdateSeatStatusSchema, 
    UpdateMultipleSeatsStatusSchema,
    UpdateShowSchema 
} from './show.validation';

const router = express.Router();

// Create a new show
router.post('/', validate(ShowSchema), showController.createShow);

// Get all shows
router.get('/', showController.getAllShows);

// Get shows by movie, date, and location (query parameters)
router.get('/search/filter', showController.getShowsByMovieDateLocation);

// Get shows by movie ID
router.get('/movie/:movieId', showController.getShowsByMovieId);

// Get show by ID
router.get('/:id', showController.getShowById);

// Update single seat status
router.patch('/seat/update', validate(UpdateSeatStatusSchema), showController.updateSeatStatus);

// Update multiple seats status
router.patch('/seats/update-multiple', validate(UpdateMultipleSeatsStatusSchema), showController.updateMultipleSeatsStatus);

// Update show details
router.put('/:id', validate(UpdateShowSchema), showController.updateShow);

// Delete show
router.delete('/:id', showController.deleteShow);

export default router;

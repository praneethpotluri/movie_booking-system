import { Request, Response, NextFunction } from 'express';
import * as showService from './show.service';

// 1. Create Show
export const createShow = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const show = await showService.createShow(req.body);
        res.status(201).json({ show });
    } catch (error) {
        next(error);
    }
};

// 2. Get All Shows
export const getAllShows = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const shows = await showService.getAllShows();
        res.status(200).json({ shows });
    } catch (error) {
        next(error);
    }
};

// 3. Get Show By ID
export const getShowById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const show = await showService.getShowById(req.params.id);
        if (!show) {
            res.status(404).json({ message: "Show not found" });
            return;
        }
        res.status(200).json({ show });
    } catch (error) {
        next(error);
    }
};

// 4. Get Shows by Movie, Date, and Location
export const getShowsByMovieDateLocation = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { movieId, date, location } = req.query;
        
        const shows = await showService.getShowsByMovieDateLocation(
            movieId as string,
            date as string,
            location as string
        );
        
        res.status(200).json({ shows });
    } catch (error) {
        next(error);
    }
};

// 5. Get Shows by Movie ID
export const getShowsByMovieId = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const shows = await showService.getShowsByMovieId(req.params.movieId);
        res.status(200).json({ shows });
    } catch (error) {
        next(error);
    }
};

// 6. Update Seat Status
export const updateSeatStatus = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { showId, row, seatNumber, status } = req.body;
        
        if (!showId || !row || seatNumber === undefined || !status) {
            res.status(400).json({ 
                message: "showId, row, seatNumber, and status are required" 
            });
            return;
        }
        
        const show = await showService.updateSeatStatus(
            showId,
            row,
            seatNumber,
            status
        );
        
        res.status(200).json({ show });
    } catch (error) {
        next(error);
    }
};

// 7. Update Multiple Seats Status
export const updateMultipleSeatsStatus = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { showId, seats } = req.body;
        
        if (!showId || !seats || !Array.isArray(seats)) {
            res.status(400).json({ 
                message: "showId and seats array are required" 
            });
            return;
        }
        
        const show = await showService.updateMultipleSeatsStatus(showId, seats);
        res.status(200).json({ show });
    } catch (error) {
        next(error);
    }
};

// 8. Delete Show
export const deleteShow = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const show = await showService.deleteShow(req.params.id);
        if (!show) {
            res.status(404).json({ message: "Show not found" });
            return;
        }
        res.status(200).json({ message: "Show deleted successfully", show });
    } catch (error) {
        next(error);
    }
};

// 9. Update Show
export const updateShow = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const show = await showService.updateShow(req.params.id, req.body);
        if (!show) {
            res.status(404).json({ message: "Show not found" });
            return;
        }
        res.status(200).json({ show });
    } catch (error) {
        next(error);
    }
};

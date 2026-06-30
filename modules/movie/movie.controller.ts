import { Request, Response, NextFunction } from 'express';
import * as movieService from './movie.service';

export const createMovie = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const movie = await movieService.createMovie(req.body);
        res.status(201).json({movie});
    } catch (error) {
        next(error);
    }
};

export const getMovies = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const movies = await movieService.getAllMovies();
        res.status(200).json({movies});
    } catch (error) {
        next(error);
    }
};

export const getMovieById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const movie = await movieService.getMovieById(req.params.id);
        res.status(200).json({movie});
    } catch (error) {
        next(error);
    }
};

export const getTopRecommendedMovies = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const topMovies = await movieService.getTopMovieByVotes(5);
        res.status(200).json({topMovies});
    } catch (error) {
        next(error);
    }
};
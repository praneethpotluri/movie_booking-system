import { IMovie } from "./movie.interface";
import { MovieModel } from "./movie.model";
import { Types } from "mongoose";


//1.createMovie
export const createMovie = async (movie: IMovie) => {
    return await MovieModel.create(movie);
};
//2.getAllMovies
export const getAllMovies = async () => {
    return await MovieModel.find().sort({ releaseDate: -1 });
};
//3.getMovieById
export const getMovieById = async (id: string) => {
    // Validate if ID is a valid MongoDB ObjectId
    if (!Types.ObjectId.isValid(id)) {
        throw new Error("Invalid movie ID format");
    }
    return await MovieModel.findById(id);
};
//4.getTopMovieByVotes
export const getTopMovieByVotes = async (limit: number) => {
    return await MovieModel.find().sort({ votes: -1 }).limit(limit);
};
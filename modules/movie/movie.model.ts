import mongoose from 'mongoose';
import { IMovie } from './movie.interface';

const movieSchema = new mongoose.Schema<IMovie>({
    title: { type: String, required: true },
    description: { type: String, required: true },
    duration: { type: Number, required: true },
    releaseDate: { type: Date, required: true },
    genre: { type: [String], required: true },
    rating: { type: Number, required: true },
    posterUrl: { type: String, required: true },
    language: { type: String, required: true },
    votes: { type: Number, required: true },
    format: { type: [String] ,default: ["2D"] },
    }, {timestamps: true});

export const MovieModel = mongoose.model<IMovie>('Movie', movieSchema);
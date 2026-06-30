// src/modules/movie/movie.validation.ts

import {z} from 'zod';

export const  MovieSchema = z.object({
    title: z.string().min(1, "Title is required"),
    description: z.string().min(1, "Description is required"),
    duration: z.string().min(1,"Duration is required"),
    releaseDate: z.string().transform((val) => new Date(val)),
    genre: z.array(z.string()).min(1, "At least one genre is required"),
    rating: z.number().min(0, "Rating must be at least 0").max(10, "Rating must be at most 10"),
    posterUrl: z.string().url("Poster URL must be a valid URL"),
    language: z.string().min(1, "Language is required"),
    votes: z.number().min(0, "Votes must be at least 0"),
    format: z.array(z.string()).default(["2D"]),
});

export type MovieInput = z.infer<typeof MovieSchema>;
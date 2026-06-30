"use strict";
// src/modules/movie/movie.validation.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.MovieSchema = void 0;
const zod_1 = require("zod");
exports.MovieSchema = zod_1.z.object({
    title: zod_1.z.string().min(1, "Title is required"),
    description: zod_1.z.string().min(1, "Description is required"),
    duration: zod_1.z.string().min(1, "Duration is required"),
    releaseDate: zod_1.z.string().transform((val) => new Date(val)),
    genre: zod_1.z.array(zod_1.z.string()).min(1, "At least one genre is required"),
    rating: zod_1.z.number().min(0, "Rating must be at least 0").max(10, "Rating must be at most 10"),
    posterUrl: zod_1.z.string().url("Poster URL must be a valid URL"),
    language: zod_1.z.string().min(1, "Language is required"),
    votes: zod_1.z.number().min(0, "Votes must be at least 0"),
    format: zod_1.z.array(zod_1.z.string()).default(["2D"]),
});

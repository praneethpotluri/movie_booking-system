"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateShowSchema = exports.UpdateMultipleSeatsStatusSchema = exports.UpdateSeatStatusSchema = exports.ShowSchema = void 0;
const zod_1 = require("zod");
// Schema for creating a show
exports.ShowSchema = zod_1.z.object({
    movie: zod_1.z.string().min(1, "Movie ID is required"),
    theater: zod_1.z.string().min(1, "Theater ID is required"),
    location: zod_1.z.string().min(1, "Location is required"),
    format: zod_1.z.enum(["2D", "3D", "IMAX"]),
    audioType: zod_1.z.string().optional().default("DOLBY ATMOS"),
    startTime: zod_1.z.string().min(1, "Start time is required"),
    date: zod_1.z.string().min(1, "Date is required"),
    priceMap: zod_1.z.record(zod_1.z.string(), zod_1.z.number()).refine((pm) => Object.keys(pm).length > 0, "Price map is required"),
    seatLayout: zod_1.z.array(zod_1.z.object({
        row: zod_1.z.string().min(1, "Row is required"),
        seats: zod_1.z.array(zod_1.z.object({
            number: zod_1.z.number().min(1, "Seat number is required"),
            status: zod_1.z.enum(["AVAILABLE", "BOOKED", "BLOCKED"]).default("AVAILABLE")
        })).min(1, "At least one seat is required")
    })).min(1, "At least one row is required")
});
// Schema for updating seat status
exports.UpdateSeatStatusSchema = zod_1.z.object({
    showId: zod_1.z.string().min(1, "Show ID is required"),
    row: zod_1.z.string().min(1, "Row is required"),
    seatNumber: zod_1.z.number().min(1, "Seat number is required"),
    status: zod_1.z.enum(["AVAILABLE", "BOOKED", "BLOCKED"])
});
// Schema for updating multiple seats status
exports.UpdateMultipleSeatsStatusSchema = zod_1.z.object({
    showId: zod_1.z.string().min(1, "Show ID is required"),
    seats: zod_1.z.array(zod_1.z.object({
        row: zod_1.z.string().min(1, "Row is required"),
        seatNumber: zod_1.z.number().min(1, "Seat number is required"),
        status: zod_1.z.enum(["AVAILABLE", "BOOKED", "BLOCKED"])
    })).min(1, "At least one seat must be updated")
});
// Schema for updating show
exports.UpdateShowSchema = zod_1.z.object({
    location: zod_1.z.string().optional(),
    format: zod_1.z.enum(["2D", "3D", "IMAX"]).optional(),
    audioType: zod_1.z.string().optional(),
    startTime: zod_1.z.string().optional(),
    date: zod_1.z.string().optional(),
    priceMap: zod_1.z.record(zod_1.z.number()).optional()
}).strict();

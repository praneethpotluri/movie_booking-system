import { z } from 'zod';

// Schema for creating a show
export const ShowSchema = z.object({
    movie: z.string().min(1, "Movie ID is required"),
    theater: z.string().min(1, "Theater ID is required"),
    location: z.string().min(1, "Location is required"),
    format: z.enum(["2D", "3D", "IMAX"]),
    audioType: z.string().optional().default("DOLBY ATMOS"),
    startTime: z.string().min(1, "Start time is required"),
    date: z.string().min(1, "Date is required"),
    priceMap: z.record(z.string(), z.number()).refine((pm) => Object.keys(pm).length > 0, "Price map is required"),
    seatLayout: z.array(
        z.object({
            row: z.string().min(1, "Row is required"),
            seats: z.array(
                z.object({
                    number: z.number().min(1, "Seat number is required"),
                    status: z.enum(["AVAILABLE", "BOOKED", "BLOCKED"]).default("AVAILABLE")
                })
            ).min(1, "At least one seat is required")
        })
    ).min(1, "At least one row is required")
});

export type ShowInput = z.infer<typeof ShowSchema>;

// Schema for updating seat status
export const UpdateSeatStatusSchema = z.object({
    showId: z.string().min(1, "Show ID is required"),
    row: z.string().min(1, "Row is required"),
    seatNumber: z.number().min(1, "Seat number is required"),
    status: z.enum(["AVAILABLE", "BOOKED", "BLOCKED"])
});

export type UpdateSeatStatusInput = z.infer<typeof UpdateSeatStatusSchema>;

// Schema for updating multiple seats status
export const UpdateMultipleSeatsStatusSchema = z.object({
    showId: z.string().min(1, "Show ID is required"),
    seats: z.array(
        z.object({
            row: z.string().min(1, "Row is required"),
            seatNumber: z.number().min(1, "Seat number is required"),
            status: z.enum(["AVAILABLE", "BOOKED", "BLOCKED"])
        })
    ).min(1, "At least one seat must be updated")
});

export type UpdateMultipleSeatsStatusInput = z.infer<typeof UpdateMultipleSeatsStatusSchema>;

// Schema for updating show
export const UpdateShowSchema = z.object({
    location: z.string().optional(),
    format: z.enum(["2D", "3D", "IMAX"]).optional(),
    audioType: z.string().optional(),
    startTime: z.string().optional(),
    date: z.string().optional(),
    priceMap: z.record(z.number()).optional()
}).strict();

export type UpdateShowInput = z.infer<typeof UpdateShowSchema>;

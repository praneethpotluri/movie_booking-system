import { IShow } from "./show.interface";
import { ShowModel } from "./show.model";
import { Types } from 'mongoose';

// 1. Create Show
export const createShow = async (show: IShow) => {
    return await ShowModel.create(show);
};

// 2. Get All Shows
export const getAllShows = async () => {
    return await ShowModel.find()
        .populate('movie')
        .populate('theater')
        .sort({ date: 1, startTime: 1 });
};

// 3. Get Show By ID
export const getShowById = async (id: string) => {
    return await ShowModel.findById(id)
        .populate('movie')
        .populate('theater');
};

// 4. Get Shows by Movie, Date, and Location
export const getShowsByMovieDateLocation = async (
    movieId: string,
    date: string,
    location: string
) => {
    const query: any = {};
    
    if (movieId) {
        query.movie = new Types.ObjectId(movieId);
    }
    if (date) {
        query.date = date;
    }
    if (location) {
        query.location = new RegExp(location, 'i');
    }
    
    return await ShowModel.find(query)
        .populate('movie')
        .populate('theater')
        .sort({ startTime: 1 });
};

// 5. Get Shows by Movie ID
export const getShowsByMovieId = async (movieId: string) => {
    return await ShowModel.find({ movie: new Types.ObjectId(movieId) })
        .populate('theater')
        .sort({ date: 1, startTime: 1 });
};

// 6. Update Seat Status
export const updateSeatStatus = async (
    showId: string,
    row: string,
    seatNumber: number,
    status: "AVAILABLE" | "BOOKED" | "BLOCKED"
) => {
    return await ShowModel.findByIdAndUpdate(
        showId,
        {
            $set: {
                "seatLayout.$[elem].seats.$[seat].status": status
            }
        },
        {
            arrayFilters: [
                { "elem.row": row },
                { "seat.number": seatNumber }
            ],
            new: true
        }
    )
    .populate('movie')
    .populate('theater');
};

// 7. Update Multiple Seats Status
export const updateMultipleSeatsStatus = async (
    showId: string,
    seats: Array<{ row: string; seatNumber: number; status: "AVAILABLE" | "BOOKED" | "BLOCKED" }>
) => {
    const show = await ShowModel.findById(showId);
    
    if (!show) {
        throw new Error("Show not found");
    }
    
    for (const seat of seats) {
        const seatLayout = show.seatLayout.find(layout => layout.row === seat.row);
        if (seatLayout) {
            const seatObj = seatLayout.seats.find(s => s.number === seat.seatNumber);
            if (seatObj) {
                seatObj.status = seat.status;
            }
        }
    }
    
    return await show.save();
};

// 8. Delete Show
export const deleteShow = async (id: string) => {
    return await ShowModel.findByIdAndDelete(id);
};

// 9. Update Show
export const updateShow = async (id: string, updateData: Partial<IShow>) => {
    return await ShowModel.findByIdAndUpdate(id, updateData, { new: true })
        .populate('movie')
        .populate('theater');
};

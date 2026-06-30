"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateShow = exports.deleteShow = exports.updateMultipleSeatsStatus = exports.updateSeatStatus = exports.getShowsByMovieId = exports.getShowsByMovieDateLocation = exports.getShowById = exports.getAllShows = exports.createShow = void 0;
const show_model_1 = require("./show.model");
const mongoose_1 = require("mongoose");
// 1. Create Show
const createShow = async (show) => {
    return await show_model_1.ShowModel.create(show);
};
exports.createShow = createShow;
// 2. Get All Shows
const getAllShows = async () => {
    return await show_model_1.ShowModel.find()
        .populate('movie')
        .populate('theater')
        .sort({ date: 1, startTime: 1 });
};
exports.getAllShows = getAllShows;
// 3. Get Show By ID
const getShowById = async (id) => {
    return await show_model_1.ShowModel.findById(id)
        .populate('movie')
        .populate('theater');
};
exports.getShowById = getShowById;
// 4. Get Shows by Movie, Date, and Location
const getShowsByMovieDateLocation = async (movieId, date, location) => {
    const query = {};
    if (movieId) {
        query.movie = new mongoose_1.Types.ObjectId(movieId);
    }
    if (date) {
        query.date = date;
    }
    if (location) {
        query.location = new RegExp(location, 'i');
    }
    return await show_model_1.ShowModel.find(query)
        .populate('movie')
        .populate('theater')
        .sort({ startTime: 1 });
};
exports.getShowsByMovieDateLocation = getShowsByMovieDateLocation;
// 5. Get Shows by Movie ID
const getShowsByMovieId = async (movieId) => {
    return await show_model_1.ShowModel.find({ movie: new mongoose_1.Types.ObjectId(movieId) })
        .populate('theater')
        .sort({ date: 1, startTime: 1 });
};
exports.getShowsByMovieId = getShowsByMovieId;
// 6. Update Seat Status
const updateSeatStatus = async (showId, row, seatNumber, status) => {
    return await show_model_1.ShowModel.findByIdAndUpdate(showId, {
        $set: {
            "seatLayout.$[elem].seats.$[seat].status": status
        }
    }, {
        arrayFilters: [
            { "elem.row": row },
            { "seat.number": seatNumber }
        ],
        new: true
    })
        .populate('movie')
        .populate('theater');
};
exports.updateSeatStatus = updateSeatStatus;
// 7. Update Multiple Seats Status
const updateMultipleSeatsStatus = async (showId, seats) => {
    const show = await show_model_1.ShowModel.findById(showId);
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
exports.updateMultipleSeatsStatus = updateMultipleSeatsStatus;
// 8. Delete Show
const deleteShow = async (id) => {
    return await show_model_1.ShowModel.findByIdAndDelete(id);
};
exports.deleteShow = deleteShow;
// 9. Update Show
const updateShow = async (id, updateData) => {
    return await show_model_1.ShowModel.findByIdAndUpdate(id, updateData, { new: true })
        .populate('movie')
        .populate('theater');
};
exports.updateShow = updateShow;

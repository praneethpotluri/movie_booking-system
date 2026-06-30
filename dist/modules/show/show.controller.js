"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateShow = exports.deleteShow = exports.updateMultipleSeatsStatus = exports.updateSeatStatus = exports.getShowsByMovieId = exports.getShowsByMovieDateLocation = exports.getShowById = exports.getAllShows = exports.createShow = void 0;
const showService = __importStar(require("./show.service"));
// 1. Create Show
const createShow = async (req, res, next) => {
    try {
        const show = await showService.createShow(req.body);
        res.status(201).json({ show });
    }
    catch (error) {
        next(error);
    }
};
exports.createShow = createShow;
// 2. Get All Shows
const getAllShows = async (req, res, next) => {
    try {
        const shows = await showService.getAllShows();
        res.status(200).json({ shows });
    }
    catch (error) {
        next(error);
    }
};
exports.getAllShows = getAllShows;
// 3. Get Show By ID
const getShowById = async (req, res, next) => {
    try {
        const show = await showService.getShowById(req.params.id);
        if (!show) {
            res.status(404).json({ message: "Show not found" });
            return;
        }
        res.status(200).json({ show });
    }
    catch (error) {
        next(error);
    }
};
exports.getShowById = getShowById;
// 4. Get Shows by Movie, Date, and Location
const getShowsByMovieDateLocation = async (req, res, next) => {
    try {
        const { movieId, date, location } = req.query;
        const shows = await showService.getShowsByMovieDateLocation(movieId, date, location);
        res.status(200).json({ shows });
    }
    catch (error) {
        next(error);
    }
};
exports.getShowsByMovieDateLocation = getShowsByMovieDateLocation;
// 5. Get Shows by Movie ID
const getShowsByMovieId = async (req, res, next) => {
    try {
        const shows = await showService.getShowsByMovieId(req.params.movieId);
        res.status(200).json({ shows });
    }
    catch (error) {
        next(error);
    }
};
exports.getShowsByMovieId = getShowsByMovieId;
// 6. Update Seat Status
const updateSeatStatus = async (req, res, next) => {
    try {
        const { showId, row, seatNumber, status } = req.body;
        if (!showId || !row || seatNumber === undefined || !status) {
            res.status(400).json({
                message: "showId, row, seatNumber, and status are required"
            });
            return;
        }
        const show = await showService.updateSeatStatus(showId, row, seatNumber, status);
        res.status(200).json({ show });
    }
    catch (error) {
        next(error);
    }
};
exports.updateSeatStatus = updateSeatStatus;
// 7. Update Multiple Seats Status
const updateMultipleSeatsStatus = async (req, res, next) => {
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
    }
    catch (error) {
        next(error);
    }
};
exports.updateMultipleSeatsStatus = updateMultipleSeatsStatus;
// 8. Delete Show
const deleteShow = async (req, res, next) => {
    try {
        const show = await showService.deleteShow(req.params.id);
        if (!show) {
            res.status(404).json({ message: "Show not found" });
            return;
        }
        res.status(200).json({ message: "Show deleted successfully", show });
    }
    catch (error) {
        next(error);
    }
};
exports.deleteShow = deleteShow;
// 9. Update Show
const updateShow = async (req, res, next) => {
    try {
        const show = await showService.updateShow(req.params.id, req.body);
        if (!show) {
            res.status(404).json({ message: "Show not found" });
            return;
        }
        res.status(200).json({ show });
    }
    catch (error) {
        next(error);
    }
};
exports.updateShow = updateShow;

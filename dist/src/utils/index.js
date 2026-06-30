"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateSeatLayout = exports.isValidEmail = void 0;
const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};
exports.isValidEmail = isValidEmail;
const generateSeatLayout = (rows = ["A", "B", "C", "D", "E", "F"], seatsPerRow = 10) => {
    return rows.map((row) => ({
        row,
        seats: Array.from({ length: seatsPerRow }, (_, i) => ({
            number: i + 1,
            status: "AVAILABLE",
        })),
    }));
};
exports.generateSeatLayout = generateSeatLayout;

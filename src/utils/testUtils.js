/**
 * Quick Test Utils for Booking System
 * Use these functions to quickly test different scenarios
 */

// Test Data Generator
export const generateTestBooking = () => {
  return {
    show: {
      _id: "show_test_1",
      movieId: "movie_1",
      theaterId: "theater_1",
      theaterName: "INOX Premium Cinema",
      startTime: "07:30 PM",
      format: "3D",
      audioType: "Dolby Atmos",
      priceMap: {
        NORMAL: 250,
        EXECUTIVE: 290,
        PREMIUM: 350,
      },
      date: new Date().toISOString().split('T')[0],
    },
    selectedSeats: ["A1", "A2", "B1"],
    totalPrice: 870, // Sample total with tax
  };
};

// Simulate Booking Confirmation
export const simulateBookingConfirmation = (seats, price) => {
  const bookingId = `BMS${Date.now()}`;
  const confirmationData = {
    bookingId,
    seats,
    price,
    status: "CONFIRMED",
    timestamp: new Date().toLocaleString(),
    expiresAt: new Date(Date.now() + 5 * 60 * 1000).toLocaleString(), // 5 minutes
  };

  console.log("✅ Booking Confirmed:", confirmationData);
  return confirmationData;
};

// Test Seat Selection
export const testSeatSelection = () => {
  const rows = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
  const selectedSeats = [];

  // Select some random seats
  rows.forEach((row, idx) => {
    if (idx % 2 === 0) {
      selectedSeats.push(`${row}${Math.floor(Math.random() * 12) + 1}`);
    }
  });

  console.log("🪑 Selected Seats:", selectedSeats);
  return selectedSeats;
};

// Test Price Calculation
export const testPriceCalculation = (seats, seatTypePrices) => {
  let total = 0;
  const breakdown = {};

  seats.forEach(seatId => {
    const row = seatId.charAt(0);
    let type = "NORMAL";
    
    if (row === "E") type = "PREMIUM";
    if (["B", "C", "D"].includes(row)) type = "EXECUTIVE";

    const price = seatTypePrices[type] || 180;
    if (!breakdown[type]) breakdown[type] = 0;
    breakdown[type] += price;
    total += price;
  });

  const tax = total * 0.05;
  const finalTotal = total + tax;

  console.log("💰 Price Breakdown:", {
    breakdown,
    subtotal: total,
    tax: tax.toFixed(2),
    total: finalTotal.toFixed(2),
  });

  return { breakdown, subtotal: total, tax, total: finalTotal };
};

// Test Location Detection
export const testLocationDetection = () => {
  const mockLocations = ["NY", "CA", "TX", "FL"];
  const randomLocation = mockLocations[Math.floor(Math.random() * mockLocations.length)];
  
  console.log("📍 Detected Location:", randomLocation);
  return randomLocation;
};

// Console Testing Guide
export const printTestingGuide = () => {
  console.log(`
    🎬 BOOKING SYSTEM TEST GUIDE
    ============================
    
    Available Test Functions:
    
    1️⃣  generateTestBooking()
        - Generates sample booking data
        - Use: import { generateTestBooking } from utils/testUtils
        - Result: { show, selectedSeats, totalPrice }
    
    2️⃣  simulateBookingConfirmation(seats, price)
        - Simulates booking confirmation
        - Use: simulateBookingConfirmation(["A1", "A2"], 500)
        - Result: Confirmation ID, timestamp, expiry
    
    3️⃣  testSeatSelection()
        - Tests random seat selection
        - Returns array of selected seat IDs
    
    4️⃣  testPriceCalculation(seats, seatTypePrices)
        - Calculates prices for selected seats
        - Shows breakdown by seat type
    
    5️⃣  testLocationDetection()
        - Simulates location detection
        - Returns random state
    
    📊 QUICK TEST WORKFLOW:
    ========================
    
    1. generateTestBooking() // Get test data
    2. testSeatSelection() // Select random seats
    3. testPriceCalculation(seats, seatTypePrices) // Calculate price
    4. simulateBookingConfirmation(seats, price) // Confirm booking
  `);
};

// Export everything for console testing
if (typeof window !== 'undefined') {
  window.bookingTestUtils = {
    generateTestBooking,
    simulateBookingConfirmation,
    testSeatSelection,
    testPriceCalculation,
    testLocationDetection,
    printTestingGuide,
  };
  
  console.log("✅ Booking Test Utils loaded. Type bookingTestUtils.printTestingGuide() for help");
}

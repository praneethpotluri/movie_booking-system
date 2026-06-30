// Mock show data for development/testing
export const generateMockShows = (movieId, theaterId, date) => {
  const timeSlots = [
    { time: "09:00 AM", format: "2D", audioType: "Dolby 7.1", price: 250 },
    { time: "12:30 PM", format: "3D", audioType: "Dolby Atmos", price: 350 },
    { time: "04:00 PM", format: "2D", audioType: "Dolby 7.1", price: 300 },
    { time: "07:30 PM", format: "3D", audioType: "Dolby Atmos", price: 350 },
    { time: "10:30 PM", format: "IMAX", audioType: "Dolby Atmos", price: 450 },
  ];

  return timeSlots.map((slot, idx) => ({
    _id: `show_${theaterId}_${idx}`,
    movieId,
    theaterId,
    date,
    startTime: slot.time,
    format: slot.format,
    audioType: slot.audioType,
    priceMap: {
      NORMAL: slot.price,
      EXECUTIVE: slot.price + 40,
      PREMIUM: slot.price + 100,
    },
    availableSeats: Math.floor(Math.random() * 50) + 30,
    totalSeats: 150,
  }));
};

export const mockTheaters = [
  {
    _id: "theater_1",
    name: "INOX Premium Cinema",
    location: "Central Downtown",
    city: "New York",
    state: "NY",
    logo: "🎬",
    rating: 4.5,
  },
  {
    _id: "theater_2",
    name: "PVR Cinemas Multiplex",
    location: "Central Mall",
    city: "New York",
    state: "NY",
    logo: "🎭",
    rating: 4.3,
  },
  {
    _id: "theater_3",
    name: "Cinepolis IMAX Theatre",
    location: "Entertainment Hub",
    city: "New York",
    state: "NY",
    logo: "🎥",
    rating: 4.6,
  },
];

// Function to add custom shows dynamically
export const addCustomShow = (movieId, theaterId, date, time, format, audioType, price) => {
  return {
    _id: `show_${theaterId}_${Date.now()}`,
    movieId,
    theaterId,
    date,
    startTime: time,
    format,
    audioType,
    priceMap: {
      NORMAL: price,
      EXECUTIVE: price + 40,
      PREMIUM: price + 100,
    },
    availableSeats: Math.floor(Math.random() * 50) + 30,
    totalSeats: 150,
  };
};

// Seat layout generator
export const generateSeatLayout = () => {
  const rows = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
  const seatsPerRow = 12;
  const layout = [];
  
  rows.forEach(row => {
    const rowSeats = [];
    for (let i = 1; i <= seatsPerRow; i++) {
      rowSeats.push({
        id: `${row}${i}`,
        status: Math.random() > 0.7 ? 'BOOKED' : 'AVAILABLE',
      });
    }
    layout.push({
      row,
      seats: rowSeats,
    });
  });
  
  return layout;
};

const BOOKING_HISTORY_KEY = 'booking_history';

// Get user-specific booking key
const getUserBookingKey = (userId) => {
  return userId ? `booking_history_${userId}` : BOOKING_HISTORY_KEY;
};

export const getStoredBookings = (userId = null) => {
  try {
    const key = getUserBookingKey(userId);
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error('Failed to read booking history from localStorage:', error);
    return [];
  }
};

export const addBookingToHistory = (booking, userId = null) => {
  try {
    const key = getUserBookingKey(userId);
    const existing = getStoredBookings(userId);
    const updated = [booking, ...existing];
    localStorage.setItem(key, JSON.stringify(updated));
    return updated;
  } catch (error) {
    console.error('Failed to save booking history to localStorage:', error);
    return [booking];
  }
};

export const clearBookingHistory = (userId = null) => {
  try {
    const key = getUserBookingKey(userId);
    localStorage.removeItem(key);
  } catch (error) {
    console.error('Failed to clear booking history from localStorage:', error);
  }
};

// Cancel a booking (remove by ID)
export const cancelBooking = (bookingId, userId = null) => {
  try {
    const key = getUserBookingKey(userId);
    const bookings = getStoredBookings(userId);
    const updated = bookings.filter(booking => booking.id !== bookingId);
    localStorage.setItem(key, JSON.stringify(updated));
    return updated;
  } catch (error) {
    console.error('Failed to cancel booking from localStorage:', error);
    return [];
  }
};

// Clear all booking history (for logout)
export const clearAllBookingHistory = () => {
  try {
    // Clear general booking history
    localStorage.removeItem(BOOKING_HISTORY_KEY);

    // Clear all user-specific booking histories
    const keys = Object.keys(localStorage).filter(key => key.startsWith('booking_history_'));
    keys.forEach(key => localStorage.removeItem(key));
  } catch (error) {
    console.error('Failed to clear all booking history from localStorage:', error);
  }
};

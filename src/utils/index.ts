export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const generateSeatLayout = (
  rows: string[] = ["A", "B", "C", "D", "E", "F"],
  seatsPerRow: number = 10
) => {
  return rows.map((row) => ({
    row,
    seats: Array.from({ length: seatsPerRow }, (_, i) => ({
      number: i + 1,
      status: "AVAILABLE",
    })),
  }));
};

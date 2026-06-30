import mongoose, { Document, Schema } from 'mongoose';

export interface IAdminStats extends Document {
  totalUsers: number;
  totalMovies: number;
  totalTheaters: number;
  totalShows: number;
  totalBookings: number;
  revenue: number;
  date: Date;
}

const adminStatsSchema = new Schema<IAdminStats>(
  {
    totalUsers: {
      type: Number,
      default: 0,
    },
    totalMovies: {
      type: Number,
      default: 0,
    },
    totalTheaters: {
      type: Number,
      default: 0,
    },
    totalShows: {
      type: Number,
      default: 0,
    },
    totalBookings: {
      type: Number,
      default: 0,
    },
    revenue: {
      type: Number,
      default: 0,
    },
    date: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

const AdminStats = mongoose.model<IAdminStats>('AdminStats', adminStatsSchema);

export default AdminStats;
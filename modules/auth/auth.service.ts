import jwt from 'jsonwebtoken';
import User, { IUser } from './auth.model';
import config from '../../config/config';

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

export interface AuthResponse {
  user: Partial<IUser>;
  tokens: AuthTokens;
}

export class AuthService {
  static generateTokens(userId: string): AuthTokens {
    const accessToken = (jwt.sign as any)(
      { userId },
      config.jwt.accessTokenSecret,
      { expiresIn: config.jwt.accessTokenExpiry }
    );

    const refreshToken = (jwt.sign as any)(
      { userId },
      config.jwt.refreshTokenSecret,
      { expiresIn: config.jwt.refreshTokenExpiry }
    );

    return { accessToken, refreshToken };
  }

  static async register(userData: {
    name: string;
    email: string;
    password: string;
    phone?: string;
    city?: string;
  }): Promise<AuthResponse> {
    // Check if user already exists
    const existingUser = await User.findOne({ email: userData.email });
    if (existingUser) {
      throw new Error('User with this email already exists');
    }

    // Create new user
    const user = new User(userData);
    await user.save();

    // Generate tokens
    const tokens = this.generateTokens(user._id.toString());

    return {
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        city: user.city,
        avatar: user.avatar,
        memberSince: user.memberSince,
      },
      tokens,
    };
  }

  static async login(email: string, password: string): Promise<AuthResponse> {
    // Find user and include password for comparison
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      throw new Error('Invalid email or password');
    }

    // Check if user is active
    if (!user.isActive) {
      throw new Error('Account is deactivated');
    }

    // Verify password
    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      throw new Error('Invalid email or password');
    }

    // Generate tokens
    const tokens = this.generateTokens(user._id.toString());

    return {
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        city: user.city,
        avatar: user.avatar,
        memberSince: user.memberSince,
      },
      tokens,
    };
  }

  static async getUserById(userId: string): Promise<Partial<IUser> | null> {
    const user = await User.findById(userId);
    if (!user) return null;

    return {
      _id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      city: user.city,
      avatar: user.avatar,
      memberSince: user.memberSince,
    };
  }

  static async updateUser(userId: string, updateData: Partial<IUser>): Promise<Partial<IUser> | null> {
    const user = await User.findByIdAndUpdate(
      userId,
      { ...updateData },
      { new: true, runValidators: true }
    );

    if (!user) return null;

    return {
      _id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      city: user.city,
      avatar: user.avatar,
      memberSince: user.memberSince,
    };
  }

  static verifyToken(token: string, isRefreshToken = false): { userId: string } {
    try {
      const secret = isRefreshToken ? config.jwt.refreshTokenSecret : config.jwt.accessTokenSecret;
      const decoded = jwt.verify(token, secret) as { userId: string };
      return decoded;
    } catch (error) {
      throw new Error('Invalid or expired token');
    }
  }
}
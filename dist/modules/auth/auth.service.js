"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const auth_model_1 = __importDefault(require("./auth.model"));
const config_1 = __importDefault(require("../../config/config"));
class AuthService {
    static generateTokens(userId) {
        const accessToken = jsonwebtoken_1.default.sign({ userId }, config_1.default.jwt.accessTokenSecret, { expiresIn: config_1.default.jwt.accessTokenExpiry });
        const refreshToken = jsonwebtoken_1.default.sign({ userId }, config_1.default.jwt.refreshTokenSecret, { expiresIn: config_1.default.jwt.refreshTokenExpiry });
        return { accessToken, refreshToken };
    }
    static async register(userData) {
        // Check if user already exists
        const existingUser = await auth_model_1.default.findOne({ email: userData.email });
        if (existingUser) {
            throw new Error('User with this email already exists');
        }
        // Create new user
        const user = new auth_model_1.default(userData);
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
    static async login(email, password) {
        // Find user and include password for comparison
        const user = await auth_model_1.default.findOne({ email }).select('+password');
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
    static async getUserById(userId) {
        const user = await auth_model_1.default.findById(userId);
        if (!user)
            return null;
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
    static async updateUser(userId, updateData) {
        const user = await auth_model_1.default.findByIdAndUpdate(userId, { ...updateData }, { new: true, runValidators: true });
        if (!user)
            return null;
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
    static verifyToken(token, isRefreshToken = false) {
        try {
            const secret = isRefreshToken ? config_1.default.jwt.refreshTokenSecret : config_1.default.jwt.accessTokenSecret;
            const decoded = jsonwebtoken_1.default.verify(token, secret);
            return decoded;
        }
        catch (error) {
            throw new Error('Invalid or expired token');
        }
    }
}
exports.AuthService = AuthService;

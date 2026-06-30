import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import config from '../config/config';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone: { type: String },
  city: { type: String },
  avatar: { type: String, default: '' },
  role: { type: String, enum: ['user', 'admin'], default: 'user' },
  memberSince: { type: Date, default: Date.now },
  isActive: { type: Boolean, default: true },
}, { timestamps: true });

async function seedAdmin() {
  try {
    await mongoose.connect(config.mongo.uri);
    console.log('Connected to MongoDB');

    const User = mongoose.models.User || mongoose.model('User', userSchema);

    const adminEmail = 'admin@bookmyscreen.com';
    
    // Check if admin already exists
    const existingAdmin = await User.findOne({ email: adminEmail });
    
    if (existingAdmin) {
      console.log('Admin user already exists');
      // Update to admin role if exists
      existingAdmin.role = 'admin';
      existingAdmin.isActive = true;
      await existingAdmin.save();
      console.log('Admin user updated to admin role');
    } else {
      // Create new admin
      const salt = await bcrypt.genSalt(12);
      const hashedPassword = await bcrypt.hash('admin123', salt);

      const adminUser = new User({
        name: 'System Admin',
        email: adminEmail,
        password: hashedPassword,
        phone: '+91-9876543210',
        city: 'Mumbai',
        role: 'admin',
        isActive: true,
      });

      await adminUser.save();
      console.log('Admin user created successfully');
    }

    console.log('\n=== Admin Login Credentials ===');
    console.log('Email: admin@bookmyscreen.com');
    console.log('Password: admin123');
    console.log('================================\n');

  } catch (error) {
    console.error('Error:', error);
  } finally {
    await mongoose.disconnect();
    process.exit(0);
  }
}

seedAdmin();
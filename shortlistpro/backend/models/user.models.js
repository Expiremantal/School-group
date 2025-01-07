import mongoose from 'mongoose';

// User Schema
const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  fullname: { type: String }, // Can be derived from firstName + lastName if needed
  email: { type: String, required: true, unique: true },
  mobile: { type: String, },
  address: { type: String },
  city: { type: String },
  country: { type: String },
  password: { type: String, required: true },
  role: { type: String, required: true, enum: ['admin', 'manager', 'employee', 'applicant', 'recruiter'] },
  notifications:{
    email: {type:Boolean, default: true},
  }
}, { timestamps: true });

userSchema.pre('save', function (next) {
  // Update fullname whenever firstName or lastName is changed
  this.fullname = `${this.firstName} ${this.lastName}`;
  next();
});

export const User = mongoose.model('User', userSchema);
export default User;

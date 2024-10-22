import mongoose from 'mongoose';
import { Task } from '../tasks/task.model.js';
import bcrypt from 'bcrypt';

class UserModel {
  toResponse(user) {
    if (user) {
      return {
        id: user._id,
        name: user.name,
        login: user.login
      };
    }
    return {};
  }
}

const userSchema = new mongoose.Schema({
  name: {
    type: String
  },
  login: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  id: String
});
userSchema.pre('findOneAndDelete', async function(next) {
  try {
    const id = this.getQuery();
    await Task.updateMany({ userId: id }, { userId: null });
    next();
  } catch (err) {
    next(err);
  }
});
userSchema.pre('save', async function(next) {
  try {
    this.password = await bcrypt.hash(this.password, 10);
    next();
  } catch (err) {
    next(err);
  }
});
const User = mongoose.model('User', userSchema);
export { UserModel, User };

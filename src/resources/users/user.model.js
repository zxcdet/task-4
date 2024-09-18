import mongoose from 'mongoose';

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
    type: String,
    required: true
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
const User = mongoose.model('User', userSchema);
export { UserModel, User };

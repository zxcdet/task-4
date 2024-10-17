import mongoose from 'mongoose';

const loginSchema = new mongoose.Schema({
  login: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  id: {
    type: String,
    default() {
      return this._id;
    }
  }
});
const Login = mongoose.model('Login', loginSchema);
export { Login };

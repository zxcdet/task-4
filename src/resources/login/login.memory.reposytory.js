import { Login } from './login.model.js';

const login = async body => {
  return Login.create(body);
};
export { login };

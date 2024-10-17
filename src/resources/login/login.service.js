import * as loginRepo from './login.memory.reposytory.js';
const login = body => loginRepo.login(body);
export { login };

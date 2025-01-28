import bcrypt from 'bcrypt';

class UserSqlModel {
  toResponse(user) {
    if (user) {
      return {
        ...user,
        id: String(user.id)
      };
    }
    return {};
  }
}
async function toSave(user) {
  const password = await bcrypt.hash(user.password, 10);
  return {
    ...user,
    password
  };
}

export { toSave, UserSqlModel };

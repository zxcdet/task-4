class UserModelResponse {
  toResponse(user) {
    if (user) {
      return {
        id: user.id.toString(),
        name: user.name,
        login: user.login
      };
    }
    return {};
  }
}
export { UserModelResponse };

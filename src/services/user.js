/**
 * @param {Record<string, any> & import("express").Locals} locals
 */
class UserService {
  currentUser(locals) {
    if (!locals)
      throw {
        code: 404,
        message: "User not found.",
      }

    return {
      user: locals.user,
    }
  }
}

export default UserService

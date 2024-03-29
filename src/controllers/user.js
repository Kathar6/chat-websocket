import userModel from "../models/users.js";

// Services
import UserService from "../services/user.js";

class UserController {
  /**
   * @param {import("express").Request} req
   * @param {import("express").Response} res
   */
  async get(req, res) {
    const { id } = req.params;

    if (!id) return res.sendStatus(404);

    const userFound = await userModel.findById(id);

    if (!userFound) return res.sendStatus(404);

    return res.json(userFound);
  }

  /**
   *
   * @param {import("express").Request} req
   * @param {import("express").Response} res
   */
  async current(req, res) {
    const service = new UserService();

    try {
      const userInfo = service.currentUser(res.locals);

      return res.response(200).setData(userInfo).send();
    } catch (error) {
      console.error(error);
      const code = error?.code;
      const message = error?.message;
      return res.response(code).setError(message);
    }
  }
}

export default new UserController();

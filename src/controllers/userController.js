import userModel from "../models/users.js"

class UserController {
  /**
   * @param {import("express").Request} req
   * @param {import("express").Response} res
   */
  async get(req, res) {
    const { id } = req.params

    if (!id) return res.sendStatus(404)

    const userFound = await userModel.findById(id)

    if (!userFound) return res.sendStatus(404)

    return res.json(userFound)
  }

  /**
   *
   * @param {import("express").Request} req
   * @param {import("express").Response} res
   */
  async current(req, res) {}
}

export default new UserController()

import Ajv from "ajv";
import addFormats from "ajv-formats";
import addErrors from "ajv-errors";

const mainErrorMessages = {
  type: "should be an object",
};

const emailTypes = {
  type: "string",
  format: "email",
  errorMessage: {
    type: "should be a string",
    format: "Please enter a valid email address",
  },
};

const saveUserDTOSchema = {
  type: "object",
  properties: {
    email: emailTypes,
    password: { type: "string" },
  },
  required: ["email", "password"],
  additionalProperties: false,
  errorMessage: mainErrorMessages,
};

const ajv = new Ajv({ allErrors: true });
addFormats(ajv, ["email"]);
addErrors(ajv);

const validate = ajv.compile(saveUserDTOSchema);

/**
 *
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @param {import("express").NextFunction} next
 * @returns
 */
const validateSaveUserDTO = (req, res, next) => {
  const isValid = validate(req.body);

  if (!isValid)
    return res
      .status(400)
      .send(ajv.errorsText(validate.errors, { separator: "\n" }));

  next();
};

export default validateSaveUserDTO;

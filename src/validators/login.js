import Ajv from "ajv";
import addFormats from "ajv-formats";
import addErrors from "ajv-errors";

const mainErrorMessages = {
  type: "should be an object",
};

const emailProperty = {
  type: "string",
  format: "email",
};

const loginSchema = {
  type: "object",
  properties: {
    email: emailProperty,
    password: {
      type: "string",
    },
  },
  required: ["email", "password"],
  additionalProperties: false,
  errorMessage: mainErrorMessages,
};

const ajv = new Ajv({ allErrors: true });
addFormats(ajv, ["email"]);
addErrors(ajv);

const validate = ajv.compile(loginSchema);

/**
 *
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @param {import("express").NextFunction} next
 */
const validateLoginSchema = (req, res, next) => {
  const isValid = validate(req.body);
  if (!isValid) return res.status(400).send(validate.errors);
  next();
};

export default validateLoginSchema;

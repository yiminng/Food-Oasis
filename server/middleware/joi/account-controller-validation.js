const Joi = require("joi");

const options = {
  abortEarly: false,
  allowUnknown: true,
  stripUnknown: true,
};

function validationHelper(schema, req, next) {
  const { error, value } = schema.validate(req.body, options);
  if (error) {
    next(
      `Validation error; ${error.details.map((err) => err.message).join(", ")}`
    );
  } else {
    req.body = value;
    next();
  }
}

function registerAccountSchema(req, res, next) {
  const schema = Joi.object({
    clientUrl: Joi.string().required(),
    email: Joi.string().required(),
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    password: Joi.string().required(),
    tenantId: Joi.number().required(),
  });
  validationHelper(schema, req, next);
}

function resendConfirmationEmail(req, res, next) {
  const schema = Joi.object({
    email: Joi.string().required(),
    clientUrl: Joi.string().required(),
  });
  validationHelper(schema, req, next);
}

function confirmRegister(req, res, next) {
  const schema = Joi.object({
    id: Joi.number().required(),
    token: Joi.string().required(),
  });
  validationHelper(schema, req, next);
}

function forgotPassword(req, res, next) {
  const schema = Joi.object({
    email: Joi.string().required(),
    clientUrl: Joi.string.required(),
  });
  validationHelper(schema, req, next);
}

function resetPassword(req, res, next) {
  const schema = Joi.object({
    token: Joi.string().required(),
    password: Joi.string().required(),
  });
  validationHelper(schema, req, next);
}

function getAllSchema(req, res, next) {
  const schema = Joi.object({
    tenantId: Joi.number.required(),
  });
  validationHelper(schema, req, next);
}

function getByIdSchema(req, res, next) {
  const schema = Joi.object({
    id: Joi.number.required(),
    tenantId: Joi.number.required(),
  });
  validationHelper(schema, req, next);
}

module.exports = {
  registerAccountSchema,
  getAllSchema,
  getByIdSchema,
  resendConfirmationEmail,
  confirmRegister,
  forgotPassword,
  resetPassword,
};

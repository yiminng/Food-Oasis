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

function getByIdSchema(req, res, next) {
  const schema = Joi.object({
    id: Joi.string().required(),
  });
  validationHelper(schema, req, next);
}

function addCategory(req, res, next) {
  const schema = {
    model: Joi.object().required(),
  };
  validationHelper(schema, req, next);
}

module.exports = {
  getByIdSchema,
  addCategory,
};

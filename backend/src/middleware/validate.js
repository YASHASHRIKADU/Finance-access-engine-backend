const validate = (schema, source = "body") => {
  return (req, res, next) => {
    const { error, value } = schema.validate(req[source], {
      abortEarly: false,
      stripUnknown: true
    });

    if (error) {
      const message = error.details.map((item) => item.message).join(", ");
      return res.status(400).json({ success: false, message });
    }

    req[source] = value;
    next();
  };
};

module.exports = validate;

const { body, validationResult } = require("express-validator");

const validateRegister = [
  body("email")
    .notEmpty()
    .withMessage("Debe ingresar un email.")
    .bail()
    .isEmail()
    .withMessage("Debe ingresar un mail válido."),
  body("password").notEmpty().withMessage("Debe ingresar la contraseña."),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.render("register", {
        errors: errors.array(),
      });
    }

    next();
  },
];

module.exports = validateRegister;

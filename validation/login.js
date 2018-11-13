const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateLoginInput(data) {
  let errors = {};

  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";

  if (Validator.isEmpty(data.email)) {
    errors.email = "Email Fields is Required";
  }
  if (!Validator.isEmail(data.email)) {
    errors.email = "Email is invalid";
  }

  console.log(Validator.isLength(data.password, { min: 6, max: 30 }));
  if (Validator.isEmpty(data.password)) {
    errors.password = "Password Fields is Required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};

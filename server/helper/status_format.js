const States = {};

States.status400 = (msg = "Server Error", code = 400) => ({
  code: code,
  success: false,
  message: msg,
  data: {},
});

States.status200 = (data = {}, msg = "Successfully called API", code = 200) => ({
  code: code,
  success: true,
  message: msg,
  data: data,
});

module.exports = States;

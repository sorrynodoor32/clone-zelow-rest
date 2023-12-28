const asyncHandler = require('express-async-handler');

const register = asyncHandler(async (req, res) => {
  //password, phone, name, role = [USER, AGENT]
  //client = urlencode || formData => req.body
  //client = params (?q=abcxyz) => req.query
  //client api/user/:id   =? req.params

  //DTO = Data transfer object
  const { password, phone, name, role } = req.body;
  //Handle logic

  return res.json({
    success: true,
    mes: 'Api Oke',
    data: { password, phone, name, role },
  });
});

module.exports = {
  register,
};

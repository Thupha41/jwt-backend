const testApi = (req, res) => {
  res.status(200).json({
    message: "ok",
    data: "test api",
  });
};

const handleRegister = (req, res) => {
  console.log(">>> register", req.body);
};

module.exports = {
  testApi,
  handleRegister,
};

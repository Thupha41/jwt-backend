import { createNewUser } from "../services/userService";
const getHomePage = (req, res) => {
  return res.render("home.ejs");
};
const getCreateUserPage = (req, res) => {
  return res.render("user.ejs");
};
const postCreateUser = async (req, res) => {
  const { username, email, password } = req.body;
  await createNewUser(username, email, password);
  res.send("Success");
};
module.exports = {
  getHomePage,
  getCreateUserPage,
  postCreateUser,
};

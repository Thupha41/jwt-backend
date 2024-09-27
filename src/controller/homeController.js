import { createNewUser, getListUser } from "../services/userService";
const getHomePage = (req, res) => {
  return res.render("home.ejs");
};
const getUserPage = async (req, res) => {
  let users = await getListUser();
  return res.render("user.ejs", { listUser: users });
};
const postCreateUser = async (req, res) => {
  const { username, email, password } = req.body;
  await createNewUser(username, email, password);
  res.send("Success");
};
module.exports = {
  getHomePage,
  getUserPage,
  postCreateUser,
};

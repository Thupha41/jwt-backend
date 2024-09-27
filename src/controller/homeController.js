import {
  createNewUser,
  getListUser,
  deleteUser,
} from "../services/userService";

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
  return res.redirect("/user");
};
const handleDeleteUser = async (req, res) => {
  console.log(">>> Check params", req.params);
  const userId = req.params.id;
  console.log(">>> Check user id", userId);
  if (!userId) return;
  await deleteUser(userId);
  return res.redirect("/user");
};
module.exports = {
  getHomePage,
  getUserPage,
  postCreateUser,
  handleDeleteUser,
};

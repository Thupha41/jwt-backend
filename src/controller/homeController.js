import {
  createNewUser,
  getListUser,
  deleteUser,
  editUser,
  getUserById,
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

const getEditUserPage = async (req, res) => {
  let id = req.params.id;
  let userData = {};
  let user = await getUserById(id);
  if (user && user.length > 0) {
    userData = user[0];
  }
  console.log("check user data ", userData);
  return res.render("user-edit.ejs", { userData });
};

const handleEditUser = async (req, res) => {
  const { email, username, id } = req.body;
  console.log("Check id: ", req.body.id);
  await editUser(email, username, id);
  return res.redirect("/user");
};
module.exports = {
  getHomePage,
  getUserPage,
  postCreateUser,
  handleDeleteUser,
  handleEditUser,
  getEditUserPage,
};

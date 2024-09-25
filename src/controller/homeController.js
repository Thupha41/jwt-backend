import connection from "../configs/config.mysql";

const getHomePage = (req, res) => {
  return res.render("home.ejs");
};
const getCreateUserPage = (req, res) => {
  return res.render("user.ejs");
};
const postCreateUser = async (req, res) => {
  const { username, email, password } = req.body;
  const [results, fields] = await connection.query(
    "INSERT INTO users (username, email, password) values (?, ?, ?)",
    [username, email, password]
  );
  console.log(results);
  res.send("Success");
};
module.exports = {
  getHomePage,
  getCreateUserPage,
  postCreateUser,
};

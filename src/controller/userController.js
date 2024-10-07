import UserService from "../services/user.service";

const getListUser = async (req, res) => {
  try {
    let users = await UserService.getAll();
    return res.status(200).json({
      EM: users.EM, // error or success message
      EC: users.EC, // Error code
      DT: users.DT, // data
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      EM: "Error message from server", // error message
      EC: "-1", // Error code
      DT: "", // data
    });
  }
};
const createUser = async () => {
  try {
  } catch (error) {
    console.log(error);
  }
};
const deleteUser = async () => {
  try {
  } catch (error) {
    console.log(error);
  }
};
const updateUser = async () => {
  try {
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getListUser,
  createUser,
  deleteUser,
  updateUser,
};

import UserService from "../services/user.service";

const getListUser = async (req, res) => {
  try {
    if (req.query.page && req.query.limit) {
      let page = req.query.page;
      let limit = req.query.limit;
      let users = await UserService.getUserWithPagination(+page, +limit);
      return res.status(200).json({
        EM: users.EM, // error or success message
        EC: users.EC, // Error code
        DT: users.DT, // data
      });
    } else {
      let users = await UserService.getAll();
      return res.status(200).json({
        EM: users.EM, // error or success message
        EC: users.EC, // Error code
        DT: users.DT, // data
      });
    }
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
const deleteUser = async (req, res) => {
  try {
    console.log(">>> check id", req.params.id);
    let data = await UserService.delete(req.params.id);
    if (data && data.EC === 0) {
      return res.status(404).json({
        EM: data.EM,
        EC: data.EC,
        DT: data.DT,
      });
    }
    return res.status(200).json({
      EM: data.EM,
      EC: data.EC,
      DT: data.DT,
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

import db from "../models/index";
import bcrypt from "bcryptjs";
import { Op } from "sequelize";
// Configurable salt rounds
const SALT_ROUNDS = parseInt(process.env.SALT_ROUNDS, 10) || 10;

// Hashes the password asynchronously
const hashUserPassword = async (userPassword) => {
  try {
    const salt = await bcrypt.genSalt(SALT_ROUNDS);
    const hash = await bcrypt.hash(userPassword, salt);
    return hash;
  } catch (error) {
    console.error("Error hashing password:", error);
    throw error;
  }
};
const checkUserExists = async (userEmail, userPhone) => {
  const user = await db.User.findOne({
    where: {
      [Op.or]: [{ email: userEmail }, { phone: userPhone }],
    },
    raw: true,
  });
  return user;
};

class UserService {
  static getAll = async () => {
    try {
      let users = await db.User.findAll({
        attributes: ["id", "username", "email", "phone", "sex"],
        include: {
          model: db.Role,
          attributes: ["name", "description"],
        },
        raw: true,
        nest: true,
      });

      if (users && users.length > 0) {
        return {
          EM: "get list users",
          EC: 1,
          DT: users,
        };
      } else {
        return {
          EM: "get list users",
          EC: 1,
          DT: [],
        };
      }
    } catch (error) {
      console.log(error);
      return {
        EM: "Error from get user service",
        EC: -1,
        DT: "",
      };
    }
  };

  static getUserWithPagination = async (page, limit) => {
    try {
      let offset = (page - 1) * limit;
      const { count, rows } = await db.User.findAndCountAll({
        offset: offset,
        limit: limit,
        attributes: ["id", "username", "email", "phone", "sex"],
        include: {
          model: db.Role,
          attributes: ["name", "description"],
        },
        raw: true,
        nest: true,
      });
      let totalPages = Math.ceil(count / limit);
      let data = {
        totalRows: count,
        totalPages: totalPages,
        users: rows,
      };
      console.log(">>> check data", data);
      if (data.users && data.users.length > 0) {
        return {
          EM: `Get list users at page ${page}, limit ${limit}`,
          EC: 1,
          DT: data,
        };
      } else {
        return {
          EM: `Get list users at page ${page}, limit ${limit}`,
          EC: 1,
          DT: [],
        };
      }
    } catch (error) {
      console.log(error);
      return {
        EM: "Error from get user service",
        EC: -1,
        DT: [],
      };
    }
  };
  static create = async (data) => {
    try {
      // Step 1: Check email/phone number already existed
      let user = await checkUserExists(data.email, data.phone);
      console.log(">>> check user", user);
      if (user) {
        if (user.email === data.email) {
          return { EM: "The email is already existed!", EC: 0 };
        } else if (user.phone === data.phone) {
          return { EM: "The phone number is already existed!", EC: 0 };
        }
      }
      //Step 2: hash user password
      let hashPassword = await hashUserPassword(data.password);
      data.password = hashPassword;
      //Step 3: create new user
      await db.User.create(data);
      return {
        EM: "User created successfully.",
        EC: 1,
        DT: [],
      };
    } catch (error) {
      console.log(error);
      return {
        EM: "Something wrong with create user service!",
        EC: -1,
      };
    }
  };
  static update = async (data) => {
    try {
      let user = await db.User.update({
        where: {
          id: data.id,
        },
      });

      if (user) {
        user.save();
      } else {
        //not found
        return {};
      }
    } catch (error) {
      console.log(error);
      return {
        EM: "Error from update user service",
        EC: -1,
        DT: "",
      };
    }
  };
  static delete = async (id) => {
    try {
      let result = await db.User.destroy({
        where: {
          id: id,
        },
      });
      console.log(">>> check delete user", result);
      if (result === 1) {
        return {
          EM: "User deleted successfully",
          EC: 1,
          DT: [],
        };
      } else {
        return {
          EM: "User not found",
          EC: 0,
          DT: "",
        };
      }
    } catch (error) {
      console.log(error);
      return {
        EM: "Error from delete user service",
        EC: -1,
        DT: "",
      };
    }
  };
}

module.exports = UserService;

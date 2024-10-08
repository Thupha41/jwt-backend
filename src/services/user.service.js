import db from "../models/index";
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
      });
      let totalPages = Math.ceil(count / limit);
      let data = {
        totalRows: count,
        totalPages: totalPages,
        users: rows,
      };
      console.log(">>> check data", data);
      return {
        EM: "Get list users with pagination",
        EC: 1,
        DT: data,
      };
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
      let user = await db.User.create({});
    } catch (error) {
      console.log(error);
      return {
        EM: "Error from get user service",
        EC: -1,
        DT: "",
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
      await db.User.destroy({
        where: {
          id: id,
        },
      });
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

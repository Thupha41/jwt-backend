import { sequelize } from "../configs/config.mysql";
import db from "../models/index";
import bcrypt from "bcryptjs";

// Configurable salt rounds
const SALT_ROUNDS = parseInt(process.env.SALT_ROUNDS, 10) || 10;

// Hashes the password asynchronously
const hashPassword = async (userPassword) => {
  try {
    const salt = await bcrypt.genSalt(SALT_ROUNDS);
    const hash = await bcrypt.hash(userPassword, salt);
    return hash;
  } catch (error) {
    console.error("Error hashing password:", error);
    throw error;
  }
};

// Creates a new user in the database
const createNewUser = async (email, password, username) => {
  try {
    const hashPass = await hashPassword(password);
    const user = await db.User.create({
      email: email,
      password: hashPass,
      username: username,
    });
    return user;
  } catch (error) {
    console.error("Error creating new user:", error);
  }
};

//get list of user
const getListUser = async () => {
  try {
    const [results, fields] = await sequelize.query("SELECT * FROM User");
    console.log(">>> CHECK get list user", results);
    return results;
  } catch (error) {
    console.error("Error getting list of user:", error);
  }
};

//delete user
const deleteUser = async (id) => {
  try {
    const [results, fields] = await sequelize.query(
      "DELETE FROM User where id = ?",
      [id]
    );
    console.log(">>> CHECK delete user", results);
  } catch (error) {
    console.error("Error deleting user:", error);
  }
};

//update user
const getUserById = async (id) => {
  try {
    const [results, fields] = await sequelize.query(
      "SELECT * FROM User WHERE id = ?",
      [id]
    );
    return results;
  } catch (error) {
    console.error("Error getting user by id", error);
  }
};
const editUser = async (email, username, id) => {
  try {
    const [results, fields] = await sequelize.query(
      "UPDATE User SET email = ?, username = ? WHERE id = ?",
      [email, username, id]
    );
    console.log(results);
  } catch (error) {
    console.error("Error editing user", error);
  }
};
module.exports = {
  createNewUser,
  getListUser,
  deleteUser,
  getUserById,
  editUser,
};

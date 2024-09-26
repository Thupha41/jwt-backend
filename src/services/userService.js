import connection from "../configs/config.mysql";
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
const createNewUser = async (username, email, password) => {
  try {
    const hashPass = await hashPassword(password);
    const [results, fields] = await connection.query(
      "INSERT INTO users (username, email, password) values (?, ?, ?)",
      [username, email, hashPass]
    );
    console.log(results);
  } catch (error) {
    console.error("Error creating new user:", error);
  }
};

module.exports = {
  createNewUser,
};

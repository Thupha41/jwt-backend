import jwt from "jsonwebtoken";
require("dotenv").config();

let key = process.env.JWT_SECRET;
const createToken = (payload) => {
  let token = null;
  try {
    token = jwt.sign(payload, key);
  } catch (error) {
    console.log(error);
  }

  return token;
};

const verifyToken = (token) => {
  let data = null;
  jwt.verify(token, key, function (err, decoded) {
    if (err) {
      console.log(err);
      return data;
    }
    console.log(decoded);
    return decoded;
  });
};

module.exports = {
  createToken,
  verifyToken,
};

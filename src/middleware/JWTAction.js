import jwt from "jsonwebtoken";
require("dotenv").config();

let key = process.env.JWT_SECRET;
const nonSecurePaths = ["/register", "/login"];
const createToken = (payload) => {
  let token = null;
  try {
    token = jwt.sign(payload, key, { expiresIn: process.env.JWT_EXPIRES_IN });
  } catch (error) {
    console.log(error);
  }

  return token;
};

const verifyToken = (token) => {
  let decoded = null;
  try {
    decoded = jwt.verify(token, key);
  } catch (error) {
    console.log(error);
  }
  return decoded;
};

const checkUserJWT = (req, res, next) => {
  if (nonSecurePaths.includes(req.path)) return next();

  let cookies = req.cookies;
  if (cookies && cookies.jwt) {
    let token = cookies.jwt;
    let decoded = verifyToken(token);
    if (decoded) {
      req.user = decoded;
      req.token = token;
      next();
    } else {
      return res.status(401).json({
        EC: -1,
        EM: "User not authenticated",
        DT: "",
      });
    }
    console.log(">>> check cookies jwt", cookies.jwt);
  } else {
    return res.status(401).json({
      EC: -1,
      EM: "User not authenticated",
      DT: "",
    });
  }
};

const checkUserPermission = (req, res, next) => {
  if (nonSecurePaths.includes(req.path) || req.path === "/account")
    return next();

  if (req.user) {
    let { email, roles } = req.user;
    let currentUrl = req.path;
    let canAccess = roles.Permissions.some((item) => item.url === currentUrl);

    if (!roles.Permissions || roles.Permissions.length === 0) {
      return res.status(403).json({
        EC: -1,
        EM: "You don't have permission to access this resource!",
        DT: "",
      });
    }

    if (canAccess) {
      next();
    } else {
      return res.status(403).json({
        EC: -1,
        EM: "You don't have permission to access this resource!",
        DT: "",
      });
    }
  } else {
    return res.status(401).json({
      EC: -1,
      EM: "User not authenticated",
      DT: "",
    });
  }
};

module.exports = {
  createToken,
  verifyToken,
  checkUserJWT,
  checkUserPermission,
};

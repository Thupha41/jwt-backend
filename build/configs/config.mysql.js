"use strict";

var mysql = require("mysql2/promise");
require("dotenv").config();
var Sequelize = require("sequelize");
var _require = require("./config"),
  _require$development = _require.development,
  host = _require$development.host,
  username = _require$development.username,
  password = _require$development.password,
  database = _require$development.database,
  port = _require$development.port,
  dialect = _require$development.dialect;
// Create MySQL connection pool
var connection = mysql.createPool({
  host: host,
  user: username,
  port: port,
  database: database,
  password: password,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  enableKeepAlive: true,
  keepAliveInitialDelay: 0,
  charset: "utf8mb4"
});

// Connect to database with Sequelize
var sequelize = new Sequelize(database, username, password, {
  host: host,
  dialect: dialect,
  port: port
});
sequelize.authenticate().then(function () {
  console.log("Connection has been established successfully.");
})["catch"](function (error) {
  console.error("Unable to connect to the database:", error);
});
module.exports = {
  connection: connection,
  sequelize: sequelize
};
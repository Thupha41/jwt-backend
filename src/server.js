const express = require("express");
require("dotenv").config();
import configViewEngine from "./configs/viewEngine";
import webRoutes from "./routes/web";
const app = express();
const port = process.env.PORT || 8888;
const hostname = process.env.HOST_NAME;
import initApiRoute from "./routes/api";
import configCors from "./configs/cors";
import { createToken, verifyToken } from "./middleware/JWTAction";
//config template engine
configViewEngine(app);

//config req.body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//Khai bao config cors
configCors(app);
//Khai bao web route
app.use("/", webRoutes);
//test jwt
createToken();
verifyToken(
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoidGh1cGhhIiwiYWRkcmVzcyI6ImhvYW5nIGhvYSB0aGFtIiwiaWF0IjoxNzI4NTM0Nzc0fQ.0XslyiDXxq4-tTuEicactU9HjH4PUY2mdlpF7P2mCRQ"
);
// Khai bao api route
initApiRoute(app);

app.listen(port, hostname, () => {
  console.log(`Example app listening on port ${port}`);
});

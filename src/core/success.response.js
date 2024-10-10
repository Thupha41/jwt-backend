"use strict";

const { StatusCodes, ReasonPhrases } = require("../utils/httpStatusCode");

class SuccessResponse {
  constructor({
    message,
    statusCode = StatusCodes.OK,
    reasonStatusCode = ReasonPhrases.OK,
    data = {},
  }) {
    this.message = !message ? reasonStatusCode : message;
    this.statusCode = statusCode;
    this.data = data;
  }

  send(res, headers = {}) {
    return res.status(this.statusCode).json(this);
  }
}

class OK extends SuccessResponse {
  constructor({ message, data = {} }) {
    super({ message, data });
  }
}

class CREATED extends SuccessResponse {
  constructor({
    message,
    statusCode = StatusCodes.CREATED,
    reasonStatusCode = ReasonPhrases.CREATED,
    data,
  }) {
    super({ message, statusCode, reasonStatusCode, data });
  }
}

class NO_CONTENT extends SuccessResponse {
  constructor({
    message,
    statusCode = StatusCodes.NO_CONTENT,
    reasonStatusCode = ReasonPhrases.NO_CONTENT,
    data,
  }) {
    super({ message, statusCode, reasonStatusCode, data });
  }
}

module.exports = {
  OK,
  CREATED,
  NO_CONTENT,
};

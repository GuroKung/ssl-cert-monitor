const express = require("express");
const api = express.Router();

let { expireLists, sortedLists } = require('../src/validator');

api.get("/list", (req, res) => {
  res.send(sortedLists);
});

api.get("/expire", (req, res) => {
  res.send(expireLists);
});

module.exports = api;

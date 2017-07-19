const express = require("express");
const api = express.Router();

const expireLists = require('../src/json/expireLists');
const sortLists = require('../src/json/sortLists');

api.get("/list", (req, res) => {
  res.send(sortLists);
});

api.get("/expire", (req, res) => {
  res.send(expireLists);
});

module.exports = api;

const express = require("express");
const api = express.Router();

const expireLists = require("../src/json/expireLists");
const sortLists = require("../src/json/sortLists");

api.get("/list", (req, res) => {
  let result = Object.assign({ number: sortLists.items.length }, sortLists);
  res.send(result);
});

api.get("/expire", (req, res) => {
  let result = Object.assign({ number: expireLists.items.length }, expireLists);
  res.send(result);
});

module.exports = api;

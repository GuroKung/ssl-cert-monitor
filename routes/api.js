const express = require("express");
const api = express.Router();

const { readFromJsonFile } = require("../src/fileService");

api.get("/list", async (req, res) => {
  let sortLists = await readFromJsonFile("sortLists");
  let result = Object.assign({ number: sortLists.items.length }, sortLists);
  res.send(result);
});

api.get("/expire", async (req, res) => {
  let expireLists = await readFromJsonFile("expireLists");
  let result = Object.assign({ number: expireLists.items.length }, expireLists);
  res.send(result);
});

module.exports = api;

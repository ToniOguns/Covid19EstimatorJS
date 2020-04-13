var express = require("express");
var router = express.Router();
var index = require("../src/index.js");

router.get("/api/v1/on-covid-19", index.welcome);
router.post("/api/v1/on-covid-19", index.dataJson);
router.post("/api/v1/on-covid-19/json", index.dataJson);
router.post("/api/v1/on-covid-19/xml", index.dataXml);
router.get("/api/v1/on-covid-19/logs", index.logs);

module.exports = router;

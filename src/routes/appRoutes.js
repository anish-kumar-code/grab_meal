const express = require("express");

const vendorRoutes = require("./vendorRoutes");

exports.appRoutes = (app) => {
  app.use("/public", express.static("public"));
  app.use("/api/vendor", vendorRoutes);
};

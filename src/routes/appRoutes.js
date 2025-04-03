const express = require("express");

const vendorRoutes = require("./vendorRoutes");
const userRoutes = require("./userRoutes");

exports.appRoutes = (app) => {
  app.use("/public", express.static("public"));
  app.use("/api/vendor", vendorRoutes);
  app.use("/api/user", userRoutes)
};

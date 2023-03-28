const router = require("express").Router();

const surveyRoutes = require("./surveys.routes");
router.use("/surveys", surveyRoutes);

const authRoutes = require("./auth.routes");
router.use("/auth", authRoutes);

const usersRoutes = require("./users.routes");
router.use("/users", usersRoutes);

module.exports = router;

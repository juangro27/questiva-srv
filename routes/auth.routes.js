const router = require("express").Router();
const User = require("../models/User.model.js");
const { verifyToken } = require("../middlewares/verifyToken");

router.post("/signup", async (req, res, next) => {
    const { name, lastName, email, password } = req.body;

    try {
        await User.create({ email, password, name, lastName });
        res.sendStatus(201);
    } catch (err) {
        next(err);
    }
});

router.post("/login", async (req, res, next) => {
    const { email, password } = req.body;

    try {
        if (email === "" || password === "") {
            res.status(400).json({
                errorMessages: ["Provide email and password."],
            });
            return;
        }

        const user = await User.findOne({ email });

        if (!user) {
            res.status(401).json({ errorMessages: ["User not found."] });
            return;
        }

        if (user.validatePassword(password)) {
            const authToken = user.signToken();
            res.status(200).json({ authToken });
        } else {
            res.status(401).json({ errorMessages: ["Incorrect password"] });
        }
    } catch (error) {
        next(err);
        cl;
    }
});

router.get("/verify", verifyToken, (req, res, next) => {
    res.json(req.payload);
});

module.exports = router;

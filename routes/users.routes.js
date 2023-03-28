const router = require("express").Router();
const User = require("../models/User.model");
const { verifyToken } = require("../middlewares/verifyToken");

router.get("/", verifyToken, async (req, res, next) => {
    try {
        const users = await User.find().select({ name: 1 }).sort({ name: 1 });
        res.json(users);
    } catch (err) {
        next(err);
    }
});

router.get("/:id", async (req, res, next) => {
    const { id } = req.params;
    try {
        const user = await User.findById(id);
        res.json(user);
    } catch (err) {
        next(err);
    }
});

router.put("/:id/edit", verifyToken, async (req, res, next) => {
    const { id } = req.params;
    const { name, lastName, avatar } = req.body;
    try {
        const user = await User.findByIdAndUpdate(
            id,
            { name, lastName, avatar },
            { runValidators: true, new: true }
        );
        const authToken = user.signToken();
        res.status(200).json({ authToken });
    } catch (err) {
        next(err);
    }
});

router.delete("/:id/delete", verifyToken, async (req, res, next) => {
    const { id } = req.params;

    try {
        const user = User.findByIdAndDelete(id);
        res.json(`User deleted succesfully. User: ${user}`);
    } catch (err) {
        next(err);
    }
});

module.exports = router;

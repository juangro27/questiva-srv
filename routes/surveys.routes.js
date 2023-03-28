const { verifyToken } = require("../middlewares/verifyToken");
const Survey = require("../models/Survey.model");

const router = require("express").Router();

router.get("/", (req, res, next) => {
    res.json("hola");
});

router.post("/create", verifyToken, async (req, res, next) => {
    const { title, questions } = req.body;
    const { _id: owner } = req.payload;
    try {
        const survey = await Survey.create({ owner, title, questions });
        return res.json(survey);
    } catch (error) {
        next(error);
    }
});

router.delete("/delete/:id", verifyToken, async (req, res, next) => {
    const { id } = req.params;

    try {
        await Survey.findByIdAndDelete(id);
        res.sendStatus(200);
    } catch (err) {
        next(error);
    }
});

module.exports = router;

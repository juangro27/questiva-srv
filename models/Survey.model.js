const { Schema, model } = require("mongoose");

const surveySchema = new Schema(
    {
        owner: {
            required: [true, "Owner is required."],
            ref: "user",
            type: Schema.Types.ObjectId,
        },
        title: {
            type: String,
            required: [true, "Title is required."],
            trim: true,
        },

        questions: [
            {
                title: {
                    type: String,
                    required: [true, "Title is required."],
                    trim: true,
                },

                answers: [
                    {
                        title: {
                            type: String,
                            required: [true, "Title is required."],
                            trim: true,
                        },
                        count: {
                            type: Number,
                            default: 0,
                        },
                    },
                ],
            },
        ],
    },
    {
        timestamps: true,
    }
);

const Survey = model("survey", surveySchema);

module.exports = Survey;

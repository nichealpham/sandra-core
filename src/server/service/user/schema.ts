import { Schema } from "mongoose";

export default new Schema({
    email: {
        type: String,
        unique: true,
        required: true,
        maxlength: 50,
        minlength: 8,
        index: true,
    },
    password: {
        type: String,
        required: true,
    },

    firstName: String,
    lastName: String,
    avatar: String,

    personalInfo: new Schema({
        country: String,
        city: String,
        address: String,
        phone: String,
        postalCode: Number,
    }, { _id: false }),

    businessInfo: new Schema({
        companyName: String,
        address: String,
        phone: String,
        occupation: String,
    }, { _id: false }),

    accessToken: {
        type: String,
        index: true,
        unique: true,
    },
    createdAt: Date,
});
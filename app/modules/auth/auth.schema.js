const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const RefreshSchema = mongoose.model('refresh', new Schema({
    refresh_token: {
        type: String,
        required: true
    },
    access_token: {
        type: String,
        required: true
    },
    expires: {
        type: Date,
        required: true
    },
    userId: {
        type: String,
        unique: true,
        required: true
    }
}));

module.exports = RefreshSchema;
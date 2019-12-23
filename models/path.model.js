const mongoose = require('mongoose');

const Schema = mongoose.Schema;



const pathSchema = new Schema({
    path: { type: String, required: true},
}, {
    timestamps: true,
});

const Path = mongoose.model('Path', pathSchema);

module.exports = Path;
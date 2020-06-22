const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema for Users
const GlobalMessageSchema = new Schema({
    from: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required:true
    },
    body: {
        type: String,
        required: true,
    },
    date: {
        type: String,
        default: Date.now,
    },
});

const GlobalMessage = new mongoose.model(  'GlobalMessage', GlobalMessageSchema)

module.exports = GlobalMessage
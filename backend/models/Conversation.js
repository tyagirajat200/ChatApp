const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema for Users
const ConversationSchema = new Schema({
    recipients: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    lastMessage: {
        type: String,
        required: true
    },
    date: {
        type: String,
        default: Date.now,
    },
});
const Conversation =new  mongoose.model('Conversation', ConversationSchema)

module.exports = Conversation

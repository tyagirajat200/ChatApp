const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

const Message = require('../models/Message');
const Conversation = require('../models/Conversation');
const GlobalMessage = require('../models/GlobalMessage');

const {authChecker} = require('../middleware/Auth')

// Get global messages
router.get('/global',authChecker, (req, res) => {
    GlobalMessage.find()
        .populate('from')
        .exec((err, messages) => {
            if (err) return res.status(400).json({ message: 'Failure' });
            res.json({ success: true, messages });
            
        });
});

// Post global message
router.post('/global',authChecker, (req, res) => {
    let message = new GlobalMessage({
        from: req.session.user._id,
        body: req.body.body,
    });

    //req.io.sockets.emit('messages', req.body.body);

    message.save(err => {
        if (err) return res.status(400).json({ message: 'Failure' });
        req.io.sockets.emit('messages', req.body.body);
        res.json({ success: true });
    
        
    });
});

// Get conversations list
router.get('/conversations',authChecker, (req, res) => {
    let from = req.session.user._id;
    Conversation.find({ recipients: { $all: [{ $elemMatch: { $eq: from } }] } })
        .populate('recipients')
        .exec((err, conversations) => {
            if (err) return res.status(400).json({ message: 'Failure' });
            res.json({ success: true, conversations });
        });
});

// Get messages from conversation
// based on to & from
router.get('/conversations/query/:id',authChecker, (req, res) => {
    let user1 = req.session.user._id;
    let user2 = req.params.id
    Message.find({ $or: [{ to: user1, from: user2 }, { to: user2, from: user1 }] })
        .populate('from')
        .populate('to')
        .exec((err, messages) => {
            if (err) return res.status(400).json({ message: 'Failure' });
           
            res.json({ success: true, messages });
        });
});

// Post private message
router.post('/',authChecker, (req, res) => {
    let user1 = req.session.user._id;
    let user2 = req.body.to;

    Conversation.replaceOne(
        { recipients: { $all: [user1, user2] } },
        { recipients: [user1, user2], lastMessage: req.body.body, date: Date.now() },
        { new: true, upsert: true, setDefaultsOnInsert: true })
        .exec((err, conversation) => {
            if (err) return res.status(400).json({ message: 'Failure' });
            else {
                let message = new Message({
                    conversation: conversation._id,
                    to: req.body.to,
                    from: user1,
                    body: req.body.body,
                });

                // req.io.sockets.emit('messages', req.body.body);

                message.save(err => {
                    if (err) return res.status(400).json({ message: 'Failure' });
                    req.io.sockets.emit('messages', req.body.body);
                    res.json({ success: true });

                });
            }
        }
        );
});

module.exports = router;
const responseModel = require("../utils/responseModel");
const Groq = require("groq-sdk");
const AIChat = require('../models/AIChat');

const client = new Groq({apiKey: process.env.GROQ_API_KEY});

//SendMessage
const sendMessage = async(req, res) => {
    try {
        const {message} = req.body;
        
        const aiResponse = await client.chat.completions.create({
            model: "llama-3.3-70b-versatile",
            messages: [
                {
                    role: "system",
                    content: "You are a compassionate mental health support assistant. Provide empathetic, supportive responses to users dealing with stress, anxiety, and emotional challenges."
                },
                {
                    role: "user",
                    content: message
                }
            ],
            max_tokens: 1024
        });

        const responseText = aiResponse.choices[0].message.content;
        const saveChat = new AIChat({userId: req.user.userId, message, response: responseText});
        await saveChat.save();
        return res.status(201).json(responseModel({statusCode: 201, success: true, data: saveChat, message: 'Chat saved successfully:)'}));
    }
    catch(err) {
        res.status(400).json(responseModel({statusCode: 400, success: false, message: err.message}));
    }
}

//getChatHistory
const getChatHistory = async(req, res) => {
    try {
        const getChat = await AIChat.find({userId: req.user.userId});
        return res.status(200).json(responseModel({statusCode: 200, success: true, data: getChat, message: 'Chat data found'}));
    }
    catch(err) {
        res.status(400).json(responseModel({statusCode: 400, success: false, message: 'chat data not found:('}));
    }
}

module.exports = {sendMessage, getChatHistory};
import express from "express";

// Router
const ChatRouter = express.Router();

// Local Constants
const PathService = "/chats"

ChatRouter.get(PathService, (request, response) => {
    response.json({ Hola: "Mundo!!!!" })
})



export default ChatRouter
import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";

export async function sendMessage(req, res) {
    try {
        const { message } = req.body;
        const { userId: receiverId } = req.params;
        const senderId = req.user._id;

        let conversation = await Conversation.findOne({
            participants: { $all: [senderId, receiverId] }
        });

        if (!conversation) {
            conversation = await Conversation.create({
                participants: [senderId, receiverId]
            });
        };
        if (!message) {
            return res.status(401).json({ message: "message is required" });
        }
        const newMessage = new Message({
            senderId,
            receiverId,
            message,
        });

        if (newMessage) {
            conversation.messages.push(newMessage._id);
        };
        
        // SOCKET IO FUNCTIONALITY WILL BE HERE


        // await conversation.save();
        // await newMessage.save();
        await Promise.all([conversation.save(), newMessage.save()]);
        return res.status(200).json(newMessage);
    } catch (error) {
        console.log("Error in sendMessage Controller", error);
        return res.status(500).json({ message: "Internal Server Error" });
        
    }
};

export async function getMessages(req, res) {
    try {
        const { userId: userToChatId } = req.params;
        const { _id: senderId } = req.user;
        const conversation = await Conversation.findOne({
            participants: { $all: [senderId, userToChatId] },
        }).populate("messages");
        
        if (!conversation) {
            return res.status(400).json([]);
        }
       const messages = conversation.messages
        return res.status(200).json(messages);
    } catch (error) {
        console.log("Error in getMessages Controller", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}
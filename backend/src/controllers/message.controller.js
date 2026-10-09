import mongoose from "mongoose";
import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";
import { getReceiverSocketId, io } from "../socket/socket.js";

export async function sendMessage(req, res) {
    try {
        const message = typeof req.body?.message === "string" ? req.body.message.trim() : "";
        const { userId: receiverId } = req.params;
        const senderId = req.user._id;

        if (!mongoose.isValidObjectId(receiverId)) {
            return res.status(400).json({ message: "Invalid recipient ID" });
        }

        if (!message) {
            return res.status(400).json({ message: "Message is required" });
        }

        let conversation = await Conversation.findOne({
            participants: { $all: [senderId, receiverId] }
        });

        if (!conversation) {
            conversation = await Conversation.create({
                participants: [senderId, receiverId]
            });
        };

        const newMessage = new Message({
            senderId,
            receiverId,
            message,
        });

        if (newMessage) {
            conversation.messages.push(newMessage._id);
        };
        
       


        // await conversation.save();
        // await newMessage.save();
        await Promise.all([conversation.save(), newMessage.save()]);

        // SOCKET IO FUNCTIONALITY WILL BE HERE
        const receiverSocketId = getReceiverSocketId(receiverId);
        if (receiverSocketId) {
            io.to(receiverSocketId).emit("newMessage", newMessage);
        };


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

        if (!mongoose.isValidObjectId(userToChatId)) {
            return res.status(400).json({ message: "Invalid recipient ID" });
        }

        const conversation = await Conversation.findOne({
            participants: { $all: [senderId, userToChatId] },
        }).populate("messages");
        
        if (!conversation) {
            return res.status(200).json([]);
        }
        const messages = conversation.messages;
        return res.status(200).json(messages);
    } catch (error) {
        console.log("Error in getMessages Controller", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}
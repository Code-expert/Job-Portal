import Conversation from "../Models/Conversation.js";
import Message from "../Models/Message.js";
import User from "../Models/User.js";
import { getReceiverSocketId, io } from "../socket/socket.js";

export const sendMessage = async (req, res) => {
    try {
        const { id: receiverId } = req.params;
        const { message } = req.body;
        const senderId = req.id;

        if (!message) return res.status(400).json({ success: false, message: "Message is required" });

        let conversation = await Conversation.findOne({
            participants: { $all: [senderId, receiverId] }
        });

        if (!conversation) {
            conversation = await Conversation.create({
                participants: [senderId, receiverId]
            });
        }

        const newMessage = await Message.create({
            senderId,
            receiverId,
            message
        });

        if (newMessage) {
            conversation.messages.push(newMessage._id);
        }

        await conversation.save();

        // Real-time socket emit
        const receiverSocketId = getReceiverSocketId(receiverId);
        if (receiverSocketId) {
            io.to(receiverSocketId).emit("newMessage", newMessage);
        }

        return res.status(201).json({
            success: true,
            newMessage
        });

    } catch (error) {
        console.error("Error in sendMessage", error);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
}

export const getMessages = async (req, res) => {
    try {
        const { id: userToChatId } = req.params;
        const senderId = req.id;

        const conversation = await Conversation.findOne({
            participants: { $all: [senderId, userToChatId] }
        }).populate("messages");

        if (!conversation) return res.status(200).json({ success: true, messages: [] });

        return res.status(200).json({ success: true, messages: conversation.messages });

    } catch (error) {
        console.error("Error in getMessages", error);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
}

export const getChatUsers = async (req, res) => {
    try {
        const loggedInUserId = req.id;
        // For demonstration, return all other users so you can easily test chat
        const filteredUsers = await User.find({ _id: { $ne: loggedInUserId } }).select("-password");
        
        return res.status(200).json({ success: true, users: filteredUsers });
    } catch (error) {
        console.error("Error in getChatUsers", error);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
}

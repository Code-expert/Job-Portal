import { createSlice } from "@reduxjs/toolkit";

const chatSlice = createSlice({
    name: "chat",
    initialState: {
        messages: [],
        conversations: [], // this can hold users that the current user has chatted with
        onlineUsers: [],
        selectedUser: null,
    },
    reducers: {
        setMessages: (state, action) => {
            state.messages = action.payload;
        },
        addMessage: (state, action) => {
            state.messages.push(action.payload);
        },
        setConversations: (state, action) => {
            state.conversations = action.payload;
        },
        setOnlineUsers: (state, action) => {
            state.onlineUsers = action.payload;
        },
        setSelectedUser: (state, action) => {
            state.selectedUser = action.payload;
        }
    }
});

export const { setMessages, addMessage, setConversations, setOnlineUsers, setSelectedUser } = chatSlice.actions;
export default chatSlice.reducer;

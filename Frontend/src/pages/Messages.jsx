import React, { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import Navbar from "../components/Navbar";
import useGetChatUsers from "../hooks/useGetChatUsers";
import useGetMessages from "../hooks/useGetMessages";
import { setSelectedUser, addMessage } from "../store/chatSlice";
import { MESSAGE_API_END_POINT } from "../constant";
import axios from "axios";
import { Send, UserCircle2 } from "lucide-react";
import { io } from "socket.io-client";
import { SOCKET_URL } from "../constant";
import { setOnlineUsers } from "../store/chatSlice";

const Messages = () => {
  useGetChatUsers();
  useGetMessages();
  
  const dispatch = useDispatch();
  const { conversations, selectedUser, messages, onlineUsers } = useSelector((store) => store.chat);
  const { user } = useSelector((store) => store.auth);
  
  const [text, setText] = useState("");
  const scrollRef = useRef();
  const [socket, setSocket] = useState(null);

  // Initialize Socket
  useEffect(() => {
    if (user) {
      const newSocket = io(SOCKET_URL, {
        query: {
          userId: user._id
        }
      });
      setSocket(newSocket);

      newSocket.on("getOnlineUsers", (users) => {
        dispatch(setOnlineUsers(users));
      });

      return () => newSocket.close();
    } else {
      if (socket) {
        socket.close();
        setSocket(null);
      }
    }
  }, [user, dispatch]);

  // Listen for new messages
  useEffect(() => {
    if (socket) {
      socket.on("newMessage", (newMessage) => {
        // Only append if the message belongs to the currently selected user
        if (selectedUser && (newMessage.senderId === selectedUser._id || newMessage.receiverId === selectedUser._id)) {
            dispatch(addMessage(newMessage));
        }
      });
    }
    return () => {
        if(socket) socket.off("newMessage");
    }
  }, [socket, selectedUser, dispatch]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessageHandler = async (e) => {
    e.preventDefault();
    if (!text.trim() || !selectedUser) return;
    
    try {
      const res = await axios.post(`${MESSAGE_API_END_POINT}/send/${selectedUser._id}`, { message: text }, {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true
      });
      if (res.data.success) {
        dispatch(addMessage(res.data.newMessage));
        setText("");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 mt-8 flex h-[80vh] gap-6">
        {/* Sidebar */}
        <div className="w-1/3 bg-white/80 backdrop-blur-xl border border-gray-100 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden flex flex-col">
          <div className="p-6 border-b border-gray-100">
            <h2 className="text-2xl font-extrabold text-gray-800">Messages</h2>
          </div>
          <div className="overflow-y-auto flex-1 p-4 no-scrollbar">
            {conversations?.map((c) => (
              <div 
                key={c._id}
                onClick={() => dispatch(setSelectedUser(c))}
                className={`flex items-center gap-4 p-4 rounded-2xl cursor-pointer transition-all duration-300 mb-2 ${selectedUser?._id === c._id ? 'bg-indigo-50 border border-indigo-100 shadow-sm' : 'hover:bg-gray-50 border border-transparent'}`}
              >
                <div className="relative">
                  <img src={c.profile?.profilePhoto || "https://thumbs.dreamstime.com/b/default-profile-picture-avatar-user-icon-person-head-icons"} alt="profile" className="w-12 h-12 rounded-full object-cover border border-gray-200" />
                  {onlineUsers.includes(c._id) && (
                    <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 border-2 border-white rounded-full"></span>
                  )}
                </div>
                <div>
                  <h3 className="font-bold text-gray-800">{c.Fullname}</h3>
                  <p className={`text-xs font-semibold ${onlineUsers.includes(c._id) ? "text-green-600" : "text-gray-400"}`}>{onlineUsers.includes(c._id) ? "Online" : "Offline"}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Chat Area */}
        <div className="w-2/3 bg-white/80 backdrop-blur-xl border border-gray-100 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex flex-col overflow-hidden relative">
          {selectedUser ? (
            <>
              {/* Chat Header */}
              <div className="p-6 border-b border-gray-100 flex items-center gap-4 bg-white/50 backdrop-blur-md z-10 shadow-sm">
                 <img src={selectedUser.profile?.profilePhoto || "https://thumbs.dreamstime.com/b/default-profile-picture-avatar-user-icon-person-head-icons"} alt="profile" className="w-12 h-12 rounded-full object-cover shadow-sm" />
                 <div>
                   <h2 className="font-extrabold text-xl text-gray-800">{selectedUser.Fullname}</h2>
                   <p className="text-sm text-indigo-600 font-semibold">{selectedUser.Role === 'student' ? 'Applicant' : 'Recruiter'}</p>
                 </div>
              </div>

              {/* Messages Box */}
              <div className="flex-1 overflow-y-auto p-6 bg-gray-50/50 no-scrollbar flex flex-col gap-4">
                 {messages && messages.map((msg) => {
                    const isMe = msg.senderId === user?._id;
                    return (
                        <div key={msg._id} ref={scrollRef} className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
                           <div className={`max-w-[70%] px-5 py-3 rounded-2xl shadow-sm ${isMe ? 'bg-indigo-600 text-white rounded-br-sm' : 'bg-white text-gray-800 border border-gray-100 rounded-bl-sm'}`}>
                               <p className="text-sm font-medium leading-relaxed">{msg.message}</p>
                           </div>
                        </div>
                    )
                 })}
              </div>

              {/* Input Area */}
              <div className="p-4 bg-white border-t border-gray-100">
                <form onSubmit={sendMessageHandler} className="flex gap-3 items-center">
                  <input 
                    type="text" 
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Type a message..."
                    className="flex-1 px-5 py-3 bg-gray-50 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all font-medium text-gray-700"
                  />
                  <button type="submit" className="bg-indigo-600 text-white p-3.5 rounded-full hover:bg-indigo-700 transition-all hover:scale-105 hover:shadow-lg flex items-center justify-center">
                    <Send size={20} className="-ml-0.5" />
                  </button>
                </form>
              </div>
            </>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-gray-400 bg-gray-50/50">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6 shadow-inner">
                 <UserCircle2 size={48} className="text-gray-300" />
              </div>
              <h2 className="text-2xl font-extrabold text-gray-700 mb-2">Your Messages</h2>
              <p className="font-medium">Select a conversation from the sidebar to start chatting.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Messages;

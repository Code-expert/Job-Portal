import { useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setMessages } from "../store/chatSlice";
import { MESSAGE_API_END_POINT } from "../constant";

const useGetMessages = () => {
    const dispatch = useDispatch();
    const { selectedUser } = useSelector(store => store.chat);

    useEffect(() => {
        const fetchMessages = async () => {
            if(!selectedUser) return;
            try {
                const res = await axios.get(`${MESSAGE_API_END_POINT}/${selectedUser._id}`, {
                    withCredentials: true
                });
                if (res.data.success) {
                    dispatch(setMessages(res.data.messages));
                }
            } catch (error) {
                console.log("Error fetching messages:", error);
            }
        };
        fetchMessages();
    }, [selectedUser, dispatch]);
};
export default useGetMessages;

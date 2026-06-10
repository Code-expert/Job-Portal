import { useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setConversations } from "../store/chatSlice";
import { MESSAGE_API_END_POINT } from "../constant";

const useGetChatUsers = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const res = await axios.get(`${MESSAGE_API_END_POINT}/users`, {
                    withCredentials: true
                });
                if (res.data.success) {
                    dispatch(setConversations(res.data.users));
                }
            } catch (error) {
                console.log("Error fetching chat users:", error);
            }
        };
        fetchUsers();
    }, [dispatch]);
};
export default useGetChatUsers;

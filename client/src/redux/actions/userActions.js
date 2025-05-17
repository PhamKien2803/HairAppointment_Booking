import axiosInstance from "../../helper/axiosInstance";
import { setUser } from "../reducers/userReducer";

export const fetchUserData = () => async (dispatch) => {
    const token = localStorage.getItem("accessToken");
    const decoded = getDecodedToken(token);

    try {
        const response = await axiosInstance.get(`/api/user/${decoded.id}`, {
            headers: { Authorization: `Bearer ${token}` },
        });
        dispatch(setUser(response.data));
    } catch (err) {
        console.error(err);
    }
};

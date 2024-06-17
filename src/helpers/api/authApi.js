import { post } from "../api_helper";
import { USER_ROUTES,LOGIN,REGISTER } from "../constant";

const loginUser = async (userData) => await post(`${USER_ROUTES+LOGIN}`, userData);

const registerUser = async (data) => await post(`${USER_ROUTES+REGISTER}`, { ...data });

export { loginUser, registerUser };

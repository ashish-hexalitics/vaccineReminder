import { post } from "../api_helper";
import { USER_ROUTES } from "../constant";

const loginUser = async (userData) => {
  try {
    const data = await post("/user/login", userData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log("Logged in successfully:", data);
    return data;
  } catch (error) {
    console.error("Login failed:", error);
    return error;
  }
};

const registerUser = async (data) => {
  try {
    const response = await post(`${USER_ROUTES}/register`, { ...data });
    return response;
  } catch (error) {
    console.error("error:", error);
    return error;
  }
};

export { loginUser, registerUser };

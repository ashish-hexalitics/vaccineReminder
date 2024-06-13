import { post } from "../api_helper";

const loginUser = async (userData) => {
  //   const { email, password } = userData;
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

export { loginUser };

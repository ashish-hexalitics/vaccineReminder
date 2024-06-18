import { get, patch } from "../api_helper";
import { USER_ROUTES } from "../constant";

const getMe = async (userId) => {
  try {
    const data = await get(`${USER_ROUTES}/getuserinfo?user_id=${userId}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return data;
  } catch (error) {
    console.error("error:", error);
    return error;
  }
};

const getAllAdmin = async (userId) => {
  try {
    const data = await get(`${USER_ROUTES}/viewalladmins`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return data;
  } catch (error) {
    console.error("error:", error);
    return error;
  }
};

const getAllUsers = async (userId) => {
  try {
    const data = await get(`${USER_ROUTES}/viewallusers`);
    return data;
  } catch (error) {
    console.error("error:", error);
    return error;
  }
};

const getAllRoles = async (userId) => {
  try {
    const data = await get(`${USER_ROUTES}/getuserroles`);
    return data;
  } catch (error) {
    console.error("error:", error);
    return error;
  }
};

const getUserDetailsApi = (userId) =>
  get(`${USER_ROUTES}/getuserinfo?user_id=${userId}`);

const updateUserDetailsApi = (userId,data) =>
  patch(`${USER_ROUTES}/getuserinfo/${userId}`, data);

export {
  getMe,
  getAllAdmin,
  getAllUsers,
  getAllRoles,
  getUserDetailsApi,
  updateUserDetailsApi,
};

import { get, put, del } from "../api_helper";
import { USER_ROUTES, GET_USER_LIST, GET_USER_INFO } from "../constant";

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

const getAllUserByRoleApi = (roleName) =>
  get(`${USER_ROUTES + GET_USER_LIST}/?role_name=${roleName}`);

const getUserDetailsApi = (userId) =>
  get(`${USER_ROUTES + GET_USER_INFO}?user_id=${userId}`);

const updateUserDetailsApi = (slug, data) =>
  put(`${USER_ROUTES}/${slug}`, data);

const deleteUserApi = (userId,role) => del(`${USER_ROUTES}/delete${role}`);

export {
  getMe,
  getAllAdmin,
  getAllUsers,
  getAllRoles,
  getUserDetailsApi,
  updateUserDetailsApi,
  getAllUserByRoleApi,
  deleteUserApi,
};

import { get } from "../api_helper";

const getDashboard = async (userId) => {
  try {
    const data = await get(`/common/getdashboardcounts?logged_in_id=${userId}`, {
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

export { getDashboard };
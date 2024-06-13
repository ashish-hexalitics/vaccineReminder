import { get } from "../api_helper";

const getVaccineTemplates = async () => {
  try {
    const data = await get(`vaccine/getvaccinetemplatelist`, {
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

export { getVaccineTemplates };

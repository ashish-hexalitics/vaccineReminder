import { get } from "../api_helper";

const getVaccineTemplates = async () => {
  try {
    const data = await get(`vaccine/get_vaccine_template_list`, {
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

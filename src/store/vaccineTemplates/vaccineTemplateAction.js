import {
  GET_VACCINE_TEMPLATES,
  GET_VACCINE_TEMPLATES_SUCCESS,
  VACCINE_TEMPLATES_API_FAIL,
  UPDATE_VACCINE_TEMPLATES_LOADER,
  RESET_VACCINE_TEMPLATES,
} from "./actionType";

const getVaccineTemplateList = () => {
  return {
    type: GET_VACCINE_TEMPLATES,
  };
};

const getVaccineTemplateListSuccess = (data) => {
  return {
    type: GET_VACCINE_TEMPLATES_SUCCESS,
    payload: data,
  };
};

const vaccineTemplateApiFail = (error) => {
  return {
    type: VACCINE_TEMPLATES_API_FAIL,
    payload: error,
  };
};

const updateVaccineTemplateLoader = (loader) => {
  return {
    type: UPDATE_VACCINE_TEMPLATES_LOADER,
    payload: loader,
  };
};

const resetVaccineTemplateList = () => {
  return {
    type: RESET_VACCINE_TEMPLATES,
  };
};

export {
  getVaccineTemplateList,
  getVaccineTemplateListSuccess,
  vaccineTemplateApiFail,
  updateVaccineTemplateLoader,
  resetVaccineTemplateList
};

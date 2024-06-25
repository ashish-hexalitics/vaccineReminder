import React, { useState, useEffect } from "react";
import { Box } from "@chakra-ui/react";
import { getAllRoles } from "../../helpers/api/userApi";
import AppForm from "../../components/AppForm";
import { formFields } from "./utils";
import { createVaccineTemplateList } from "../../store/vaccineTemplates/vaccineTemplateAction";
import { useDispatch } from "react-redux";

const CreateVaccineTemplates = () => {
  const [roleData, setRoleData] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      const roles = await getAllRoles();
      if (roles?.response_data) {
        setRoleData(roles.response_data);
      }
    };
    fetchData();
  }, []);

  const handleSubmit = (formikValues, formik) => {
    const created_date = new Date().toISOString(); // Use the current date and time in ISO format
    const payload = {
        ...formikValues,
        created_date,
        ismulti: formikValues.vaccineDetails.length > 0,
        vaccines: formikValues.vaccineDetails.length > 0 ? formikValues.vaccineDetails : formikValues.vaccineDetails[0],
    };

    dispatch(createVaccineTemplateList(payload));
  };

  const fields = formFields(roleData);

  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
      <AppForm
        formTitle="Create Vaccine Template"
        initialValues={{
          vaccineDetails: [{ range: "", timePeriod: "", month: "", week: "", days: "", name: "", description: "",is_mandatory:0 }],
        }}
        formFields={fields}
        handleFormSubmit={handleSubmit}
        formType="collapsible"
      />
    </Box>
  );
};

export default CreateVaccineTemplates;

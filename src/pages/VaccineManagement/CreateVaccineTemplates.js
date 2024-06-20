import React, { useState, useEffect } from "react";
import { Box } from "@chakra-ui/react";
import { getAllRoles } from "../../helpers/api/userApi";
import AppForm from "../../components/AppForm";
import { formFields } from "./utils";

const CreateVaccineTemplates = () => {
  const [roleData, setRoleData] = useState([]);

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
    console.log(formikValues, formik, "Submit");
  };

  const fields = formFields(roleData);

  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
      <AppForm
        formTitle="Create Vaccine Template"
        initialValues={{
          name: "",
          email: "",
          vaccineDetails: [{ range: "", timePeriod: "", month: "", week: "", days: "", description: "" }],
        }}
        formFields={fields}
        handleFormSubmit={handleSubmit}
        formType="collapsible"
      />
    </Box>
  );
};

export default CreateVaccineTemplates;

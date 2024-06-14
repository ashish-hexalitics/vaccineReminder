import React, { useState, useEffect } from "react";
import { Box } from "@chakra-ui/react";
import { getAllRoles } from "../../helpers/api/userApi";
import AppForm from "../../components/AppForm";
import { formFields } from "./utils";
import { useDispatch, useSelector } from "react-redux";
import { createUser as onCreateUser } from "../../store/userConfigure/userAction";
// import AppToaster from "../../components/AppToaster";
import moment from "moment";

const CreateUser = () => {
  const [roleData, setRoleData] = useState([]);
  const dispatch = useDispatch();

  const { loggedInUser } = useSelector((state) => {
    return { loggedInUser: state.authReducer.user };
  });

  useEffect(() => {
    const fetchData = async () => {
      const roles = await getAllRoles();
      if (roles?.response_data) {
        setRoleData(
          Array.isArray(roles?.response_data) &&
            roles.response_data.filter(
              (role) => role?.role_name !== "Superadmin"
            )
        );
      }
    };
    fetchData();
  }, []);

  const handleSubmit = (formikValues, formik) => {
    console.log(formikValues, formik, "Submit");
    dispatch(
      onCreateUser({
        ...formikValues,
        created_by: loggedInUser.id,
        parent_id: loggedInUser.id,
        logged_in_id: loggedInUser.id,
        role_id: Number(formikValues.role_id),
        created_date: moment().format("YYYY-MM-DD"),
      })
    );
    // formik.validateForm().then((errors) => {
    //   if (Object.keys(errors).length === 0) {
    //     console.log(formikValues, "formikValues>>");
    //   } else {
    //     const touchedFields = {};
    //     Object.keys(errors).forEach((field) => {
    //       touchedFields[field] = true;
    //     });
    //     formik.setTouched(touchedFields);
    //     console.log("Validation errors:", errors);
    //   }
    // });
  };

  const fields = formFields(roleData);

  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
      {/* <AppToaster
        title="User created successfully"
        description="User created successfully"
        status="success"
      /> */}
      <AppForm
        formTitle="Create User"
        initialValues={{
          name: "",
          email: "",
          password: "",
        }}
        formFields={fields}
        handleFormSubmit={handleSubmit}
      />
    </Box>
  );
};

export default CreateUser;

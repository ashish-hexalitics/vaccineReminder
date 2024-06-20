import React, { useState, useEffect } from "react";
import AppTableForm from "../../components/AppTableForm"; // Adjust the path based on your file structure
import { Box, SimpleGrid } from "@chakra-ui/react";
import { useSelector, useDispatch } from "react-redux";
import {
  resetRolesUser,
  userRoles as getUserRoles,
} from "../../store/userRoles/roleAction";
import { resetModules, getModules } from "../../store/modules/modulesAction";
import { useParams } from "react-router-dom";

function Permissions() {
  const dispatch = useDispatch();
  const params = useParams();

  const [permissions, setPermissions] = useState([]);

  const { loggedInUser, modules, userRoles } = useSelector((state) => {
    return {
      userRoles: state.roleReducer.roles,
      loggedInUser: state.authReducer.user,
      modules: state.modulesReducer.modules,
    };
  });

  useEffect(() => {
    dispatch(getUserRoles());
    dispatch(getModules());
    return () => {
      dispatch(resetRolesUser());
      dispatch(resetModules());
    };
  }, [dispatch]);

  useEffect(() => {
    console.log(params);
    if (modules && Array.isArray(modules)) {
      setPermissions(
        modules
          .map((module) => ({
            name: module?.module_name,
            create: false,
            delete: false,
            update: false,
            read: false,
          }))
          .filter(
            (module) =>
              module.name.toLowerCase() !== params?.roleName?.toLowerCase() &&
              module.name.toLowerCase() !== "superadmin"
          )
      );
    }
  }, [modules]);

  const handleCheckboxChange = (index, field, value) => {
    const newPermissions = [...permissions];
    newPermissions[index][field] = value;
    setPermissions(newPermissions);
  };

  const handleSubmit = () => {
    console.log("Submitted Permissions:", permissions);
    // Handle the form submission as needed
  };

  const moduleData = permissions.map((module, index) => ({
    ...module,
    onChange: (field, value) => handleCheckboxChange(index, field, value),
  }));

  const dropdownOptions =
    userRoles &&
    Array.isArray(userRoles) &&
    userRoles
      .map((userRole) => ({
        value: userRole.id,
        label: userRole.role_name,
      }))
      .filter((role) => role.label !== loggedInUser?.role_name);

  const handleDropdownChange = (event) => {
    console.log("Selected Option:", event.target.value);
    // Handle the dropdown selection change as needed
  };

  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
      <SimpleGrid
        mb="20px"
        columns={{ sm: 1, md: 2, lg: 1 }}
        spacing={{ base: "20px", xl: "20px" }}
      >
        <AppTableForm
          columns={["Module", "Create", "Delete", "Update", "Read"]}
          modules={moduleData}
          onSubmit={handleSubmit}
          tableTitle="Manage Permissions"
          dropdownOptions={dropdownOptions}
          onDropdownChange={handleDropdownChange}
        />
      </SimpleGrid>
    </Box>
  );
}

export default Permissions;

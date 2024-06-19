import React, { useState, useEffect } from "react";
import AppTableForm from "../../components/AppTableForm"; // Adjust the path based on your file structure
import { Box, SimpleGrid } from "@chakra-ui/react";
import { useSelector, useDispatch } from "react-redux";
import {
  resetRolesUser,
  userRoles as getUserRoles,
} from "../../store/userRoles/roleAction";

function Permissions() {
  const dispatch = useDispatch();

  const [modules, setModules] = useState([
    { name: "User Management", create: false, delete: false, update: false },
    { name: "Roles", create: false, delete: false, update: false },
    // Add more modules as needed
  ]);
  const [roleData, setRoleData] = useState([]);

  const { loggedInUser, userRoles } = useSelector((state) => {
    return {
      userRoles: state.roleReducer.roles,
      loggedInUser: state.authReducer.user,
    };
  });

  useEffect(() => {
    dispatch(getUserRoles());
    return () => {
      dispatch(resetRolesUser());
    };
  }, []);

  const handleCheckboxChange = (index, field, value) => {
    const newModules = [...modules];
    newModules[index][field] = value;
    setModules(newModules);
  };

  const handleSubmit = () => {
    console.log("Submitted Permissions:", modules);
    // Handle the form submission as needed
  };

  const moduleData = modules.map((module, index) => ({
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

  console.log(userRoles, "userRoles");
  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
      <SimpleGrid
        mb="20px"
        columns={{ sm: 1, md: 2, lg: 1 }}
        spacing={{ base: "20px", xl: "20px" }}
      >
        <AppTableForm
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

import React, { useState, useEffect } from "react";
// Chakra imports
import { Box, SimpleGrid, useDisclosure } from "@chakra-ui/react";
import AppTable from "../../components/AppTable";

import { getAllUserByRoleApi } from "../../helpers/api/userApi";
import AppLoader from "../../components/AppLoader";
import { useParams, useNavigate } from "react-router-dom";
import ConfirmationDialog from "../../components/AppDialog"; // Adjust the import path as necessary
import toastr from "toastr";

const columns = [
  {
    Header: "NAME",
    accessor: "name",
    label: "NAME",
  },
  {
    Header: "EMAIL",
    accessor: "email",
    label: "Email",
  },
];

const StaffList = () => {
  const [staffData, setStaffData] = useState([]);
  const params = useParams();
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    getdata();
  }, []);

  const getdata = async () => {
    try {
      const data = await getAllUserByRoleApi();
      if (data?.response_data) {
        setStaffData(
          data?.response_data.map((response) => ({
            ...response,
          }))
        );
      }
    } catch (error) {
      toastr.error(error.response.data.message);
    }
  };

  const handleActions = (data, actionType) => {
    if (actionType === "EDIT") {
      navigate(`/${params.roleName}/edit/admin/${data.id}`);

      console.log("More action triggered", data, actionType);
    } else if (actionType === "DELETE") {
      onOpen();
    }
    // Handle more action here
  };

  const handleConfirm = () => {
    console.log("Confirmed!");
    onClose();
  };

  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
      <SimpleGrid
        mb="20px"
        columns={{ sm: 1, md: 2, lg: 1 }}
        spacing={{ base: "20px", xl: "20px" }}
      >
        {staffData.length > 0 ? (
          <AppTable
            columnsData={columns}
            tableData={staffData}
            onView={handleActions}
            onEdit={handleActions}
            onDelete={handleActions}
            // onMore={handleMore}
          />
        ) : (
          <AppLoader />
        )}
        <ConfirmationDialog
          isOpen={isOpen}
          onClose={onClose}
          title="Are you sure want to delete this user ?."
          body="Are you sure? You can't undo this action afterwards."
          confirmText="Yes"
          cancelText="No"
          onConfirm={handleConfirm}
        />
      </SimpleGrid>
    </Box>
  );
};

export default StaffList;

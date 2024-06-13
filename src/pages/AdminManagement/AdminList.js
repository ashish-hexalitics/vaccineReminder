import React, { useState, useEffect } from "react";
// Chakra imports
import { Box, SimpleGrid } from "@chakra-ui/react";
import DevelopmentTable from "../VaccineManagement/components/DevelopmentTable";

import { getAllAdmin } from "../../helpers/api/userApi";
import AppLoader from "../../components/AppLoader";

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

export default function AdminList() {
  const [adminData, setAdminData] = useState([]);
  useEffect(() => {
    getdata();
  }, []);

  const getdata = async () => {
    const data = await getAllAdmin();
    if (data?.response_data) {
      setAdminData(
        data?.response_data.map((response) => ({
          ...response,
        }))
      );
    }
  };
  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
      <SimpleGrid
        mb="20px"
        columns={{ sm: 1, md: 2, lg: 1 }}
        spacing={{ base: "20px", xl: "20px" }}
      >
        {adminData.length > 0 ? (
          <DevelopmentTable columnsData={columns} tableData={adminData} />
        ) : (
          <AppLoader />
        )}
      </SimpleGrid>
    </Box>
  );
}

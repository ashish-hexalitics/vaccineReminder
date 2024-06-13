import React, { useState, useEffect } from "react";
// Chakra imports
import { Box, SimpleGrid } from "@chakra-ui/react";
import DevelopmentTable from "./components/DevelopmentTable";
import AppLoader from "../../components/AppLoader";

import { getVaccineTemplates } from "../../helpers/api/vaccineTemplateApi";

const columns = [
  {
    Header: "NAME",
    accessor: "name",
    label: "NAME",
  },
  {
    Header: "VACCINE FREQUENCY",
    accessor: "vaccine_frequency",
    label: "VACCINE FREQUENCY",
  },
  {
    Header: "VERSION NUMBER",
    accessor: "version_number",
    label: "VERSION NUMBER",
  },
  {
    Header: "IS MANDATORY",
    accessor: "is_mandatory",
    label: "IS MANDATORY",
  },
  {
    Header: "CREATED BY",
    accessor: "created_by",
    label: "CREATED BY",
  },
  {
    Header: "CREATED DATE",
    accessor: "created_date",
    label: "DATE",
  },
];

export default function VaccineTemplateList() {
  const [vaccineTemplates, setVaccineTemplates] = useState([]);
  useEffect(() => {
    getdata();
  }, []);

  const getdata = async () => {
    const data = await getVaccineTemplates();
    if (data?.response_data) {
      setVaccineTemplates(
        data?.response_data.map((response) => ({
          ...response,
          is_mandatory: response.is_mandatory ? "Yes" : "No",
          vaccine_frequency: response.vaccine_frequency + " Days",
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
        {vaccineTemplates.length > 0 ? (
          <DevelopmentTable
            columnsData={columns}
            tableData={vaccineTemplates}
          />
        ) : (
          <AppLoader />
        )}
      </SimpleGrid>
    </Box>
  );
}

import React, { useState, useEffect } from "react";
// Chakra imports
import { Box, SimpleGrid } from "@chakra-ui/react";
import AppTable from "../../components/AppTable";
import AppLoader from "../../components/AppLoader";
import {
  getVaccineTemplateList,
  resetVaccineTemplateList,
} from "../../store/vaccineTemplates/vaccineTemplateAction";
import { useDispatch, useSelector } from "react-redux";

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
  const dispatch = useDispatch();

  const { vaccineTemplateReducer } = useSelector((state) => {
    return {
      vaccineTemplateReducer: state.vaccineTemplateReducer.vaccineTemplates,
    };
  });

  const [vaccineTemplates, setVaccineTemplates] = useState([]);
  useEffect(() => {
    dispatch(resetVaccineTemplateList());
    getdata();
    return () => {
      dispatch(resetVaccineTemplateList());
    };
  }, []);

  useEffect(() => {
    if (Array.isArray(vaccineTemplateReducer) && vaccineTemplateReducer) {
      setVaccineTemplates(
        vaccineTemplateReducer.map((response) => ({
          ...response,
          is_mandatory: response.is_mandatory ? "Yes" : "No",
          vaccine_frequency: response.vaccine_frequency + " Days",
        }))
      );
    }
  }, [vaccineTemplateReducer]);

  const getdata = async () => {
    dispatch(getVaccineTemplateList());
  };

  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
      <SimpleGrid
        mb="20px"
        columns={{ sm: 1, md: 2, lg: 1 }}
        spacing={{ base: "20px", xl: "20px" }}
      >
        {vaccineTemplates.length > 0 ? (
          <AppTable
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

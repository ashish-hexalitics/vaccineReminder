import React from "react";
// Chakra imports
import { Box, Spinner } from "@chakra-ui/react";

function index() {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Spinner />
    </Box>
  );
}

export default index;

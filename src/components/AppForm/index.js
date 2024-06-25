import React from "react";
import {
  Button,
  Flex,
  Box,
  Text,
  useColorModeValue,
  Grid,
  GridItem,
} from "@chakra-ui/react";
import { Formik, Form } from "formik";
import Card from "../card/Card";
import { renderInputs } from "./fields";
import { createValidationSchema } from "./validation";
import { useNavigate } from "react-router-dom";

function AppForm({
  formFields = [],
  initialValues = {},
  handleFormSubmit,
  formTitle = "",
  showCancel = false,
  formType = "normal",
}) {
  const textColor = useColorModeValue("secondaryGray.900", "white");
  const validationSchema = createValidationSchema(formFields);
  const navigate = useNavigate();

  return (
    <Box pt={{ base: "20px", md: "30px", xl: "40px" }}>
      <Card w="100%" px="0px" overflowX={{ sm: "scroll", lg: "hidden" }}>
        <Flex px="25px" justify="space-between" mb="20px" align="center">
          <Text
            color={textColor}
            fontSize="22px"
            fontWeight="700"
            lineHeight="100%"
            textTransform="capitalize"
          >
            {formTitle}
          </Text>
        </Flex>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={(values, actions) => {
            handleFormSubmit(values, actions);
          }}
        >
          {(formik) => (
            <Form>
              {formType === "normal" && (
                <Grid
                  // templateColumns={{
                  //   base: "repeat(1, 1fr)",
                  //   sm: "repeat(2, 1fr)",
                  //   lg: "repeat(3, 1fr)",
                  // }}
                  templateRows="repeat(1, 1fr)"
                  templateColumns="repeat(3, 1fr)"
                  columnGap={2}
                  px="25px"
                >
                  {formFields.map((field, index) => (
                    <GridItem colSpan={field?.colSpan?field?.rowSpan:1} rowSpan={field?.rowSpan?field?.rowSpan:1} key={index}>
                      {renderInputs(field, formik)}
                    </GridItem>
                  ))}
                </Grid>
              )}
              {formType === "collapsible" && (
                <Grid
                  templateColumns={{
                    base: "repeat(1, 1fr)",
                    sm: "repeat(1, 1fr)",
                    lg: "repeat(1, 1fr)",
                  }}
                  columnGap={2}
                  px="25px"
                >
                  {formFields.map((field, index) => (
                    <GridItem key={index}>
                      {renderInputs(field, formik)}
                    </GridItem>
                  ))}
                </Grid>
              )}
              <Flex px="25px" justify="flex-end" mb="20px" align="center">
                {showCancel && (
                  <Button
                    h="44px"
                    me="2"
                    mb="10px"
                    variant="brand"
                    onClick={() => navigate(-1)}
                  >
                    Cancel
                  </Button>
                )}
                <Button type="submit" h="44px" mb="10px" variant="brand">
                  Submit
                </Button>
              </Flex>
            </Form>
          )}
        </Formik>
      </Card>
    </Box>
  );
}

export default AppForm;

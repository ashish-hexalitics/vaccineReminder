import React from "react";
import {
  Box,
  Button,
  Flex,
  Grid,
  GridItem,
  IconButton,
} from "@chakra-ui/react";
import { FieldArray, useFormikContext } from "formik";
import { AddIcon, MinusIcon } from "@chakra-ui/icons";
import { renderInputs } from "./fields";

const AppMultiFieldsFields = ({
  name,
  fields,
  formik,
  formFields,
  templateColumns = "repeat(3, 1fr)",
}) => {
  const { values, setFieldValue } = useFormikContext();
  const fieldValues = values[name] || [];

  const addFieldSet = () => {
    const newFieldSet = fields.reduce(
      (acc, field) => ({ ...acc, [field.name]: "" }),
      {}
    );
    setFieldValue(name, [...fieldValues, newFieldSet]);
  };

  return (
    <FieldArray name={name}>
      {({ remove }) => (
        <Box>
          {fieldValues.map((_, index) => (
            <Box
              position={"relative"}
              mb={"10px"}
              backgroundColor={"#FAF5FF"}
              sx={{ border: "1px solid #E6ECFA", borderRadius: "10px" }}
              paddingX={"40px"}
              paddingY={"20px"}
              key={index}
            >
              <Grid
                key={index}
                templateColumns={templateColumns}
                columnGap={2}
                // alignItems="center"
                rowGap={2}
              >
                {/* {fields.map((field, fieldIndex) => (
                  <GridItem
                    colSpan={field?.colSpan ? field?.colSpan : 2}
                    rowSpan={field?.rowSpan ? field?.rowSpan : 3}
                    key={fieldIndex}
                  >
                    {renderInputs(
                      { ...field, name: `${name}[${index}].${field.name}` },
                      formik
                    )}
                  </GridItem>
                ))} */}
                {fields.map((field, fieldIndex) =>
                  renderInputs(
                    { ...field, name: `${name}[${index}].${field.name}` },
                    formik
                  )
                )}
              </Grid>
              <Box
                position="absolute"
                display={"flex"}
                flexDirection={"column"}
                right={0}
                top={"50%"}
                transform={"translate(50%,-50%)"}
                colSpan={1}
              >
                <IconButton
                  aria-label="Add Field"
                  icon={<AddIcon />}
                  colorScheme="blue"
                  onClick={addFieldSet}
                  // mt={4}
                />
                {index > 0 && (
                  <IconButton
                    aria-label="Remove field"
                    icon={<MinusIcon />}
                    onClick={() => remove(index)}
                    colorScheme="red"
                    // outline="outline"
                    // backgroundColor={"#FEB2B2"}
                    mt={4}
                    // me={2}
                  />
                )}
              </Box>
            </Box>
          ))}
          {/* <Flex justifyContent="flex-end" mt={2}>
            <IconButton
              aria-label="Add Field"
              icon={<AddIcon />}
              colorScheme="blue"
              onClick={addFieldSet}
            />
          </Flex> */}
        </Box>
      )}
    </FieldArray>
  );
};

export default AppMultiFieldsFields;

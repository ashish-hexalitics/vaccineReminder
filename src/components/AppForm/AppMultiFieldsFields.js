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

const AppMultiFieldsFields = ({ name, fields, formik }) => {
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
            <Grid
              key={index}
              templateColumns="repeat(3, 1fr)"
              columnGap={2}
              alignItems="center"
            >
              {fields.map((field, fieldIndex) => (
                <GridItem colSpan={1} key={fieldIndex}>
                  {renderInputs(
                    { ...field, name: `${name}[${index}].${field.name}` },
                    formik
                  )}
                </GridItem>
              ))}
              <GridItem colSpan={1}>
                {index > 0 && (
                  <IconButton
                    aria-label="Remove field"
                    icon={<MinusIcon />}
                    onClick={() => remove(index)}
                    colorScheme="red"
                    mt={4}
                    me={2}
                  />
                )}
                <IconButton
                  aria-label="Add Field"
                  icon={<AddIcon />}
                  colorScheme="blue"
                  onClick={addFieldSet}
                  mt={4}
                />
              </GridItem>
            </Grid>
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

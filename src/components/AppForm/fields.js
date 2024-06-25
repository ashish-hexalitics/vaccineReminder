import React from "react";
import AppInput from "../AppInput";
import AppSelect from "../AppSelect";
import AppInputTel from "../AppInputTel";
import AppPassword from "../AppPassword";
import AppDate from "../AppDate";
import AppEmail from "../AppEmail";
import AppMultiSelect from "../AppMultiSelect";
import AppMultiFieldsFields from "./AppMultiFieldsFields";
import AppCheckBox from "../AppCheckBox";
import { Grid, GridItem, Box } from "@chakra-ui/react";

export const renderInputs = (field, formik) => {
  const commonProps = {
    name: field.name,
    label: field.label,
    placeholder: field.placeholder,
    value: formik.values[field.name],
    onChange: formik.handleChange,
    onBlur: formik.handleBlur,
    invalid: formik.touched[field.name] && formik.errors[field.name],
    error: formik.errors[field.name],
  };

  const renderConditionFields = (field, formik) => {
    if (field.isCondition) {
      const selectedRole = formik.values["role_id"];
      const role = formik.values["role_id"];
      if (field.checkConditions.includes(role)) {
        return (
          <Grid
            templateColumns="repeat(3, 1fr)"
            gap={4}
            // ml={4} // Adjust margin as needed for spacing
          >
            {field.conditionFields.map((conditionField, index) => (
              <GridItem
                key={index}
                colSpan={conditionField.colSpan || 1}
                rowSpan={conditionField.rowSpan || 1}
              >
                {renderInputs(conditionField, formik)}
              </GridItem>
            ))}
          </Grid>
        );
      }
    }
    return null;
  };

  const renderConditionFields2 = (field, formik) => {
    if (field.isCondition && field.shoWhen) {
      const values = formik.values.vaccineDetails[0];
      const selectedTimePeriod = values.timePeriod;

      const condition = field.shoWhen.find(
        (cond) => cond.timePeriod === selectedTimePeriod
      );

      if (condition) {
        const relevantConditionFields = field.conditionFields.filter(
          (conditionField) => conditionField.name === selectedTimePeriod
        );

        return relevantConditionFields.map((conditionField, index) => {
          return (
            <GridItem
              key={index}
              colSpan={conditionField.colSpan || 1}
              rowSpan={conditionField.rowSpan || 1}
            >
              {renderInputs(conditionField, formik)}
            </GridItem>
          );
        });
      }
    }
    return null;
  };

  // <Box  key={index} >{renderInputs(conditionField, formik)}</Box>;

  //     <Grid templateColumns="repeat(3, 1fr)" gap={4}>
  //     <GridItem key={index} colSpan={conditionField.colSpan || 1} rowSpan={conditionField.rowSpan || 1}>
  //     </GridItem>
  // </Grid>

  const fieldComponent = () => {
    switch (field.type) {
      case "text":
        return <AppInput {...commonProps} />;
      case "email":
        return <AppEmail {...commonProps} />;
      case "tel":
        return <AppInputTel {...commonProps} />;
      case "password":
        return <AppPassword {...commonProps} />;
      case "date":
        return <AppDate {...commonProps} />;
      case "select":
        return (
          <>
            <AppSelect {...commonProps} options={field.options} />
            {!field.shoWhen && renderConditionFields(field, formik)}
            {field.shoWhen && renderConditionFields2(field, formik)}
          </>
        );
      case "multi-select":
        return <AppMultiSelect {...commonProps} options={field.options} />;
      case "multiFields":
        return (
          <AppMultiFieldsFields
            {...field}
            formik={formik}
            templateColumns={field.templateColumns}
          />
        );
      case "checkbox":
        return <AppCheckBox {...field} formik={formik} />;
      default:
        return null;
    }
  };

  return <Box>{fieldComponent()}</Box>;
};

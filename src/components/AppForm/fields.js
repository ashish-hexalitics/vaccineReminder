import React from "react";
import AppInput from "../AppInput";
import AppSelect from "../AppSelect";
import AppInputTel from "../AppInputTel";
import AppPassword from "../AppPassword";
import AppDate from "../AppDate";
import AppEmail from "../AppEmail";

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
      return <AppSelect {...commonProps} options={field.options} />;
    default:
      return null;
  }
};

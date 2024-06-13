import React from "react";
import {
  FormLabel,
  Select,
  Text,
  useColorModeValue,
  FormControl,
  FormErrorMessage,
} from "@chakra-ui/react";

const AppSelect = ({
  name,
  value,
  onChange,
  onBlur,
  invalid,
  error,
  disabled,
  handleChange,
  isRequired = true,
  fontSize = "sm",
  placeholder = "",
  label = "",
  styles = {},
  size = "lg",
  options = [],
}) => {
  const textColor = useColorModeValue("navy.700", "white");
  return (
    <FormControl isInvalid={invalid} isRequired={isRequired}>
      {label && (
        <FormLabel fontSize="sm" fontWeight="500" color={textColor} mb="8px">
          {label}
        </FormLabel>
      )}
      <Select
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        isDisabled={disabled}
        placeholder={placeholder}
        sx={{ ...styles }}
        fontSize={fontSize}
        variant="auth"
        size={size}
        errorBorderColor="crimson"
      >
        {options.map((option, key) => (
          <option value={option.value} key={key}>{option.label}</option>
        ))}
      </Select>
      <FormErrorMessage>{error}</FormErrorMessage>
    </FormControl>
  );
};

export default AppSelect;

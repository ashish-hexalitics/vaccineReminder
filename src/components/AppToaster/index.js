import React from "react";
import { useToast } from '@chakra-ui/react'
const AppToaster = ({
  title = "",
  description = "",
  status = "success",
  duration = 9000,
  isClosable = true,
}) => {
  const toast = useToast();
  const notify = () => {
    // toast({
    //   title,
    //   description,
    //   status,
    //   duration,
    //   isClosable,
    // });
    toast({
        title: 'Account created.',
        description: "We've created your account for you.",
        status: 'success',
        duration: 9000,
        isClosable: true,
      })
  };
  return notify;
};

export default AppToaster;

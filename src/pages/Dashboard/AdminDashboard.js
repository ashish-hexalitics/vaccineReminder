import { Box, Icon, SimpleGrid, useColorModeValue } from "@chakra-ui/react";
import MiniStatistics from "../../components/card/MiniStatistics";
import IconBox from "../../components/icons/IconBox";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { MdBarChart } from "react-icons/md";
import { getDashboard } from "../../helpers/api/dashboardApi";
import AppLoader from "../../components/AppLoader";

export default function UserReports() {
  // Chakra Color Mode
  const [dashboard, setdashboard] = useState([]);
  const brandColor = useColorModeValue("brand.500", "white");
  const boxBg = useColorModeValue("secondaryGray.300", "whiteAlpha.100");
  const {loggedInUser} = useSelector((state) => {
    return { loggedInUser: state.authReducer.user };
  });
  useEffect(() => {
    if (loggedInUser) {
      getDashboard(loggedInUser.id).then((res) => {
        setdashboard(res.response_data);
      });
    }
  }, [loggedInUser]);

  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
      <SimpleGrid
        columns={{ base: 1, md: 2, lg: 3, "2xl": 6 }}
        gap="20px"
        mb="20px"
      >
        {Array.isArray(dashboard) && dashboard.length > 0 ? (
          dashboard.map((dash,key) => (
            <MiniStatistics
            key={key}
              startContent={
                <IconBox
                  w="56px"
                  h="56px"
                  bg={boxBg}
                  icon={
                    <Icon
                      w="32px"
                      h="32px"
                      as={MdBarChart}
                      color={brandColor}
                    />
                  }
                />
              }
              name={dash?.property_name}
              value={dash?.role_count}
            />
          ))
        ) : (
          <AppLoader />
        )}
      </SimpleGrid>
    </Box>
  );
}

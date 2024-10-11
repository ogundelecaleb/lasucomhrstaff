import { Box, Grid, Stack, Text, SimpleGrid } from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import { FaSignLanguage, FaBuilding } from "react-icons/fa";
import { FaUsersGear, FaUsersRectangle, FaUsersRays } from "react-icons/fa6";
import { GiSwordsPower } from "react-icons/gi";
import { Link, useNavigate } from "react-router-dom";
import api from "../../api";
import { useSnackbar } from "notistack";
import { MoonLoader } from "react-spinners";

const MainAdminDashboard = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [isLoading, setIsLoading] = useState(false);
  const [dashboardDetails, setdashboardDetails] = useState([]);

  useEffect(() => {
    api
      .getDashboard()
      .then((response) => setdashboardDetails(response))
      .catch((error) => {
        enqueueSnackbar(error.message, { variant: "error" });
      });
  }, []);

  const DashbordBox = ({ title, total, icon, route }) => {
    const navigate = useNavigate();

    const handleClick = () => {
      navigate(route);
    };

    return (
      <Stack
        gap={0}
        border={"1px solid #EDF2F7"}
        p="3"
        pl="5"
        borderRadius={"lg"}
        w="300px"
        h="250px"
        cursor="pointer"
        onClick={handleClick}
      >
        <Box
          display={"flex"}
          p="10"
          mb="5"
          borderRadius={"lg"}
          border={"1px solid #EDF2F7"}
          w="fit-content"
        >
          {" "}
          {icon}
        </Box>
        <Text fontWeight={"medium"} fontSize={24} color={"#1A202C"}>
          {total}
        </Text>
        <Text fontWeight={"medium"} fontSize={20} color={"#718096"}>
          {title}
        </Text>
      </Stack>
    );
  };

  return (
    <Box px="6" mt="4">
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={{ base: 3, md: 5 }}>
        <Link to="/settings/user-list">
          <DashbordBox
            title={"Manage Users"}
            total={dashboardDetails?.total_users}
            icon={<FaUsersGear color="#984779" size={32} />}
            route=""
          />
        </Link>
        
        <Link to="/settings/faculty-list">
          <DashbordBox
            title={"Manage Faculty"}
            total={dashboardDetails?.total_faculty}
            icon={<FaUsersRectangle color="#984779" size={32} />}
          />
        </Link>

        <Link to="/settings/department-list">
          <DashbordBox
            title={"Manage Department"}
            total={dashboardDetails?.total_departments}
            icon={<FaBuilding color="#984779" size={32} />}
            route="department-list"
          />
        </Link>

        <Link to="/settings/division-list">
          <DashbordBox
            title={"Manage Division"}
            total={dashboardDetails?.total_divisions}
            icon={<FaUsersRays color="#984779" size={32} />}
          />
        </Link>

        <Link to="/settings/role-list">
          <DashbordBox
            title={"Manage Roles"}
            total={dashboardDetails?.total_roles}
            icon={<GiSwordsPower color="#984779" size={32} />}
          />
        </Link>

        <Link to="/settings/user-access-role">
          <DashbordBox
            title={"Assign Role"}
            // total={dashboardDetails?.total_users}
            icon={<FaSignLanguage color="#984779" size={32} />}
            route="user-access-role"
          />
        </Link>
      </SimpleGrid>
    </Box>
  );
};

export default MainAdminDashboard;

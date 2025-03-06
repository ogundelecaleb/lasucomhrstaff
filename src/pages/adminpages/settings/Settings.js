import { Box, Grid, Stack, Text, SimpleGrid } from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import { FaSignLanguage, FaBuilding } from "react-icons/fa";
import { FaUsersGear, FaUsersRectangle, FaUsersRays } from "react-icons/fa6";
import { GiSwordsPower } from "react-icons/gi";
import { Link, useNavigate } from "react-router-dom";
import api from "../../../api";
import { useSnackbar } from "notistack";
import { MoonLoader } from "react-spinners";
import { Profile2User } from "iconsax-react";

const Settings = () => {
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

  const DashbordBox = ({ title, total, icon, route, desc }) => {
    const navigate = useNavigate();

    const handleClick = () => {
      navigate(route);
    };

    return (
      <div className="border rounded-lg shadow overflow-hidden ">
        <div className="flex justify-between items-center  p-2">
          <p className="text-base md:text-lg font-semibold ">{title}</p>
          <div>{icon}</div>
        </div>

        <div className="mt-7 ">
          <p className="text-[#718096] p-2">
            {desc}
          </p>
          <div className="p-2 bg-gray-100 flex justify-between items-center">
            <p className="font-semibold">Total: </p>

            <p className="text-lg font-semibold">{total}</p>
          </div>
        </div>
      </div>
    );
  };

  return (
    <Box
      px="6"
      mt="4"
      overflowY="auto"
      __css={{
        "&::-webkit-scrollbar": {
          w: "2",
        },
        "&::-webkit-scrollbar-track": {
          w: "6",
        },
        "&::-webkit-scrollbar-thumb": {
          borderRadius: "10",
          bg: `gray.100`,
        },
      }}
    >
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={{ base: 3, md: 5 }}>
        <Link to="/settings/user-list">
          <DashbordBox
            title={"Manage Users"}
            total={dashboardDetails?.total_users}
            desc={"View, Create and Update Staff Details"}
            icon={
              <Profile2User
                color="#984779"
                className="text-16 md:text-[20px]"
                variant="Bold"
              />
            }
            route=""
          />
        </Link>

        <Link to="/settings/faculty-list">
          <DashbordBox
            title={"Manage Faculty"}
            total={dashboardDetails?.total_faculty}
            icon={<FaUsersRectangle color="#984779" size={32} />}
            desc={"View, Create and Update Faculty Details"}

          />
        </Link>

        <Link to="/settings/department-list">
          <DashbordBox
            title={"Manage Department"}
            total={dashboardDetails?.total_departments}
            icon={<FaBuilding color="#984779" size={32} />}
            route="department-list"
            desc={"View, Create and Update Department Details"}

          />
        </Link>

        <Link to="/settings/division-list">
          <DashbordBox
            title={"Manage Division"}
            total={dashboardDetails?.total_divisions}
            icon={<FaUsersRays color="#984779" size={32} />}
            desc={"View, Create and Update Division Details"}

          />
        </Link>

        <Link to="/settings/role-list">
          <DashbordBox
            title={"Manage Roles"}
            total={dashboardDetails?.total_roles}
            icon={<GiSwordsPower color="#984779" size={32} />}
            desc={"View, Create and Update Staff Roles"}

          />
        </Link>

        <Link to="/settings/user-access-role">
          <DashbordBox
            title={"Assign Role"}
            // total={dashboardDetails?.total_users}
            icon={<FaSignLanguage color="#984779" size={32} />}
            route="user-access-role"
            desc={"View, Create and Update Supervision Role"}
          />
        </Link>
      </SimpleGrid>
    </Box>
  );
};

export default Settings;

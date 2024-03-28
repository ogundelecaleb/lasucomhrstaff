import { Box, Grid, Stack, Text } from "@chakra-ui/react";
import React from "react";
import { MdPeople } from "react-icons/md";
import { IoPersonAdd } from "react-icons/io5";
import { FaToolbox } from "react-icons/fa";
import { MdTransferWithinAStation } from "react-icons/md";

const MainAdminDashboard = () => {
    const DashbordBox = ({ title, total, icon }) => {
        return (
            <Stack gap={0} border={'1px solid #EDF2F7'} p='3' pl='5' borderRadius={'lg'} w='250px' h='154px'>
                <Box display={'flex'} p='2' borderRadius={'lg'} border={'1px solid #EDF2F7'} w='fit-content'> {icon}</Box>
                <Text fontWeight={'medium'} fontSize={24} color={'#1A202C'}>{total}</Text>
                <Text fontWeight={'medium'} fontSize={14} color={'#718096'}>{title}</Text>
            </Stack>
        )
    }

  return (
    <Box ml='14' my='16' w='80%'>
      <Grid templateColumns='repeat(3, 1fr)' gap={6}>
        <DashbordBox
          title={"Staff Appointment"}
          total={"0"}
          icon={<MdPeople color='#984779' size={32} />}
        />
        <DashbordBox
          title={"Regularization of New employees"}
          total={"0"}
          icon={<IoPersonAdd color='#984779' size={28} />}
        />
        <DashbordBox
          title={"Job Applicants"}
          total={"0"}
          icon={<FaToolbox color='#984779' size={28} />}
        />
        <DashbordBox
          title={"Work Leave Requests"}
          total={"0"}
          icon={<MdTransferWithinAStation color='#984779' size={28} />}
        />
        <DashbordBox
          title={"Work Leave Requests"}
          total={"0"}
          icon={<MdTransferWithinAStation color='#984779' size={28} />}
        />
        <DashbordBox
          title={"Work Leave Requests"}
          total={"0"}
          icon={<MdTransferWithinAStation color='#984779' size={28} />}
        />
        <DashbordBox
          title={"Work Leave Requests"}
          total={"0"}
          icon={<MdTransferWithinAStation color='#984779' size={28} />}
        />
      </Grid>
    </Box>
  );
};

export default MainAdminDashboard;

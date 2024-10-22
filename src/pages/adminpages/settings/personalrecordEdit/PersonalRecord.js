import {
  Box,
  TabIndicator,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Tab,
} from "@chakra-ui/react";
import React from "react";
import PersonalInfo from "./PersonalInfo";
import ContactInfo from "./ContactInfo";
import NextOfKin from "./NextOfKin";
import FamilyDetails from "./FamilyDetails";
import AcademicDetails from "./AcademicDetails";
import { Link } from "react-router-dom";
import AcademicDetailsEdit from "./AcademicDetails";
import FamilyDetailsEdit from "./FamilyDetails";
import NextOfKinEdit from "./NextOfKin";
import ContactInfoEdit from "./ContactInfo";
import PersonalInfoEdit from "./PersonalInfo";

const PersonalRecordEdit = () => {

  return (

    <Box className='container'>
      <div className="flex items-center mt-3">
              <p className="text-[#667185] text-[14px] md:text-[14px] xl:text-[16px] font-normal leading-[24px] ">
                Manage Staffs /
              </p>
              <Link to="/settings/user-list">
                <p className="text-[#667185] text-[14px] md:text-[14px] xl:text-[16px] font-normal leading-[24px] ">
                  &nbsp; Manage Users /
                </p>
              </Link>
            
              <p className="text-[#000] text-[14px] md:text-[14px] xl:text-[16px] font-normal leading-[24px]  ">
                &nbsp; Edit User
              </p>
            </div>
      <Tabs position='relative' variant='unstyled'>
        <Box className='table-responsive pt-3'>
          <TabList>
            <Tab
              fontSize={"lg"}
              fontWeight={"semibold"}
              _focus={{ fontWeight: "bold" }}
              color='black'>
              Personal information
            </Tab>
            <Tab
              _focus={{ fontWeight: "bold" }}
              fontWeight={"semibold"}
              fontSize={"lg"}
              color='black'>
              Contact information
            </Tab>
            <Tab
              _focus={{ fontWeight: "bold" }}
              fontWeight={"semibold"}
              fontSize={"lg"}
              color='black'>
              Next of kin/Beneficiary
            </Tab>
            <Tab
              _focus={{ fontWeight: "bold" }}
              fontWeight={"semibold"}
              fontSize={"lg"}
              color='black'>
              {" "}
              Family Details
            </Tab>
            <Tab
              _focus={{ fontWeight: "bold" }}
              fontWeight={"semibold"}
              fontSize={"lg"}
              color='black'>
              Academic Details
            </Tab>
          </TabList>
        </Box>
        <TabIndicator
          mt='-1.5px'
          height='3px'
          bg='blue.500'
          borderRadius='6px 6px 0 0'
          width='50px'
        />
        <TabPanels>
          <TabPanel>
            <PersonalInfoEdit />
          </TabPanel>
          <TabPanel>
            <ContactInfoEdit />
          </TabPanel>
          <TabPanel>
            <NextOfKinEdit />
          </TabPanel>
          <TabPanel>
            <FamilyDetailsEdit />
          </TabPanel>
          <TabPanel>
            <AcademicDetailsEdit />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>

  );
  
};

export default PersonalRecordEdit;

import React, { useState , useEffect} from "react";
import { BiChevronDown, BiSearchAlt2 } from "react-icons/bi";
import { AiFillBell, AiOutlineCaretDown } from "react-icons/ai";
import { MdEmail } from "react-icons/md";
import {
  Box,
  Button,
  Image,
  Menu,
  Link,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import { getUserDetails } from "../utils/utils";


const Navbar = ({ mobile, setMobile, display, reuseableNavigation, userData }) => {


  const navigate = useNavigate();
  const [userDetails, setUserDetails] = useState([]);
  const { enqueueSnackbar } = useSnackbar();
 

  async function fetchUserDetails() {
    try {
      const userDetails = await getUserDetails();
      console.log("User Details:", userDetails);
      setUserDetails(userDetails)
    } catch (error) {
      console.error("Error fetching your basic details", error);
      enqueueSnackbar(error.message, { variant: 'error' })
    }
  }
  useEffect(() => {
    fetchUserDetails();
  }, []);

  return (
    <div
      className='border text-dark flex justify-between items-center sticky-top'
      style={{ width: "100%", backgroundColor: "white" }}>
      <div className='burger'>
        <div className={display ? "d-block" : "d-none"}>
          <button
            className=' text-dark '
            onClick={() => setMobile(!mobile)}>
            <i className='ms-3 fa fa-bars'></i>
          </button>
        </div>
      </div>
      <div
        className='d-flex justify-content-end align-items-center pe-3'
        style={{ width: "80%", height: "70px", gap: "20px" }}>
        <div
          className='d-flex gap-3'
          style={{ cursor: "pointer" }}
          id='notification'>
          <div>
            <BiSearchAlt2 size='25' style={{ color: "#84818A" }} />
          </div>
          <Link  onClick={() => reuseableNavigation("notification")}>
            <AiFillBell  size='25' style={{ color: "#84818A" }} />
          </Link>
          <Link onClick={() => reuseableNavigation("inbox")}>
            <MdEmail size='25' style={{ color: "#84818A" }} />
          </Link>
        </div>
        <Box className='border rounded'>
          <Menu>
            <MenuButton
              style={{ width: "200px", height: "40px" }}
              as={Button}
              rightIcon={<AiOutlineCaretDown color='#84818A' />}>
              <Box display={"flex"} alignItems='center'>
                <Image
                  boxSize='1.5rem'
                  borderRadius='full'
                  src='https://placekitten.com/100/100'
                  alt='Fluffybuns the destroyer'
                  mr='12px'
                />
                <Text m='0' fontWeight={600} fontSize='14px'>
                {userDetails?.data?.first_name} {userDetails?.data?.last_name}
                </Text>
              </Box>
            </MenuButton>
            <MenuList>
              <MenuItem
                fontWeight={600}
                fontSize='20px'
                _hover={{ bg: "#984779", color: "white" }}
                minH='48px'
                onClick={() => reuseableNavigation("profile")}>
                Profile
              </MenuItem>
              
            </MenuList>
          </Menu>
        </Box>
      </div>
    </div>
  );
};

export default Navbar;

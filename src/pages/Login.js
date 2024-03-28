import {
  Box,
  Button,
  Flex,
  FormControl,
  Image,
  Input,
  Radio,
  Text,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import React, { useEffect, useRef, useState } from "react";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import logo from "../asset/logo(small).svg";
import { Navigate, useNavigate } from "react-router-dom";
import api from "../api";
import { setUserData } from "../utils/utils";
import { useSnackbar } from "notistack";
import { MoonLoader } from "react-spinners";

export default function Login() {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [identity, setIdentity] = useState('');
  const [password, setPassword] = useState('');
  const userRef = useRef();
  const userData = localStorage.getItem('userData');
  // handle toggle
  const toggle = () => {
    setOpen(!open);
  };


  useEffect(() => {
    if (!userData) {
      userRef.current.focus();
    }

  }, [userData])

  if (userData) {
    return <Navigate to="/dashboard" replace />;
  }

  async function login(e) {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await api.signIn({ identity, password });
      console.log("res of login==>>>>>", response);
      
      const { role } = response;
      
      if (role !== 'HRM') {
        enqueueSnackbar('Access denied', { variant: 'error' });
        setIsLoading(false);
        return;
      }
  
      // If the user has the 'HRM' role, proceed with login
      enqueueSnackbar(response.message, { variant: 'success' })
      setUserData(response);
      setIsLoading(false);
      navigate('/dashboard');
    } catch (error) {
      console.log(error.message)
      enqueueSnackbar(error.message, { variant: 'error' })
      setIsLoading(false);
    }
  }
  

  return (
    <Box display='flex'>
      <Box
        w={"50vw"}
        display='flex'
        flexDirection='column'
        h={"100vh"}
        alignItems='center'
        justifyContent='center'>
        <Box position={"absolute"} top='5' left='14'>
          <Image w='74px' h='71px' src={logo} />
        </Box>
        <Box
          display='flex'
          w='60%'
          alignItems='center'
          justifyContent='center'
          flexDirection={"column"}>
          <Text mt='32' fontWeight='bold' fontSize={"4xl"}>
            Sign in
          </Text>
          <FormControl my='10' onSubmit={login}>
            <form>
              <div mt={'10'} mb='10'>
                <Input
                  type='text'
                  focusBorderColor='#984779'
                  ref={userRef}
                  value={identity} onChange={(e) => setIdentity(e.target.value)}
                  placeholder='Enter Staff ID No'
                  required
                />
              </div>
              <div className="relative" display={"flex"} alignItems='center'>
                <InputGroup mt='4' >
                  <Input


                    className="relative" display={"flex"} focusBorderColor='#984779'
                    // w='calc(100% - 2.5rem)' // Adjusted width to accommodate the eye icon
                    type={open === false ? "password" : "text"}

                    value={password} onChange={(e) => setPassword(e.target.value)}
                    placeholder='Password'
                    required
                  />
                  <InputRightElement>
                    <div
                      className="text-2xl"
                      style={{ cursor: 'pointer', marginLeft: '-2rem' }} // Adjusted margin for positioning
                      onClick={toggle}
                    >
                      {open === false ? (
                        <AiFillEye />
                      ) : (
                        <AiFillEyeInvisible />
                      )}
                    </div>
                  </InputRightElement>
                </InputGroup>

              </div>

              <Box my='5' display={"flex"} w='100%' justifyContent='space-between'>
                <Radio>Remember me</Radio>

              </Box>
              <Button
                type="submit"
                mt='3'
                color={"white"}
                w='100%'
                h='12'
                bg='#572753'
                borderRadius='lg'
                disabled={isLoading}>
                  {isLoading ? (
                    <MoonLoader color={"white"} size={20} />
                  ) : ( <> Sign In </>
                  )}
              </Button>
            </form>
          </FormControl>

        </Box>
        <Flex w='100%' justifyContent='space-between' px='5' mt='40'>
          <Text color={"#718096"}>Privacy Policy</Text>
          <Text color={"#718096"}>Copyright 2023</Text>
        </Flex>
      </Box>
      <Box
        alignItems={"center"}
        w={"50vw"}
        h={"100vh"}
        bg='#17082D'
        display='flex'
        flexDirection='column'
        justifyContent='center'>
        <Image w='sm' h='xs' src={logo} />
        <Text color='white' fontSize='3xl' mt='6' fontWeight='bold'>
          Human Resource Management Portal
        </Text>
      </Box>
    </Box>
  );
}

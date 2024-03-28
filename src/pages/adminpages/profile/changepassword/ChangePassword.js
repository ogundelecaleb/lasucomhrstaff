import { Box, FormControl, FormLabel, Input, Text } from "@chakra-ui/react"
import CommonButton from "../../../../components/commonbutton/Button";

const ChangePassword = () => {
    return (
        <Box>

            <Box py='2' pl='10' borderBottom='1px solid #EBEAED'>
                <Text color={'#2E2C34'} fontSize={'20px'} m='0' fontWeight='normal'>
                    Change Password
                </Text>
            </Box>
            <Box w='540px' pl='10' my='5'>
                <FormControl>
                    <FormLabel>Enter Current Password</FormLabel>
                    <Input type={'password'} borderRadius='none' placeholder='Enter Current Password' />
                </FormControl>
                <FormControl my='5'>
                    <FormLabel>Enter New Password</FormLabel>
                    <Input type={'password'} borderRadius='none' placeholder='Enter New Password' />
                </FormControl>
                <FormControl>
                    <FormLabel>Confirm  Password *</FormLabel>
                    <Input type={'password'} borderRadius='none' placeholder='Confirm  Password' />
                </FormControl>
            </Box>
            <CommonButton title={'Update Password'}/>
        </Box>
    )
}
export default ChangePassword;
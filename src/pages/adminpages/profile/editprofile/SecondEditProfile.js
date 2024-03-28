import { Box, FormControl, FormLabel, Input, Select, Text, Textarea } from "@chakra-ui/react";
import CommonButton from "../../../../components/commonbutton/Button";

const SecondEditProfile = ({reuseableNavigation}) => {
    return (
        <Box style={{ width: "100%" }}>

        <Box py='2' pl='10' borderBottom='1px solid #EBEAED'>
            <Text color={'#2E2C34'} fontSize={'28px'} m='0' fontWeight='medium'>
                Profile
            </Text>
            <Text color={'#2E2C34'} fontSize={'20px'}>
                Kindly fill in the required information
            </Text>
        </Box>
        <Box w='50%' pl='10'>
            <FormControl my='5' isRequired>
                <FormLabel color={'#515B6F'}>Home Address</FormLabel>
                <Textarea borderRadius={'none'} placeholder='Home Address' />
            </FormControl>
            <FormControl isRequired>
                <FormLabel color={'#515B6F'}>Phone number</FormLabel>
                <Input borderRadius={'none'} placeholder='Phone number' type={'number'} />
            </FormControl>
            
        </Box>
        <CommonButton title={'Update Profile'}/>
    </Box>
    )
}
export default SecondEditProfile;
import { Box, Button, Input, Text } from "@chakra-ui/react"
import { VscCopy } from 'react-icons/vsc';
import { Link } from "react-router-dom";

const GetDocument = ({width, height, link, details, Icon}) => {
    return (
        <Link>
        <Box my='10' borderRadius={8} bg='#F8F8FD' h={height} w={width} borderWidth={10} style={{ border: '2px dashed #4640DE' }}>
          
            <Box h='100%' mt='2' display={'flex'} justifyContent='center' alignItems='center' flexDirection='column'>
                {/* <VscCopy size={40} color='#5542F6' /> */}
                {Icon}

                <Text color={'#4640DE'}>{link}</Text>
                <Text color={'#7C8493'}>{details}</Text>
            </Box>
        </Box>
        </Link>
    )
}
export default GetDocument;
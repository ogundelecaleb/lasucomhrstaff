import { Box, Button, Divider, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, Textarea, useDisclosure } from "@chakra-ui/react";

import { AiOutlinePlus } from "react-icons/ai"
import { BiListUl } from "react-icons/bi"
import { CgMenuGridO } from "react-icons/cg"
import 'react-calendar/dist/Calendar.css';
// import FullCalendar from "../../../components/FullCalendar";y
import dayGridPlugin from '@fullcalendar/daygrid'
import FullCalendar from "@fullcalendar/react";
const Calender = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  // const title = "Compose"
  return (
    <Box style={{ width: "100%" }}>
      <Box mt='5' mx='10'>
        {/* <Box display={'flex'} borderBottom='1px solid #EBEAED' justifyContent='flex-end'> <CommonButton action={onOpen} title={'Add Event'} /></Box> */}
        <Box display='flex' justifyContent={'flex-end'}>
          <Button borderRadius={'0'} borderStartStartRadius={'lg'} borderEndStartRadius={'lg'}> <CgMenuGridO /></Button>
          <Button borderRadius={'0'} borderEndEndRadius={'lg'} borderStartEndRadius={'lg'} color='#984779'><BiListUl size='20' /></Button>
          <Button ml='2'
            onClick={onOpen}
            className='btn py-2 px-4 me-2  text-white rounded-0'
            leftIcon={<AiOutlinePlus color='white' />} bg='#984779' borderRadius={'sm'}>

            Add Task</Button>

        </Box>
      </Box>
      <Divider />

      <Box mx='10'>

        <Box border='1px solid #EBEAED' >

          <Box pt='5'>
            <FullCalendar
              plugins={[dayGridPlugin]}
              initialView="dayGridMonth"
              weekends={false}

              events={[
                { title: 'event 1', date: '2019-04-01' },
                { title: 'event 2', date: '2019-04-02' }
              ]}
            />

          </Box>
        </Box>
      </Box>

      <Modal onClose={onClose} isOpen={isOpen} size={"xl"} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalBody >
            <Box my='20'>
              <Input placeholder="Date" type={'date'} />
              <Input my='5' placeholder="Time" type={'time'} />
              <Textarea placeholder="Note" />
            </Box>
          </ModalBody>
          <ModalFooter>
            <Box display={'flex'} justifyContent='left' mr='10' my='5'>


              <Button
                className='btn py-2 px-4 me-2  text-white rounded-0'
                bg={'#984779'}>
                Add Task
              </Button>


            </Box>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  )
};

export default Calender;

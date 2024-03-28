import React, { useState } from "react";
import { FormControl, FormLabel, Input, Button, useToast } from "@chakra-ui/react";
import { Flex, Box, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton } from "@chakra-ui/react";
import api from "../../../api";
import { MoonLoader } from "react-spinners";

const EditDeleteModal = ({ isOpen, onClose, job }) => {

  const toast = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingd, setIsLoadingd] = useState(false);
  const [editedJob, setEditedJob] = useState({ ...job });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedJob((prevJob) => ({ ...prevJob, [name]: value }));
  };

  async function handleEditSubmit (e) {
    
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await api.editJobs({ id:editedJob.id });
      console.log("responce==>>>>>", response);
      toast({
        title: "Job Edited",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      setIsLoading(false);
      onClose();
    } catch (error) {
      console.log(error);
      toast({
        title: (error.message),
        status: "fail",
        duration: 3000,
        isClosable: true,
      });
      setIsLoading(false);
    }   
  };

  async function handleDelete (e) {

    e.preventDefault();
    setIsLoadingd(true);

    try {
      const response = await api.deleteJobs({ id: editedJob.id });
      console.log("responce==>>>>>", response);
      toast({
        title: "Job Deleted",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      setIsLoadingd(false);
      onClose();
    } catch (error) {
      console.log(error);
      toast({
        title: error.message,
        status: "fail",
        duration: 3000,
        isClosable: true,
      });
      setIsLoadingd(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Edit/Delete Job</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl mb={4}>
            <FormLabel>Title</FormLabel>
            <Input
              type="text"
              name="title"
              value={editedJob.title}
              onChange={handleInputChange}
            />
          </FormControl>
          <FormControl mb={4}>
            <FormLabel>Description</FormLabel>
            <Input
              type="text"
              name="description"
              value={editedJob.description}
              onChange={handleInputChange}
            />
          </FormControl>
          <FormControl mb={4}>
            <FormLabel>Location</FormLabel>
            <Input
              type="text"
              name="location"
              value={editedJob.location}
              onChange={handleInputChange}
            />
          </FormControl>
          <FormControl mb={4}>
            <FormLabel>Requirements</FormLabel>
            <Input
              type="text"
              name="requirements"
              value={
                editedJob?.requirements
                  ? editedJob.requirements.split(", ").join(", ")
                  : ""
              }
              onChange={handleInputChange}
            />
          </FormControl>
          <FormControl mb={4}>
            <FormLabel>Salary</FormLabel>
            <Input
              type="text"
              name="salary"
              value={editedJob.salary}
              onChange={handleInputChange}
            />
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <button
            type="button"
            onClick={handleEditSubmit}
            style={{
              backgroundColor: "teal",
              color: "white",
              marginRight: "10px",
            }}
          >
            Edit Job
          </button>
          <button
            type="button"
            onClick={handleDelete}
            style={{ backgroundColor: "red", color: "white" }}
          >
            Delete Job
          </button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default EditDeleteModal;
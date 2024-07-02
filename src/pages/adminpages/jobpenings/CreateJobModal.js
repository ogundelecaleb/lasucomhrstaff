import React, { useState, useEffect } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  useToast,
  Flex,
  Spacer,
} from "@chakra-ui/react";
import api from "../../../api";
import { MoonLoader } from "react-spinners";
import { getYear, getMonth } from "date-fns";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useSnackbar } from "notistack";
import { Select } from "@chakra-ui/react";

const CreateJobModal = ({ isOpen, onClose, onCreateJob }) => {
  const { enqueueSnackbar } = useSnackbar();
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();
  const [selectedStaffType, setSelectedStaffType] = useState("");
  const [selectedDivision, setSelectedDivision] = useState("");
  const [divisionOptions, setDivisionOptions] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [departmentOptions, setDepartmentOptions] = useState([]);

  useEffect(() => {
    api
      .fetchDivision()
      .then((response) => setDivisionOptions(response.data))
      .catch((error) => {
        enqueueSnackbar("Error fetching Divisions/Unit", { variant: "error" });
      });
  }, []);

  useEffect(() => {
    api
      .fethallDeparments()
      .then((response) => setDepartmentOptions(response.data))
      .catch((error) => {
        enqueueSnackbar("Error fetching Departments", { variant: "error" });
      });
  }, []);

  function range(start, end, step) {
    const result = [];
    for (let i = start; i <= end; i += step) {
      result.push(i);
    }
    return result;
  }

  const years = range(1990, getYear(new Date()) + 1, 1);
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const [newJob, setNewJob] = useState({
    title: "",
    description: "",
    requirements: "",
    location: "",
    salary: "",
    closingdate: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewJob((prevJob) => ({ ...prevJob, [name]: value }));
  };

  const dateclosing = newJob.closingdate;

  const formattedClosingDate = dateclosing
    ? new Date(dateclosing).toISOString().split("T")[0]
    : null;

  async function handleCreateJob(e) {
    e.preventDefault();

    if (
      !newJob.title ||
      !newJob.description ||
      !newJob.requirements ||
      
      !newJob.salary
    ) {
      toast({
        title: "Please fill in all fields",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    setIsLoading(true);

    try {
      const response = await api.createJob({
        title: newJob.title,
        description: newJob.description,
        requirements: newJob.requirements,
        location: newJob.location,
        is_active: false,
        salary: newJob.salary,
        closing_date: formattedClosingDate,
        unit_id: selectedDivision.id,
        department_id: selectedDepartment.id,
      });

      console.log("response ===>>>>>", response);

      // if (response.error) {
      //   throw new Error(response.error.toString());
      // }

      enqueueSnackbar("Application successful", { variant: "success" });
      setIsLoading(false);
      // onCreateJob(newJob);
      resetForm();
      onClose();
    } catch (error) {
      console.error("API error:", error);
      const errorMessage = error.message || "An error occurred";
      enqueueSnackbar(errorMessage, { variant: "error" });
      setIsLoading(false);
    }
  }

  const resetForm = () => {
    setNewJob({
      title: "",
      description: "",
      requirements: "",
      location: "",
      salary: "",
      closingdate: "",
      selectedDivision: "",
      selectedDepartment: "",
    });
  };

  const handleStaffChange = (event) => {
    setSelectedStaffType(event.target.value);
    console.log(selectedStaffType);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Create New Job</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Flex className="flex flex-row">
            <div>
              <FormControl mb={4}>
                <FormLabel>Position</FormLabel>
                <Input
                  type="text"
                  name="title"
                  value={newJob.title}
                  onChange={handleInputChange}
                />
              </FormControl>
              <FormControl mb={4}>
                <FormLabel>Staff Type</FormLabel>
                <Select
                  placeholder="Select an option"
                  id="staffType"
                  value={selectedStaffType}
                  onChange={handleStaffChange}
                >
                  <option value="ASE">ASE</option>
                  <option value="NASE">NASE</option>
                </Select>
              </FormControl>
              {selectedStaffType === "ASE" && (
                <div>
                    <FormLabel>Department</FormLabel>
                  <Select
                    id="department"
                    className="form-control rounded-10"
                    value={selectedDepartment ? selectedDepartment.id : ""}
                    onChange={(e) => {
                      const selectedId = e.target.value;
                      const selectedDepartmentObject = departmentOptions.find(
                        (department) => department.id === parseInt(selectedId)
                      );
                      console.log(
                        "Selected Department Object:",
                        selectedDepartmentObject
                      );
                      setSelectedDepartment(selectedDepartmentObject);
                    }}
                  >
                    <option value="">Select Department</option>
                    {departmentOptions.map((department) => (
                      <option key={department.id} value={department.id}>
                        {department.name}
                      </option>
                    ))}
                  </Select>
                </div>
              )}
              {selectedStaffType === "NASE" && (
                <div>
                  <FormLabel>Division/Unit</FormLabel>

                  <Select
                    id="division"
                    value={selectedDivision ? selectedDivision.id : ""}
                    onChange={(e) => {
                      const selectedId = e.target.value;
                      const selectedDivisionObject = divisionOptions.find(
                        (division) => division.id === parseInt(selectedId)
                      );
                      console.log(
                        "selected Division Object:",
                        selectedDivisionObject
                      );
                      setSelectedDivision(selectedDivisionObject);
                    }}
                    className="form-control rounded-10"
                  >
                    <option value="">Select Unit/Division</option>
                    {divisionOptions.map((division) => (
                      <option key={division.id} value={division.id}>
                        {division.name}
                      </option>
                    ))}
                  </Select>
                </div>
              )}
              {/* <FormControl mb={4} mt={4}>
                <FormLabel>Department</FormLabel>
                <Input
                  type="text"
                  name="location"
                  value={newJob.location}
                  onChange={handleInputChange}
                />
              </FormControl> */}

              <FormControl mb={4} mt={4}>
                <FormLabel>Qualification/Requirements</FormLabel>
                <Input
                  type="text"
                  name="requirements"
                  value={newJob.requirements}
                  onChange={handleInputChange}
                />
              </FormControl>

              <FormControl mb={4}>
                <FormLabel>Salary</FormLabel>
                <Input
                  type="text"
                  name="salary"
                  value={newJob.salary}
                  onChange={handleInputChange}
                />
              </FormControl>
            </div>
            <Spacer />
            <div>
              <FormControl mb={4}>
                <FormLabel>Closing date</FormLabel>
                <DatePicker
                  autoComplete="off"
                  renderCustomHeader={({
                    date,
                    changeYear,
                    changeMonth,
                    decreaseMonth,
                    increaseMonth,
                    prevMonthButtonDisabled,
                    nextMonthButtonDisabled,
                  }) => (
                    <div
                      style={{
                        margin: 10,
                        display: "flex",
                        justifyContent: "center",
                      }}
                    >
                      <button
                        onClick={decreaseMonth}
                        disabled={prevMonthButtonDisabled}
                      >
                        {"<"}
                      </button>
                      <select
                        value={getYear(date)}
                        onChange={({ target: { value } }) => changeYear(value)}
                      >
                        {years.map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>

                      <select
                        value={months[getMonth(date)]}
                        onChange={({ target: { value } }) =>
                          changeMonth(months.indexOf(value))
                        }
                      >
                        {months.map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>

                      <button
                        onClick={increaseMonth}
                        disabled={nextMonthButtonDisabled}
                      >
                        {">"}
                      </button>
                    </div>
                  )}
                  selected={
                    newJob.closingdate ? new Date(newJob.closingdate) : null
                  }
                  onChange={(date) => {
                    if (date instanceof Date && !isNaN(date)) {
                      const formattedDate = date.toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "2-digit",
                        day: "2-digit",
                      });
                      setNewJob((prevJob) => ({
                        ...prevJob,
                        closingdate: formattedDate,
                      }));
                    } else {
                      setNewJob((prevJob) => ({ ...prevJob, closingdate: "" }));
                    }
                  }}
                  dateFormat="yyyy-MM-dd"
                  className="form-control rounded-md"
                  id="exampleFormControlInput1"
                  placeholder=""
                  shouldCloseOnSelect={true}
                />
              </FormControl>
            </div>
          </Flex>
          <FormControl mb={4}>
            <FormLabel>Key responsibilities</FormLabel>
            <Textarea
              name="description"
              value={newJob.description}
              onChange={handleInputChange}
            />
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <Button
            colorScheme="teal"
            backgroundColor={"#17082d"}
            mr={3}
            onClick={handleCreateJob}
          >
            {isLoading ? <MoonLoader color={"white"} size={20} /> : <>Submit</>}
          </Button>
          <Button
            colorScheme="teal"
            backgroundColor={"#17082d"}
            onClick={onClose}
          >
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default CreateJobModal;

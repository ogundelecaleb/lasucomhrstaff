import React, { useState, useEffect, useCallback } from "react";
import {
  Box,
  Button,
  Text,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  Skeleton,
  Avatar,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";
import { RxAvatar } from "react-icons/rx";

import {
  MdModeEditOutline,
  MdSearch,
  MdOutlineRemoveRedEye,
  MdMore,
} from "react-icons/md";
import { RiDeleteBinFill } from "react-icons/ri";
import CommonButton from "../../../components/commonbutton/Button";
import { reuseAbleColor } from "../../../components/Color";
import { useSnackbar } from "notistack";
import api from "../../../api";
import { useNavigate, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { IoShareSocialOutline } from "react-icons/io5";
import { HiUserAdd } from "react-icons/hi";
import { MoonLoader } from "react-spinners";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

const CustomSkeletonLoader = ({ count }) => {
  const skeletonRows = Array.from({ length: count }, (_, index) => (
    <tr key={index}>
      <td className="text-center" style={{ height: "65px" }}>
        <Skeleton width="100%" height="50px" />
      </td>
      <td className="fs-6 text-center ">
        <Skeleton width="100%" height="50px" />
      </td>
      <td className="fs-6 text-center ">
        <Skeleton width="100%" height="50px" />
      </td>
      <td className="text-center" style={{ cursor: "pointer", width: "40px" }}>
        <Skeleton width="60%" height="25px" />
        <Skeleton width="60%" height="25px" marginTop="10px" />
      </td>
    </tr>
  ));

  return skeletonRows;
};

const UserList = () => {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedUser, setselectedUser] = useState(null);
  const [getUsers, setGetUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [searchTerrm, setSearchTerm] = useState("");
  const [gender, setGender] = useState("");
  const [department, setDepartment] = useState("");
  const [unit, setUnit] = useState("");
  const [level, setLevel] = useState("");
  const [staff_type, setStaffType] = useState("");
  const [pageLength, setPageLength] = useState(300);
  const [origin, setOrigin] = useState("");

  async function getUser(page) {
    const response = await api.fetchUsers({
      params: {
        page,
        name: searchTerrm,
        gender,
        staff_type,
        unit,
        department,
        level,
        state_of_origin: origin,
      },
    });
    return response;
  }

  async function getDepartment(page) {
    const response = await api.fethallDeparments();
    return response;
  }
  async function getUnit(page) {
    const response = await api.fetchDivision();
    return response;
  }

  async function getExportUser(page) {
    const response = await api.fetchUsers({
      params: {
        name: searchTerrm,
        page_length: pageLength,
        gender,
        staff_type,
        unit,
        department,
        level,
        state_of_origin: origin,
      },
    });
    return response;
  }

  const { isLoading, isError, data, error, isPreviousData, refetch } = useQuery(
    [
      "users",
      page,
      searchTerrm,
      pageLength,
      gender,
      staff_type,
      unit,
      department,
      level,
      origin,
    ],
    () => getUser(page, searchTerrm),
    {
      keepPreviousData: true,
      refetchOnWindowFocus: "always",
    }
  );

  const exportDataQuery = useQuery(
    [
      "export",
      searchTerrm,
      pageLength,
      gender,
      staff_type,
      unit,
      department,
      level,
      origin,
    ],
    () => getExportUser(page, searchTerrm),
    {
      keepPreviousData: true,
      refetchOnWindowFocus: "always",
    }
  );

  const departmentQuery = useQuery(["department"], () => getDepartment(), {
    keepPreviousData: true,
    refetchOnWindowFocus: "always",
  });
  const unitQuery = useQuery(["unit"], () => getUnit(), {
    keepPreviousData: true,
    refetchOnWindowFocus: "always",
  });

  const handleEdit = (id) => {
    navigate(`/settings/edit-staff-record/${id}`);
  };

  const handleView = (id) => {
    navigate(`/settings/staff-record/${id}`);
  };

  const handleDeleteClick = (user) => {
    setselectedUser(user);
    onOpen();
  };

  const handleDeleteConfirm = () => {
    if (selectedUser) {
      api
        .deleteUser(selectedUser.id)
        .then((response) => {
          const updatedgetUsers = getUsers.filter(
            (user) => user.id !== selectedUser.id
          );
          setGetUsers(updatedgetUsers);
          enqueueSnackbar("User deleted successfully", { variant: "success" });
          window.location.reload();
        })
        .catch((error) => {
          enqueueSnackbar("Error deleting user", { variant: "error" });
        });
      onClose();
      setselectedUser(null);
    }
  };

  const handleDeleteCancel = () => {
    onClose(); // Close the modal
    setselectedUser(null);
  };

  const roles = [
    { name: "Provost", value: "PT" },
    { name: "Deputy Provost", value: "DPT" },
    { name: "College Secretary", value: "CS" },
    { name: "Head of ASE", value: "HASE" },
    { name: "Head of NASE Junior", value: "HNASEJ" },
    { name: "Head of NASE Senior", value: "HNASES" },
    { name: "Head of Department", value: "HOD" },
    { name: "Head of Unit", value: "HOU" },
  ];
  const Levels = [
    "Level 1",
    "Level 2",
    "Level 3",
    "Level 4",
    "Level 5",
    "Level 6 ",
    "Level 7",
    "Level 8",
    "Level 9",
    "Level 10",
    "Level 11",
    "Level 12",
    "Level 13",
    "Level 14",
    "Level 15",
    "Level 16",
    "Level 17",
    "Level 18",
    "Level 19",
    "Level 20",
  ];

  // State to track selected options
  const [selectedRole, setSelectedRole] = useState(null);
  const [isAssignModal, setIsAssignModal] = useState(false);
  const [userId, setUserId] = useState("");
  const [filter, setFilter] = useState(false);

  // Handle checkbox change
  const handleCheckboxChange = (id) => {
    setSelectedRole(id); // Select the clicked checkbox
  };

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await api.updateUser({
        staffId: userId,
        user_supervision_role: selectedRole,
      });
      console.log("responce==>>>>>", response);
      enqueueSnackbar("Role Assigned to Staff successfully", {
        variant: "success",
      });
      setLoading(false);
      setIsAssignModal(false);
    } catch (error) {
      console.log(error);
      enqueueSnackbar(error.message, { variant: "error" });
      setLoading(false);
    }
  }
  const handelAssignStaff = (id) => {
    setIsAssignModal(true);
    setUserId(id);
  };

  let exportData = exportDataQuery?.data?.data || [];

  const exportToExcel = () => {
    const data = exportData;
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

    // Buffer to store the generated Excel file
    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });
    const blob = new Blob([excelBuffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8",
    });

    saveAs(blob, "exportedData.xlsx");
  };

  return (
    <div>
      {isLoading ? (
        <div className=" shadow mx-3 pb-5 mb-5 mt-5">
          <p className="fw-semibold ps-4 fs-4 py-4 border-bottom">
            Manage Users
          </p>

          <div className="tb-res-parent mt-4">
            <div className="tb-res">
              <table className="table table-hover table-bordered">
                <thead></thead>
                <tbody>
                  <CustomSkeletonLoader count={6} />
                </tbody>
              </table>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <div className=" shadow mx-3 pb-5 mb-5 mt-5 scroll-container ">
            <Box
              display={"flex"}
              alignItems={"center"}
              borderBottom="1px solid #EBEAED"
              px="5"
              justifyContent="space-between"
            >
              <Text className="text-[18px] font-semibold">Manage Users</Text>{" "}
              <Link to={`/settings/add-user`}>
                <CommonButton title={"Add Staff"} />
              </Link>
            </Box>

            <div className="row mt-1 pa-res px-3">
              <div
                className="col-lg-3 d-flex gap-3 align-items-center "
                style={{ height: "70px" }}
              >
                <p className="mt-3 fw-semibold text-muted fs-5">
                  Total Users: {data?.meta?.total}
                </p>
              </div>

              <div className="flex justify-between items-center ">
                <div className="flex items-center gap-2">
                  <div style={{ position: "relative" }}>
                    <input
                      type="text"
                      className="border min-w-[220px]  pl-7"
                      style={{ height: "45px" }}
                      placeholder="Search by staff name.."
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />

                    <MdSearch
                      size={"18"}
                      style={{
                        position: "absolute",
                        top: "16px",
                        left: "4px",
                      }}
                    />
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setFilter(!filter)}
                    className="px-2 py-2 bg-[#984779] text-white rounded-md"
                  >
                    Filter
                  </button>
                  <button
                    onClick={exportToExcel}
                    className="px-2 py-2 bg-[#984779] text-white rounded-md"
                  >
                    Download
                  </button>
                </div>
              </div>
            </div>

            {filter && (
              <>
                <div className="px-3 mt-3 flex items-center gap-3 flex-wrap ">
                  <select
                    id="division"
                    value={department}
                    onChange={(e) => {
                      setDepartment(e.target.value);
                    }}
                    style={{ height: "45px" }}
                    className="px-2  border max-w-[220px]  rounded-0"
                  >
                    <option value="">Select Department</option>
                    {departmentQuery.data?.data.map((division) => (
                      <option key={division.id} value={division.id}>
                        {division.name}
                      </option>
                    ))}
                  </select>
                  <select
                    value={gender}
                    onChange={(e) => {
                      setGender(e.target.value);
                    }}
                    style={{ height: "45px" }}
                    className="px-2  border max-w-[220px]  rounded-0"
                  >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                  <select
                    value={staff_type}
                    onChange={(e) => {
                      setStaffType(e.target.value);
                    }}
                    style={{ height: "45px" }}
                    className="px-2  border max-w-[220px]  rounded-0"
                  >
                    <option value="">Select Staff Type</option>
                    <option value="NASE">NASE</option>
                    <option value="ASE">ASE</option>
                  </select>

                  <input
                    placeholder="Search by state of origin "
                    value={origin}
                    onChange={(e) => {
                      setOrigin(e.target.value);
                    }}
                    style={{ height: "45px" }}
                    className="px-2  border max-w-[250px]  rounded-0"
                  />

                  <select
                    value={level}
                    onChange={(e) => {
                      setLevel(e.target.value);
                    }}
                    style={{ height: "45px" }}
                    className="px-2  border max-w-[220px]  rounded-0"
                  >
                    <option value="">Select Levels</option>
                    {Levels.map((level) => (
                      <option value={level}>{level}</option>
                    ))}
                  </select>

                  <select
                    id="division"
                    value={unit}
                    onChange={(e) => {
                      setUnit(e.target.value);
                    }}
                    style={{ height: "45px" }}
                    className="px-2  border max-w-[220px]  rounded-0"
                  >
                    <option value="">Select Unit</option>
                    {unitQuery.data?.data.map((division) => (
                      <option key={division.id} value={division.id}>
                        {division.name}
                      </option>
                    ))}
                  </select>
                </div>
              </>
            )}
            <div className="tb-res-parent overflow-auto mt-4">
              <div className="tb-res">
                <table className="table table-hover table-bordered">
                  <thead>
                    <tr className="">
                      <th scope="col" style={{ height: "50px" }}>
                        S/N
                      </th>
                      <th scope="col">Image</th>
                      <th scope="col">Title</th>
                      <th scope="col">Full Name</th>
                      <th scope="col">Email Address</th>
                      <th scope="col">PF</th>
                      <th scope="col" className="whitespace-nowrap">Supervision Role</th>
                      <th scope="col">Role</th>
                      <th scope="col">Faculty</th>
                      <th scope="col">Department/Unit</th>
                      <th scope="col">Status</th>
                      <th scope="col"  className="whitespace-nowrap">Profile Completion</th>
                      <th scope="col">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {isLoading && !isPreviousData && <div>Loading...</div>}
                    {data?.data?.map((user, index) => (
                      <tr key={user.id}>
                        <th style={{ height: "65px" }} scope="row">
                          {index + 1}
                        </th>
                        <td>
                          {user.image ? (
                            <Avatar
                              h={"40px"}
                              w={"40px"}
                              borderWidth={1}
                              borderColor={"#ccc"}
                              src={user.image}
                            />
                          ) : (
                            <RxAvatar size={40} color={"#25324B"} />
                          )}
                          {/* <img src={user.image} style={{ height: "60px" }} alt='staff' /> */}
                        </td>
                        <td className="fs-6">{user.title}</td>
                        <td className="fs-6 whitespace-nowrap">
                          {user.first_name} {user.last_name}
                        </td>
                        <td className="fs-6">{user.email}</td>

                        <td className="fs-6">{user.staff_number}</td>
                        <td className="fs-6">{user.user_supervision_role}</td>

                        <td className="fs-6">{user.role}</td>
                        <td className="fs-6 whitespace-nowrap">
                          {user.faculty
                            ? user.faculty.name
                            : user.department
                            ? user.department.name
                            : user.unit
                            ? user.unit.name
                            : "N/A"}
                        </td>
                        <td className="fs-6 whitespace-nowrap">
                          {user.department
                            ? user.department.name
                            : user.unit
                            ? user.unit.name
                            : "N/A"}
                        </td>

                        <td className="fs-6">{user.status}</td>
                        <td className=" whitespace-nowrap text-md text-[#e25252]">
                          <p className=" whitespace-nowrap text-md text-[#e25252] mb-0">
                            {user?.profile_completion
                              ? `${user?.profile_completion}%`
                              : "Staff needs to login"}
                          </p>
                        </td>
                        <td
                          className="flex gap-2 "
                          align="center"
                          style={{ cursor: "pointer" }}
                        >
                          <Menu>
                            <MenuButton bg={"none"} as={Button}>
                              <button
                                //onClick={() => handleTransacModalOpen(result)}
                                className="   rounded-sm flex justify-center items-center  hover:bg-[#CBD5E0]  "
                              >
                                <MdMore
                                  variant="Linear"
                                  color="#98A2B3"
                                  size="24"
                                />{" "}
                              </button>
                            </MenuButton>
                            <MenuList maxW="32" className="">
                              <MenuItem
                                w="full"
                                color="#bf0d0d"
                                mb="10px"
                                onClick={() => handleView(user.id)}
                              >
                                <MdOutlineRemoveRedEye
                                  variant="Linear"
                                  color="#98A2B3"
                                  size="16"
                                  className="mr-2"
                                />{" "}
                                <p className="mb-0 text-[12px] md:text-[14px] text-[#475367]  font-normal leading-[18px] md:leading-[20px]">
                                  View
                                </p>
                              </MenuItem>
                              <MenuItem
                                onClick={() => handleEdit(user.id)}
                                w="full"
                                color="#718096"
                                mb="10px"
                              >
                                <MdModeEditOutline
                                  variant="Linear"
                                  color="#98A2B3"
                                  size="16"
                                  className="mr-2"
                                />{" "}
                                <p className="mb-0 text-[12px] md:text-[14px] text-[#475367]  font-normal leading-[18px] md:leading-[20px]">
                                  Edit
                                </p>
                              </MenuItem>
                              <MenuItem
                                w="full"
                                color="#bf0d0d"
                                mb="10px"
                                onClick={() => {
                                  handelAssignStaff(user.id);
                                }}
                              >
                                <HiUserAdd
                                  color="#98A2B3"
                                  size="16"
                                  className="mr-2"
                                />{" "}
                                <p className="mb-0 text-[12px] md:text-[14px] text-[#475367]  font-normal leading-[18px] md:leading-[20px]">
                                  Assign Role To User
                                </p>
                              </MenuItem>

                              <MenuItem
                                w="full"
                                color="#bf0d0d"
                                mb="10px"
                                onClick={() => handleDeleteClick(user)}
                              >
                                <RiDeleteBinFill
                                  color="#F44336"
                                  size="16"
                                  className="mr-2"
                                />{" "}
                                <p className="mb-0 text-[12px] md:text-[14px] text-[#F44336]  font-normal leading-[18px] md:leading-[20px]">
                                  Delete
                                </p>
                              </MenuItem>
                            </MenuList>
                          </Menu>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <Modal isOpen={isOpen} onClose={handleDeleteCancel}>
                <ModalOverlay />
                <ModalContent>
                  <ModalHeader>Confirm Delete</ModalHeader>
                  <ModalCloseButton />
                  <ModalBody>
                    Are you sure you want to delete this role?
                  </ModalBody>
                  <ModalFooter>
                    <Button
                      colorScheme="red"
                      mr={3}
                      onClick={handleDeleteConfirm}
                    >
                      Yes
                    </Button>
                    <Button onClick={handleDeleteCancel}>No</Button>
                  </ModalFooter>
                </ModalContent>
              </Modal>

              {/* Assign Role Modal */}
              <Modal
                isOpen={isAssignModal}
                onClose={() => setIsAssignModal(false)}
              >
                <ModalOverlay />
                <ModalContent>
                  <ModalHeader fontSize={{ base: "14px", md: "16px" }}>
                    Assign A supervision Role To Staff
                  </ModalHeader>
                  <ModalCloseButton />
                  <ModalBody>
                    Select a role to be assigned to a staff
                    {roles.map((option) => (
                      <div
                        key={option.id}
                        className="flex items-center gap-2 mt-4"
                      >
                        <input
                          type="checkbox"
                          className="h-[16px] text-[14px]"
                          checked={selectedRole === option.value}
                          onChange={() => handleCheckboxChange(option.value)}
                        />
                        <label>{option.name}</label>{" "}
                      </div>
                    ))}
                  </ModalBody>
                  <ModalFooter>
                    <Button
                      colorScheme="red"
                      mr={3}
                      onClick={handleSubmit}
                      className="flex items-center gap-2"
                    >
                      Confirm
                      {loading && <MoonLoader color={"#fff"} size={16} />}
                    </Button>
                    <Button onClick={() => setIsAssignModal(false)}>
                      close
                    </Button>
                  </ModalFooter>
                </ModalContent>
              </Modal>
            </div>
          </div>
          {data && data.data && data?.data?.length > 0 && (
            <div className="row px-4">
              <div className="col-lg-4 d-flex gap-3 align-items-center ">
                <div className="mt-4 flex justify-center text-gray-500 text-sm">
                  {data && data.meta && (
                    <span className="mr-2">
                      Showing {data.meta.from} - {data.meta.to} of{" "}
                      {data.meta.total} results
                    </span>
                  )}
                  {data && data.meta && <span className="mr-2">|</span>}
                  {data && data.meta && (
                    <span className="mr-2">
                      Page {data.meta.current_page} of {data.meta.last_page}
                    </span>
                  )}
                </div>
              </div>
              <div className="col-lg-4 "></div>
              <div className="col-lg-4">
                <div className="d-flex justify-content-end py-2 mt-4 px-5">
                  <h1>
                    <nav aria-label="Page navigation example">
                      <ul class="pagination">
                        <li
                          className={`page-item cursor-pointer ${
                            data?.meta?.current_page === 1 ? "disabled" : ""
                          }`}
                        >
                          <p
                            className="page-link"
                            onClick={() =>
                              setPage((prev) => Math.max(prev - 1, 1))
                            }
                            disabled={
                              data.links.prev === null ||
                              data?.meta?.current_page === 1 ||
                              isPreviousData
                            }
                          >
                            <span aria-hidden="true">Prev</span>
                          </p>
                        </li>

                        <li
                          className={`page-item cursor-pointer ${
                            data?.meta?.current_page === data?.meta?.last_page
                              ? "disabled"
                              : ""
                          }`}
                        >
                          <p
                            className="page-link"
                            onClick={() => setPage((prev) => prev + 1)}
                            disabled={
                              data.links.next === null ||
                              data?.meta?.current_page ===
                                data?.meta?.last_page ||
                              isPreviousData
                            }
                          >
                            <span aria-hidden="true">Next</span>
                          </p>
                        </li>
                      </ul>
                    </nav>
                  </h1>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default UserList;

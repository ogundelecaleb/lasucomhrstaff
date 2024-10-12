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
import { useSnackbar } from "notistack";
import api from "../../../api";
import { useNavigate, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { HiUserAdd } from "react-icons/hi";
import { ClipLoader, MoonLoader } from "react-spinners";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { CiSettings } from "react-icons/ci";

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

const Retirement = () => {
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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [age, setAge] = useState("");
  const [isRetired, setIsRetired] = useState(true);

  const closeSumbitModal = () => {
    setIsModalOpen(false);
  };

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
        is_due_for_retirement: isRetired,
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
  async function getAge(page) {
    const response = await api.fetchRetirementAge();
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
        is_due_for_retirement: isRetired,
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
      isRetired,
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
      isRetired,
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

  const AgeQuery = useQuery(["age"], () => getAge(), {
    keepPreviousData: true,
    refetchOnWindowFocus: "always",
  });

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
      const response = await api.createRetirementAge({
        age: age,
      });
      console.log("responce==>>>>>", response);
      enqueueSnackbar("Retirment Age Created successfully", {
        variant: "success",
      });
      setLoading(false);
      setIsModalOpen(false);
      refetch()
      AgeQuery.refetch()
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
            Staffs Due for Retirement
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
          <div className=" shadow mx-3 pb-5 mb-5 mt-5">
            <Box
              display={"flex"}
              alignItems={"center"}
              borderBottom="1px solid #EBEAED"
              px="5"
              py="3"
              justifyContent="space-between"
            >
              <Text className="text-[18px] font-semibold mb-0">
                {" "}
                Staffs Due for Retirement
              </Text>{" "}
              <button
                onClick={() => setIsModalOpen(!isModalOpen)}
                className="px-2 py-2 bg-[#984779] text-white rounded-md flex items-center gap-2"
              >
                <CiSettings variant="Bold" color="#fff" className=" h-[16px]" />
                Retirement Settings
              </button>
            </Box>

            <Box
              display={"flex"}
              alignItems={"center"}
              borderBottom="1px solid #EBEAED"
              px="5"
              justifyContent="space-between"
            >
              <Text className="text-[18px] font-semibold py-2 mb-0">
                Current Retirement Age: {AgeQuery?.data[0]?.age}
              </Text>{" "}
            </Box>

            <div className="row mt-1 pa-res px-3">
              <div
                className="col-lg-3 d-flex gap-3 align-items-center "
                style={{ height: "70px" }}
              >
                <p className=" fw-semibold text-muted fs-5 mb-0">
                  Total Staffs:
                  {data?.meta?.total}
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
            <div className="tb-res-parent overflow-auto mt-4 mx-4 md:mx-6">
              <div className="tb-res">
                <table className="table table-hover table-bordered">
                  <thead>
                    <tr className="">
                      <th scope="col">Title</th>
                      <th scope="col">Full Name</th>
                      <th scope="col">Email Address</th>
                      <th scope="col">PF</th>
                      <th scope="col">Role</th>
                      <th scope="col">Age</th>
                      <th scope="col">Department/Unit</th>
                    </tr>
                  </thead>

                  <tbody>
                    {isLoading && !isPreviousData && <div>Loading...</div>}
                    {data?.data
                      ?.filter((result) => result?.is_due_for_retirement)
                      ?.map((user, index) => (
                        <tr key={user.id}>
                          <td className="fs-6">{user.title}</td>
                          <td className="fs-6 whitespace-nowrap">
                            {user.first_name} {user.last_name}
                          </td>
                          <td className="fs-6">{user.email}</td>

                          <td className="fs-6">{user.staff_number}</td>
                          <td className="fs-6">{user.role}</td>
                          <td className="fs-6 whitespace-nowrap">
                            {user?.age}
                          </td>
                          <td className="fs-6 whitespace-nowrap">
                            {user.department
                              ? user.department.name
                              : user.unit
                              ? user.unit.name
                              : "N/A"}
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
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
                          className={`page-item ${
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
                          className={`page-item ${
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

              <Modal isOpen={isModalOpen} onClose={closeSumbitModal}>
                <ModalOverlay />
                <ModalContent>
                  <ModalHeader>Set Retirement Age</ModalHeader>
                  <ModalCloseButton />
                  <ModalBody>
                    <div className="flex flex-col gap-2">
                      <label>Retirement Age</label>
                      <input
                        value={age}
                        onChange={(e) => setAge(e.target.value)}
                        className="py-[6px] px-1 rounded-md border border-[#181818]"
                      />
                    </div>{" "}
                  </ModalBody>
                  <ModalFooter>
                    <Button colorScheme="red" mr={3} onClick={handleSubmit}>
                      {loading ? (
                        <ClipLoader color={"white"} size={16} />
                      ) : (
                        "Continue"
                      )}{" "}
                    </Button>
                    <Button onClick={closeSumbitModal}>Close</Button>
                  </ModalFooter>
                </ModalContent>
              </Modal>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Retirement;

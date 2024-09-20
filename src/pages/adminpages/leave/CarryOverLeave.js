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
} from "@chakra-ui/react";
import { RxAvatar } from "react-icons/rx";

import {
  MdModeEditOutline,
  MdSearch,
  MdOutlineRemoveRedEye,
} from "react-icons/md";
import { RiDeleteBinFill } from "react-icons/ri";
import CommonButton from "../../../components/commonbutton/Button";
import { reuseAbleColor } from "../../../components/Color";
import { useSnackbar } from "notistack";
import api from "../../../api";
import { useNavigate, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { ClipLoader } from "react-spinners";

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

const CarryOverLeave = () => {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  // const { isOpen, onOpen, onClose } = useDisclosure();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedUser, setselectedUser] = useState(null);
  const [getUsers, setGetUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [Loading, setLoading] = useState(false);
  const [userId, setUserId] = useState("");

  async function getUser(page) {
    const response = await api.fetchUsers({ params: { page } });
    return response;
  }

  const { isLoading, isError, data, error, isPreviousData, refetch } = useQuery(
    ["users", page],
    () => getUser(page),
    {
      keepPreviousData: true,
      refetchOnWindowFocus: "always",
    }
  );

  async function handleSubmit() {
    setLoading(true);

    try {
      const response = await api.caaryoverLeave({
        staff_id: userId,
      });
      console.log("responce==>>>>>", response);
      enqueueSnackbar("Leave carried over successfully", {
        variant: "success",
      });
      setLoading(false);
    } catch (error) {
      console.log(error);
      enqueueSnackbar(error.message, { variant: "error" });
      setLoading(false);
    }
  }

  const handleSubmitModal = (id) => {
    setUserId(id);
    setIsOpen(true);
  };

  function closeSumbitModal() {
    setIsOpen(false);
  }

  return (
    <div>
      {isLoading ? (
        <div className=" shadow mx-3 pb-5 mb-5 mt-5">
          <p className="fw-semibold ps-4 fs-4 py-4 border-bottom">
            Manage Carryover Leave
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
              justifyContent="space-between"
            >
              <Text className="text-[18px] font-semibold">Manage Users</Text>{" "}
              <Link to={`/settings/add-user`}>
                <CommonButton title={"Add Staff"} />
              </Link>
            </Box>
            <div className="d-flex justify-content-between">
              <div></div>
              <div></div>
              <div></div>
            </div>
            <div className="row mt-1 pa-res px-3">
              <div
                className="col-lg-3 d-flex gap-3 align-items-center "
                style={{ height: "70px" }}
              >
                <p className="mt-3 fw-semibold text-muted fs-5">
                  Total Users: {data?.meta?.total}
                </p>
              </div>

              <div className="col-lg-4 " style={{ height: "70px" }}>
                <div style={{ position: "relative" }}>
                  <div style={{ position: "absolute" }}>
                    <input
                      type="text"
                      className="form-control mt-2 ps-5"
                      style={{ height: "45px" }}
                      placeholder="Search for staff"
                    />
                  </div>
                  <div
                    style={{ position: "absolute", top: "18px", left: "10px" }}
                  >
                    <MdSearch size={"25"} />
                  </div>
                </div>
              </div>
            </div>
            <div className="tb-res-parent overflow-auto mt-4">
              <div className="tb-res">
                <table className="table table-hover table-bordered">
                  <thead>
                    <tr className="">
                      <th scope="col" style={{ height: "50px" }}>
                        S/N
                      </th>

                      <th scope="col">Title</th>
                      <th scope="col">Full Name</th>

                      <th scope="col">Department/Unit</th>
                      <th scope="col">Unused Leave</th>

                      <th scope="col">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {isLoading && !isPreviousData && <div>Loading...</div>}
                    {data?.data?.map((user, index) => (
                      <tr key={user.id}>
                        <th scope="row">{index + 1}</th>

                        <td className="fs-6">{user.title}</td>
                        <td className="fs-6 whitespace-nowrap">
                          {user.first_name} {user.last_name}
                        </td>

                        <td className="fs-6 whitespace-nowrap">
                          {user.department
                            ? user.department.name
                            : user.unit
                            ? user.unit.name
                            : "N/A"}
                        </td>
                        {/* <td className="fs-6">{user.email}</td> */}

                        <td className="fs-6">{user.total_leave_due}</td>
                        <td
                          className="flex gap-2 "
                          align="center"
                          style={{ cursor: "pointer" }}
                        >
                          {/* <MdModeEditOutline
                            size={"25"}
                            className="px-1 py-1 text-white rounded-2"
                            style={{ backgroundColor: reuseAbleColor.pupple }}
                            onClick={() => handleEdit(user.id)}
                          /> */}
                          <button
                            onClick={() => handleSubmitModal(user.id)}
                            className="px-2 p-1 rounded-md border-[0.3px] border-slate-500 text-sm flex gap-1 items-center"
                          >
                            Carryover Unused Leave{" "}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <Modal isOpen={isOpen} onClose={closeSumbitModal}>
                <ModalOverlay />
                <ModalContent>
                  <ModalHeader>Confirm Delete</ModalHeader>
                  <ModalCloseButton />
                  <ModalBody>
                    Are you sure you want to delete this role?
                  </ModalBody>
                  <ModalFooter>
                    <Button colorScheme="red" mr={3} onClick={handleSubmit}>
                      {isLoading ? (
                        <ClipLoader color={"white"} size={4} />
                      ) : (
                        "Yes"
                      )}{" "}
                    </Button>
                    <Button onClick={closeSumbitModal}>No</Button>
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
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CarryOverLeave;

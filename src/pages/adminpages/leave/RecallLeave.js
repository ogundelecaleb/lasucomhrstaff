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
import { AiOutlineMenu, AiOutlinePlus } from "react-icons/ai";
import { TbDirection, TbGridDots } from "react-icons/tb";
import { MdSearch } from "react-icons/md";
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

const RecallLeave = () => {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [userId, setUserId] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [Loading, setLoading] = useState(false);
  const [daysRemaining, setDaysRemaing] = useState("");
  const [reason, setReason] = useState("");

  async function staffOnLeave(page) {
    const response = await api.staffOnLeave(searchTerm);
    return response;
  }

  const { isLoading, isError, data, error, isPreviousData, refetch } = useQuery(
    ["leaveRequests", page],
    () => staffOnLeave(page, searchTerm),
    {
      keepPreviousData: true,
      refetchOnWindowFocus: "always",
    }
  );

  function formatDate(dateString) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Adding 1 to month since it's zero-based
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  async function handleSubmit() {
    setLoading(true);
    if (!userId) {
      enqueueSnackbar("Please select a staff", { variant: "error" });
      return;
    }
    if (!userId) {
      enqueueSnackbar("Days Remaining is Empty", { variant: "error" });
      return;
    }

    try {
      const response = await api.recallStaff({
        staff_id: userId,
        leave_duration: daysRemaining,
        reason: reason,
      });
      console.log("responce==>>>>>", response);
      closeSumbitModal();
      enqueueSnackbar("Staff Leave Recalled Successfully", {
        variant: "success",
      });
      setLoading(false);
    } catch (error) {
      console.log(error);
      closeSumbitModal();
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
            Staffs On Leave
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
          <div className=" px-4">
            <div className="row mt-4 pa-res px-3">
              <div className="col-lg-4 pt-3 " style={{ height: "70px" }}>
                <p className="fs-5 ">
                  Recall Staffs On Leave : {data?.users.length}
                </p>
              </div>
              <div className="col-lg-3 " style={{ height: "70px" }}>
                <div style={{ position: "relative" }}>
                  <div style={{ position: "absolute" }}>
                    <input
                      type="text"
                      className=" mt-2 ps-5 border "
                      style={{ height: "45px" }}
                      placeholder="Search for staff"
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  <div
                    style={{ position: "absolute", top: "18px", left: "10px" }}
                  >
                    <MdSearch size={"20"} />
                  </div>
                </div>
              </div>
              <div
                className="col-lg-5 d-flex flex-wrap gap-3 align-items-center justify-content-end"
                style={{ cursor: "pointer", height: "70px" }}
              >
                {/* <Link
                to={`/leave/leave-application`}>
                <CommonButton title={"Apply for Leave"} />
              </Link> */}
                <div></div>
              </div>
            </div>
            <div className="px-3 tb-res-parent mt-4 ">
              <div className="tb-res">
                <table class="table table-hover">
                  {/* Filter Table start */}

                  <thead>
                    <tr className="border">
                      <th scope="col" className="py-3">
                        <input
                          type="checkbox"
                          style={{ border: "10px solid grey" }}
                        />
                      </th>
                      <th scope="col" className="fw-light py-3 text-muted fs-6">
                        Staff Name{" "}
                      </th>
                      <th scope="col" className="fw-light py-3 text-muted fs-6">
                        Leave Request
                      </th>
                      <th scope="col" className="fw-light py-3 text-muted fs-6">
                        Leave Duration
                      </th>
                      <th scope="col" className="fw-light py-3 text-muted fs-6">
                        Leave Start Date
                      </th>
                      <th scope="col" className="fw-light py-3 text-muted fs-6">
                        Status{" "}
                      </th>
                      <th scope="col" className="fw-light py-3 text-muted fs-6">
                        Action{" "}
                      </th>
                    </tr>
                  </thead>

                  <br />
                  {/* {data?.users
                    ?.filter((item) =>
                        item?.first_name
                        .toLowerCase()
                        .includes(searchTerm.toLowerCase())
                    )
                    .map((item) => ( */}
                  {isLoading && !isPreviousData && <div>Loading...</div>}
                  {data?.users
                    ?.filter((result) => result?.on_leave)
                    .map((item) => (
                      <tbody key={item.id} className="border">
                        <tr>
                          <th scope="row">
                            {/* {index + 1} */}
                            <input type="checkbox" className="" />
                          </th>
                          <td>
                            <p className="fw-semibold " fontSize={"normal"}>
                              {item.first_name} {item.last_name}
                            </p>
                          </td>
                          <td className="">{item.leave_type}</td>
                          <td className="">{item.leave_duration}</td>

                          <td className="fw-semibold">
                            {formatDate(item.start_date)}
                          </td>
                          <td>
                            <button className="btn fw-semibold   h-8 btn-sm rounded-2">
                              {item.on_leave === true
                                ? "Currently on leave"
                                : "Present"}
                            </button>
                          </td>
                          {/*<td className="pt-4">
                          <Text fontSize={"smaller"} color="#25324B">
                            {item.department?.name ||
                              item.faculty?.name ||
                              item.unit?.name}
                          </Text>
                        </td> */}
                          <td
                            className="flex gap-2 "
                            align="center"
                            style={{ cursor: "pointer" }}
                          >
                            <button
                              onClick={() => handleSubmitModal(item?.id)}
                              className="px-2 p-1 rounded-md border-[0.3px] border-slate-500 text-sm flex gap-1 items-center whitespace-nowrap"
                            >
                              Recall Leave Days
                            </button>
                          </td>
                        </tr>
                      </tbody>
                    ))}
                </table>
              </div>
            </div>

            <Modal isOpen={isOpen} onClose={closeSumbitModal}>
              <ModalOverlay />
              <ModalContent>
                <ModalHeader>Recall staff on leave</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                  <div className="flex flex-col gap-2">
                    <label>Leave Days Remaining</label>
                    <input
                      value={daysRemaining}
                      onChange={(e) => setDaysRemaing(e.target.value)}
                      className="py-[6px] px-1 rounded-md border border-[#181818]"
                    />
                  </div>{" "}
                  <div className="flex flex-col gap-2 mt-2">
                    <label>Reason For Call back</label>
                    <textarea
                      value={reason}
                      onChange={(e) => setReason(e.target.value)}
                      className="py-[4px] px-1 min-h-[120px] rounded-md border border-[#181818]"
                    />
                  </div>{" "}
                </ModalBody>
                <ModalFooter>
                  <Button colorScheme="red" mr={3} onClick={handleSubmit}>
                    {Loading ? (
                      <ClipLoader color={"white"} size={16} />
                    ) : (
                      "Continue"
                    )}{" "}
                  </Button>
                  <Button onClick={closeSumbitModal}>Close</Button>
                </ModalFooter>
              </ModalContent>
            </Modal>

            {data && data.data && data?.data?.length === 0 && (
              <Box
                w={"80vw"}
                display="flex"
                flexDirection="column"
                h={"20vh"}
                alignItems="center"
                justifyContent="center"
              >
                <div
                  className="row mt-5 "
                  style={{ height: "10px", width: "80%" }}
                >
                  No Data{" "}
                </div>
              </Box>
            )}

            {data && data.data && data?.data?.length > 0 && (
              <div className="row px-4">
                <div className="col-lg-4 d-flex gap-3 align-items-center ">
                  <div className="mt-4 flex justify-center text-gray-500 text-sm">
                    <span className="mr-2">
                      Showing {data?.meta?.from} - {data.meta?.to} of{" "}
                      {data?.meta?.total} results
                    </span>
                    <span className="mr-2">|</span>
                    <span className="mr-2">
                      Page {data?.meta?.current_page} of {data?.meta?.last_page}
                    </span>
                    <span className="mr-2">|</span>
                    {/* <span className="mr-2">Page Size: {data?.meta?.per_page}</span> */}
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
        </div>
      )}
    </div>
  );
};

export default RecallLeave;

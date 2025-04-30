import React, { useState, useEffect, useCallback } from "react";
import { Skeleton } from "@chakra-ui/react";
import { AiOutlineMenu, AiOutlinePlus } from "react-icons/ai";
import { TbDirection, TbGridDots } from "react-icons/tb";
import { MdSearch } from "react-icons/md";
import { useSnackbar } from "notistack";
import api from "../../../api";
import { useNavigate, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import NoData from "../../../components/NoData";

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

const Leave = () => {
  const [page, setPage] = useState(1);
  const navigate = useNavigate();

  async function getLeaves(page) {
    const response = await api.fetchLeaves({ params: { page } });
    return response;
  }

  const { isLoading, isError, data, error, isPreviousData, refetch } = useQuery(
    ["leaveRequests", page],
    () => getLeaves(page),
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

  return (
    <div className="md:p-[20px] p-[10px] bg-[#F2F2F2] min-h-screen ">
      <div className="border-[0.2px] border-[#98a2b3] rounded-[8px]  bg-[#984779] ">
        <div className=" h-full p-[16px] md:p-[20px] block md:flex justify-between items-center md:flex-wrap w-full ">
          <div className="flex items-center gap-[16px]">
            <div className="flex items-center">
              <h3 className="text-[#fff] text-[14px] md:text-[14px] mb-0 xl:text-[16px] font-semibold leading-[24px]  ">
                Leave Applications
              </h3>
            </div>
            <div className="h-[32px] w-[1px] bg-[#D0D5DD]" />
            {/* <div className="flex flex-1 items-center gap-[8px]">
              <SearchNormal1 variant="Linear" color="#fefefe" size="16" />
              <input
                className="w-full lg:w-[300px] text-sm py-[6px] px-3 text-[16px] text-[#344054] leading-[20px] placeholder:text-[#98A2B3] placeholder:text-[12px] border border-transparent  focus:outline-none focus:ring-[#26ae5f] focus:border-b-[#26ae5f] "
                placeholder="Search by office name.."
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                }}
              />
            </div> */}
            {/* <button onClick={toggleCreateModal} className="rounded-lg py-2 px-3 bg-[#fefefe] text-sm hover:bg-gray-100">Create Office</button> */}
          </div>
        </div>
      </div>
      <div className="overflow-x-auto">
        <div class="sm:-mx-6 lg:-mx-8 mt-5">
          <div class="inline-block min-w-full  sm:px-6 lg:px-8">
            <div class="overflow-x-auto rounded-lg">
              <table className="min-w-full mb-6 border-[0.8px] border-r-[0.8px]  border-l-[0.8px] border-[#E4E7EC] rounded-lg">
                <thead className="bg-[#F9FAFB]">
                  <tr className="">
                    <th
                      scope="col"
                      className="  border-b-[0.8px] border-[#E4E7EC] py-[12px] px-3  gap-[6px] md:gap-[12px] text-[14px] md:text-[16px] text-[#98A2B3]  font-medium leading-[20px] md:leading-[24px] tracking-[0.2%]"
                    >
                      <div className="flex px-3 whitespace-nowrap    gap-[6px] md:gap-[12px] items-center">
                        Staff Name
                      </div>
                    </th>
                    <th
                      scope="col"
                      className="  border-b-[0.8px] border-[#E4E7EC] py-[12px] px-3  gap-[6px] md:gap-[12px] text-[14px] md:text-[16px] text-[#98A2B3]  font-medium leading-[20px] md:leading-[24px] tracking-[0.2%]"
                    >
                      <div className="flex whitespace-nowrap  gap-[6px] md:gap-[12px] ">
                        Leave Type{" "}
                      </div>
                    </th>

                    <th
                      scope="col"
                      className="  border-b-[0.8px] border-[#E4E7EC] py-[12px] gap-[6px] md:gap-[12px] text-[14px] md:text-[16px] text-[#98A2B3]  font-medium leading-[20px] md:leading-[24px] tracking-[0.2%]"
                    >
                      <div className="flex justify-center gap-[6px] md:gap-[12px] items-center my-0">
                        Status
                      </div>
                    </th>
                    <th
                      scope="col"
                      className="  border-b-[0.8px] border-[#E4E7EC] py-[12px] gap-[6px] md:gap-[12px] text-[14px] md:text-[16px] text-[#98A2B3]  font-medium leading-[20px] md:leading-[24px] tracking-[0.2%]"
                    >
                      <div className="flex justify-center gap-[6px] md:gap-[12px] items-center my-0">
                        Date Applied
                      </div>
                    </th>
                    <th
                      scope="col"
                      className="  border-b-[0.8px] border-[#E4E7EC] py-[12px] gap-[6px] md:gap-[12px] text-[14px] md:text-[16px] text-[#98A2B3]  font-medium leading-[20px] md:leading-[24px] tracking-[0.2%]"
                    >
                      <div className="flex justify-center gap-[6px] md:gap-[12px] items-center my-0">
                        Department
                      </div>
                    </th>
                    <th
                      scope="col"
                      className="  border-b-[0.8px] border-[#E4E7EC] py-[12px] gap-[6px] md:gap-[12px] text-[14px] md:text-[16px] text-[#98A2B3]  font-medium leading-[20px] md:leading-[24px] tracking-[0.2%]"
                    >
                      <div className="flex justify-center gap-[6px] md:gap-[12px] items-center my-0">
                        Action
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {isLoading && <h3>Loading....</h3>}
                  {data && data?.data?.length === 0 && (
                    // decryptaValue(results?.data?.data) === 0 &&
                    <NoData />
                  )}
                  {/*  {TaskSummaryData &&
                  results?.data?.data?.map((result) => ( */}

                  {data &&
                    data?.data?.map((item) => (
                      <tr key="_" className="mb-2 hover:bg-light-gray">
                        <td className="whitespace-wrap py-[10px] bg-white  px-3  border-b-[0.8px] border-[#E4E7EC] text-[14px] leading-[24px] tracking-[0.2px] text-[#667185] font-medium text-left  ">
                          <div className="flex items-center  gap-2">
                            <img
                              src={item.user_image}
                              className="h-[40px] md:h-[50px] w-[40px] md:w-[50px] rounded-full "
                              alt=""
                            />
                            <div>
                              <p className="mb-0">{item.full_name}</p>
                            </div>
                          </div>
                        </td>
                        <td className="whitespace-nowrap py-[10px] bg-white  px-3  border-b-[0.8px] border-[#E4E7EC] text-[14px] leading-[24px] tracking-[0.2px] text-[#667185] font-medium text-left  ">
                          {item.leave_type}
                        </td>
                        <td className="whitespace-nowrap py-[10px] bg-white  px-3  border-b-[0.8px] border-[#E4E7EC] text-[14px] leading-[24px] tracking-[0.2px] text-[#667185] font-medium text-left  ">
                          <button
                            h="8"
                            bg="white"
                            border={
                              item.status === "sucessful"
                                ? "1px solid #388B41"
                                : item.status === "pending"
                                ? "1px solid #FFA043"
                                : item.status === "declined"
                                ? "1px solid #FC3400"
                                : null
                            }
                            className={`text-sm font-normal ${
                              item.status === "approved"
                                ? "text-[#388B41]"
                                : item.status === "pending"
                                ? "text-[#FFA043]"
                                : item.status === "declined"
                                ? "text-[#FC3400]"
                                : null
                            }`}
                          >
                            {item.status}
                          </button>{" "}
                        </td>
                        <td className="whitespace-nowrap py-[10px] bg-white  px-3  border-b-[0.8px] border-[#E4E7EC] text-[14px] leading-[24px] tracking-[0.2px] text-[#667185] font-medium text-left  ">
                          {formatDate(item.date)}{" "}
                        </td>
                        <td className="whitespace-nowrap py-[10px] bg-white  px-3  border-b-[0.8px] border-[#E4E7EC] text-[14px] leading-[24px] tracking-[0.2px] text-[#667185] font-medium text-left  ">
                          {item.department?.name ||
                            item.faculty?.name ||
                            item.unit?.name}
                        </td>

                        <td className="whitespace-nowrap py-[16px]  gap-2 bg-white  px-3  border-b-[0.8px] border-[#E4E7EC] text-[14px] leading-[24px] tracking-[0.2px] text-[#1A202C] font-medium text-left  ">
                          <Link to={`leave-applicant-details/${item.id}`}>
                            <button
                              className="btn py-1 px-3 rounded-0 mt-3 btn-sm rounded-0 fw-semibold"
                              style={{
                                border: "1px solid #984779",
                                color: "#987779",
                                backgroundColor: "#E9EBFD",
                              }}
                            >
                              View Application
                            </button>
                          </Link>
                        </td>
                      </tr>
                    ))}
                  {/* ))} */}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      {/* Pagination */}
      {data && data.data && data?.data?.length > 0 && (
        <div className="flex items-center px-4">
          <div className="col-lg-4 d-flex gap-3 align-items-center ">
            <div className=" flex justify-center text-gray-500 text-sm">
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
            <div className="d-flex justify-content-end py-2  px-5">
                <nav aria-label="Page navigation example">
                  <ul class="pagination">
                    <li
                      className={`page-item cursor-pointer ${
                        data?.meta?.current_page === 1 ? "disabled" : ""
                      }`}
                    >
                      <p
                        className="page-link mb-0"
                        onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
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
                      className={`page-item cursor-pointer  ${
                        data?.meta?.current_page === data?.meta?.last_page
                          ? "disabled"
                          : ""
                      }`}
                    >
                      <p
                        className="page-link mb-0"
                        onClick={() => setPage((prev) => prev + 1)}
                        disabled={
                          data.links.next === null ||
                          data?.meta?.current_page === data?.meta?.last_page ||
                          isPreviousData
                        }
                      >
                        <span aria-hidden="true">Next</span>
                      </p>
                    </li>
                  </ul>
                </nav>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Leave;

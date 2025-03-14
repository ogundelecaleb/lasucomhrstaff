import {
  Add,
  Book,
  Calendar,
  CloseCircle,
  DocumentDownload,
  DocumentUpload,
  Edit,
  ElementEqual,
  Eye,
  FilterSearch,
  Layer,
  Maximize4,
  Message2,
  More,
  RowHorizontal,
  SearchNormal1,
  Trash,
} from "iconsax-react";
import {
  Grid,
  Flex,
  Button,
  Divider,
  Modal,
  Thead,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { ClipLoader } from "react-spinners";

import { Link, useNavigate } from "react-router-dom";
import { Menu, MenuButton, MenuList, MenuItem } from "@chakra-ui/react";
import { enqueueSnackbar } from "notistack";
import { useQuery } from "@tanstack/react-query";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import api from "../../../api";
import NoData from "../../../components/NoData";
import StaffListModal from "../../../components/StaffList";

const AddSupervisinfOffice = () => {
  const navigate = useNavigate();
  const [selectedStaff, setSelectedStaff] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isOpenImportModal, setIsOpenImportModal] = useState(false);
  const [isCreate, setIsCreate] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [officeName, setOfficeName] = useState(null);
  const [formValue, setFormValue] = useState({
    staff_id: "",
    supervisor_office_id: "",
  });

  function HandleEditModalClose() {
    setIsEditOpen(false);
    ClearForm();
  }

  function ToggleEditModal(id) {
    setIsEditOpen(!isEditOpen);
    setOfficeName(id.name);
    setFormValue({
      staff_id: "",
      supervisor_office_id: id?.id,
    });
  }




  const ClearForm = () => {
    setFormValue({
      staff_id: "",
      supervisor_office_id: "",
    });
  };

  const asignRoleToStaff = async () => {
    if (!selectedStaff.id) {
      enqueueSnackbar("Please select a staff", { variant: "error" });
      return;
    }
    if (!formValue.supervisor_office_id) {
      enqueueSnackbar("Please select an office", { variant: "error" });
      return;
    }
    setIsLoading(true);
    try {
      const response = await api.asignRoleToStaff({
        supervisor_office_id: formValue.supervisor_office_id,
        staff_id: selectedStaff.id,
      });
      enqueueSnackbar("Staff Assigned to Office Successfully", { variant: "success" });
      results.refetch();
      setIsLoading(false);
      HandleEditModalClose();
    } catch (error) {
      //console.log(error.message);
      enqueueSnackbar(error ? error?.message : "Unable to Asssign Staff", { variant: "error" });

      setIsLoading(false);
    }
  };

  async function getAllOffices(page) {
    const response = await api.getAllOffices({
      params: {
        page,
        search,
      },
    });
    return response;
  }

  const results = useQuery(
    ["getAllOffices", page, search],
    () => getAllOffices(page),
    {
      keepPreviousData: true,
      refetchOnWindowFocus: "always",
    }
  );

  async function getAllStaffs(page) {
    const response = await api.getAllStaffs({
      params: {
        page,
        search,
      },
    });
    return response;
  }

  const staffsQuery = useQuery(
    ["getAllStaffs", page, search],
    () => getAllStaffs(page),
    {
      keepPreviousData: true,
      refetchOnWindowFocus: "always",
    }
  );

  const handlePrev = (event) => {
    if (event) {
      setPage(page - 1);
    }
  };
  const handleNext = (event) => {
    if (event) {
      setPage(page + 1);
    }
  };

  const handleInputChange = (e) => {
    setFormValue({ ...formValue, [e.target.name]: e.target.value });
  };

  return (
    <div className="md:p-[20px] p-[10px] bg-[#F2F2F2] min-h-screen ">
      <div className="border-[0.2px] border-[#98a2b3] rounded-[8px]  bg-[#984779] ">
        <div className=" h-full p-[16px] md:p-[20px] block md:flex justify-between items-center ">
          <div className="flex items-center gap-[16px]">
            <div className="flex items-center">
              <h3 className="text-[#fff] text-[14px] md:text-[14px] mb-0 xl:text-[16px] font-semibold leading-[24px]  ">
                Manage Supervising Offices
              </h3>
            </div>
            <div className="h-[32px] w-[1px] bg-[#D0D5DD]" />
            <div className="flex items-center gap-[8px]">
              <SearchNormal1 variant="Linear" color="#667185" size="16" />
              <input
                className="w-full lg:w-[300px] py-[6px] text-[16px] text-[#344054] leading-[20px] placeholder:text-[#98A2B3] placeholder:text-[12px] border border-transparent  focus:outline-none focus:ring-[#26ae5f] focus:border-b-[#26ae5f] "
                placeholder="Search by office name.."
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                }}
              />
            </div>
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
                      className="  border-b-[0.8px] border-[#E4E7EC] py-[12px] px-5  gap-[6px] md:gap-[12px] text-[14px] md:text-[16px] text-[#98A2B3]  font-medium leading-[20px] md:leading-[24px] tracking-[0.2%]"
                    >
                      <div className="flex px-5   gap-[6px] md:gap-[12px] items-center">
                        Name
                      </div>
                    </th>
                    <th
                      scope="col"
                      className="  border-b-[0.8px] border-[#E4E7EC] py-[12px] px-5  gap-[6px] md:gap-[12px] text-[14px] md:text-[16px] text-[#98A2B3]  font-medium leading-[20px] md:leading-[24px] tracking-[0.2%]"
                    >
                      <div className="flex whitespace-nowrap  gap-[6px] md:gap-[12px] ">
                        Office Head
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
                  {results?.isLoading && <h3>Loading....</h3>}
                  {results?.data && results?.data?.data?.length === 0 && (
                    // decryptaValue(results?.data?.data) === 0 &&
                    <NoData />
                  )}
                  {/*  {TaskSummaryData &&
                  results?.data?.data?.map((result) => ( */}

                  {results?.data &&
                    results?.data?.data?.map((result) => (
                      <tr key="_" className="mb-2 hover:bg-light-gray">
                        <td className="whitespace-wrap py-[16px] bg-white  px-5  border-b-[0.8px] border-[#E4E7EC] text-[14px] leading-[24px] tracking-[0.2px] text-[#667185] font-medium text-left  ">
                          {result?.name}
                        </td>
                        <td className="whitespace-nowrap py-[16px] bg-white  px-5  border-b-[0.8px] border-[#E4E7EC] text-[14px] leading-[24px] tracking-[0.2px] text-[#667185] font-medium text-left  ">
                          {result?.head_of_unit ===
                          "No offical email heads this unit"
                            ? "Nill"
                            : result?.head_of_unit}
                        </td>

                        <td className="whitespace-nowrap py-[16px]  gap-2 bg-white  px-5  border-b-[0.8px] border-[#E4E7EC] text-[14px] leading-[24px] tracking-[0.2px] text-[#1A202C] font-medium text-left  ">
                          <button onClick={() => ToggleEditModal(result)} className="flex items-center gap-2 text-[#667185]" >
                            <Edit variant="Linear" color="#667185" size="16" /> Assign Supervisor
                          </button>
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
      {/* <div className="flex items-center justify-between">
        <h3 className="text-[14px] leading-[16px] tracking-[0.2px] text-[#667185]">
          Showing {results?.data?.meta.from || 0} -{" "}
          {results?.data?.meta.to || 0} of {results?.data?.meta.total} results |
          Page {results?.data?.meta.current_page} of{" "}
          {results?.data?.meta.last_page}
        </h3>
        <div>
          <button
            onClick={() => handlePrev(results?.data?.links?.prev)}
            disabled={!results?.data?.links.prev}
            className={`rounded-tl-lg rounded-bl-lg py-1 px-2 border-[0.2px] text-[14px] leading-[16px] tracking-[0.2px] border-[#98A2B3] ${
              !results?.data?.links.prev
                ? "text-[#667185] bg-[#fefefe] "
                : "text-white bg-[#26ae5f]"
            }`}
          >
            Prev
          </button> */}

      {/* {results?.data?.meta.links.map((link, index) => (
              link.url ? (
                <button
                  key={index}
                  onClick={() => handlePageChange(link.url)}
                  className={link.active ? 'active' : ''}
                >
                  {link.label}
                </button>
              ) : (
                <span key={index}>{link.label}</span>
              )
            ))} */}
      {/* 
          <button
            onClick={() => handleNext(results?.data?.links?.next)}
            disabled={!results?.data?.links.next}
            className={`rounded-tr-lg rounded-br-lg py-1 px-2 border-[0.2px] text-[14px] leading-[16px] tracking-[0.2px] border-[#98A2B3] ${
              !results?.data?.links.next
                ? "text-[#667185] bg-[#fefefe] "
                : "text-white bg-[#26ae5f]"
            }`}
          >
            Next
          </button>
        </div>
      </div> */}

      <Modal
        isCentered
        isOpen={isEditOpen}
        onClose={HandleEditModalClose}
        size={{ sm: "md", lg: "xl" }}
        style={{ borderRadius: 12 }}
        motionPreset="slideInBottom"
        className="rounded-[12px]"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader
            // py="4"
            color="#000000"
            mb="0"
            fontSize={{ base: "14px", md: "16px" }}
            className=""
          >
            Assign Supervisor To Office{" "}
          </ModalHeader>
          <ModalCloseButton size={"sm"} />
          <ModalBody
            px={{ base: "16px", md: "24px" }}
            className="pt-[20px] md:pt-[24px] px-[16px] md:px-[24px] pb-[30px] md:pb-[40px]"
          >
            <StaffListModal
              selectedStaff={selectedStaff}
              setSelectedStaff={setSelectedStaff}
              officeName={officeName}
            />
          </ModalBody>
          <Divider />
          <ModalFooter gap={"16px"}>
            <button
              onClick={HandleEditModalClose}
              className="border-[0.2px]  border-[#98A2B3] w-[99px] text-center rounded-[8px] py-[7px] text-[14px] font-medium text-black"
            >
              Cancel
            </button>
            <button
           onClick={asignRoleToStaff}
              className="border-[0.2px]  border-[#98A2B3] w-[99px] bg-[#984779] flex banks-center justify-center text-center rounded-[8px] py-[7px] text-[14px] font-medium text-white"
            >
              {isLoading ? (
                <ClipLoader color={"white"} size={20} />
              ) : (
                <> Update </>
              )}
            </button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default AddSupervisinfOffice;

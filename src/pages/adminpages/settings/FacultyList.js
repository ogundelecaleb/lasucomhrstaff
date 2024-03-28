import React, { useState, useEffect } from "react";
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
  Skeleton,
  useDisclosure,
} from "@chakra-ui/react";
import { MdModeEditOutline } from "react-icons/md";
import { RiDeleteBinFill } from "react-icons/ri";
import { reuseAbleColor } from "../../../components/Color";
import { useNavigate, Link } from "react-router-dom";
import api from "../../../api";
import { useSnackbar } from "notistack";
import CommonButton from "../../../components/commonbutton/Button";
import { useQuery } from "@tanstack/react-query";


const CustomSkeletonLoader = ({ count }) => {
  const skeletonRows = Array.from({ length: count }, (_, index) => (
    <tr key={index}>
      <td className='text-center' style={{ height: "65px" }}>
        <Skeleton width="100%" height="50px" />
      </td>
      <td className='fs-6 text-center '>
        <Skeleton width="100%" height="50px" />
      </td>
      <td className='fs-6 text-center '>
        <Skeleton width="100%" height="50px" />
      </td>
      <td className='text-center' style={{ cursor: "pointer", width:'40px' }}>
        <Skeleton width="60%" height="25px"  />
        <Skeleton width="60%" height="25px" marginTop="10px" />
      </td>
    </tr>
  ));

  return skeletonRows;
};

const FacultyList = () => {
 
  const [facultyData, setFacultyData] = useState([]);
  const [selectedFaculty, setSelectedFaculty] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure(); 
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const [page, setPage] = useState(1);

  async function getFaculty(page) {
    const response = await api.fetchFaculties({ params: { page } })
    return response;
  }

  const { isLoading, isError, data, error, isPreviousData, refetch } = useQuery(['faculties', page], () =>
    getFaculty(page),
    {
      keepPreviousData: true, refetchOnWindowFocus: "always",
    }

  );
  

  const handleEdit = (id) => {
    navigate(`/settings/edit-faculty/${id}`);
  };

  const handleDeleteClick = (faculty) => {
    setSelectedFaculty(faculty);
    onOpen(); // Open the modal
  };

  const handleDeleteConfirm = () => {
    if (selectedFaculty) {
      api.deleteFaculty(selectedFaculty.id)
        .then(response => {
          const updatedFacultyData = facultyData.filter(faculty => faculty.id !== selectedFaculty.id);
          setFacultyData(updatedFacultyData);

          enqueueSnackbar("Faculty deleted successfully", { variant: "success" });
        })
        .catch(error => {
          enqueueSnackbar("Error deleting faculty", { variant: "error" });
        });
        onClose();
        setSelectedFaculty(null);
    }
  };

  const handleDeleteCancel = () => {
    onClose(); // Close the modal
    setSelectedFaculty(null);
  };


  return (
    <div>
      {isLoading ? (
        <div className=' shadow mx-3 pb-5 mb-5 mt-5'>
          <p className='fw-semibold ps-4 fs-4 py-4 border-bottom'>Manage Faculty</p>

          <div className='tb-res-parent mt-4'>
            <div className='tb-res'>
              <table className='table table-hover table-bordered'>
                <thead>
                </thead>
                <tbody>
                  <CustomSkeletonLoader count={6} />
                </tbody>
              </table>
            </div>
          </div>
        </div>
      ) : (
      <div>
        <div className=' shadow mx-3 pb-5 mb-5 mt-5'>
          <Box
            display={"flex"}
            alignItems={"center"}
            borderBottom='1px solid #EBEAED'
            px='10'
            justifyContent='space-between'>
            <Text className='fw-semibold ps-4 fs-4'>Manage Faculty</Text>{" "}
            <Link
              to={`/settings/add-faculty`}>
              <CommonButton title={"Add Faculty"} />
            </Link>
          </Box>
        <div className='tb-res-parent mt-4'>
          <div className='tb-res'>
            <table className='table table-hover table-bordered'>
              <thead>
                <tr className=''>
                  <th
                    scope='col'
                    className='text-center'
                    style={{ height: "40px" }}>
                    S/N
                  </th>
                  <th className='text-center' scope='col'>
                    Faculty Name
                  </th>
                  <th className='text-center' scope='col'>
                    Name of Dean
                  </th>
                  <th className='text-center' scope='col'>
                    Action
                  </th>
                </tr>
              </thead>
              
              <tbody>
              {isLoading && !isPreviousData && <div>Loading...</div>}
                {data?.data?.map((faculty, index) => (
                  <tr key={faculty.id}>
                    <th className='text-center' style={{ height: "65px" }}>
                      {index + 1}
                    </th>

                    <td className='fs-6 text-center pt-4'>{faculty.name}</td>
                    <td className='fs-6 text-center pt-4'>{faculty.dean}</td>

                    <td
                      className=' '
                      align='center'
                      style={{ cursor: "pointer" }}>
                      <MdModeEditOutline
                        size={"25"}
                        className='px-1 py-1 text-white rounded-2'
                        style={{ backgroundColor: reuseAbleColor.pupple }}
                        onClick={() => handleEdit(faculty.id)}
                      />
                     <RiDeleteBinFill
                        size={"25"}
                        className='bg-secondary py-1 px-1 mt-2 text-white rounded-2'
                        onClick={() => handleDeleteClick(faculty)}
                        />
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
                Are you sure you want to delete this faculty?
              </ModalBody>
              <ModalFooter>
                <Button colorScheme="red" mr={3} onClick={handleDeleteConfirm}>
                  Yes
                </Button>
                <Button onClick={handleDeleteCancel}>No</Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
          
        </div>
      </div>
      {data && data.data && data?.data?.length > 0 && (
          <div className='row px-4'>
            <div className='col-lg-4 d-flex gap-3 align-items-center '>
              <div className="mt-4 flex justify-center text-gray-500 text-sm">
                <span className="mr-2">
                  Showing {data?.meta?.from} - {data.meta?.to}{" "}
                  of {data?.meta?.total} results
                </span>
                <span className="mr-2">|</span>
                <span className="mr-2">
                  Page {data?.meta?.current_page} of {data?.meta?.last_page}
                </span>
                <span className="mr-2">|</span>
                {/* <span className="mr-2">Page Size: {data?.meta?.per_page}</span> */}
              </div>
            </div>
            <div className='col-lg-4 '></div>
            <div className='col-lg-4'>
              <div className='d-flex justify-content-end py-2 mt-4 px-5'>
                <h1>
                 
                    <nav aria-label='Page navigation example'>
                      <ul class='pagination'>
                      <li className={`page-item ${data?.meta?.current_page === 1 ? 'disabled' : ''}`}>
                        <p className='page-link' onClick={() => setPage(prev => Math.max(prev - 1, 1))} disabled={data?.links?.prev === null || data?.meta?.current_page === 1 || isPreviousData}>
                          <span aria-hidden='true'>Prev</span>
                        </p>
                      </li>

                      <li className={`page-item ${data?.meta?.current_page === data?.meta?.last_page ? 'disabled' : ''}`}>
                        <p className='page-link' onClick={() => setPage(prev => prev + 1)} disabled={data?.links?.next === null || data?.meta?.current_page === data?.meta?.last_page || isPreviousData}>
                          <span aria-hidden='true'>Next</span>
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

export default FacultyList;

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
  useDisclosure,
  Skeleton
} from "@chakra-ui/react";
import { MdModeEditOutline } from "react-icons/md";
import { RiDeleteBinFill } from "react-icons/ri";
import CommonButton from "../../../components/commonbutton/Button";
import { reuseAbleColor } from "../../../components/Color";
import { useNavigate, Link } from "react-router-dom";
import api from "../../../api";
import { useSnackbar } from "notistack";
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

const RoleList = () => {
  
  const [roleData, setRoleData] = useState([]);
  const [selectedRole, setselectedRole] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const [page, setPage] = useState(1);

  async function getRole(page) {
    const response = await api.fetchRole({ params: { page } })
    return response;
  }

  const { isLoading, isError, data, error, isPreviousData, refetch } = useQuery(['roles', page], () =>
    getRole(page),
    {
      keepPreviousData: true, refetchOnWindowFocus: "always",
    }

  );
  
  const handleEdit = (id) => {
    navigate(`/settings/edit-role/${id}`);
  };

  const handleDeleteClick = (role) => {
    setselectedRole(role);
    onOpen(); 
  };

  const handleDeleteConfirm = () => {
    if (selectedRole) {
      api.deleteRole(selectedRole.id)
        .then(response => {
          const updatedroleData = roleData.filter(role => role.id !== selectedRole.id);
          setRoleData(updatedroleData);

          enqueueSnackbar("Role deleted successfully", { variant: "success" });
        })
        .catch(error => {
          enqueueSnackbar("Error deleting role", { variant: "error" });
        });
        onClose();
        setselectedRole(null);
    }
  };

  const handleDeleteCancel = () => {
    onClose(); // Close the modal
    setselectedRole(null);
  };

  return (
    <div>
      {isLoading ? (
        <div className=' shadow mx-3 pb-5 mb-5 mt-5'>
          <p className='fw-semibold ps-4 fs-4 py-4 border-bottom'>Role List</p>
          <div className='tb-res-parent mt-4'>
            <div className='tb-res'>
              <table className='table table-hover table-bordered'>
                <thead>
                  {/* ... Table header ... */}
                </thead>
                <tbody>
                  <CustomSkeletonLoader count={6} /> {/* Adjust count as needed */}
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
              <Text className='fw-semibold ps-4 fs-4'>Manage Roles</Text>{" "}
              <Link
                to={`/settings/add-role`}>
                <CommonButton title={"Add Roles"} />
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
                        Role Name
                      </th>
                      <th className='text-center' scope='col'>
                        Description
                      </th>
                      <th className='text-center' scope='col'>
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                  {data?.data?.map((role, index) => (
                      <tr key={role.id}>
                        <th className='text-center' style={{ height: "65px" }}>
                        {index + 1}
                        </th>

                        <td className='fs-6 text-center pt-4'>{role.name}</td>
                        <td className='fs-6 text-center pt-4'>{role.description}</td>

                        <td
                          className=' '
                          align='center'
                          style={{ cursor: "pointer" }}>
                          <MdModeEditOutline
                            size={"25"}
                            className='px-1 py-1 text-white rounded-2'
                            style={{ backgroundColor: reuseAbleColor.pupple }}
                            onClick={() => handleEdit(role.id)}
                          />
                          <RiDeleteBinFill
                            size={"25"}
                            className='bg-secondary py-1 px-1 mt-2 text-white rounded-2'
                            onClick={() => handleDeleteClick(role)}
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
                    Are you sure you want to delete this role?
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
                {data && data.meta && (
                  <span className="mr-2">
                    Showing {data.meta.from} - {data.meta.to} of {data.meta.total} results
                  </span>
                )}
                {data && data.meta && (
                  <span className="mr-2">|</span>
                )}
                {data && data.meta && (
                  <span className="mr-2">
                    Page {data.meta.current_page} of {data.meta.last_page}
                  </span>
                )}
              </div>
            </div>
            <div className='col-lg-4 '></div>
            <div className='col-lg-4'>
              <div className='d-flex justify-content-end py-2 mt-4 px-5'>
                <h1>
                 
                    <nav aria-label='Page navigation example'>
                      <ul class='pagination'>
                        <li className={`page-item ${data?.meta?.current_page === 1 ? 'disabled' : ''}`}>
                          <p className='page-link'  onClick={() => setPage(prev => Math.max(prev - 1, 1))} disabled={data.links.prev === null || data?.meta?.current_page === 1 || isPreviousData}>
                            <span aria-hidden='true'>Prev</span>
                          </p>
                        </li>

                        

                        <li className={`page-item ${data?.meta?.current_page === data?.meta?.last_page ? 'disabled' : ''}`}>
                          <p className='page-link' onClick={() => setPage(prev => prev + 1)}
                    disabled={data.links.next === null || data?.meta?.current_page === data?.meta?.last_page || isPreviousData}>
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

export default RoleList;

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

export const ManageDivision = () => {
  const [roleData, setRoleData] = useState([]);
  const [selectedRole, setselectedRole] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    api.fetchDivision()
    .then(response => {
      setRoleData(response.data);
    })
    .catch(error => {
      enqueueSnackbar("Error fetching data", { variant: "error" });
    })
    .finally(() => {
      setIsLoading(false);
    });
  }, []);

  const handleEdit = (id) => {
    navigate(`/settings/edit-division/${id}`);
  };

  const handleDeleteClick = (role) => {
    setselectedRole(role);
    onOpen(); 
  };

  const handleDeleteConfirm = () => {
    if (selectedRole) {
      api.deleteDivision(selectedRole.id)
        .then(response => {
          const updatedroleData = roleData.filter(role => role.id !== selectedRole.id);
          setRoleData(updatedroleData);

          enqueueSnackbar("Division deleted successfully", { variant: "success" });
        })
        .catch(error => {
          enqueueSnackbar("Error deleting division", { variant: "error" });
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
          <p className='fw-semibold ps-4 fs-4 py-4 border-bottom'>Manage Division</p>
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
              <Text className='fw-semibold ps-4 fs-4'>Manage Division</Text>{" "}
              <Link
                to={`/settings/add-division`}>
                <CommonButton title={"Add Division"} />
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
                        Division Name
                      </th>
                      <th className='text-center' scope='col'>
                        Division Type
                      </th>
                      <th className='text-center' scope='col'>
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {roleData.map((role, index) => (
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
          <div className='d-flex justify-content-end py-2 mt-4 px-5'>
            <h1>
              <nav aria-label='Page navigation example'>
                <ul class='pagination'>
                  <li class='page-item'>
                    <p class='page-link' aria-label='Previous'>
                      <span aria-hidden='true'>&laquo;</span>
                      <span class='sr-only'>Previous</span>
                    </p>
                  </li>
                  <li class='page-item'>
                    <p class='page-link' href='#'>
                      1
                    </p>
                  </li>
                  <li class='page-item'>
                    <p class='page-link' href='#'>
                      2
                    </p>
                  </li>
                  <li class='page-item'>
                    <p class='page-link' href='#'>
                      3
                    </p>
                  </li>
                  <li class='page-item'>
                    <p class='page-link' aria-label='Next'>
                      <span aria-hidden='true'>&raquo;</span>
                      <span class='sr-only'>Next</span>
                    </p>
                  </li>
                </ul>
              </nav>
            </h1>
          </div>
        </div>
      )}
    </div>
  );
}

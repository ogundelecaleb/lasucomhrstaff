import React, { useState, useEffect, useCallback } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { reuseAbleColor } from "../../../components/Color";
import api from "../../../api";
import { useSnackbar } from "notistack";
import { MoonLoader } from "react-spinners";
import { useParams } from "react-router-dom";


const EditDepartment  = () => {

  const [facultyOptions, setFacultyOptions] = useState([]);
  const [selectedFaculty, setSelectedFaculty] = useState("");
  const [departmentName, setDepartmentName] = useState("");
  const { enqueueSnackbar } = useSnackbar();
  const [isLoading, setIsLoading] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    
    api.fetchFaculties()
    .then(response => setFacultyOptions(response.data))
    .catch(error => {
      enqueueSnackbar("Error fetching faculty", { variant: "error" });
    });

    if (id) {
      api.getDepartmentsbyid(id)
      .then(response => {
        setSelectedFaculty(response.data.faculty);
        setDepartmentName(response.data.name);
      })
      .catch(error => {
        enqueueSnackbar("Error fetching department details", { variant: "error" });
      });
    }
  }, [id]);

  const handleEditDepartment = useCallback((event) => {
    event.preventDefault();
    setIsLoading(true);
    console.log("Form submitted");
    if (!selectedFaculty || !departmentName) {
        enqueueSnackbar("Please select a faculty and enter a department name.", { variant: "error" });
        return;
    }

    api.updateDepartment({id, name: departmentName, faculty_id: selectedFaculty.id })
    .then(response => {
      enqueueSnackbar("Department edited successfully", { variant: "success" });
      setIsLoading(false);
    })
    .catch(error => {
      enqueueSnackbar("Error editing department", { variant: "error" });
      setIsLoading(false);
    });
  }, [id, selectedFaculty, departmentName]);

  return (
      <div className='pb-3 mb-5 shadow  mt-5 mx-5'>
          <p className='border-bottom mb-5 fs-4 fw-semibold ps-4 py-3'>Edit Department</p>
          <div className='px-4'>
              <form onSubmit={handleEditDepartment}>
                  <div className='my-5 form-group row'>
                      <label
                            style={{ padding:'10px' }}
                          //   for='inputPassword'
                          className=' fs-5 fw-semibold col-md-2 col-form-label'>
                          Faculty <sup className='text-danger'>*</sup>
                      </label>
                      <div className='col-sm-8'>
                      <select
                          style={{ height: "60px" }}
                          className='form-control rounded-0'
                          placeholder='Select Faculty'
                          value={selectedFaculty ? selectedFaculty.id : ""}
                          onChange={(e) => {
                              const selectedId = e.target.value;
                              const selectedFacultyObject = facultyOptions.find(faculty => faculty.id === parseInt(selectedId));
                              console.log("Selected Faculty Object:", selectedFacultyObject);
                              setSelectedFaculty(selectedFacultyObject);
                          }}                            
                      >
                          <option value="">Select Faculty</option>
                          {facultyOptions.map((faculty) => (
                              <option key={faculty.id} value={faculty.id}>
                                  {faculty.name}
                              </option>
                          ))}
                      </select>

                      </div>
                  </div>
                  <div className='my-5 form-group row'>
                      <label
                            style={{ padding:'10px' }}
                          className=' fs-5 fw-semibold col-md-2 col-form-label'>
                          Department <sup className='text-danger'>*</sup>
                      </label>
                      <div className='col-sm-8'>
                          <input
                              style={{ height: "60px" }}
                              type='text'
                              className='form-control rounded-0'
                              placeholder='Department name'
                              value={departmentName}
                              onChange={(e) => setDepartmentName(e.target.value)}
                          />
                      </div>
                  </div>
                  

                  <div className='my-5 form-group row'>
                      <label
                          for='inputPassword'
                          className=' fs-5 fw-semibold col-sm-2 col-form-label'>
                      </label>
                      <div className='col-sm-8 justify-content-end d-flex gap-5'>
                          <div></div>
                          <button
                              type="submit"
                              style={{
                                  backgroundColor: reuseAbleColor.pupple,
                                  border: "none",
                              }}
                              className='btn text-white btn-info d-flex gap-2 align-items-center'>
                              {isLoading ? (
                                <MoonLoader color={"white"} size={20} />
                                ) : ( <>Save Changes</>
                                )}
                          </button>
                          {/* <button className='btn btn-secondary' onClick={() => {
                                  setSelectedFaculty("");
                                  setDepartmentName("");
                              }}>Reset</button> */}
                      </div>
                  </div>
              </form>
          </div>
      </div>
  );
}

export default EditDepartment
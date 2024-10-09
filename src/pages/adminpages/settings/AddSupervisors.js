import React, { useState, useEffect } from "react";
import { reuseAbleColor } from "../../../components/Color";
import { useNavigate } from "react-router-dom";
import api from "../../../api";
import { useSnackbar } from "notistack";
import { ScaleLoader } from "react-spinners";

const AddSupervisors = () => {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const [isLoading, setIsLoading] = useState(false);
  const [selectedFaculty, setSelectedFaculty] = useState("");
  const [facultyOptions, setFacultyOptions] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [departmentOptions, setDepartmentOptions] = useState([]);
  const [selectedDivision, setSelectedDivision] = useState("");
  const [divisionOptions, setDivisionOptions] = useState([]);
  const [roleData, setRoleData] = useState([]);
  const [firstName, setFirstName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [staffID, setStaffID] = useState("");
  const [status, setStatus] = useState("active");
  const [selectedRole, setSelectedRole] = useState("");
  const [selectedTitle, setSelectedTitle] = useState("");
  const [selectedStaffType, setSelectedStaffType] = useState("");
  const [selectedConfirmed, setSelectedConfirm] = useState("");
  const [selectedConuass, setSelectedConuass] = useState("");
  const [selectedConunass, setSelectedConunass] = useState("");
  const [selectedLevel, setSelectedLevel] = useState("");
  const [office, setOffice] = useState("");
  const [dofa, setDofa] = useState("");
  const [step, setStep] = useState("");
  const [cadre, setCadre]= useState("");

  useEffect(() => {
    api
      .fethallFaculties()
      .then((response) => setFacultyOptions(response.data))
      .catch((error) => {
        enqueueSnackbar("Error fetching faculty", { variant: "error" });
      });
  }, []);

  useEffect(() => {
    api
      .fetchDivision()
      .then((response) => setDivisionOptions(response.data))
      .catch((error) => {
        enqueueSnackbar("Error fetching Divisions/Unit", { variant: "error" });
      });
  }, []);

  useEffect(() => {
    api
      .fethallDeparments()
      .then((response) => setDepartmentOptions(response.data))
      .catch((error) => {
        enqueueSnackbar("Error fetching Departments", { variant: "error" });
      });
  }, []);

  useEffect(() => {
    api
      .fetchRole()
      .then((response) => {
        setRoleData(response.data);
      })
      .catch((error) => {
        enqueueSnackbar("Error fetching roles", { variant: "error" });
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const handleRoleChange = (event) => {
    setSelectedRole(event.target.value);
    console.log(selectedRole);
  };

  const handleStaffChange = (event) => {
    setSelectedStaffType(event.target.value);
    console.log(selectedStaffType);
  };

  useEffect(() => {
    if (selectedRole === "HOU" || selectedStaffType === "NTSWEP") {
      setSelectedDivision("");
    }
  }, [selectedRole]);

  useEffect(() => {
    if (selectedStaffType === "ASE" || selectedStaffType === "NASE") {
      setSelectedConuass("");
      setSelectedConunass("");
      setSelectedLevel("");
    }
  }, [selectedStaffType]);

  const levelTitles = {
    "Level 7": "Professor",
    "Level 6": "Associate Prof.",
    "Level 5": "Senior Lecturer",
    "Level 4": "Lecturer I",
    "Level 3": "Lecturer II",
    "Level 2": "Assistant Lecturer",
    "Level 1": "Graduate Assistant",
  };

  const selectLevelTitle = (level) => {
    setSelectedLevel(levelTitles[level] || "");
  };

  const setEntitledLeave = () => {
    if (selectedStaffType === "NASE") {
      if (
        selectedLevel === "Level 7" ||
        selectedLevel === "Level 8" ||
        selectedLevel === "Level 9" ||
        selectedLevel === "Level 10" ||
        selectedLevel === "Level 11" ||
        selectedLevel === "Level 12" ||
        selectedLevel === "Level 13" ||
        selectedLevel === "Level 14" ||
        selectedLevel === "Level 15"
      ) {
        return "42";
      } else if (selectedLevel === "Level 6") {
        return "30";
      } else if (
        selectedLevel === "Level 3" ||
        selectedLevel === "Level 4" ||
        selectedLevel === "Level 5"
      ) {
        return "21";
      } else if (selectedLevel === "Level 1" || selectedLevel === "Level 2") {
        return "14";
      }
    } else if (selectedStaffType === "ASE") {
      if (
        selectedConuass === "Level 1" ||
        selectedConuass === "Level 2" ||
        selectedConuass === "Level 3" ||
        selectedConuass === "Level 4" ||
        selectedConuass === "Level 5" ||
        selectedConuass === "Level 6" ||
        selectedConuass === "Level 7"
      ) {
        return "42";
      }
    }
    return "0";
  };

  const resetForm = () => {
    setSelectedTitle("");
    setFirstName("");
    setLastName("");
    setEmail("");
    setStaffID("");
    setStatus("");
    setSelectedRole("");
    setSelectedFaculty("");
    setSelectedDivision("");
    setEntitledLeave("");
    setSelectedConuass("");
    setSelectedConunass("");
    setSelectedLevel("");
    setSelectedStaffType("");
  };

  async function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true);
    console.log("Form submitted");
    console.log({
      title: selectedTitle,
      first_name: firstName,
      last_name: lastName,
      email,
      staff_number: staffID,
      status,
      role: selectedRole,
      faculty: selectedFaculty.id,
      department: selectedDepartment.id,
      unit: selectedDivision.id,
      conuass: selectedConuass,
      conunass: selectedConunass,
      level: selectedLevel,
      confirmation: selectedConfirmed,
      type: selectedStaffType,
      total_leave_due: setEntitledLeave(),
    });

    try {
      const response = await api.createSupervisor({
        
        email,
        status: "active",
        role: selectedRole,
        unit: selectedDivision.id,
        type: selectedStaffType,
      
        office: office,
        confirmation: "confirmed",
        total_leave_due: setEntitledLeave(),
        faculty_id: selectedFaculty.id,
        department_id: selectedDepartment.id,
      });
      console.log("responce==>>>>>", response);
      enqueueSnackbar("User added successfully", { variant: "success" });
      setIsLoading(false);
      resetForm();
    } catch (error) {
      console.log(error);
      enqueueSnackbar(error.message, { variant: "error" });
      setIsLoading(false);
    }
  }



  return (
    <div className="pb-3 mb-5 shadow  mt-5 mx-2 md:mx-5">
      <p className="border-bottom mb-5 text-[18px] font-semibold ps-4 py-3">
        {" "}
        Add Supervisor
      </p>
      <div className="px-4">
        <form onSubmit={handleSubmit}>
          
          
          
          <div className="my-5 form-group row">
            <label for="email" className="text-[18px] font-medium col-md-2">
              Email Address<sup className="text-danger">*</sup>
            </label>
            <div className="col-md-8">
              <input
                style={{ height: "60px" }}
                type="email"
                className="form-control rounded-0"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>
         

          <div className="my-5 form-group row">
            <label
              htmlFor="staffType"
              className="text-[18px] font-medium col-md-2"
            >
              Staff Type<sup className="text-danger">*</sup>
            </label>
            <div className="col-sm-8 d-flex gap-4">
              <select
                id="staffType"
                value={selectedStaffType}
                onChange={handleStaffChange}
                className="form-control rounded-0"
                style={{ height: "60px" }}
              >
                <option value="">Choose an option</option>
                <option value="ASE">Academic Staff Establishment (ASE)</option>
                <option value="NASE">
                  Non Academic Staff Establishment (NASE)
                </option>
              </select>
            </div>
            </div>
        
            <div className="my-5 form-group row">
            <label
              htmlFor="staffType"
              className="text-[18px] font-medium col-md-2"
            >
              Supervisor Role<sup className="text-danger">*</sup>
            </label>
            <div className="col-sm-8 d-flex gap-4">
              <select
                id="staffType"
                value={selectedRole}
                onChange={(e)=> setSelectedRole(e.target.value)}
                className="form-control rounded-0"
                style={{ height: "60px" }}
              >
                <option value="">Choose an option</option>
                <option value="PT">Provost</option>
                <option value="CS">College Secretary</option>
                <option value="DEAN">Dean</option>
                <option value="HASE">Head of ASE</option>
                <option value="HNASEJ">Head of NASE Junior</option>
                <option value="HNASES">Head of NASE Senior</option>
                <option value="HOU">Head of Unit</option>
                <option value="HOD">Head of Department</option>
                
              </select>
            </div>
            </div>
        


         

         

          {selectedStaffType === "NASE" &&
            selectedRole &&
            !["DEAN", "HOD", "PT", "CS", "DPT"].includes(selectedRole) && (
              <>
               
                <div className="my-5 form-group row">
                  <label
                    for="email"
                    className="text-[18px] font-medium col-md-2"
                  >
                    Unit/Division<sup className="text-danger">*</sup>
                  </label>
                  <div className="col-md-8">
                    <select
                      id="division"
                      value={selectedDivision ? selectedDivision.id : ""}
                      onChange={(e) => {
                        const selectedId = e.target.value;
                        const selectedDivisionObject = divisionOptions.find(
                          (division) => division.id === parseInt(selectedId)
                        );
                        setSelectedDivision(selectedDivisionObject);
                      }}
                      className="form-control rounded-0"
                      style={{ height: "60px" }}
                    >
                      <option value="">Select Unit</option>
                      {divisionOptions.map((division) => (
                        <option key={division.id} value={division.id}>
                          {division.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </>
            )}
          {(selectedRole === "DEAN" ||
            selectedRole === "RSWEP" ||
            selectedRole === "HOD" ||
            selectedDivision.id === 8) && (
            <div className="my-5 form-group row">
              <label
                htmlFor="faculty"
                className="text-[18px] font-medium col-md-2"
              >
                FACULTY<sup className="text-danger">*</sup>
              </label>
              <div className="col-md-8">
                <select
                  id="faculty"
                  className="form-control rounded-0"
                  style={{ height: "60px" }}
                  value={selectedFaculty ? selectedFaculty.id : ""}
                  onChange={(e) => {
                    const selectedId = e.target.value;
                    const selectedFacultyObject = facultyOptions.find(
                      (faculty) => faculty.id === parseInt(selectedId)
                    );
                    console.log(
                      "Selected Faculty Object:",
                      selectedFacultyObject
                    );
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
          )}

          {selectedRole === "HOD" && (
            <div>
              <div className="my-5 form-group row">
                <label
                  htmlFor="department"
                  className="text-[18px] font-medium col-md-2"
                >
                  DEPARTMENT<sup className="text-danger">*</sup>
                </label>
                <div className="col-md-8">
                  <select
                    id="department"
                    className="form-control rounded-0"
                    style={{ height: "60px" }}
                    value={selectedDepartment ? selectedDepartment.id : ""}
                    onChange={(e) => {
                      const selectedId = e.target.value;
                      const selectedDepartmentObject = departmentOptions.find(
                        (department) => department.id === parseInt(selectedId)
                      );
                      console.log(
                        "Selected Department Object:",
                        selectedDepartmentObject
                      );
                      setSelectedDepartment(selectedDepartmentObject);
                    }}
                  >
                    <option value="">Select Department</option>
                    {departmentOptions.map((department) => (
                      <option key={department.id} value={department.id}>
                        {department.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          )}

          

         
         

         

          <div className="my-5 form-group row">
            <label
              for="inputPassword"
              className="text-[18px] font-medium col-md-2"
            ></label>
            <div className="col-sm-8 justify-content-end d-flex gap-5">
              <div></div>
              <button
                style={{
                  backgroundColor: reuseAbleColor.pupple,
                  border: "none",
                }}
                className="btn text-white btn-info d-flex gap-2 align-items-center"
                type="submit"
              >
                {isLoading ? (
                  <ScaleLoader color={"white"} size={4} />
                ) : (
                  <div className="text-white d-flex gap-2 align-items-center">
                    Create Supervisor
                  </div>
                )}
              </button>
             
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddSupervisors;

import React, { useState, useEffect } from "react";
import { reuseAbleColor } from "../../../components/Color";
import { Link, useNavigate } from "react-router-dom";
import api from "../../../api";
import { Avatar, Box, Text } from "@chakra-ui/react";
import { useSnackbar } from "notistack";
import { useParams } from "react-router-dom";
import { ScaleLoader } from "react-spinners";
import { MoonLoader } from "react-spinners";
import { RxAvatar } from "react-icons/rx";
import { Trash } from "iconsax-react";

const EditUser = () => {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadinge, setIsLoadinge] = useState(false);
  const [userDetails, setUserDetails] = useState([]);
  const [divisionOptions, setDivisionOptions] = useState([]);
  const [selectedDivision, setSelectedDivision] = useState("");
  const [file, setFile] = useState(null);
  const [uploadedDocument2, setUploadedDocument2] = useState(null);
  const [uploadedDocument1, setUploadedDocument1] = useState(null);
  const [isDocument1Uploaded, setIsDocument1Uploaded] = useState(false);
  const [isDocument2Uploaded, setIsDocument2Uploaded] = useState(false);
  const [beneficiaries, setBeneficiaries] = useState([
    { full_name: "", relationship: "", phone: "", email: "", percentage: "" },
  ]);

  const handleAddBeneficiary = () => {
    if (beneficiaries?.length >= 4) {
      enqueueSnackbar("Maximum number of beneficiaries reached", {
        variant: "warning",
      });
      return;
    }
    console.log("beneficiaries?.length", beneficiaries?.length);
    setBeneficiaries([
      ...beneficiaries,
      { full_name: "", relationship: "", phone: "", email: "", percentage: "" },
    ]);
  };

  const handleChange = (index, event) => {
    const { name, value } = event.target;
    const newBeneficiaries = [...beneficiaries];
    newBeneficiaries[index][name] = value;
    setBeneficiaries(newBeneficiaries);
  };
  const [academic, setAcademic] = useState([
    {
      id: "0",
      name_of_institution: "",
      qualification: "",
      start_year: "",
      end_year: "",
    },
  ]);

  const handleAcademic = () => {
    setAcademic([
      ...academic,
      {
        id: JSON.stringify(academic?.length + 1),
        name_of_institution: "",
        qualification: "",
        start_year: "",
        end_year: "",
      },
    ]);
  };
  const handleAcademicChange = (index, event) => {
    const { name, value } = event.target;
    const newAcademic = [...academic];
    newAcademic[index][name] = value;
    setAcademic(newAcademic);
  };

  const onFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const [selectedRole, setSelectedRole] = useState(userDetails.role || "");
  const [selectedStatus, setSelectedStatus] = useState(
    userDetails.status || "active"
  );
  const [selectedConfirm, setSelectedConfirm] = useState(
    userDetails.confirmation || ""
  );
  const [roleData, setRoleData] = useState([]);
  const { id } = useParams();

  const onFileChanges = (e, documentNumber) => {
    const selectedFile = e.target.files[0];

    if (selectedFile) {
      const fileType = selectedFile.type;

      if (fileType === "application/pdf" || fileType === "image/jpeg") {
        if (documentNumber === 1) {
          setUploadedDocument1(selectedFile);
          setIsDocument1Uploaded(true);
        } else if (documentNumber === 2) {
          setUploadedDocument2(selectedFile);
          setIsDocument2Uploaded(true);
        }
      } else {
        enqueueSnackbar("Please select a valid PDF or JPEG file.", {
          variant: "error",
        });
      }
    }
  };

  useEffect(() => {
    api
      .fetchDivision()
      .then((response) => setDivisionOptions(response.data))
      .catch((error) => {
        enqueueSnackbar("Error fetching Divisions/Unit", { variant: "error" });
      });
  }, []);

  useEffect(() => {
    setIsLoadinge(true);
    if (id) {
      api
        .getUserbyid(id)
        .then((response) => {
          const roleData = response.data;
          setUserDetails(roleData);
          console.log(response.data);
          setIsLoadinge(false);
        })
        .catch((error) => {
          console.log(error);
          setIsLoadinge(false);
        });
    }
  }, [id]);

  const [formValues, setFormValues] = useState({
    title: userDetails.title || "",
    firstName: userDetails.first_name || "",
    lastName: userDetails.last_name || "",
    annualLeave: userDetails.total_leave_due || "",
    email: userDetails.email || "",
    staffID: userDetails.staff_number || "",
    status: userDetails.status || "active",
    selectedRole: userDetails.role || "",
    selectedTitle: userDetails.title || "",
    selectedConfirm: userDetails.confirmation || "",

    nationality: "",
    stateOfOrigin: "",
    dateOfBirth: "",
    gender: "",
    marital_status: "",
    image: "",
    maidenName: "",

    bloodGroup: "",
    age: "",
    phone: "",
    contact_address: "",
    current_address: "",
    permanent_address: "",
    department: "",
    date_of_first_appointment: "",
    faculty: "",
    level: "",
    unit: "",
    k1_full_name: "",
    k1_relationship: "",
    k1_phone: "",
    k2_full_name: "",
    k2_relationship: "",
    k2_phone: "",
    spouse_full_name: "",
    spouse_current_address: "",
    spouse_phone: "",
    c1_full_name: "",
    c1_current_address: "",
    c1_relationship: "",
    c1_phone: "",
    c1_date_of_birth: "",
    c1_gender: "",
    c2_full_name: "",
    c2_current_address: "",
    c2_relationship: "",
    c2_phone: "",
    c2_date_of_birth: "",
    c2_gender: "",
    c3_full_name: "",
    c3_current_address: "",
    c3_relationship: "",
    c3_phone: "",
    c3_date_of_birth: "",
    c3_gender: "",
    c3_email: "",

    c4_full_name: "",
    c4_current_address: "",
    c4_relationship: "",
    c4_phone: "",
    c4_date_of_birth: "",
    c4_gender: "",
    c4_email: "",
  });

  useEffect(() => {
    setFormValues({
      title: userDetails.title || "",
      firstName: userDetails.first_name || "",
      lastName: userDetails.last_name || "",
      email: userDetails.email || "",
      annualLeave: userDetails.total_leave_due || "",
      staffID: userDetails.staff_number || "",
      selectedTitle: userDetails.title || "",
      status: userDetails.status || "",
      selectedConfirm: userDetails.confirmation || "",

      nationality: userDetails?.nationality,
      stateOfOrigin: userDetails?.state_of_origin,
      dateOfBirth: userDetails?.date_of_birth,
      gender: userDetails?.gender,
      marital_status: userDetails?.marital_status,
      image: userDetails?.image,
      maidenName: userDetails?.maiden_name,
      bloodGroup: userDetails?.blood_group,
      age: userDetails?.age,
      phone: userDetails?.phone,
      contact_address: userDetails?.contact_address,
      current_address: userDetails?.current_address,
      permanent_address: userDetails?.permanent_address,
      department: userDetails?.department?.name,
      date_of_first_appointment: userDetails?.date_of_first_appointment,
      faculty: userDetails?.faculty?.name,
      level: userDetails?.level,
      role: userDetails?.role,
      unit: userDetails?.unit?.name,
      type: userDetails?.type,

      k1_full_name: userDetails?.k1_full_name,
      k1_relationship: userDetails?.k1_relationship,
      k1_phone: userDetails?.k1_phone,
      k2_full_name: userDetails?.k2_full_name,
      k2_relationship: userDetails?.k2_relationship,
      k2_phone: userDetails?.department?.k2_phone,
      spouse_full_name: userDetails?.spouse_full_name,
      spouse_current_address: userDetails?.spouse_current_address,
      spouse_phone: userDetails?.spouse_phone,
      c1_full_name: userDetails?.c1_full_name,
      c1_current_address: userDetails?.c1_current_address,
      c1_relationship: userDetails?.c1_relationship,
      c1_phone: userDetails?.c1_phone,
      c1_date_of_birth: userDetails?.c1_date_of_birth,
      c1_gender: userDetails?.c1_gender,
      c1_email: userDetails?.c1_email,
      c2_full_name: userDetails?.c2_full_name,
      c2_current_address: userDetails?.c2_current_address,
      c2_relationship: userDetails?.c2_relationship,
      c2_phone: userDetails?.c2_phone,
      c2_date_of_birth: userDetails?.c2_date_of_birth,
      c2_gender: userDetails?.c2_gender,
      c2_email: userDetails?.c2_email,
      c3_full_name: userDetails?.c3_full_name,
      c3_current_address: userDetails?.c3_current_address,
      c3_relationship: userDetails?.c3_relationship,
      c3_phone: userDetails?.c3_phone,
      c3_date_of_birth: userDetails?.c3_date_of_birth,
      c3_gender: userDetails?.c3_gender,
      c3_email: userDetails?.c3_email,
      c4_full_name: userDetails?.c4_full_name,
      c4_current_address: userDetails?.c4_current_address,
      c4_relationship: userDetails?.c4_relationship,
      c4_phone: userDetails?.c4_phone,
      c4_date_of_birth: userDetails?.c4_date_of_birth,
      c4_gender: userDetails?.c4_gender,
      c4_email: userDetails?.c4_email,
    });
    setBeneficiaries(
      userDetails?.beneficiary || [
        {
          id: "0",
          name_of_institution: "",
          qualification: "",
          start_year: "",
          end_year: "",
        },
      ]
    );
    setAcademic(userDetails?.staff_academic_qualification);

    setSelectedDivision(userDetails?.unit?.id);
    setSelectedRole(userDetails.role || "");
    setSelectedConfirm(userDetails.confirmation || "");
  }, [userDetails]);

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

  async function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true);
    console.log("Form submitted");
    const formData = new FormData();
    formData.append("staffId", id);
    formData.append("image", file);
    formData.append("first_name", formValues.firstName);
    formData.append("title", formValues.title);
    formData.append("last_name", formValues.lastName);
    formData.append("nationality", formValues.nationality);
    formData.append("state_of_origin", formValues.stateOfOrigin);
    formData.append("date_of_birth", formValues.dateOfBirth);
    formData.append("gender", formValues.gender);
    formData.append("marital_status", formValues.marital_status);
    formData.append("maiden_name", formValues.maidenName);
    formData.append("blood_group", formValues.bloodGroup);
    formData.append("birth_certificate", uploadedDocument1);
    formData.append("marriage_certificate", uploadedDocument2);
    formData.append("age", formValues.age);
    formData.append("role", formValues.selectedRole);
    formData.append("staff_number", formValues.selectedRole);
    formData.append("total_leave_due", formValues.annualLeave);
    formData.append("unit", selectedDivision.id);
    formData.append("level", userDetails?.level);
    formData.append("staff_number", formValues.staffID);
    formData.append("k1_full_name", formValues.k1_full_name);
    formData.append("k1_relationship", formValues.k1_relationship);
    formData.append("k1_phone", formValues.k1_phone);
    formData.append("k2_full_name", formValues.k2_full_name);
    formData.append("k2_phone", formValues.k2_phone);
    formData.append("beneficiaries", beneficiaries);
    formData.append("spouse_full_name", formValues.spouse_full_name);
    formData.append(
      "spouse_current_address",
      formValues.spouse_current_address
    );
    formData.append("spouse_phone", formValues.spouse_phone);
    formData.append("c1_full_name", formValues.c1_full_name);
    formData.append("c1_current_address", formValues.c1_current_address);
    formData.append("c1_current_address", formValues.c1_current_address);

    // spouse_full_name: formValues.spouse_full_name,
    // spouse_current_address: formValues.spouse_current_address,
    // spouse_phone: formValues.spouse_phone,
    // c1_full_name: formValues.c1_full_name,
    // c1_current_address: formValues.c1_current_address,
    // c1_relationship: formValues.c1_relationship,
    // c1_phone: formValues.c1_phone,
    // c1_date_of_birth: formValues.c1_date_of_birth,
    // c1_gender: formValues.c1_gender,
    // c1_email: formValues.c1_email,
    // c2_full_name: formValues.c2_full_name,
    // c2_current_address: formValues.c2_current_address,
    // c2_relationship: formValues.c2_relationship,
    // c2_phone: formValues.c2_phone,
    // c2_date_of_birth: formValues.c2_date_of_birth,
    // c2_gender: formValues.c2_gender,
    // c2_email: formValues.c2_email,
    // c3_full_name: formValues.c3_full_name,
    // c3_current_address: formValues.c3_current_address,
    // c3_relationship: formValues.c3_relationship,
    // c3_phone: formValues.c3_phone,
    // c3_date_of_birth: formValues.c3_date_of_birth,
    // c3_gender: formValues.c3_gender,
    // c3_email: formValues.c3_email,
    // c4_full_name: formValues.c4_full_name,
    // c4_current_address: formValues.c4_current_address,
    // c4_relationship: formValues.c4_relationship,
    // c4_phone: formValues.c4_phone,
    // c4_date_of_birth: formValues.c4_date_of_birth,
    // c4_gender: formValues.c2_gender,
    // c4_email: formValues.c4_email,
    // spouse_email: formValues.spouse_email

    try {
      const response = await api.updateUser({
        staffId: id,
        title: formValues.selectedTitle,
        first_name: formValues.firstName,
        last_name: formValues.lastName,
        email: formValues.email,
        staff_number: formValues.staffID,
        status: formValues.status,
        role: formValues.selectedRole,
        total_leave_due: formValues.annualLeave,
        unit: selectedDivision.id,
        maiden_name: userDetails?.maiden_name,
        type: userDetails?.type,
        conuass: userDetails?.conuass,
        conunass: userDetails?.conunass,
        level: userDetails?.level,
      });
      console.log("responce==>>>>>", response);
      enqueueSnackbar("User updated successfully", { variant: "success" });
      setIsLoading(false);
      navigate("/settings/user-list");
    } catch (error) {
      console.log(error);
      enqueueSnackbar(error.message, { variant: "error" });
      setIsLoading(false);
    }
  }
  const removeItem = (idToRemove) => {
    const updatedItems = academic.filter((item) => item.id !== idToRemove);
    setAcademic(updatedItems); // Update state with the new array
  };

  return (
    <div>
      {isLoadinge ? (
        <Box
          w={"85vw"}
          display="flex"
          flexDirection="column"
          h={"75vh"}
          alignItems="center"
          justifyContent="center"
        >
          <div
            className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-70"
            style={{ zIndex: 9999 }}
          >
            <div className="inline-block">
              <MoonLoader color={"#984779"} size={80} />
            </div>
          </div>
        </Box>
      ) : (
        <div className=" shadow  px-4 md:px-6  ">
          <div className="flex items-center mt-3">
            <p className="text-[#667185] text-[14px] md:text-[14px] xl:text-[16px] font-normal leading-[24px] ">
              Manage Staffs /
            </p>
            <Link to="/settings/user-list">
              <p className="text-[#667185] text-[14px] md:text-[14px] xl:text-[16px] font-normal leading-[24px] ">
                &nbsp; Manage Users /
              </p>
            </Link>

            <p className="text-[#000] text-[14px] md:text-[14px] xl:text-[16px] font-normal leading-[24px]  ">
              &nbsp; Edit User
            </p>
          </div>
          <p className="border-bottom mb-5 fs-4 fw-semibold ps-4 py-3">
            {" "}
            Edit User
          </p>

          <Box className="col-lg-2">
            <Box className=" h-90 w-100 d-flex align-items-center justify-content-space mb-3 mt-3">
              {userDetails.image ? (
                <Avatar
                  h={"100px"}
                  w={"100px"}
                  borderWidth={1}
                  borderColor={"#ccc"}
                  src={userDetails.image}
                />
              ) : (
                <RxAvatar size={130} color={"#25324B"} />
              )}
            </Box>
            <input className="mb-3" type="file" onChange={onFileChange} />
          </Box>

          <form onSubmit={handleSubmit}>
            <div className="row mt-4 border-bottom pb-4 pb-4">
              <div className="col-lg-4">
                <Text color="black" className="fs-5 pt-2 fw-semibold">
                  Personal Details
                </Text>
              </div>
              <div className="col-lg-6 pe-">
                <div>
                  <div class="form-group">
                    <label
                      for="exampleFormControlSelect1"
                      className="fw-semibold text-muted fs-6 mt-3 mb-2"
                    >
                      Title
                    </label>
                    <input
                      type="text"
                      style={{ height: "40px" }}
                      class="form-control rounded-0"
                      id="exampleFormControlInput1"
                      placeholder=""
                      required
                      d
                      value={formValues.title}
                      onChange={(e) =>
                        setFormValues({
                          ...formValues,
                          title: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div class="form-group">
                    <label
                      for="exampleFormControlSelect1"
                      className="fw-semibold text-muted fs-6 mt-3 mb-2"
                    >
                      First Name
                    </label>
                    <input
                      type="text"
                      style={{ height: "40px" }}
                      class="form-control rounded-0"
                      id="exampleFormControlInput1"
                      placeholder=""
                      required
                      d
                      value={formValues.firstName}
                      onChange={(e) =>
                        setFormValues({
                          ...formValues,
                          firstName: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div class="form-group">
                    <label
                      for="exampleFormControlSelect1"
                      className="fw-semibold text-muted fs-6 mt-3 mb-2"
                    >
                      Surname
                    </label>
                    <input
                      type="text"
                      style={{ height: "40px" }}
                      class="form-control rounded-0"
                      id="exampleFormControlInput1"
                      placeholder=""
                      required
                      d
                      value={formValues.lastName}
                      onChange={(e) =>
                        setFormValues({
                          ...formValues,
                          lastName: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div class="form-group">
                    <label
                      for="exampleFormControlSelect1"
                      className="fw-semibold text-muted fs-6 mt-3 mb-2"
                    >
                      Middle Name
                    </label>
                    <input
                      type="text"
                      style={{ height: "40px" }}
                      class="form-control rounded-0"
                      id="exampleFormControlInput1"
                      placeholder=""
                      required
                      d
                      value={formValues.maidenName}
                      onChange={(e) =>
                        setFormValues({
                          ...formValues,
                          maidenName: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div class="row">
                    <div className="col-lg-6">
                      <div class="form-group">
                        <label
                          for="exampleFormControlSelect1"
                          className="fw-semibold text-muted fs-6 mt-3 mb-2"
                        >
                          Nationality
                        </label>
                        <input
                          type="text"
                          style={{ height: "40px" }}
                          class="form-control rounded-0"
                          id="exampleFormControlInput1"
                          placeholder=""
                          required
                          value={formValues.nationality}
                          onChange={(e) =>
                            setFormValues({
                              ...formValues,
                              nationality: e.target.value,
                            })
                          }
                        />
                      </div>
                    </div>
                    <div className="col-lg-6">
                      <div class="form-group">
                        <label
                          for="exampleFormControlSelect1"
                          className="fw-semibold text-muted fs-6 mt-3 mb-2"
                        >
                          State of Origin
                        </label>
                        <input
                          type="text"
                          style={{ height: "40px" }}
                          class="form-control rounded-0"
                          id="exampleFormControlInput1"
                          placeholder=""
                          required
                          d
                          value={formValues.stateOfOrigin}
                          onChange={(e) =>
                            setFormValues({
                              ...formValues,
                              stateOfOrigin: e.target.value,
                            })
                          }
                        />
                      </div>
                    </div>
                  </div>

                  <div class="row">
                    <div className="col-lg-6">
                      <div class="form-group">
                        <label
                          for="exampleFormControlSelect1"
                          className="fw-semibold text-muted fs-6 mt-3 mb-2"
                        >
                          Date of Birth <sup className="text-danger">*</sup>
                        </label>
                        <input
                          className="border py-2 px-2 w-full rounded-0"
                          type="text"
                          id=""
                          required
                          d
                          value={formValues.dateOfBirth}
                          onChange={(e) =>
                            setFormValues({
                              ...formValues,
                              dateOfBirth: e.target.value,
                            })
                          }
                          //min={new Date().toISOString().split("T")[0]}
                          // Set max attribute to today's date
                        />
                      </div>
                    </div>
                    <div className="col-lg-6">
                      <div class="form-group">
                        <label
                          for="exampleFormControlSelect1"
                          className="fw-semibold text-muted fs-6 mt-3 mb-2"
                        >
                          Age
                          <sup className="text-danger">*</sup>
                        </label>
                        <input
                          className="border py-2 px-2 w-full rounded-0"
                          type="text"
                          id="dateInput"
                          required
                          //  d
                          value={formValues.age}
                          onChange={(e) =>
                            setFormValues({
                              ...formValues,
                              age: e.target.value,
                            })
                          }
                          //min={new Date().toISOString().split("T")[0]}
                          // Set max attribute to today's date
                        />
                      </div>
                    </div>
                    <div className="col-lg-6">
                      <div class="form-group">
                        <label
                          for="exampleFormControlSelect1"
                          className="fw-semibold text-muted fs-6 mt-3 mb-2"
                        >
                          Gender <sup className="text-danger">*</sup>
                        </label>
                        <select
                          className="border py-2 px-2 w-full rounded-0"
                          id="exampleFormControlSelect1"
                          value={formValues.gender}
                          required
                          d
                          onChange={(e) =>
                            setFormValues({
                              ...formValues,
                              gender: e.target.value,
                            })
                          }
                        >
                          <option value="">Select Gender</option>
                          <option value="Male">Male</option>
                          <option value="Female">Female</option>
                        </select>
                      </div>
                    </div>
                    <div className="col-lg-6">
                      <div class="form-group">
                        <label
                          for="exampleFormControlSelect1"
                          className="fw-semibold text-muted fs-6 mt-3 mb-2"
                        >
                          Blood Group <sup className="text-danger">*</sup>
                        </label>
                        <input
                          type="text"
                          style={{ height: "40px" }}
                          className="border py-2 px-2 w-full rounded-0"
                          id="O+"
                          placeholder=""
                          required
                          value={formValues.bloodGroup}
                          onChange={(e) =>
                            setFormValues({
                              ...formValues,
                              bloodGroup: e.target.value,
                            })
                          }
                        />
                      </div>
                    </div>
                    <div className="col-lg-6">
                      <div class="form-group">
                        <label
                          for="exampleFormControlSelect1"
                          className="fw-semibold text-muted fs-6 mt-3 mb-2"
                        >
                          Marital Status <sup className="text-danger">*</sup>
                        </label>
                        <select
                          className="border py-2 px-2 w-full rounded-0"
                          id="exampleFormControlSelect1"
                          value={formValues.marital_status}
                          required
                          d
                          onChange={(e) =>
                            setFormValues({
                              ...formValues,
                              marital_status: e.target.value,
                            })
                          }
                        >
                          <option value="">Select Status</option>
                          <option value="Single">Single</option>
                          <option value="Married">Married</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <div class="pb-2">
                    <div className="mb-2">
                      <label
                        style={{ marginBottom: "10px" }}
                        className="fw-semibold text-muted fs-6 mt-3 mb-2"
                      >
                        Upload Birth Certicate
                      </label>
                      <input
                        type="file"
                        className="border py-2 px-2 w-full rounded-0"
                        id={`upload_document_1`}
                        onChange={(e) => onFileChanges(e, 1)}
                      />
                      <sup className="text-danger">
                        Format accepted: Jpeg/Pdf
                      </sup>
                    </div>
                  </div>
                  {formValues.marital_status === "Married" && (
                    <div class="pb-2">
                      <div className="mb-3">
                        <label
                          style={{ marginBottom: "10px" }}
                          className="fw-semibold text-muted fs-6 mt-3 mb-2"
                        >
                          Upload Marriage Certicate
                        </label>
                        <input
                          type="file"
                          className="form-control rounded-0"
                          id={`upload_document_1`}
                          onChange={(e) => onFileChanges(e, 2)}
                        />
                        <sup className="text-danger">
                          Format accepted: Jpeg/Pdf
                        </sup>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="row mt-4 border-bottom pb-4">
              <div className="col-lg-4">
                <Text color={"black"} className="fs-5 pt-2 fw-semibold">
                  Contact Details
                </Text>
              </div>
              <div className="col-lg-6 pe-">
                <div class="row">
                  <div className="col-lg-6">
                    <div class="form-group">
                      <label
                        for="exampleFormControlSelect1"
                        className="fw-semibold text-muted fs-6 mt-3 mb-2"
                      >
                        Phone Number <sup className="text-danger">*</sup>
                      </label>
                      <input
                        type="text"
                        //style={{ height: "40px" }}
                        className="border py-2 px-2 w-full rounded-0"
                        required
                        d
                        id="exampleFormControlInput1"
                        placeholder=""
                        value={formValues.phone}
                        onChange={(e) =>
                          setFormValues({
                            ...formValues,
                            phone: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div class="form-group">
                      <label
                        for="exampleFormControlSelect1"
                        className="fw-semibold text-muted fs-6 mt-3 mb-2"
                      >
                        Email <sup className="text-danger">*</sup>
                      </label>
                      <input
                        type="email"
                        //style={{ height: "40px" }}
                        className="border py-2 px-2 w-full rounded-0"
                        id="exampleFormControlInput1"
                        d
                        required
                        value={formValues.email}
                        onChange={(e) =>
                          setFormValues({
                            ...formValues,
                            email: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>
                </div>
                <div class="form-group">
                  <label
                    for="exampleFormControlSelect1"
                    className="fw-semibold text-muted fs-6 mt-3 mb-2"
                  >
                    Current Residential Area{" "}
                    <sup className="text-danger">*</sup>
                  </label>
                  <input
                    type="text"
                    // style={{ height: "40px" }}
                    className="border py-2 px-2 w-full rounded-0"
                    id="exampleFormControlInput1"
                    placeholder=""
                    required
                    value={formValues.current_address}
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        current_address: e.target.value,
                      })
                    }
                  />
                </div>
                <div class="form-group">
                  <label
                    for="exampleFormControlSelect1"
                    className="fw-semibold text-muted fs-6 mt-3 mb-2"
                  >
                    Contact Address (Not P.O.Box)<sup>*</sup>
                  </label>
                  <input
                    type="text"
                    // style={{ height: "40px" }}
                    className="border py-2 px-2 w-full rounded-0"
                    id="exampleFormControlInput1"
                    placeholder=""
                    required
                    value={formValues.contact_address}
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        contact_address: e.target.value,
                      })
                    }
                  />
                </div>
                <div class="form-group">
                  <label
                    for="exampleFormControlSelect1"
                    className="fw-semibold text-muted fs-6 mt-3 mb-2"
                  >
                    Permanent Home Address <sup>*</sup>
                  </label>
                  <input
                    type="text"
                    //style={{ height: "40px" }}
                    className="border py-2 px-2 w-full rounded-0"
                    id="exampleFormControlInput1"
                    placeholder=""
                    value={formValues.permanent_address}
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        permanent_address: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
              <div className="col-lg-2"></div>
            </div>
            <div className="row mt-4 border-bottom pb-4">
              <div className="col-lg-4">
                <p className="fs-5 pt-2 fw-semibold">Work Contact</p>
              </div>
              <div className="col-lg-6 pe-">
                <div class="row">
                  <div className="col-lg-6">
                    <div class="form-group">
                      <label
                        for="exampleFormControlSelect1"
                        className="fw-semibold text-muted fs-6 mt-3 mb-2"
                      >
                        Date of First Appointment{" "}
                        <sup className="text-danger">*</sup>
                      </label>

                      <input
                        type="text"
                        //style={{ height: "40px" }}
                        className="border py-2 px-2 w-full rounded-0"
                        id="exampleFormControlInput1"
                        placeholder=""
                        required
                        d
                        value={formValues.date_of_first_appointment}
                        onChange={(e) =>
                          setFormValues({
                            ...formValues,
                            date_of_first_appointment: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div class="form-group">
                      <label
                        for="exampleFormControlSelect1"
                        className="fw-semibold text-muted fs-6 mt-3 mb-2"
                      >
                        Annual Leave
                        <sup className="text-danger">*</sup>
                      </label>

                      <input
                        type="text"
                        //style={{ height: "40px" }}
                        className="border py-2 px-2 w-full rounded-0"
                        id="exampleFormControlInput1"
                        placeholder=""
                        required
                        d
                        value={formValues.annualLeave}
                        onChange={(e) =>
                          setFormValues({
                            ...formValues,
                            annualLeave: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>
                </div>

                <div class="row">
                  <div className="col-lg-6">
                    <div class="form-group">
                      <label
                        for="exampleFormControlSelect1"
                        className="fw-semibold text-muted fs-6 mt-3 mb-2"
                      >
                        Staff ID
                        <sup className="text-danger">*</sup>
                      </label>

                      <input
                        type="text"
                        //style={{ height: "40px" }}
                        className="border py-2 px-2 w-full rounded-0"
                        id="exampleFormControlInput1"
                        required
                        placeholder="Staff ID"
                        value={formValues.staffID}
                        onChange={(e) =>
                          setFormValues({
                            ...formValues,
                            staffID: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div class="form-group">
                      <label
                        for="exampleFormControlSelect1"
                        className="fw-semibold text-muted fs-6 mt-3 mb-2"
                      >
                        Staff Status
                        <sup className="text-danger">*</sup>
                      </label>

                      <select
                        type="text"
                        //style={{ height: "40px" }}
                        className="border py-2 px-2 w-full rounded-0"
                        id="exampleFormControlInput1"
                        placeholder=""
                        required
                        d
                        value={selectedStatus}
                        onChange={(e) => setSelectedStatus(e.target.value)}
                      >
                        <option value="">Select Status </option>
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                      </select>
                    </div>
                  </div>
                </div>

                {formValues.type === "ASE" && formValues.role === "DEAN" && (
                  <div class="form-group">
                    <label
                      for="exampleFormControlSelect1"
                      className="fw-semibold text-muted fs-6 mt-3 mb-2"
                    >
                      Faculty
                    </label>
                    <input
                      type="text"
                      //style={{ height: "40px" }}
                      className="border py-2 px-2 w-full rounded-0"
                      id="exampleFormControlInput1"
                      placeholder=""
                      d
                      value={formValues.faculty}
                      onChange={(e) =>
                        setFormValues({
                          ...formValues,
                          facultyt: e.target.value,
                        })
                      }
                    />
                  </div>
                )}

                {formValues.type === "ASE" &&
                  (formValues.role === "HOD" ||
                    formValues.role === "RSWEP") && (
                    <div class="form-group">
                      <label
                        for="exampleInputEmail1"
                        class="form-label fs-6 fw-semibold fs-6 mt-3 mb-2"
                      >
                        Department
                      </label>
                      <input
                        type="text"
                        //style={{ height: "40px" }}
                        className="border py-2 px-2 w-full rounded-0"
                        id="exampleFormControlInput1"
                        placeholder=""
                        d
                        value={formValues.department}
                        onChange={(e) =>
                          setFormValues({
                            ...formValues,
                            department: e.target.value,
                          })
                        }
                      />
                    </div>
                  )}

                {formValues.type === "NASE" && (
                  <div class="form-group">
                    <label
                      for="exampleInputEmail1"
                      class="form-label fs-6 fw-semibold fs-6 mt-3 mb-2"
                    >
                      Unit
                    </label>
                    <select
                      type="text"
                      style={{ height: "40px" }}
                      class="form-control rounded-0"
                      id="exampleFormControlInput1"
                      placeholder=""
                      d
                      value={selectedDivision}
                      onChange={(e) => {
                        setSelectedDivision(e.target.value);
                      }}
                      // value={formValues.unit}
                      // onChange={(e) =>
                      //   setFormValues({
                      //     ...formValues,
                      //     unit: e.target.value,
                      //   })
                      // }
                    >
                      <option value="">Select Unit</option>
                      {divisionOptions.map((division) => (
                        <option key={division.id} value={division.id}>
                          {division.name}
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                <div class="row">
                  <div className="col-lg-6">
                    <div class="form-group">
                      <label
                        for="exampleFormControlSelect1"
                        className="fw-semibold text-muted fs-6 mt-3 mb-2"
                      >
                        Level
                      </label>
                      <input
                        type="text"
                        style={{ height: "40px" }}
                        class="form-control rounded-0"
                        id="exampleFormControlInput1"
                        d
                        value={formValues.level}
                        onChange={(e) =>
                          setFormValues({
                            ...formValues,
                            level: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>

                  <div className="col-lg-6">
                    <div class="form-group">
                      <label
                        for="exampleFormControlSelect1"
                        className="fw-semibold text-muted fs-6 mt-3 mb-2"
                      >
                        Designation
                      </label>
                      <select
                        type="text"
                        style={{ height: "40px" }}
                        class="form-control rounded-0"
                        id="exampleFormControlInput1"
                        d
                        // value={formValues.role}
                        // onChange={(e) =>
                        //   setFormValues({
                        //     ...formValues,
                        //     role: e.target.value,
                        //   })
                        // }
                        value={selectedRole}
                        onChange={(e) => setSelectedRole(e.target.value)}
                      >
                        <option value="">Select Role</option>
                        {roleData.map((role) => (
                          <option key={role.id} value={role.name}>
                            {role.description}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* <div className='row border-top pb-5 mt-4'> */}
            <div className="row mt-4 border-bottom pb-4 pb-4">
              <div className="col-lg-4">
                <Text color="black" className="fs-5 pt-2 fw-semibold">
                  Spouse details
                </Text>
              </div>
              <div className="col-lg-6 pe-">
                <div class="form-group">
                  <label
                    for="exampleFormControlSelect1"
                    className="fw-semibold text-muted fs-6 mt-3 mb-2"
                  >
                    Full Name
                  </label>
                  <input
                    type="text"
                    style={{ height: "40px" }}
                    class="form-control rounded-0"
                    id="exampleFormControlInput1"
                    placeholder=""
                    value={formValues.spouse_full_name}
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        spouse_full_name: e.target.value,
                      })
                    }
                  />
                </div>
                <div class="form-group">
                  <label
                    for="exampleFormControlSelect1"
                    className="fw-semibold text-muted fs-6 mt-3 mb-2"
                  >
                    Email Address
                  </label>
                  <input
                    type="text"
                    style={{ height: "40px" }}
                    class="form-control rounded-0"
                    id="exampleFormControlInput1"
                    placeholder=""
                    value={formValues.spouse_email}
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        spouse_email: e.target.value,
                      })
                    }
                  />
                </div>
                <div class="form-group">
                  <label
                    for="exampleFormControlSelect1"
                    className="fw-semibold text-muted fs-6 mt-3 mb-2"
                  >
                    Current Residential Address
                  </label>
                  <input
                    type="text"
                    style={{ height: "40px" }}
                    class="form-control rounded-0"
                    id="exampleFormControlInput1"
                    placeholder=""
                    value={formValues.spouse_current_address}
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        spouse_current_address: e.target.value,
                      })
                    }
                  />
                </div>
                <div class="row">
                  <div className="col-lg-6">
                    <div class="form-group">
                      <label
                        for="exampleFormControlSelect1"
                        className="fw-semibold text-muted fs-6 mt-3 mb-2"
                      >
                        Phone number
                      </label>
                      <input
                        type="text"
                        style={{ height: "40px" }}
                        class="form-control rounded-0"
                        id="exampleFormControlInput1"
                        placeholder=""
                        value={formValues.spouse_phone}
                        onChange={(e) =>
                          setFormValues({
                            ...formValues,
                            spouse_phone: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-2"></div>
            </div>
            <div className="row mt-4 border-bottom pb-4 pb-4">
              <div className="col-lg-4">
                <p className="fs-5 pt-2 fw-semibold">Child 1 Details</p>
              </div>
              <div className="col-lg-6 pe-">
                <div class="form-group">
                  <label
                    for="exampleFormControlSelect1"
                    className="fw-semibold text-muted fs-6 mt-3 mb-2"
                  >
                    Full name
                  </label>
                  <input
                    type="text"
                    style={{ height: "40px" }}
                    class="form-control rounded-0"
                    id="exampleFormControlInput1"
                    placeholder=""
                    value={formValues.c1_full_name}
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        c1_full_name: e.target.value,
                      })
                    }
                  />
                </div>
                <div class="form-group">
                  <label
                    for="exampleFormControlSelect1"
                    className="fw-semibold text-muted fs-6 mt-3 mb-2"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    style={{ height: "40px" }}
                    class="form-control rounded-0"
                    id="exampleFormControlInput1"
                    placeholder=""
                    value={formValues.c1_email}
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        c1_email: e.target.value,
                      })
                    }
                  />
                </div>
                <div class="form-group">
                  <label
                    for="exampleFormControlSelect1"
                    className="fw-semibold text-muted fs-6 mt-3 mb-2"
                  >
                    Current Residential Address
                  </label>
                  <input
                    type="text"
                    style={{ height: "40px" }}
                    class="form-control rounded-0"
                    id="exampleFormControlInput1"
                    placeholder=""
                    value={formValues.c1_current_address}
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        c1_current_address: e.target.value,
                      })
                    }
                  />
                </div>
                <div class="row">
                  <div className="col-lg-6">
                    <div class="form-group">
                      <label
                        for="exampleFormControlSelect1"
                        className="fw-semibold text-muted fs-6 mt-3 mb-2"
                      >
                        Phone number
                      </label>
                      <input
                        type="text"
                        style={{ height: "40px" }}
                        class="form-control rounded-0"
                        id="exampleFormControlInput1"
                        placeholder=""
                        value={formValues.c1_phone}
                        onChange={(e) =>
                          setFormValues({
                            ...formValues,
                            c1_phone: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div className="col-lg-6">
                    <div class="form-group">
                      <label
                        for="exampleFormControlSelect1"
                        className="fw-semibold text-muted fs-6 mt-3 mb-2"
                      >
                        Date of Birth
                      </label>
                      <input
                        type="text"
                        style={{ height: "40px" }}
                        class="form-control rounded-0"
                        id="exampleFormControlInput1"
                        placeholder=""
                        value={formValues.c2_date_of_birth}
                        onChange={(e) =>
                          setFormValues({
                            ...formValues,
                            c2_date_of_birth: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div class="form-group">
                      <label
                        for="exampleFormControlSelect1"
                        className="fw-semibold text-muted fs-6 mt-3 mb-2"
                      >
                        Gender
                      </label>
                      <select
                        className="form-select rounded-0"
                        id="exampleFormControlSelect1"
                        value={formValues.c1_gender}
                        onChange={(e) =>
                          setFormValues({
                            ...formValues,
                            c1_gender: e.target.value,
                          })
                        }
                      >
                        <option value="" d>
                          Select Gender
                        </option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-2"></div>
            </div>
            <div className="row mt-4 border-bottom pb-4 pb-4">
              <div className="col-lg-4">
                <p className="fs-5 pt-2 fw-semibold">Child 2 Details</p>
              </div>
              <div className="col-lg-6 pe-">
                <div class="form-group">
                  <label
                    for="exampleFormControlSelect1"
                    className="fw-semibold text-muted fs-6 mt-3 mb-2"
                  >
                    Full name
                  </label>
                  <input
                    type="text"
                    style={{ height: "40px" }}
                    class="form-control rounded-0"
                    id="exampleFormControlInput1"
                    placeholder=""
                    value={formValues.c2_full_name}
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        c2_full_name: e.target.value,
                      })
                    }
                  />
                </div>
                <div class="form-group">
                  <label
                    for="exampleFormControlSelect1"
                    className="fw-semibold text-muted fs-6 mt-3 mb-2"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    style={{ height: "40px" }}
                    class="form-control rounded-0"
                    id="exampleFormControlInput1"
                    placeholder=""
                    value={formValues.c2_email}
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        c2_email: e.target.value,
                      })
                    }
                  />
                </div>
                <div class="form-group">
                  <label
                    for="exampleFormControlSelect1"
                    className="fw-semibold text-muted fs-6 mt-3 mb-2"
                  >
                    Current Residential Address
                  </label>
                  <input
                    type="text"
                    style={{ height: "40px" }}
                    class="form-control rounded-0"
                    id="exampleFormControlInput1"
                    placeholder=""
                    value={formValues.c2_current_address}
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        c2_current_address: e.target.value,
                      })
                    }
                  />
                </div>
                <div class="row">
                  <div className="col-lg-6">
                    <div class="form-group">
                      <label
                        for="exampleFormControlSelect1"
                        className="fw-semibold text-muted fs-6 mt-3 mb-2"
                      >
                        Relationship to you
                      </label>
                      <input
                        type="text"
                        style={{ height: "40px" }}
                        class="form-control rounded-0"
                        id="exampleFormControlInput1"
                        placeholder=""
                        value={formValues.c2_relationship}
                        onChange={(e) =>
                          setFormValues({
                            ...formValues,
                            c2_relationship: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div class="form-group">
                      <label
                        for="exampleFormControlSelect1"
                        className="fw-semibold text-muted fs-6 mt-3 mb-2"
                      >
                        Phone number
                      </label>
                      <input
                        type="text"
                        style={{ height: "40px" }}
                        class="form-control rounded-0"
                        id="exampleFormControlInput1"
                        placeholder=""
                        value={formValues.c2_phone}
                        onChange={(e) =>
                          setFormValues({
                            ...formValues,
                            c2_phone: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div className="col-lg-6">
                    <div class="form-group">
                      <label
                        for="exampleFormControlSelect1"
                        className="fw-semibold text-muted fs-6 mt-3 mb-2"
                      >
                        Date of Birth
                      </label>
                      <input
                        type="text"
                        style={{ height: "40px" }}
                        class="form-control rounded-0"
                        id="exampleFormControlInput1"
                        placeholder=""
                        value={formValues.c2_date_of_birth}
                        onChange={(e) =>
                          setFormValues({
                            ...formValues,
                            c2_date_of_birth: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div class="form-group">
                      <label
                        for="exampleFormControlSelect1"
                        className="fw-semibold text-muted fs-6 mt-3 mb-2"
                      >
                        Gender
                      </label>
                      <select
                        className="form-select rounded-0"
                        id="exampleFormControlSelect1"
                        value={formValues.c2_gender}
                        onChange={(e) =>
                          setFormValues({
                            ...formValues,
                            c2_gender: e.target.value,
                          })
                        }
                      >
                        <option value="" d>
                          Select Gender
                        </option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-2"></div>
            </div>

            <div className="row mt-4 border-bottom pb-4 pb-4">
              <div className="col-lg-4">
                <p className="fs-5 pt-2 fw-semibold">Child 3 Details</p>
              </div>
              <div className="col-lg-6 pe-">
                <div class="form-group">
                  <label
                    for="exampleFormControlSelect1"
                    className="fw-semibold text-muted fs-6 mt-3 mb-2"
                  >
                    Full name
                  </label>
                  <input
                    type="text"
                    style={{ height: "40px" }}
                    class="form-control rounded-0"
                    id="exampleFormControlInput1"
                    placeholder=""
                    value={formValues.c3_full_name}
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        c3_full_name: e.target.value,
                      })
                    }
                  />
                </div>
                <div class="form-group">
                  <label
                    for="exampleFormControlSelect1"
                    className="fw-semibold text-muted fs-6 mt-3 mb-2"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    style={{ height: "40px" }}
                    class="form-control rounded-0"
                    id="exampleFormControlInput1"
                    placeholder=""
                    value={formValues.c3_email}
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        c3_email: e.target.value,
                      })
                    }
                  />
                </div>
                <div class="form-group">
                  <label
                    for="exampleFormControlSelect1"
                    className="fw-semibold text-muted fs-6 mt-3 mb-2"
                  >
                    Current Residential Address
                  </label>
                  <input
                    type="text"
                    style={{ height: "40px" }}
                    class="form-control rounded-0"
                    id="exampleFormControlInput1"
                    placeholder=""
                    value={formValues.c3_current_address}
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        c3_current_address: e.target.value,
                      })
                    }
                  />
                </div>
                <div class="row">
                  <div className="col-lg-6">
                    <div class="form-group">
                      <label
                        for="exampleFormControlSelect1"
                        className="fw-semibold text-muted fs-6 mt-3 mb-2"
                      >
                        Relationship to you
                      </label>
                      <input
                        type="text"
                        style={{ height: "40px" }}
                        class="form-control rounded-0"
                        id="exampleFormControlInput1"
                        placeholder=""
                        value={formValues.c3_relationship}
                        onChange={(e) =>
                          setFormValues({
                            ...formValues,
                            c3_relationship: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div class="form-group">
                      <label
                        for="exampleFormControlSelect1"
                        className="fw-semibold text-muted fs-6 mt-3 mb-2"
                      >
                        Phone number
                      </label>
                      <input
                        type="text"
                        style={{ height: "40px" }}
                        class="form-control rounded-0"
                        id="exampleFormControlInput1"
                        placeholder=""
                        value={formValues.c3_phone}
                        onChange={(e) =>
                          setFormValues({
                            ...formValues,
                            c3_phone: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div className="col-lg-6">
                    <div class="form-group">
                      <label
                        for="exampleFormControlSelect1"
                        className="fw-semibold text-muted fs-6 mt-3 mb-2"
                      >
                        Date of Birth
                      </label>

                      <input
                        type="date"
                        style={{ height: "40px" }}
                        class="form-control rounded-0"
                        id="exampleFormControlInput1"
                        placeholder=""
                        value={formValues.c3_date_of_birth}
                        onChange={(e) =>
                          setFormValues({
                            ...formValues,
                            c3_date_of_birth: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div class="form-group">
                      <label
                        for="exampleFormControlSelect1"
                        className="fw-semibold text-muted fs-6 mt-3 mb-2"
                      >
                        Gender
                      </label>
                      <select
                        className="form-select rounded-0"
                        id="exampleFormControlSelect1"
                        value={formValues.c3_gender}
                        onChange={(e) =>
                          setFormValues({
                            ...formValues,
                            c3_gender: e.target.value,
                          })
                        }
                      >
                        <option value="" d>
                          Select Gender
                        </option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="row mt-4 border-bottom pb-4 pb-4">
              <div className="col-lg-4">
                <p className="fs-5 pt-2 fw-semibold">Child 4 Details</p>
              </div>
              <div className="col-lg-6 pe-">
                <div class="form-group">
                  <label
                    for="exampleFormControlSelect1"
                    className="fw-semibold text-muted fs-6 mt-3 mb-2"
                  >
                    Full name
                  </label>
                  <input
                    type="text"
                    style={{ height: "40px" }}
                    class="form-control rounded-0"
                    id="exampleFormControlInput1"
                    placeholder=""
                    value={formValues.c4_full_name}
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        c4_full_name: e.target.value,
                      })
                    }
                  />
                </div>
                <div class="form-group">
                  <label
                    for="exampleFormControlSelect1"
                    className="fw-semibold text-muted fs-6 mt-3 mb-2"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    style={{ height: "40px" }}
                    class="form-control rounded-0"
                    id="exampleFormControlInput1"
                    placeholder=""
                    value={formValues.c4_email}
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        c4_email: e.target.value,
                      })
                    }
                  />
                </div>
                <div class="form-group">
                  <label
                    for="exampleFormControlSelect1"
                    className="fw-semibold text-muted fs-6 mt-3 mb-2"
                  >
                    Current Residential Address
                  </label>
                  <input
                    type="text"
                    style={{ height: "40px" }}
                    class="form-control rounded-0"
                    id="exampleFormControlInput1"
                    placeholder=""
                    value={formValues.c4_current_address}
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        c4_current_address: e.target.value,
                      })
                    }
                  />
                </div>
                <div class="row">
                  <div className="col-lg-6">
                    <div class="form-group">
                      <label
                        for="exampleFormControlSelect1"
                        className="fw-semibold text-muted fs-6 mt-3 mb-2"
                      >
                        Relationship to you
                      </label>
                      <input
                        type="text"
                        style={{ height: "40px" }}
                        class="form-control rounded-0"
                        id="exampleFormControlInput1"
                        placeholder=""
                        value={formValues.c4_relationship}
                        onChange={(e) =>
                          setFormValues({
                            ...formValues,
                            c4_relationship: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div class="form-group">
                      <label
                        for="exampleFormControlSelect1"
                        className="fw-semibold text-muted fs-6 mt-3 mb-2"
                      >
                        Phone number
                      </label>
                      <input
                        type="text"
                        style={{ height: "40px" }}
                        class="form-control rounded-0"
                        id="exampleFormControlInput1"
                        placeholder=""
                        value={formValues.c4_phone}
                        onChange={(e) =>
                          setFormValues({
                            ...formValues,
                            c4_phone: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div className="col-lg-6">
                    <div class="form-group">
                      <label
                        for="exampleFormControlSelect1"
                        className="fw-semibold text-muted fs-6 mt-3 mb-2"
                      >
                        Date of Birth
                      </label>

                      <input
                        type="date"
                        style={{ height: "40px" }}
                        class="form-control rounded-0"
                        id="exampleFormControlInput1"
                        placeholder=""
                        value={formValues.c4_date_of_birth}
                        onChange={(e) =>
                          setFormValues({
                            ...formValues,
                            c4_date_of_birth: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div class="form-group">
                      <label
                        for="exampleFormControlSelect1"
                        className="fw-semibold text-muted fs-6 mt-3 mb-2"
                      >
                        Gender
                      </label>
                      <select
                        className="form-select rounded-0"
                        id="exampleFormControlSelect1"
                        value={formValues.c4_gender}
                        onChange={(e) =>
                          setFormValues({
                            ...formValues,
                            c4_gender: e.target.value,
                          })
                        }
                      >
                        <option value="" d>
                          Select Gender
                        </option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="row mt-4 pb-4 pb-4">
              <div className="col-lg-4">
                <Text color={"black"} className="fs-5 pt-2 fw-semibold">
                  Next of Kin 1
                </Text>
              </div>
              <div className="col-lg-6 pe-">
                <div class="form-group">
                  <label
                    for="exampleFormControlSelect1"
                    className="fw-semibold text-muted fs-6 mt-3 mb-2"
                  >
                    Full Name <sup className="text-danger">*</sup>
                  </label>
                  <input
                    type="text"
                    style={{ height: "40px" }}
                    class="form-control rounded-0"
                    id="exampleFormControlInput1"
                    placeholder=""
                    value={formValues.k1_full_name}
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        k1_full_name: e.target.value,
                      })
                    }
                  />
                </div>
                <div class="row">
                  <div className="col-lg-6">
                    <div class="form-group">
                      <label
                        for="exampleFormControlSelect1"
                        className="fw-semibold text-muted fs-6 mt-3 mb-2"
                      >
                        Relationship to you <sup className="text-danger">*</sup>
                      </label>
                      <input
                        type="text"
                        style={{ height: "40px" }}
                        class="form-control rounded-0"
                        id="exampleFormControlInput1"
                        placeholder=""
                        value={formValues.k1_relationship}
                        onChange={(e) =>
                          setFormValues({
                            ...formValues,
                            k1_relationship: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div class="form-group">
                      <label
                        for="exampleFormControlSelect1"
                        className="fw-semibold text-muted fs-6 mt-3 mb-2"
                      >
                        Phone Number<sup className="text-danger">*</sup>
                      </label>
                      <input
                        type="text"
                        style={{ height: "40px" }}
                        class="form-control rounded-0"
                        id="exampleFormControlInput1"
                        placeholder=""
                        value={formValues.k1_phone}
                        onChange={(e) =>
                          setFormValues({
                            ...formValues,
                            k1_phone: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-2"></div>
            </div>
            <div className="row mt-4 pb-4  border-bottom">
              <div className="col-lg-4">
                <p className="fs-5 pt-2 fw-semibold">Next of Kin 2</p>
              </div>
              <div className="col-lg-6 pe-">
                <div class="form-group">
                  <label
                    for="exampleFormControlSelect1"
                    className="fw-semibold text-muted fs-6 mt-3 mb-2"
                  >
                    Full Name <sup className="text-danger">*</sup>
                  </label>
                  <input
                    type="text"
                    style={{ height: "40px" }}
                    class="form-control rounded-0"
                    id="exampleFormControlInput1"
                    placeholder=""
                    value={formValues.k2_full_name}
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        k2_full_name: e.target.value,
                      })
                    }
                  />
                </div>
                <div class="row">
                  <div className="col-lg-6">
                    <div class="form-group">
                      <label
                        for="exampleFormControlSelect1"
                        className="fw-semibold text-muted fs-6 mt-3 mb-2"
                      >
                        Relationship to you <sup className="text-danger">*</sup>
                      </label>
                      <input
                        type="text"
                        style={{ height: "40px" }}
                        class="form-control rounded-0"
                        id="exampleFormControlInput1"
                        placeholder=""
                        value={formValues.k2_relationship}
                        onChange={(e) =>
                          setFormValues({
                            ...formValues,
                            k2_relationship: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div class="form-group">
                      <label
                        for="exampleFormControlSelect1"
                        className="fw-semibold text-muted fs-6 mt-3 mb-2"
                      >
                        Phone Number<sup className="text-danger">*</sup>
                      </label>
                      <input
                        type="text"
                        style={{ height: "40px" }}
                        class="form-control rounded-0"
                        id="exampleFormControlInput1"
                        placeholder=""
                        value={formValues.k2_phone}
                        onChange={(e) =>
                          setFormValues({
                            ...formValues,
                            k2_phone: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className=""></div>
            </div>
            <div className="flex gap-[24px]">
              <div className="w-full md:w-[40%] pt-4">
                <p className="fw-semibold fs-5">Beneficiary</p>
                <p className="text-muted fs-6" style={{ marginTop: "-10px" }}>
                  In situation of Death, my benefits should be paid in favour of
                  :
                </p>
              </div>
              <div className="w-full md:w-[60%] mt-4 pb-4">
                {beneficiaries.map((beneficiary, index) => (
                  <div key={index} style={{ marginBottom: "10px" }}>
                    <div className=" pe-">
                      <div class="form-group">
                        <label
                          for="exampleFormControlSelect1"
                          className="fw-semibold text-muted fs-6 mt-3 mb-2"
                        >
                          Full Name <sup className="text-danger">*</sup>
                        </label>
                        <input
                          type="text"
                          style={{ height: "40px" }}
                          class="form-control rounded-0"
                          id="exampleFormControlInput1"
                          name="full_name"
                          placeholder="Name"
                          value={beneficiary.full_name}
                          onChange={(event) => handleChange(index, event)}
                        />
                      </div>
                      <div class="row">
                        <div className="col-lg-6">
                          <div class="form-group">
                            <label
                              for="exampleFormControlSelect1"
                              className="fw-semibold text-muted fs-6 mt-3 mb-2"
                            >
                              Email <sup className="text-danger">*</sup>
                            </label>
                            <input
                              type="text"
                              style={{ height: "40px" }}
                              class="form-control rounded-0"
                              id="exampleFormControlInput1"
                              name="email"
                              placeholder="@gmail.com"
                              value={beneficiary.email}
                              onChange={(event) => handleChange(index, event)}
                            />
                          </div>
                        </div>
                        <div className="col-lg-6">
                          <div class="form-group">
                            <label
                              for="exampleFormControlSelect1"
                              className="fw-semibold text-muted fs-6 mt-3 mb-2"
                            >
                              Phone Number<sup className="text-danger">*</sup>
                            </label>
                            <input
                              type="text"
                              style={{ height: "40px" }}
                              class="form-control rounded-0"
                              id="exampleFormControlInput1"
                              name="phone"
                              placeholder="phone"
                              value={beneficiary.phone}
                              onChange={(event) => handleChange(index, event)}
                            />
                          </div>
                        </div>
                      </div>
                      <div class="row">
                        <div className="col-lg-6">
                          <div class="form-group">
                            <label
                              for="exampleFormControlSelect1"
                              className="fw-semibold text-muted fs-6 mt-3 mb-2"
                            >
                              Relationship to you{" "}
                              <sup className="text-danger">*</sup>
                            </label>
                            <input
                              type="text"
                              style={{ height: "40px" }}
                              class="form-control rounded-0"
                              id="exampleFormControlInput1"
                              name="relationship"
                              placeholder="Brother"
                              value={beneficiary.relation}
                              onChange={(event) => handleChange(index, event)}
                            />
                          </div>
                        </div>
                        <div className="col-lg-6">
                          <div class="form-group">
                            <label
                              for="exampleFormControlSelect1"
                              className="fw-semibold text-muted fs-6 mt-3 mb-2"
                            >
                              Percent<sup className="text-danger">*</sup>
                            </label>
                            <input
                              type="text"
                              style={{ height: "40px" }}
                              class="form-control rounded-0"
                              id="exampleFormControlInput1"
                              name="percentage"
                              placeholder="20"
                              value={beneficiary.percentage}
                              onChange={(event) => handleChange(index, event)}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                <button
                  type="button"
                  className="btn py-2 px-4 me-2  text-white rounded-0"
                  style={{ backgroundColor: "#984779" }}
                  onClick={handleAddBeneficiary}
                >
                  {beneficiaries?.length === 0
                    ? "Add First Beneficiary"
                    : "Add More Beneficiary"}
                </button>
                <div className="col-lg-2"></div>
              </div>
            </div>
            <div className="row mt-4 border-bottom pb-4">
              <div className="col-lg-4">
                <Text color={"black"} className="fs-5 pt-2 fw-semibold">
                  Academic Qualification
                </Text>
              </div>
              <div className="col-lg-6 pe-">
                {academic?.map((acad, index) => (
                  <>
                    <div class="form-group">
                      <label
                        for="exampleFormControlSelect1"
                        className="fw-semibold text-muted fs-6 mt-3 mb-2 flex justify-between"
                      >
                        Name of institution
                        {acad.id > 0 && (
                          <button onClick={() => removeItem(acad.id)}>
                            <Trash size={15} />
                          </button>
                        )}
                      </label>
                      <input
                        type="text"
                        style={{ height: "40px" }}
                        class="form-control rounded-0"
                        id="exampleFormControlInput1"
                        placeholder=""
                        required
                        name="name_of_institution"
                        value={acad.name_of_institution}
                        onChange={(event) => handleAcademicChange(index, event)}
                      />
                    </div>
                    <div class="form-group">
                      <label
                        for="exampleFormControlSelect1"
                        className="fw-semibold text-muted fs-6 mt-3 mb-2"
                      >
                        Degree
                      </label>
                      <input
                        type="text"
                        style={{ height: "40px" }}
                        class="form-control rounded-0"
                        id="exampleFormControlInput1"
                        placeholder=""
                        name="qualification"
                        value={acad.qualification}
                        onChange={(event) => handleAcademicChange(index, event)}
                      />
                    </div>
                    <div className="flex flex-col md:flex-row justify-between">
                      <div class="form-group">
                        <label
                          for="exampleFormControlSelect1"
                          className="fw-semibold text-muted fs-6 mt-3 mb-2"
                        >
                          Start Year
                        </label>
                        <input
                          type="date"
                          style={{ height: "40px" }}
                          class="form-control rounded-0"
                          id="exampleFormControlInput1"
                          placeholder=""
                          name="start_year"
                          value={acad.start_year}
                          onChange={(event) =>
                            handleAcademicChange(index, event)
                          }
                        />
                      </div>
                      <div class="form-group">
                        <label
                          for="exampleFormControlSelect1"
                          className="fw-semibold text-muted fs-6 mt-3 mb-2"
                        >
                          End Year
                        </label>
                        <input
                          type="date"
                          style={{ height: "40px" }}
                          class="form-control rounded-0"
                          id="exampleFormControlInput1"
                          placeholder=""
                          name="end_year"
                          value={acad.end_year}
                          onChange={(event) =>
                            handleAcademicChange(index, event)
                          }
                        />
                      </div>
                    </div>
                  </>
                ))}

                <button
                  type="button"
                  className="btn py-1 px-4 mt-4  mb-2 text-white rounded-md"
                  style={{ backgroundColor: "#17082d" }}
                  onClick={handleAcademic}
                >
                  Add More Qualification
                </button>
              </div>
            </div>

            {/* </div> */}

            {/* <div className='row border-top pb-5 mt-4'> */}
            <div className="col-lg-12 py-5 d-flex justify-content-end">
              <div>
                <button
                  className="btn py-2 px-4 me-2  text-white rounded-0"
                  style={{ backgroundColor: "#984779" }}
                  d={isLoading}
                  type="submit"
                >
                  {isLoading ? (
                    <MoonLoader color={"white"} size={20} />
                  ) : (
                    <>Submit</>
                  )}
                </button>
              </div>
            </div>
            {/* </div> */}
          </form>

          {/* <div className="px-4">
            <form onSubmit={handleSubmit}>
              <div className="my-5 form-group row">
                <label
                  htmlFor="staffType"
                  className="fs-5 fw-semibold col-md-2 col-form-label"
                >
                  Title <sup className="text-danger">*</sup>
                </label>
                <div className="col-sm-8 d-flex gap-4">
                  <select
                    id="staffType"
                    value={formValues.selectedTitle}
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        selectedTitle: e.target.value,
                      })
                    }
                    className="form-control rounded-0"
                    style={{ height: "60px" }}
                  >
                    <option value="">Select Title</option>
                    <option value="Mr">Mr</option>
                    <option value="Mrs">Mrs</option>
                  </select>
                </div>
              </div>
              <div className="my-5 form-group row">
                <label
                  for="first name"
                  className=" fs-5 fw-semibold col-md-2 col-form-label"
                >
                  First Name <sup className="text-danger">*</sup>
                </label>
                <div className="col-md-8">
                  <input
                    style={{ height: "60px" }}
                    type="text"
                    className="form-control rounded-0"
                    placeholder="First Name"
                    value={formValues.firstName}
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        firstName: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
              <div className="my-5 form-group row">
                <label
                  for="inputPassword"
                  className=" fs-5 fw-semibold col-md-2 col-form-label"
                >
                  Last Name <sup className="text-danger">*</sup>
                </label>
                <div className="col-md-8">
                  <input
                    style={{ height: "60px" }}
                    type="text"
                    className="form-control rounded-0"
                    placeholder="Last Name"
                    value={formValues.lastName}
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        lastName: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
              <div className="my-5 form-group row">
                <label
                  for="email"
                  className=" fs-5 fw-semibold col-md-2 col-form-label"
                >
                  Email Address<sup className="text-danger">*</sup>
                </label>
                <div className="col-md-8">
                  <input
                    style={{ height: "60px" }}
                    type="email"
                    className="form-control rounded-0"
                    placeholder="Email Address"
                    value={formValues.email}
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        email: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
              <div className="my-5 form-group row">
                <label
                  for="staffid"
                  className=" fs-5 fw-semibold col-md-2 col-form-label"
                >
                  Staff ID<sup className="text-danger">*</sup>
                </label>
                <div className="col-md-8">
                  <input
                    style={{ height: "60px" }}
                    type="text"
                    className="form-control rounded-0"
                    placeholder="Staff ID"
                    value={formValues.staffID}
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        staffID: e.target.value,
                      })
                    }
                  />
                </div>
              </div>

              <div className="my-5 form-group row">
                <label
                  for="inputPassword"
                  className=" fs-5 fw-semibold col-md-2 col-form-label"
                >
                  Status <sup className="text-danger">*</sup>
                </label>
                <div className="col-sm-8 d-flex gap-4">
                  <select
                    id="status"
                    value={selectedStatus}
                    onChange={(e) => setSelectedStatus(e.target.value)}
                    className="form-control rounded-0"
                    style={{ height: "60px" }}
                  >
                    <option value="">Select Status </option>
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>
              </div>

              <div className="my-5 form-group row">
                <label
                  for="inputPassword"
                  className=" fs-5 fw-semibold col-md-2 col-form-label"
                >
                  Role <sup className="text-danger">*</sup>
                </label>
                <div className="col-sm-8 d-flex gap-4">
                  <select
                    id="role"
                    value={selectedRole}
                    onChange={(e) => setSelectedRole(e.target.value)}
                    className="form-control rounded-0"
                    style={{ height: "60px" }}
                  >
                    <option value="">Select Role</option>
                    {roleData.map((role) => (
                      <option key={role.id} value={role.name}>
                        {role.description}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="my-5 form-group row">
                <label
                  for="email"
                  className=" fs-5 fw-semibold col-md-2 col-form-label"
                >
                  Unit/Division<sup className="text-danger">*</sup>
                </label>
                <div className="col-md-8">
                  <select
                    id="division"
                    value={selectedDivision}
                    onChange={(e) => {
                      setSelectedDivision(e.target.value);
                    }}
                    className="border rounded-0"
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

              <div className="my-5 form-group row">
                <label
                  for="inputPassword"
                  className=" fs-5 fw-semibold col-md-2 col-form-label"
                >
                  Entitled Annual leave<sup className="text-danger">*</sup>
                </label>
                <div className="col-sm-8 d-flex gap-4">
                  <div className="col-md-8">
                    <input
                      style={{ height: "60px" }}
                      type="text"
                      className="form-control rounded-0"
                      placeholder="First Name"
                      value={formValues.annualLeave}
                      onChange={(e) =>
                        setFormValues({
                          ...formValues,
                          annualLeave: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>
              </div>

              <div className="my-5 form-group row">
                <label
                  htmlFor="staffType"
                  className="fs-5 fw-semibold col-md-2 col-form-label"
                >
                  Confirmation<sup className="text-danger">*</sup>
                </label>
                <div className="col-sm-8 d-flex gap-4">
                  <select
                    id="staffType"
                    value={selectedConfirm}
                    onChange={(e) => setSelectedConfirm(e.target.value)}
                    className="form-control rounded-0"
                    style={{ height: "60px" }}
                  >
                    <option value="">Choose an option</option>
                    <option value="confirmed">Confirmed</option>
                    <option value="pending">Pending</option>
                  </select>
                </div>
              </div>

              <div className="my-5 form-group row">
                <label
                  for="inputPassword"
                  className=" fs-5 fw-semibold col-sm-2 col-form-label"
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
                        Update User
                      </div>
                    )}
                  </button>
                </div>
              </div>
            </form>
          </div> */}
        </div>
      )}
    </div>
  );
};

export default EditUser;

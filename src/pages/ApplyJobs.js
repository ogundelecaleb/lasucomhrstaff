import {
  Box,
  Button,
  Flex,
  FormControl,
  Image,
  Input,
  Radio,
  Text,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import React, { useEffect, useRef, useState } from "react";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import logo from "../asset/logo(small).svg";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import api from "../api";
import { setUserData } from "../utils/utils";
import { useSnackbar } from "notistack";
import { ClipLoader, MoonLoader } from "react-spinners";
import JobCard from "./adminpages/jobpenings/JobCard";
import { NumericFormat } from "react-number-format";

const ApplyJob = () => {
  const { enqueueSnackbar } = useSnackbar();
  const location = useLocation();
  const { job } = location.state;
  const [jobListings, setJobListings] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isApply, setIsApply] = useState(false);
  const [jobId, setJobId] = useState("");
  const [formValues, setFormValues] = useState({
    name: "",

    email: "",
    nationality: "",
    stateOfOrigin: "",
    dateOfBirth: "",
    gender: "",
    marital_status: "",
    image: "",
    permanent_address: "",
    current_postal_address: "",
    number_of_children: "",
    academic_qualifications: "",
    statement_of_experience: "",
    hobbies: "",
    skills: "",
    reference_phone: "",
    resume_file: "",
    reference_address: "",
    academic_file: "",
    birth_certificate: "",
  });
  const [reference, setReference] = useState([{ name: "", contact: "" }]);
  const [academic, setAcademic] = useState([
    { institution: "", degree: "", startDate: "", endDate: "", course: "" },
  ]);
  const [professional, setProfessional] = useState([
    { institution: "", certificate: "", startDate: "", endDate: ""},
  ]);
  const [journal, setJournal] = useState([
    { title: "", certificate: "", year: "", author: ""},
  ]);

  const [experience, setExperience] = useState([
    { company: "", role: "", startDate: "", endDate: ""},
  ]);

  const handleAddReference = () => {
    if (reference?.length >= 4) {
      enqueueSnackbar("Maximum number of beneficiaries reached", {
        variant: "warning",
      });
      return;
    }
    console.log("beneficiaries?.length", reference?.length);
    setReference([...reference, { name: "", contact: "" }]);
  };
  const handleAcademic = () => {
    setAcademic([
      ...academic,
      { institution: "", degree: "", startDate: "", endDate: "", course: "" },
    ]);
  };
  const handleProffesional = () => {
    setProfessional([
      ...professional,
      { institution: "", certicate: "", startDate: "", endDate: "" },
    ]);
  };
  const handleJournal = () => {
    setJournal([
      ...journal,
      { title: "", certificate: "", year: "", author: ""},
    ]);
  };
  const handleExperience = () => {
    setExperience([
      ...experience,
      { company: "", role: "", startDate: "", endDate: ""},
    ]);
  };

  const handleChange = (index, event) => {
    const { name, value } = event.target;
    const newReference = [...reference];
    newReference[index][name] = value;
    setReference(newReference);
  };
  const handleAcademicChange = (index, event) => {
    const { name, value } = event.target;
    const newAcademic = [...academic];
    newAcademic[index][name] = value;
    setAcademic(newAcademic);
  };
  const handleProfessionalChange = (index, event) => {
    const { name, value } = event.target;
    const newProfessional = [...professional];
    newProfessional[index][name] = value;
    setProfessional(newProfessional);
  };
  const handleJounalChange = (index, event) => {
    const { name, value } = event.target;
    const newJournal = [...journal];
    newJournal[index][name] = value;
    setJournal(newJournal);
  };
  const handleExperienceChange = (index, event) => {
    const { name, value } = event.target;
    const newExperience = [...experience];
    newExperience[index][name] = value;
    setExperience(newExperience);
  };

  useEffect(() => {
    if (jobListings) {
      fetchJobDetails();
    }
    checkJobExpire("2024-08-23");
  }, []);

  async function fetchJobDetails() {
    try {
      setIsLoading(true);
      const response = await api.fetchJobs();
      console.log("User Details:", response);
      setJobListings(response.data);
    } catch (error) {
      console.error(error.message, error);
      enqueueSnackbar(error.message, { variant: "error" });
    } finally {
      setIsLoading(false);
    }
  }

  async function handleSubmit(e) {
    setIsLoading(true);
    if (!formValues.resume_file) {
      enqueueSnackbar("Please upload your resume", { variant: "error" });
      setIsLoading(false);
      return;
    }
    const formData = new FormData();

    formData.append("job_id", job?.id);
    formData.append("name", formValues.name);
    formData.append("email", formValues.email);
    formData.append("last_name", formValues.lastName);
    formData.append("nationality", formValues.nationality);
    formData.append("state_of_origin", formValues.stateOfOrigin);
    formData.append("date_of_birth", formValues.dateOfBirth);
    formData.append("permanent_address", formValues.permanent_address);
    formData.append("marital_status", formValues.marital_status);
    formData.append(
      "current_postal_address",
      formValues.current_postal_address
    );
    formData.append(
      "academic_qualifications",
      formValues.academic_qualifications
    );
    formData.append("number_of_children", formValues.number_of_children);
    formData.append(
      "statement_of_experience",
      formValues.statement_of_experience
    );
    formData.append("hobbies", formValues.hobbies);
    formData.append("skills", formValues.skills);
    formData.append("references", JSON.stringify(reference));
    formData.append("journal_publication", JSON.stringify(journal));
    formData.append("experience", JSON.stringify(experience));
    formData.append("professional_qualification", JSON.stringify(professional));
    formData.append("academic_qualification", JSON.stringify(academic));
    formData.append("reference_address", formValues.reference_address);
    formData.append("resume_file", formValues.resume_file);
    formData.append("birth_certificate", formValues.birth_certificate);
    formData.append("academic_file", formValues.academic_file);
    try {
      const response = await api.applyJob(formData);
      console.log("Response: ", response);
      enqueueSnackbar("Application Submited successfully", {
        variant: "success",
      });
      setIsLoading(false);
      setJobId("");
      setFormValues({
        name: "",

        email: "",
        nationality: "",
        stateOfOrigin: "",
        dateOfBirth: "",
        gender: "",
        marital_status: "",
        image: "",
        permanent_address: "",
        current_postal_address: "",
        number_of_children: "",
        academic_qualifications: "",
        statement_of_experience: "",
        hobbies: "",
        skills: "",
        reference_phone: "",
        resume_file: "",
        reference_address: "",
      });
    } catch (error) {
      console.error(error);
      enqueueSnackbar(error.message, { variant: "error" });
      setIsLoading(false);
    }
  }

  function checkJobExpire(date) {
    // Parse the date strings into Date objects
    const expDate = new Date(date);
    const currentDate = new Date();

    // Calculate the difference in date
    const diffTime = Math.floor(expDate - currentDate);

    // Convert the difference into milliseconds and then into days
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    //console.log("diff in days===>>>", diffDays);

    if (diffDays < 0) return true;
  }

  return (
    <div>
      <div className="flex items-center py-2 px-4 md:px-[40px] xl:px-[80px] md:py-3 bg-slate-100 border-b border-gray-100">
        <img
          className="h-[40px] w-[40px] md:h-[60px] md:w-[60px]"
          src={logo}
          alt="logo"
        />
        <div className="flex-1">
          {" "}
          <h2 className="text-[20px] md:text-[24px] xl:text-[28px] text-center font-bold leading-[35px] text-[#17082D] mb-[10px] md:mb-[20px] ">
            Lagos State University College of Medicine
          </h2>
          <h2 className="text-[16px] md:text-[20px]  text-center font-semibold  text-[#984779] ">
            Job Listing
          </h2>
        </div>
      </div>

      <div className=" py-2 px-4 md:px-[40px] xl:px-[80px] md:py-3">
        <div className=" mx-auto  py-[11px] px-[10px]  md:px-[16px] w-full max-w-[560px]">
          <div className="flex items-center gap-1  mb-2">
            <h5 className="card-title">Position: </h5>{" "}
            <h5 className="card-title"> {job.title}</h5>
          </div>

          <div className="flex  gap-1 mb-2 ">
            <h5 className="text-[#000] text-[16px] font-semibold leading-[24px] mb-0 ">
              Requirement:{" "}
            </h5>{" "}
            <p className="mb-0"> {job.requirements}</p>
          </div>

          <div className="flex  gap-1 mb-2 ">
            <h5 className="text-[#000] text-[16px] font-semibold leading-[24px] mb-0 whitespace-nowrap">
              Job description:{" "}
            </h5>{" "}
            <p className="mb-0"> {job.description}</p>
          </div>
          <div className="flex  gap-1 mb-2 ">
            <h5 className="text-[#000] text-[16px] font-semibold leading-[24px] mb-0 whitespace-nowrap">
              Salary Expectation:{" "}
            </h5>{" "}
            <p className="mb-0">
              {" "}
              <NumericFormat
                value={job?.salary}
                displayType={"text"}
                thousandSeparator={true}
                prefix={"₦"}
                decimalScale={2}
                fixedDecimalScale={true}
                renderText={(value) => <p className="mb-0">{value}</p>}
              />
            </p>{" "}
          </div>
          <div className="flex  gap-1 mb-2 ">
            <h5 className="text-[#000] text-[16px] font-semibold leading-[24px] mb-0 whitespace-nowrap">
              Closing:{" "}
            </h5>{" "}
            <p className="mb-0">
              {checkJobExpire(job.closing_date) ? "Closed" : job.closing_date}
            </p>
          </div>

          <div className="mt-5">
            <div className="mb-[16px]">
              <label className="text-[14px] text-[#667185] leading-[20px]   mb-[8px] ">
                Name <sup className="text-red-500 ">*</sup>
              </label>
              <div className=" relative    flex items-center">
                <input
                  type="text"
                  placeholder=""
                  className="w-full h-[48px]  px-[8px]  py-[8px] text-[14px] text-[#344054] leading-[20px]  placeholder:text-[#98A2B3] placeholder:text-[12px]  border-[#D0D5DD] border-[0.2px] rounded-[8px] focus:outline-none focus:ring-[#17082d] focus:border-[#17082d] "
                  required
                  autoComplete="on"
                  name="full-name"
                  value={formValues.name}
                  onChange={(e) =>
                    setFormValues({
                      ...formValues,
                      name: e.target.value,
                    })
                  }
                  autoCapitalize="off"
                  autoCorrect="off"
                  spellCheck="false"
                />
              </div>
            </div>
            <div className="mb-[16px]">
              <label className="text-[14px] text-[#667185] leading-[20px]   mb-[8px]  ">
                Date of Birth <sup className="text-red-500 ">*</sup>
              </label>
              <div className=" relative    flex items-center">
                <input
                  type="date"
                  placeholder=""
                  className="w-full h-[48px]  px-[8px]  py-[8px] text-[14px] text-[#344054] leading-[20px]  placeholder:text-[#98A2B3] placeholder:text-[12px]  border-[#D0D5DD] border-[0.2px] rounded-[8px] focus:outline-none focus:ring-[#17082d] focus:border-[#17082d] "
                  required
                  autoComplete="on"
                  name="full-name"
                  value={formValues.dateOfBirth}
                  onChange={(e) =>
                    setFormValues({
                      ...formValues,
                      dateOfBirth: e.target.value,
                    })
                  }
                  autoCapitalize="off"
                  autoCorrect="off"
                  spellCheck="false"
                />
              </div>
            </div>
            <div className="mb-[16px]">
              <label className="text-[14px] text-[#667185] leading-[20px]   mb-[8px]  ">
                email <sup className="text-red-500 ">*</sup>
              </label>
              <div className=" relative    flex items-center">
                <input
                  type="email"
                  placeholder=""
                  className="w-full h-[48px]  px-[8px]  py-[8px] text-[14px] text-[#344054] leading-[20px]  placeholder:text-[#98A2B3] placeholder:text-[12px]  border-[#D0D5DD] border-[0.2px] rounded-[8px] focus:outline-none focus:ring-[#17082d] focus:border-[#17082d] "
                  required
                  autoComplete="on"
                  name="full-name"
                  value={formValues.email}
                  onChange={(e) =>
                    setFormValues({
                      ...formValues,
                      email: e.target.value,
                    })
                  }
                  autoCapitalize="off"
                  autoCorrect="off"
                  spellCheck="false"
                />
              </div>
            </div>
            <div className="mb-[16px]">
              <label className="text-[14px] text-[#667185] leading-[20px]   mb-[8px]  ">
                State of Origin <sup className="text-red-500 ">*</sup>
              </label>
              <div className=" relative    flex items-center">
                <input
                  type="text"
                  placeholder=""
                  className="w-full h-[48px]  px-[8px]  py-[8px] text-[14px] text-[#344054] leading-[20px]  placeholder:text-[#98A2B3] placeholder:text-[12px]  border-[#D0D5DD] border-[0.2px] rounded-[8px] focus:outline-none focus:ring-[#17082d] focus:border-[#17082d] "
                  required
                  autoComplete="on"
                  name="full-name"
                  value={formValues.stateOfOrigin}
                  onChange={(e) =>
                    setFormValues({
                      ...formValues,
                      stateOfOrigin: e.target.value,
                    })
                  }
                  autoCapitalize="off"
                  autoCorrect="off"
                  spellCheck="false"
                />
              </div>
            </div>
            <div className="mb-[16px]">
              <label className="text-[14px] text-[#667185] leading-[20px]   mb-[8px]  ">
                Permanent Address <sup className="text-red-500 ">*</sup>
              </label>
              <div className=" relative    flex items-center">
                <input
                  type="text"
                  placeholder=""
                  className="w-full h-[48px]  px-[8px]  py-[8px] text-[14px] text-[#344054] leading-[20px]  placeholder:text-[#98A2B3] placeholder:text-[12px]  border-[#D0D5DD] border-[0.2px] rounded-[8px] focus:outline-none focus:ring-[#17082d] focus:border-[#17082d] "
                  required
                  autoComplete="on"
                  name="full-name"
                  value={formValues.permanent_address}
                  onChange={(e) =>
                    setFormValues({
                      ...formValues,
                      permanent_address: e.target.value,
                    })
                  }
                  autoCapitalize="off"
                  autoCorrect="off"
                  spellCheck="false"
                />
              </div>
            </div>
            {/* <div className="mb-[16px]">
              <label className="text-[14px] text-[#667185] leading-[20px]   mb-[8px]  ">
                Current Postal Address
              </label>
              <div className=" relative    flex items-center">
                <input
                  type="text"
                  placeholder=""
                  className="w-full h-[48px]  px-[8px]  py-[8px] text-[14px] text-[#344054] leading-[20px]  placeholder:text-[#98A2B3] placeholder:text-[12px]  border-[#D0D5DD] border-[0.2px] rounded-[8px] focus:outline-none focus:ring-[#17082d] focus:border-[#17082d] "
                  required
                  autoComplete="on"
                  name="full-name"
                  value={formValues.current_postal_address}
                  onChange={(e) =>
                    setFormValues({
                      ...formValues,
                      current_postal_address: e.target.value,
                    })
                  }
                  autoCapitalize="off"
                  autoCorrect="off"
                  spellCheck="false"
                />
              </div>
            </div> */}
            <div className="mb-[16px]">
              <label className="text-[14px] text-[#667185] leading-[20px]   mb-[8px]  ">
                Nationality <sup className="text-red-500 ">*</sup>
              </label>
              <div className=" relative    flex items-center">
                <input
                  type="text"
                  placeholder=""
                  className="w-full h-[48px]  px-[8px]  py-[8px] text-[14px] text-[#344054] leading-[20px]  placeholder:text-[#98A2B3] placeholder:text-[12px]  border-[#D0D5DD] border-[0.2px] rounded-[8px] focus:outline-none focus:ring-[#17082d] focus:border-[#17082d] "
                  required
                  autoComplete="on"
                  name="full-name"
                  value={formValues.nationality}
                  onChange={(e) =>
                    setFormValues({
                      ...formValues,
                      nationality: e.target.value,
                    })
                  }
                  autoCapitalize="off"
                  autoCorrect="off"
                  spellCheck="false"
                />
              </div>
            </div>
            <div className="mb-[16px]">
              <label className="text-[14px] text-[#667185] leading-[20px]   mb-[8px]  ">
                Marital Status <sup className="text-red-500 ">*</sup>
              </label>
              <div className=" relative    flex items-center">
                <select
                  type="text"
                  placeholder=""
                  className="w-full h-[48px] px-[8px]  py-[8px] text-[14px] text-[#344054] leading-[20px]  placeholder:text-[#98A2B3] placeholder:text-[12px]  border-[#D0D5DD] border-[0.2px] rounded-[8px] focus:outline-none focus:ring-[#17082d] focus:border-[#17082d] "
                  required
                  autoComplete="on"
                  name="full-name"
                  value={formValues.marital_status}
                  onChange={(e) =>
                    setFormValues({
                      ...formValues,
                      marital_status: e.target.value,
                    })
                  }
                  autoCapitalize="off"
                  autoCorrect="off"
                  spellCheck="false"
                >
                  <option value="">Select Marital Status</option>
                  <option value="Single">Single</option>
                  <option value="Married">Married</option>
                  <option value="Divorced">Divorced</option>
                  <option value="Widowed">Widowed</option>
                </select>
              </div>
            </div>
            <div className="mb-[16px]">
              <label className="text-[14px] text-[#667185] leading-[20px]   mb-[8px]  ">
                Number of Children
              </label>
              <div className=" relative    flex items-center">
                <input
                  type="text"
                  placeholder=""
                  className="w-full h-[48px]  px-[8px]  py-[8px] text-[14px] text-[#344054] leading-[20px]  placeholder:text-[#98A2B3] placeholder:text-[12px]  border-[#D0D5DD] border-[0.2px] rounded-[8px] focus:outline-none focus:ring-[#17082d] focus:border-[#17082d] "
                  
                  autoComplete="on"
                  name="full-name"
                  value={formValues.number_of_children}
                  onChange={(e) =>
                    setFormValues({
                      ...formValues,
                      number_of_children: e.target.value,
                    })
                  }
                  autoCapitalize="off"
                  autoCorrect="off"
                  spellCheck="false"
                />
              </div>
            </div>
            <div className="mb-[16px]">
              <label className="text-[14px] text-[#667185] leading-[20px] font-semibold   ">
                Academic Qualification <sup className="text-red-500 ">*</sup>
              </label>
              {academic.map((acad, index) => (
                <div key={index} className="mt-[16px]">
                  {" "}
                  <div>
                    <label className="text-[14px] text-[#667185] leading-[20px]   mb-[4px]">
                      Institution
                    </label>
                    <div className=" relative    flex items-center">
                      <input
                        type="text"
                        placeholder=""
                        className="w-full h-[48px]  px-[8px]  py-[8px] text-[14px] text-[#344054] leading-[20px]  placeholder:text-[#98A2B3] placeholder:text-[12px]  border-[#D0D5DD] border-[0.2px] rounded-[8px] focus:outline-none focus:ring-[#17082d] focus:border-[#17082d] "
                        required
                        autoComplete="on"
                        name="institution"
                        value={acad.institution}
                        onChange={(event) => handleAcademicChange(index, event)}
                        autoCapitalize="off"
                        autoCorrect="off"
                        spellCheck="false"
                      />
                    </div>
                  </div>
                  <div className="mt-2">
                    <label className="text-[14px] text-[#667185] leading-[20px]   mb-[4px]">
                      Degree
                    </label>
                    <div className=" relative    flex items-center">
                      <input
                        type="text"
                        placeholder=""
                        className="w-full h-[48px]  px-[8px]  py-[8px] text-[14px] text-[#344054] leading-[20px]  placeholder:text-[#98A2B3] placeholder:text-[12px]  border-[#D0D5DD] border-[0.2px] rounded-[8px] focus:outline-none focus:ring-[#17082d] focus:border-[#17082d] "
                        required
                        autoComplete="on"
                        name="degree"
                        value={acad.degree}
                        onChange={(event) => handleAcademicChange(index, event)}
                        autoCapitalize="off"
                        autoCorrect="off"
                        spellCheck="false"
                      />
                    </div>
                  </div>
                  <div className="mt-2">
                    <label className="text-[14px] text-[#667185] leading-[20px]   mb-[4px]">
                      Course Studied
                    </label>
                    <div className=" relative    flex items-center">
                      <input
                        type="text"
                        placeholder=""
                        className="w-full h-[48px]  px-[8px]  py-[8px] text-[14px] text-[#344054] leading-[20px]  placeholder:text-[#98A2B3] placeholder:text-[12px]  border-[#D0D5DD] border-[0.2px] rounded-[8px] focus:outline-none focus:ring-[#17082d] focus:border-[#17082d] "
                        required
                        autoComplete="on"
                        name="course"
                        value={acad.course}
                        onChange={(event) => handleAcademicChange(index, event)}
                        autoCapitalize="off"
                        autoCorrect="off"
                        spellCheck="false"
                      />
                    </div>
                  </div>
                  <div className="flex gap-4 mt-2">
                    <div className="w-[40%] ">
                      <div>
                        <label className="text-[14px] text-[#667185] leading-[20px]   mb-[4px]">
                          Start Date
                        </label>
                        <div className=" relative    flex items-center">
                          <input
                            type="text"
                            placeholder=""
                            className="w-full h-[48px]  px-[8px]  py-[8px] text-[14px] text-[#344054] leading-[20px]  placeholder:text-[#98A2B3] placeholder:text-[12px]  border-[#D0D5DD] border-[0.2px] rounded-[8px] focus:outline-none focus:ring-[#17082d] focus:border-[#17082d] "
                            required
                            autoComplete="on"
                            name="startDate"
                            value={acad.startDate}
                            onChange={(event) =>
                              handleAcademicChange(index, event)
                            }
                            autoCapitalize="off"
                            autoCorrect="off"
                            spellCheck="false"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="w-[40%] ">
                      <div>
                        <label className="text-[14px] text-[#667185] leading-[20px]   mb-[4px]">
                          End Date
                        </label>
                        <div className=" relative    flex items-center">
                          <input
                            type="text"
                            placeholder=""
                            className="w-full h-[48px]  px-[8px]  py-[8px] text-[14px] text-[#344054] leading-[20px]  placeholder:text-[#98A2B3] placeholder:text-[12px]  border-[#D0D5DD] border-[0.2px] rounded-[8px] focus:outline-none focus:ring-[#17082d] focus:border-[#17082d] "
                            required
                            autoComplete="on"
                            name="endDate"
                            value={acad.endDate}
                            onChange={(event) =>
                              handleAcademicChange(index, event)
                            }
                            autoCapitalize="off"
                            autoCorrect="off"
                            spellCheck="false"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
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

            <div className="mb-[16px]">
              <label className="text-[14px] text-[#667185] leading-[20px] font-semibold   ">
                Pofessional Qualification 
              </label>
              {professional.map((prof, index) => (
                <div key={index} className="mt-[16px]">
                  {" "}
                  <div>
                    <label className="text-[14px] text-[#667185] leading-[20px]   mb-[4px]">
                      Institution
                    </label>
                    <div className=" relative    flex items-center">
                      <input
                        type="text"
                        placeholder=""
                        className="w-full h-[48px]  px-[8px]  py-[8px] text-[14px] text-[#344054] leading-[20px]  placeholder:text-[#98A2B3] placeholder:text-[12px]  border-[#D0D5DD] border-[0.2px] rounded-[8px] focus:outline-none focus:ring-[#17082d] focus:border-[#17082d] "
                        required
                        autoComplete="on"
                        name="institution"
                        value={prof.institution}
                        onChange={(event) => handleProfessionalChange(index, event)}
                        autoCapitalize="off"
                        autoCorrect="off"
                        spellCheck="false"
                      />
                    </div>
                  </div>
                  <div className="mt-2">
                    <label className="text-[14px] text-[#667185] leading-[20px]   mb-[4px]">
                      Certificate
                    </label>
                    <div className=" relative    flex items-center">
                      <input
                        type="text"
                        placeholder=""
                        className="w-full h-[48px]  px-[8px]  py-[8px] text-[14px] text-[#344054] leading-[20px]  placeholder:text-[#98A2B3] placeholder:text-[12px]  border-[#D0D5DD] border-[0.2px] rounded-[8px] focus:outline-none focus:ring-[#17082d] focus:border-[#17082d] "
                        required
                        autoComplete="on"
                        name="certificate"
                        value={prof.certificate}
                        onChange={(event) => handleProfessionalChange(index, event)}
                        autoCapitalize="off"
                        autoCorrect="off"
                        spellCheck="false"
                      />
                    </div>
                  </div>
                 
                  <div className="flex gap-4 mt-2">
                    <div className="w-[40%] ">
                      <div>
                        <label className="text-[14px] text-[#667185] leading-[20px]   mb-[4px]">
                          Start Date
                        </label>
                        <div className=" relative    flex items-center">
                          <input
                            type="text"
                            placeholder=""
                            className="w-full h-[48px]  px-[8px]  py-[8px] text-[14px] text-[#344054] leading-[20px]  placeholder:text-[#98A2B3] placeholder:text-[12px]  border-[#D0D5DD] border-[0.2px] rounded-[8px] focus:outline-none focus:ring-[#17082d] focus:border-[#17082d] "
                            required
                            autoComplete="on"
                            name="startDate"
                            value={prof.startDate}
                            onChange={(event) =>
                              handleProfessionalChange(index, event)
                            }
                            autoCapitalize="off"
                            autoCorrect="off"
                            spellCheck="false"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="w-[40%] ">
                      <div>
                        <label className="text-[14px] text-[#667185] leading-[20px]   mb-[4px]">
                          End Date
                        </label>
                        <div className=" relative    flex items-center">
                          <input
                            type="text"
                            placeholder=""
                            className="w-full h-[48px]  px-[8px]  py-[8px] text-[14px] text-[#344054] leading-[20px]  placeholder:text-[#98A2B3] placeholder:text-[12px]  border-[#D0D5DD] border-[0.2px] rounded-[8px] focus:outline-none focus:ring-[#17082d] focus:border-[#17082d] "
                            required
                            autoComplete="on"
                            name="endDate"
                            value={prof.endDate}
                            onChange={(event) =>
                              handleProfessionalChange(index, event)
                            }
                            autoCapitalize="off"
                            autoCorrect="off"
                            spellCheck="false"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              <button
                type="button"
                className="btn py-1 px-4 mt-4  mb-2 text-white rounded-md"
                style={{ backgroundColor: "#17082d" }}
                onClick={handleProffesional}
              >
                Add More Qualification
              </button>
            </div>

            <div className="mb-[16px]">
              <label className="text-[14px] text-[#667185] leading-[20px] font-semibold   ">
          Published Journal
              </label>
              {journal.map((item, index) => (
                <div key={index} className="mt-[16px]">
                  {" "}
                  <div>
                    <label className="text-[14px] text-[#667185] leading-[20px]   mb-[4px]">
                      Title
                    </label>
                    <div className=" relative    flex items-center">
                      <input
                        type="text"
                        placeholder=""
                        className="w-full h-[48px]  px-[8px]  py-[8px] text-[14px] text-[#344054] leading-[20px]  placeholder:text-[#98A2B3] placeholder:text-[12px]  border-[#D0D5DD] border-[0.2px] rounded-[8px] focus:outline-none focus:ring-[#17082d] focus:border-[#17082d] "
                        required
                        autoComplete="on"
                        name="title"
                        value={item.title}
                        onChange={(event) => handleJounalChange(index, event)}
                        autoCapitalize="off"
                        autoCorrect="off"
                        spellCheck="false"
                      />
                    </div>
                  </div>
                  <div className="mt-2">
                    <label className="text-[14px] text-[#667185] leading-[20px]   mb-[4px]">
                      Author
                    </label>
                    <div className=" relative    flex items-center">
                      <input
                        type="text"
                        placeholder=""
                        className="w-full h-[48px]  px-[8px]  py-[8px] text-[14px] text-[#344054] leading-[20px]  placeholder:text-[#98A2B3] placeholder:text-[12px]  border-[#D0D5DD] border-[0.2px] rounded-[8px] focus:outline-none focus:ring-[#17082d] focus:border-[#17082d] "
                        required
                        autoComplete="on"
                        name="author"
                        value={item.author}
                        onChange={(event) => handleJounalChange(index, event)}
                        autoCapitalize="off"
                        autoCorrect="off"
                        spellCheck="false"
                      />
                    </div>
                  </div>
                 
                  <div className="flex gap-4 mt-2">
                    <div className="w-[40%] ">
                      <div>
                        <label className="text-[14px] text-[#667185] leading-[20px]   mb-[4px]">
                          Year Published
                        </label>
                        <div className=" relative    flex items-center">
                          <input
                            type="text"
                            placeholder=""
                            className="w-full h-[48px]  px-[8px]  py-[8px] text-[14px] text-[#344054] leading-[20px]  placeholder:text-[#98A2B3] placeholder:text-[12px]  border-[#D0D5DD] border-[0.2px] rounded-[8px] focus:outline-none focus:ring-[#17082d] focus:border-[#17082d] "
                            required
                            autoComplete="on"
                            name="year"
                            value={item.year}
                            onChange={(event) =>
                              handleJounalChange(index, event)
                            }
                            autoCapitalize="off"
                            autoCorrect="off"
                            spellCheck="false"
                          />
                        </div>
                      </div>
                    </div>

                   
                  </div>
                </div>
              ))}

              <button
                type="button"
                className="btn py-1 px-4 mt-4  mb-2 text-white rounded-md"
                style={{ backgroundColor: "#17082d" }}
                onClick={handleJournal}
              >
                Add More Publication
              </button>
            </div>

            <div className="mb-[16px]">
              <label className="text-[14px] text-[#667185] leading-[20px] font-semibold   ">
                Work Experience  <sup className="text-red-500 ">*</sup>
              </label>
              {experience.map((exp, index) => (
                <div key={index} className="mt-[16px]">
                  {" "}
                  <div>
                    <label className="text-[14px] text-[#667185] leading-[20px]   mb-[4px]">
                      Company
                    </label>
                    <div className=" relative    flex items-center">
                      <input
                        type="text"
                        placeholder=""
                        className="w-full h-[48px]  px-[8px]  py-[8px] text-[14px] text-[#344054] leading-[20px]  placeholder:text-[#98A2B3] placeholder:text-[12px]  border-[#D0D5DD] border-[0.2px] rounded-[8px] focus:outline-none focus:ring-[#17082d] focus:border-[#17082d] "
                        required
                        autoComplete="on"
                        name="company"
                        value={exp.company}
                        onChange={(event) => handleExperienceChange(index, event)}
                        autoCapitalize="off"
                        autoCorrect="off"
                        spellCheck="false"
                      />
                    </div>
                  </div>
                  <div className="mt-2">
                    <label className="text-[14px] text-[#667185] leading-[20px]   mb-[4px]">
                      Role
                    </label>
                    <div className=" relative    flex items-center">
                      <input
                        type="text"
                        placeholder=""
                        className="w-full h-[48px]  px-[8px]  py-[8px] text-[14px] text-[#344054] leading-[20px]  placeholder:text-[#98A2B3] placeholder:text-[12px]  border-[#D0D5DD] border-[0.2px] rounded-[8px] focus:outline-none focus:ring-[#17082d] focus:border-[#17082d] "
                        required
                        autoComplete="on"
                        name="role"
                        value={exp.role}
                        onChange={(event) => handleExperienceChange(index, event)}
                        autoCapitalize="off"
                        autoCorrect="off"
                        spellCheck="false"
                      />
                    </div>
                  </div>
                 
                  <div className="flex gap-4 mt-2">
                    <div className="w-[40%] ">
                      <div>
                        <label className="text-[14px] text-[#667185] leading-[20px]   mb-[4px]">
                          Start Date
                        </label>
                        <div className=" relative    flex items-center">
                          <input
                            type="text"
                            placeholder=""
                            className="w-full h-[48px]  px-[8px]  py-[8px] text-[14px] text-[#344054] leading-[20px]  placeholder:text-[#98A2B3] placeholder:text-[12px]  border-[#D0D5DD] border-[0.2px] rounded-[8px] focus:outline-none focus:ring-[#17082d] focus:border-[#17082d] "
                            required
                            autoComplete="on"
                            name="startDate"
                            value={exp.startDate}
                            onChange={(event) =>
                              handleExperienceChange(index, event)
                            }
                            autoCapitalize="off"
                            autoCorrect="off"
                            spellCheck="false"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="w-[40%] ">
                      <div>
                        <label className="text-[14px] text-[#667185] leading-[20px]   mb-[4px]">
                          End Date
                        </label>
                        <div className=" relative    flex items-center">
                          <input
                            type="text"
                            placeholder=""
                            className="w-full h-[48px]  px-[8px]  py-[8px] text-[14px] text-[#344054] leading-[20px]  placeholder:text-[#98A2B3] placeholder:text-[12px]  border-[#D0D5DD] border-[0.2px] rounded-[8px] focus:outline-none focus:ring-[#17082d] focus:border-[#17082d] "
                            required
                            autoComplete="on"
                            name="endDate"
                            value={exp.endDate}
                            onChange={(event) =>
                              handleExperienceChange(index, event)
                            }
                            autoCapitalize="off"
                            autoCorrect="off"
                            spellCheck="false"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              <button
                type="button"
                className="btn py-1 px-4 mt-4  mb-2 text-white rounded-md"
                style={{ backgroundColor: "#17082d" }}
                onClick={handleExperience}
              >
                Add More Experience
              </button>
            </div>

            <div className="mb-[16px]">
              <label className="text-[14px] text-[#667185] leading-[20px]   mb-[8px]  ">
                Statement of experience
              </label>
              <div className=" relative    flex items-center">
                <textarea
                  type="text"
                  placeholder=""
                  className="w-full h-[148px]  px-[8px]  py-[8px] text-[14px] text-[#344054] leading-[20px]  placeholder:text-[#98A2B3] placeholder:text-[12px]  border-[#D0D5DD] border-[0.2px] rounded-[8px] focus:outline-none focus:ring-[#17082d] focus:border-[#17082d] "
                  
                  autoComplete="on"
                  maxLength={1000}
                  name="full-name"
                  value={formValues.statement_of_experience}
                  onChange={(e) =>
                    setFormValues({
                      ...formValues,
                      statement_of_experience: e.target.value,
                    })
                  }
                  autoCapitalize="off"
                  autoCorrect="off"
                  spellCheck="false"
                />
              </div>
              <sup className="text-danger">
                Must not be more than 1000 words
              </sup>
            </div>
            <div className="mb-[16px]">
              <label className="text-[14px] text-[#667185] leading-[20px]   mb-[8px]  ">
                Hobbies
              </label>
              <div className=" relative    flex items-center">
                <input
                  type="text"
                  placeholder=""
                  className="w-full h-[48px]  px-[8px]  py-[8px] text-[14px] text-[#344054] leading-[20px]  placeholder:text-[#98A2B3] placeholder:text-[12px]  border-[#D0D5DD] border-[0.2px] rounded-[8px] focus:outline-none focus:ring-[#17082d] focus:border-[#17082d] "
                  
                  autoComplete="on"
                  name="full-name"
                  value={formValues.hobbies}
                  onChange={(e) =>
                    setFormValues({
                      ...formValues,
                      hobbies: e.target.value,
                    })
                  }
                  autoCapitalize="off"
                  autoCorrect="off"
                  spellCheck="false"
                />
              </div>
            </div>
            <div className="mb-[16px]">
              <label className="text-[14px] text-[#667185] leading-[20px]   mb-[8px]  ">
                Skills
              </label>
              <div className=" relative    flex items-center">
                <input
                  type="text"
                  placeholder=""
                  className="w-full h-[48px]  px-[8px]  py-[8px] text-[14px] text-[#344054] leading-[20px]  placeholder:text-[#98A2B3] placeholder:text-[12px]  border-[#D0D5DD] border-[0.2px] rounded-[8px] focus:outline-none focus:ring-[#17082d] focus:border-[#17082d] "
                  
                  autoComplete="on"
                  name="full-name"
                  value={formValues.skills}
                  onChange={(e) =>
                    setFormValues({
                      ...formValues,
                      skills: e.target.value,
                    })
                  }
                  autoCapitalize="off"
                  autoCorrect="off"
                  spellCheck="false"
                />
              </div>
            </div>
            {/* <div className="mb-[16px]">
                      <label className="text-[14px] text-[#667185] leading-[20px]   mb-[8px]  ">
                        Reference Phone Number
                      </label>
                      <div className=" relative    flex items-center">
                        <input
                          type="text"
                          placeholder=""
                          className="w-full h-[48px]  px-[8px]  py-[8px] text-[14px] text-[#344054] leading-[20px]  placeholder:text-[#98A2B3] placeholder:text-[12px]  border-[#D0D5DD] border-[0.2px] rounded-[8px] focus:outline-none focus:ring-[#17082d] focus:border-[#17082d] "
                          required
                          autoComplete="on"
                          name="full-name"
                          value={formValues.reference_phone}
                          onChange={(e) =>
                            setFormValues({
                              ...formValues,
                              reference_phone: e.target.value,
                            })
                          }
                          autoCapitalize="off"
                          autoCorrect="off"
                          spellCheck="false"
                        />
                      </div>
                    </div> */}

            {reference.map((ref, index) => (
              <div key={index} style={{ marginBottom: "10px" }}>
                <div className=" pe-">
                  <div class="form-group mb-2">
                    <label className="text-[14px] text-[#667185] leading-[20px]   mb-[8px]  ">
                      Reference Full Name <sup className="text-danger">*</sup>
                    </label>
                    <input
                      type="text"
                      style={{ height: "40px" }}
                      className="w-full h-[48px]  px-[8px]  py-[8px] text-[14px] text-[#344054] leading-[20px]  placeholder:text-[#98A2B3] placeholder:text-[12px]  border-[#D0D5DD] border-[0.2px] rounded-[8px] focus:outline-none focus:ring-[#17082d] focus:border-[#17082d] "
                      id="exampleFormControlInput1"
                      name="name"
                      placeholder="Name"
                      value={ref.name}
                      onChange={(event) => handleChange(index, event)}
                    />
                  </div>
                  <div class="row">
                    <div className="col-lg-6">
                      <div class="form-group">
                        <label className="text-[14px] text-[#667185] leading-[20px]   mb-[8px]  ">
                          Reference Email <sup className="text-danger">*</sup>
                        </label>
                        <input
                          type="text"
                          style={{ height: "40px" }}
                          className="w-full h-[48px]  px-[8px]  py-[8px] text-[14px] text-[#344054] leading-[20px]  placeholder:text-[#98A2B3] placeholder:text-[12px]  border-[#D0D5DD] border-[0.2px] rounded-[8px] focus:outline-none focus:ring-[#17082d] focus:border-[#17082d] "
                          id="exampleFormControlInput1"
                          name="contact"
                          placeholder="090-090"
                          value={ref.contact}
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
              className="btn py-1 px-4  mb-2 text-white rounded-md"
              style={{ backgroundColor: "#17082d" }}
              onClick={handleAddReference}
            >
              Add More Reference
            </button>

            <div className="mb-[16px]">
              <label className="text-[14px] text-[#667185] leading-[20px]   mb-[8px]  ">
                Resume File
              </label>
              <div className=" relative    flex items-center">
                <input
                  type="file"
                  placeholder=""
                  className="w-full h-[48px]  px-[8px]  py-[8px] text-[14px] text-[#344054] leading-[20px]  placeholder:text-[#98A2B3] placeholder:text-[12px]  border-[#D0D5DD] border-[0.2px] rounded-[8px] focus:outline-none focus:ring-[#17082d] focus:border-[#17082d] "
                  required
                  autoComplete="on"
                  max-file-size="2084"
                  accept=".pdf,.docx"
                  name="resume"
                  // value={formValues.resume_file}
                  onChange={(e) =>
                    setFormValues({
                      ...formValues,
                      resume_file: e.target.files[0],
                    })
                  }
                  autoCapitalize="off"
                  autoCorrect="off"
                  spellCheck="false"
                />
              </div>
              <sup className="text-danger">Format accepted: Docx/Pdf</sup>
            </div>
           
            {/* <div className="mb-[16px]">
              <label className="text-[14px] text-[#667185] leading-[20px]   mb-[8px]  ">
                Academic Experience
              </label>
              <div className=" relative    flex items-center">
                <input
                  type="file"
                  placeholder=""
                  className="w-full h-[48px]  px-[8px]  py-[8px] text-[14px] text-[#344054] leading-[20px]  placeholder:text-[#98A2B3] placeholder:text-[12px]  border-[#D0D5DD] border-[0.2px] rounded-[8px] focus:outline-none focus:ring-[#17082d] focus:border-[#17082d] "
                  autoComplete="on"
                  max-file-size="2084"
                  accept=".pdf,.docx"
                  name="full-name"
                  // value={formValues.resume_file}
                  onChange={(e) =>
                    setFormValues({
                      ...formValues,
                      academic_file: e.target.files[0],
                    })
                  }
                  autoCapitalize="off"
                  autoCorrect="off"
                  spellCheck="false"
                />
              </div>
              <sup className="text-danger">Format accepted: Docx/Pdf</sup>
            </div> */}
          </div>

          <div className="border-[0.8px]  border-[#E4E7EC] mb-[20px]" />
          <div className=" flex w-full  justify-end">
            <div className="">
              {" "}
              <button
                disabled={checkJobExpire(job.closing_date)}
                onClick={() => {
                  if (jobId === job.id) {
                    handleSubmit();
                  } else {
                    setJobId(job.id);
                  }
                  // console.log("referencess", reference)
                }}
                className="border-[0.2px]  border-[#98A2B3] w-[99px] bg-[#17082d] flex items-center justify-center text-center rounded-[8px] py-[11px] text-[14px] font-medium text-white"
              >
                {jobId === job.id && isLoading ? (
                  <ClipLoader color={"white"} size={20} />
                ) : (
                  <> {checkJobExpire(job.closing_date) ? "Closed" : "Apply"}</>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplyJob;

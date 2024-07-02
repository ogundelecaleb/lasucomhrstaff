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
import { Navigate, useNavigate } from "react-router-dom";
import api from "../api";
import { setUserData } from "../utils/utils";
import { useSnackbar } from "notistack";
import { ClipLoader, MoonLoader } from "react-spinners";
import JobCard from "./adminpages/jobpenings/JobCard";
import { NumericFormat } from "react-number-format";

const SeeJobs = () => {
  const { enqueueSnackbar } = useSnackbar();

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
  });

  useEffect(() => {
    if (jobListings) {
      fetchJobDetails();
    }
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
    const formData = new FormData();

    formData.append("job_id", formValues.jobId);
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
    formData.append("reference_phone", formValues.reference_phone);
    formData.append("reference_address", formValues.reference_address);
    formData.append("resume_file", formValues.resume_file);
    try {
      const response = await api.applyJob(formData);
      console.log("Response: ", response);
      enqueueSnackbar("Application Submited successfully", {
        variant: "success",
      });
      setIsLoading(false);
      setJobId("");
    } catch (error) {
      console.error(error);
      enqueueSnackbar(error.message, { variant: "error" });
      setIsLoading(false);
    }
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
          <h2 className="text-[20px] md:text-[24px] xl:text-[28px] text-center font-bold leading-[35px] text-[#17082D] mb-[20px] ">
            Lagos State University College of Medicine
          </h2>
          <h2 className="text-[16px] md:text-[20px]  text-center font-semibold  text-[#984779] ">
            Job Listing
          </h2>
        </div>
      </div>
      <div className=" py-6 px-4 md:px-[40px] relative xl:px-[80px] md:py-9 h-[600px] flex flex-col md:flex-row gap-[30px] bg-[#17082d]">
        <div className="w-full md:w-[50%]">
          <p className="text-[24px] md:text-[36px]  text-lef font-normal  text-[#fff] md:mt-8  ">
            At LASUCOM, we are committed to excellence in education, research,
            and community service.
          </p>
          <p className="text-[16px] md:text-[20px]  text-lef font-normal  text-[#fff] md:max-w-[70%] ">
            We believe that our faculty, staff, and administration play a
            crucial role in achieving our mission. We invite you to explore
            career opportunities and join our dynamic and inclusive academic
            community.
          </p>
        </div>
        <div className="w-full md:w-[50%]">
          {/* <img src="./woman.png" alt="woman" className="md:hidden h-[3600px]" /> */}
        </div>
        <img
          src="./woman.png"
          alt="woman"
          className="absolute bottom-0 right-0 h-[360px] md:h-[480px]"
        />
      </div>

      <p className="text-[24px] md:text-[36px]  text-center py-4 md:py-8 font-normal  text-[#17082d]  ">
        Availble Jobs !
      </p>

      <div className=" py-2 px-4 md:px-[40px] xl:px-[80px] md:py-3">
        {jobListings.map((job) => (
          <div key={job.id} className="flex justify-center  mb-4">
            {/* <JobCard job={job} /> */}
            <div className=" border-[0.2px] border-[#98a2b3] rounded-[8px] py-[11px] px-[10px]  md:px-[16px] w-full max-w-[560px]">
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
                <p className="mb-0"> {job.closing_date}</p>
              </div>

              {jobId === job.id && (
                <div className="mt-5">
                  <div className="mb-[16px]">
                    <label className="text-[14px] text-[#667185] leading-[20px]   mb-[8px] md:mb-[16px]">
                      Name
                    </label>
                    <div className=" relative    flex items-center">
                      <input
                        type="text"
                        placeholder=""
                        className="w-full h-[48px] pl-[16px] py-[12px] text-[14px] text-[#344054] leading-[20px]  placeholder:text-[#98A2B3] placeholder:text-[12px]  border-[#D0D5DD] border-[0.2px] rounded-[8px] focus:outline-none focus:ring-[#17082d] focus:border-[#17082d] "
                        required
                        autoComplete="on"
                        autoFocus
                        name="full-name"
                        id="full-name"
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
                    <label className="text-[14px] text-[#667185] leading-[20px]   mb-[8px] md:mb-[16px]">
                      Date of Birth
                    </label>
                    <div className=" relative    flex items-center">
                      <input
                        type="date"
                        placeholder=""
                        className="w-full h-[48px] pl-[16px] py-[12px] text-[14px] text-[#344054] leading-[20px]  placeholder:text-[#98A2B3] placeholder:text-[12px]  border-[#D0D5DD] border-[0.2px] rounded-[8px] focus:outline-none focus:ring-[#17082d] focus:border-[#17082d] "
                        required
                        autoComplete="on"
                        autoFocus
                        name="full-name"
                        id="full-name"
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
                    <label className="text-[14px] text-[#667185] leading-[20px]   mb-[8px] md:mb-[16px]">
                      email
                    </label>
                    <div className=" relative    flex items-center">
                      <input
                        type="email"
                        placeholder=""
                        className="w-full h-[48px] pl-[16px] py-[12px] text-[14px] text-[#344054] leading-[20px]  placeholder:text-[#98A2B3] placeholder:text-[12px]  border-[#D0D5DD] border-[0.2px] rounded-[8px] focus:outline-none focus:ring-[#17082d] focus:border-[#17082d] "
                        required
                        autoComplete="on"
                        autoFocus
                        name="full-name"
                        id="full-name"
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
                    <label className="text-[14px] text-[#667185] leading-[20px]   mb-[8px] md:mb-[16px]">
                      State of Origin
                    </label>
                    <div className=" relative    flex items-center">
                      <input
                        type="text"
                        placeholder=""
                        className="w-full h-[48px] pl-[16px] py-[12px] text-[14px] text-[#344054] leading-[20px]  placeholder:text-[#98A2B3] placeholder:text-[12px]  border-[#D0D5DD] border-[0.2px] rounded-[8px] focus:outline-none focus:ring-[#17082d] focus:border-[#17082d] "
                        required
                        autoComplete="on"
                        autoFocus
                        name="full-name"
                        id="full-name"
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
                    <label className="text-[14px] text-[#667185] leading-[20px]   mb-[8px] md:mb-[16px]">
                      Permanent Address
                    </label>
                    <div className=" relative    flex items-center">
                      <input
                        type="text"
                        placeholder=""
                        className="w-full h-[48px] pl-[16px] py-[12px] text-[14px] text-[#344054] leading-[20px]  placeholder:text-[#98A2B3] placeholder:text-[12px]  border-[#D0D5DD] border-[0.2px] rounded-[8px] focus:outline-none focus:ring-[#17082d] focus:border-[#17082d] "
                        required
                        autoComplete="on"
                        autoFocus
                        name="full-name"
                        id="full-name"
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
                  <div className="mb-[16px]">
                    <label className="text-[14px] text-[#667185] leading-[20px]   mb-[8px] md:mb-[16px]">
                      Current Postal Address
                    </label>
                    <div className=" relative    flex items-center">
                      <input
                        type="text"
                        placeholder=""
                        className="w-full h-[48px] pl-[16px] py-[12px] text-[14px] text-[#344054] leading-[20px]  placeholder:text-[#98A2B3] placeholder:text-[12px]  border-[#D0D5DD] border-[0.2px] rounded-[8px] focus:outline-none focus:ring-[#17082d] focus:border-[#17082d] "
                        required
                        autoComplete="on"
                        autoFocus
                        name="full-name"
                        id="full-name"
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
                  </div>
                  <div className="mb-[16px]">
                    <label className="text-[14px] text-[#667185] leading-[20px]   mb-[8px] md:mb-[16px]">
                      Nationality
                    </label>
                    <div className=" relative    flex items-center">
                      <input
                        type="text"
                        placeholder=""
                        className="w-full h-[48px] pl-[16px] py-[12px] text-[14px] text-[#344054] leading-[20px]  placeholder:text-[#98A2B3] placeholder:text-[12px]  border-[#D0D5DD] border-[0.2px] rounded-[8px] focus:outline-none focus:ring-[#17082d] focus:border-[#17082d] "
                        required
                        autoComplete="on"
                        autoFocus
                        name="full-name"
                        id="full-name"
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
                    <label className="text-[14px] text-[#667185] leading-[20px]   mb-[8px] md:mb-[16px]">
                      Marital Status
                    </label>
                    <div className=" relative    flex items-center">
                      <select
                        type="text"
                        placeholder=""
                        className="w-full h-[48px] pl-[16px] py-[12px] text-[14px] text-[#344054] leading-[20px]  placeholder:text-[#98A2B3] placeholder:text-[12px]  border-[#D0D5DD] border-[0.2px] rounded-[8px] focus:outline-none focus:ring-[#17082d] focus:border-[#17082d] "
                        required
                        autoComplete="on"
                        autoFocus
                        name="full-name"
                        id="full-name"
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
                    <label className="text-[14px] text-[#667185] leading-[20px]   mb-[8px] md:mb-[16px]">
                      Number of Children
                    </label>
                    <div className=" relative    flex items-center">
                      <input
                        type="text"
                        placeholder=""
                        className="w-full h-[48px] pl-[16px] py-[12px] text-[14px] text-[#344054] leading-[20px]  placeholder:text-[#98A2B3] placeholder:text-[12px]  border-[#D0D5DD] border-[0.2px] rounded-[8px] focus:outline-none focus:ring-[#17082d] focus:border-[#17082d] "
                        required
                        autoComplete="on"
                        autoFocus
                        name="full-name"
                        id="full-name"
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
                    <label className="text-[14px] text-[#667185] leading-[20px]   mb-[8px] md:mb-[16px]">
                      Academic Qualification
                    </label>
                    <div className=" relative    flex items-center">
                      <input
                        type="text"
                        placeholder=""
                        className="w-full h-[48px] pl-[16px] py-[12px] text-[14px] text-[#344054] leading-[20px]  placeholder:text-[#98A2B3] placeholder:text-[12px]  border-[#D0D5DD] border-[0.2px] rounded-[8px] focus:outline-none focus:ring-[#17082d] focus:border-[#17082d] "
                        required
                        autoComplete="on"
                        autoFocus
                        name="full-name"
                        id="full-name"
                        value={formValues.academic_qualifications}
                        onChange={(e) =>
                          setFormValues({
                            ...formValues,
                            academic_qualifications: e.target.value,
                          })
                        }
                        autoCapitalize="off"
                        autoCorrect="off"
                        spellCheck="false"
                      />
                    </div>
                  </div>
                  <div className="mb-[16px]">
                    <label className="text-[14px] text-[#667185] leading-[20px]   mb-[8px] md:mb-[16px]">
                      Statement of experience
                    </label>
                    <div className=" relative    flex items-center">
                      <input
                        type="text"
                        placeholder=""
                        className="w-full h-[48px] pl-[16px] py-[12px] text-[14px] text-[#344054] leading-[20px]  placeholder:text-[#98A2B3] placeholder:text-[12px]  border-[#D0D5DD] border-[0.2px] rounded-[8px] focus:outline-none focus:ring-[#17082d] focus:border-[#17082d] "
                        required
                        autoComplete="on"
                        autoFocus
                        name="full-name"
                        id="full-name"
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
                  </div>
                  <div className="mb-[16px]">
                    <label className="text-[14px] text-[#667185] leading-[20px]   mb-[8px] md:mb-[16px]">
                      Hobbies
                    </label>
                    <div className=" relative    flex items-center">
                      <input
                        type="text"
                        placeholder=""
                        className="w-full h-[48px] pl-[16px] py-[12px] text-[14px] text-[#344054] leading-[20px]  placeholder:text-[#98A2B3] placeholder:text-[12px]  border-[#D0D5DD] border-[0.2px] rounded-[8px] focus:outline-none focus:ring-[#17082d] focus:border-[#17082d] "
                        required
                        autoComplete="on"
                        autoFocus
                        name="full-name"
                        id="full-name"
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
                    <label className="text-[14px] text-[#667185] leading-[20px]   mb-[8px] md:mb-[16px]">
                      Skills
                    </label>
                    <div className=" relative    flex items-center">
                      <input
                        type="text"
                        placeholder=""
                        className="w-full h-[48px] pl-[16px] py-[12px] text-[14px] text-[#344054] leading-[20px]  placeholder:text-[#98A2B3] placeholder:text-[12px]  border-[#D0D5DD] border-[0.2px] rounded-[8px] focus:outline-none focus:ring-[#17082d] focus:border-[#17082d] "
                        required
                        autoComplete="on"
                        autoFocus
                        name="full-name"
                        id="full-name"
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
                  <div className="mb-[16px]">
                    <label className="text-[14px] text-[#667185] leading-[20px]   mb-[8px] md:mb-[16px]">
                      Reference Phone Number
                    </label>
                    <div className=" relative    flex items-center">
                      <input
                        type="text"
                        placeholder=""
                        className="w-full h-[48px] pl-[16px] py-[12px] text-[14px] text-[#344054] leading-[20px]  placeholder:text-[#98A2B3] placeholder:text-[12px]  border-[#D0D5DD] border-[0.2px] rounded-[8px] focus:outline-none focus:ring-[#17082d] focus:border-[#17082d] "
                        required
                        autoComplete="on"
                        autoFocus
                        name="full-name"
                        id="full-name"
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
                  </div>
                  <div className="mb-[16px]">
                    <label className="text-[14px] text-[#667185] leading-[20px]   mb-[8px] md:mb-[16px]">
                      Reference Address
                    </label>
                    <div className=" relative    flex items-center">
                      <input
                        type="text"
                        placeholder=""
                        className="w-full h-[48px] pl-[16px] py-[12px] text-[14px] text-[#344054] leading-[20px]  placeholder:text-[#98A2B3] placeholder:text-[12px]  border-[#D0D5DD] border-[0.2px] rounded-[8px] focus:outline-none focus:ring-[#17082d] focus:border-[#17082d] "
                        required
                        autoComplete="on"
                        autoFocus
                        name="full-name"
                        id="full-name"
                        value={formValues.reference_address}
                        onChange={(e) =>
                          setFormValues({
                            ...formValues,
                            reference_address: e.target.value,
                          })
                        }
                        autoCapitalize="off"
                        autoCorrect="off"
                        spellCheck="false"
                      />
                    </div>
                  </div>
                  <div className="mb-[16px]">
                    <label className="text-[14px] text-[#667185] leading-[20px]   mb-[8px] md:mb-[16px]">
                      Resume File
                    </label>
                    <div className=" relative    flex items-center">
                      <input
                        type="file"
                        placeholder=""
                        className="w-full h-[48px] pl-[16px] py-[12px] text-[14px] text-[#344054] leading-[20px]  placeholder:text-[#98A2B3] placeholder:text-[12px]  border-[#D0D5DD] border-[0.2px] rounded-[8px] focus:outline-none focus:ring-[#17082d] focus:border-[#17082d] "
                        required
                        autoComplete="on"
                        autoFocus
                        name="full-name"
                        id="full-name"
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
                  </div>
                </div>
              )}

              <div className="border-[0.8px]  border-[#E4E7EC] mb-[20px]" />
              <div className=" flex w-full  justify-end">
                <div className="">
                  {" "}
                  <button
                    onClick={() => {
                      if (jobId === job.id) {
                        handleSubmit();
                      } else {
                        setJobId(job.id);
                      }
                    }}
                    className="border-[0.2px]  border-[#98A2B3] w-[99px] bg-[#17082d] flex items-center justify-center text-center rounded-[8px] py-[12px] text-[14px] font-medium text-white"
                  >
                    {isLoading ? (
                      <ClipLoader color={"white"} size={20} />
                    ) : (
                      <> Apply</>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SeeJobs;

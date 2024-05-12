import React, { useState, useEffect } from "react";
import { reuseAbleColor } from "../../../components/Color";
import { useNavigate } from "react-router-dom";
import api from "../../../api";
import { Box } from "@chakra-ui/react";
import { useSnackbar } from "notistack";
import { useParams } from "react-router-dom";
import { ScaleLoader } from "react-spinners";
import { MoonLoader } from "react-spinners";

const EditUser = () => {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadinge, setIsLoadinge] = useState(false);
  const [userDetails, setUserDetails] = useState([]);
  const [selectedRole, setSelectedRole] = useState(userDetails.role || "");
  const [selectedStatus, setSelectedStatus] = useState(
    userDetails.status || "active"
  );
  const [selectedConfirm, setSelectedConfirm] = useState(
    userDetails.confirmation || ""
  );
  const [roleData, setRoleData] = useState([]);
  const { id } = useParams();

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
    });
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
        <div className="pb-3 mb-5 shadow  mt-5 mx-5">
          <p className="border-bottom mb-5 fs-4 fw-semibold ps-4 py-3">
            {" "}
            Edit User
          </p>
          <div className="px-4">
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
                        {role.name}
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
          </div>
        </div>
      )}
    </div>
  );
};

export default EditUser;

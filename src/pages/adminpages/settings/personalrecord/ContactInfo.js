import { Text } from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import { useSnackbar } from "notistack";
import api from "../../../../api";
import { MoonLoader } from "react-spinners";
import { getYear, getMonth } from "date-fns";
import { useParams } from "react-router-dom";

const ContactInfo = () => {
  const [userDetails, setUserDetails] = useState([]);
  const { enqueueSnackbar } = useSnackbar();
  const [isLoading, setIsLoading] = useState(false);
  const { id } = useParams();

  function range(start, end, step) {
    const result = [];
    for (let i = start; i <= end; i += step) {
      result.push(i);
    }
    return result;
  }

  useEffect(() => {
    if (id) {
      api
        .getUserbyid(id)
        .then((response) => {
          setUserDetails(response.data);
        })
        .catch((error) => {
          enqueueSnackbar("Error fetching staff details", { variant: "error" });
        });
    }
  }, [id]);

  const [formValues, setFormValues] = useState({
    phone: "",
    email: "",
    contact_address: "",
    current_address: "",
    permanent_address: "",
    department: "",
    date_of_first_appointment: "",
    faculty: "",
    level: "",
    unit: "",
  });

  useEffect(() => {
    if (userDetails) {
      setFormValues({
        phone: userDetails?.phone,
        email: userDetails?.email,
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
      });
    }
  }, [userDetails]);

  async function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await api.updateUser({
        staffId: id,
        phone: formValues.phone,
        contact_address: formValues.contact_address,
        current_address: formValues.current_address,
        permanent_address: formValues.permanent_address,
        date_of_first_appointment: formValues.date_of_first_appointment,
      });
      console.log("responce==>>>>>", response);
      enqueueSnackbar("Information updated successfully", {
        variant: "success",
      });
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      enqueueSnackbar(error.message, { variant: "error" });
      setIsLoading(false);
    }
  }

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
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
                    disabled
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
                    disabled
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
                Current Residential Area <sup className="text-danger">*</sup>
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
                    disabled
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
                  disabled
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
              (formValues.role === "HOD" || formValues.role === "RSWEP") && (
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
                    disabled
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
                <input
                  type="text"
                  style={{ height: "40px" }}
                  class="form-control rounded-0"
                  id="exampleFormControlInput1"
                  placeholder=""
                  disabled
                  value={formValues.unit}
                  onChange={(e) =>
                    setFormValues({
                      ...formValues,
                      unit: e.target.value,
                    })
                  }
                />
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
                    disabled
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
                  <input
                    type="text"
                    style={{ height: "40px" }}
                    class="form-control rounded-0"
                    id="exampleFormControlInput1"
                    disabled
                    value={formValues.role}
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        role: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
            </div>
          </div>

         
        </div>
       
      </form>
    </div>
  );
};

export default ContactInfo;

import { Box, Image, Text } from "@chakra-ui/react";
import React, { useState, useEffect, useCallback } from "react";
import { VscCopy } from "react-icons/vsc";
import GetDocument from "../../../../components/getdocument";
import { useParams } from "react-router-dom";
import { useSnackbar } from "notistack";
import api from "../../../../api";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { MoonLoader } from "react-spinners";
import { Trash } from "iconsax-react";

const FamilyDetailsEdit = () => {

  const { enqueueSnackbar } = useSnackbar();
  const [isLoading, setIsLoading] = useState(false);
  const { id } = useParams();
  const [userDetails, setUserDetails] = useState([]);

  useEffect(() => {

    if (id) {
      api.getUserbyid(id)
      .then(response => {
        setUserDetails(response.data)
      })
      .catch(error => {
        enqueueSnackbar("Error fetching staff details", { variant: "error" });
      });
    }
  }, [id]);

  const [formValues, setFormValues] = useState({
    spouse_full_name: "",
    spouse_current_address: "",
    spouse_phone: "",
    spouse_email: "",
   
  });

  const [children, setChildren] = useState([
    {
      id: "0",

      full_name: "",
      current_address: "",
      relationship: "",
      phone: "",
      date_of_birth: "",
      gender: "",
      email: "",
    },
  ]);
  const handleAcademic = () => {
    setChildren([
      ...children,
      {
        id: JSON.stringify(children?.length + 1),
        full_name: "",
        address: "",
        relationship: "",
        phone: "",
        date_of_birth: "",
        gender: "",
        email: "",
      },
    ]);
  };
  const handleChildrenChange = (index, event) => {
    const { name, value } = event.target;
    const newAcademic = [...children];
    newAcademic[index][name] = value;
    setChildren(newAcademic);
  };



  useEffect(() => {
    if (userDetails) {
      setFormValues({
        spouse_full_name: userDetails?.spouse?.full_name,
        spouse_current_address:  userDetails?.spouse?.address,
        spouse_phone: userDetails?.spouse?.phone,
        spouse_email: userDetails?.spouse?.email
       
      });
      setChildren(userDetails?.children);
    }
  }, [userDetails]);

 

  async function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await api.updateFinfo({
        staff_id: id,
        spouse_full_name: formValues.spouse_full_name,
        spouse_current_address: formValues.spouse_current_address,
        spouse_phone: formValues.spouse_phone,
        spouse_email: formValues.spouse_email,
        children: children,
       
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

  const removeItem = (idToRemove) => {
    const updatedItems = children.filter((item) => item.id !== idToRemove);
    setChildren(updatedItems); // Update state with the new array
  };

  return (
    <div className="">
      <form onSubmit={handleSubmit}>
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
        <div className="row mt-4 border-bottom pb-4">
          <div className="col-lg-4">
            <p className="fs-5 pt-2 fw-semibold">Children/Child Details</p>
          </div>
          <div className="col-lg-6 pe-">
            {children?.map((child, index) => (
              <>
                <div class="form-group">
                  <label
                    for="exampleFormControlSelect1"
                    className="fw-semibold text-muted fs-6 mt-3 mb-2 flex justify-between"
                  >
                    Full Name
                    {child.id > 0 && (
                      <button onClick={() => removeItem(child.id)}>
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
                    name="full_name"
                    value={child.full_name}
                    onChange={(event) => handleChildrenChange(index, event)}
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
                    name="email"
                    value={child.email}
                    onChange={(event) => handleChildrenChange(index, event)}
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
                    name="current_address"
                    value={child.current_address}
                    onChange={(event) => handleChildrenChange(index, event)}
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
                        name="phone"
                        value={child.phone}
                        onChange={(event) => handleChildrenChange(index, event)}
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
                        name="date_of_birth"
                        value={child.date_of_birth}
                        onChange={(event) => handleChildrenChange(index, event)}
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
                        name="gender"
                        value={child.gender}
                        onChange={(event) => handleChildrenChange(index, event)}
                      >
                        <option value="" disabled>
                          Select Gender
                        </option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                      </select>
                    </div>
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
            {children?.length ===0 ? "Add First Child" : "Add a Child"}  
            </button>
          </div>
          <div className="col-lg-2"></div>
        </div>
      <div className="col-lg-12 py-5 d-flex justify-content-end">
          <div>
            <button
              className="btn py-2 px-4 me-2  text-white rounded-0"
              style={{ backgroundColor: "#984779" }}
              // disabled={isSaveButtonDisabled}
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

    </form>
  </div>
);
};

export default FamilyDetailsEdit;

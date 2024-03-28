import { Box, Image, Text } from "@chakra-ui/react";
import React, { useState, useEffect, useCallback } from "react";
import { VscCopy } from "react-icons/vsc";
import GetDocument from "../../../../components/getdocument";
import { useParams } from "react-router-dom";
import { useSnackbar } from "notistack";
import api from "../../../../api";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const ContactInfo = () => {

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
    phone: "",
    email: "",
    contact_address: "",
    current_address: "",
    permanent_address: "",
    department:"",
    date_of_first_appointment: "",
    faculty: "",
    designation: "",
    present_designation: "",
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
        designation: userDetails?.designation,
        present_designation: userDetails?.present_designation,
        role: userDetails?.role
      });
    }
  }, [userDetails]);

  return (
    <div className='container'>
      <div className='row mt-4 border-bottom pb-4 pb-4'>
        <div className='col-lg-4'>
          <Text color={'black'} className='fs-5 pt-2 fw-semibold'>Contact Details</Text>
        </div>
        <div className='col-lg-6 pe-'>
          <form>
            <div class='row'>
              <div className='col-lg-6'>
                <div class='form-group'>
                  <label
                    for='exampleFormControlSelect1'
                    className='fw-semibold text-muted fs-6 mt-3 mb-2'>
                    Phone Number 
                  </label>
                  <input
                    type='text'
                    style={{ height: "40px" }}
                    class='form-control rounded-0'
                    id='exampleFormControlInput1'
                    placeholder=''
                    disabled
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
              <div className='col-lg-6'>
                <div class='form-group'>
                  <label
                    for='exampleFormControlSelect1'
                    className='fw-semibold text-muted fs-6 mt-3 mb-2'>
                    Email 
                  </label>
                  <input
                    type='text'
                    style={{ height: "40px" }}
                    class='form-control rounded-0'
                    id='exampleFormControlInput1'
                    disabled
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
            <div class='form-group'>
              <label
                for='exampleFormControlSelect1'
                className='fw-semibold text-muted fs-6 mt-3 mb-2'>
                Current Residential Area 
              </label>
              <input
                  type='text'
                  style={{ height: "40px" }}
                  class='form-control rounded-0'
                  id='exampleFormControlInput1'
                  placeholder=''
                  disabled
                  value={formValues.current_address}
                  onChange={(e) =>
                    setFormValues({
                      ...formValues,
                      current_address: e.target.value,
                    })
                  }
                />
            </div>
            <div class='form-group'>
              <label
                for='exampleFormControlSelect1'
                className='fw-semibold text-muted fs-6 mt-3 mb-2'>
                Contact Address (Not P.O.Box)
              </label>
              <input
                type='text'
                style={{ height: "40px" }}
                class='form-control rounded-0'
                id='exampleFormControlInput1'
                placeholder=''
                disabled
                value={formValues.contact_address}
                onChange={(e) =>
                  setFormValues({
                    ...formValues,
                    contact_address: e.target.value,
                  })
                }
              />
            </div>
            <div class='form-group'>
              <label
                for='exampleFormControlSelect1'
                className='fw-semibold text-muted fs-6 mt-3 mb-2'>
                Permanent Home Address 
              </label>
              <input
                type='text'
                style={{ height: "40px" }}
                class='form-control rounded-0'
                id='exampleFormControlInput1'
                placeholder=''
                disabled
                value={formValues.permanent_address}
                onChange={(e) =>
                  setFormValues({
                    ...formValues,
                    permanent_address: e.target.value,
                  })
                }
              />
            </div>
          </form>
        </div>
        <div className='col-lg-2'></div>
      </div>
      <div className='row mt-4 border-bottom pb-4 pb-4'>
        <div className='col-lg-4'>
          <p className='fs-5 pt-2 fw-semibold'>Work Contact</p>
        </div>
        <div className='col-lg-6 pe-'>
          <form>
            <div class='row'>
              <div className='col-lg-6'>
                <div class='form-group'>
                  <label
                    for='exampleFormControlSelect1'
                    className='fw-semibold text-muted fs-6 mt-3 mb-2'>
                    Date of First Appointment{" "}
                    
                  </label>
                  <DatePicker
                  selected={
                    formValues.date_of_first_appointment
                      ? new Date(formValues.date_of_first_appointment)
                      : null
                  }
                  onChange={(date) => {
                    if (date instanceof Date && !isNaN(date)) {
                      const formattedDate = date.toISOString().split('T')[0];
                      setFormValues({
                        ...formValues,
                        date_of_first_appointment: formattedDate,
                      });
                    } else {
                      setFormValues({
                        ...formValues,
                        date_of_first_appointment: '',
                      });
                    }
                  }}
                  dateFormat="yyyy-MM-dd"
                  className="form-control rounded-0"
                  id="exampleFormControlInput1"
                  placeholder=""
                  disabled
                />
                </div>
              </div>
              <div className='col-lg-6'>
                <div class='form-group'>
                  <label
                    for='exampleFormControlSelect1'
                    className='fw-semibold text-muted fs-6 mt-3 mb-2'>
                    Department
                  </label>
                  <input
                    type='text'
                    style={{ height: "40px" }}
                    class='form-control rounded-0'
                    id='exampleFormControlInput1'
                    placeholder=''
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
              </div>
            </div>
            <div class='form-group'>
              <label
                for='exampleFormControlSelect1'
                className='fw-semibold text-muted fs-6 mt-3 mb-2'>
                Faculty/Division/Unit
              </label>
              <input
                type='text'
                style={{ height: "40px" }}
                class='form-control rounded-0'
                id='exampleFormControlInput1'
                disabled
                value={formValues.faculty}
                onChange={(e) =>
                  setFormValues({
                    ...formValues,
                    faculty: e.target.value,
                  })
                }
              />
            </div>
            <div class='row'>
              <div className='col-lg-6'>
                <div class='form-group'>
                  <label
                    for='exampleFormControlSelect1'
                    className='fw-semibold text-muted fs-6 mt-3 mb-2'>
                    Designation
                  </label>
                  <input
                    type='text'
                    style={{ height: "40px" }}
                    class='form-control rounded-0'
                    id='exampleFormControlInput1'
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
              <div className='col-lg-6'>
                <div class='form-group'>
                  <label
                    for='exampleFormControlSelect1'
                    className='fw-semibold text-muted fs-6 mt-3 mb-2'>
                    Role
                  </label>
                  <input
                type='text'
                style={{ height: "40px" }}
                class='form-control rounded-0'
                id='exampleFormControlInput1'
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
          </form>
        </div>
        <div className='col-lg-2'></div>
      </div>
      
    </div>
  );
};

export default ContactInfo;

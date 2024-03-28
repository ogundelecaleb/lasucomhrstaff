import React from "react";
import { BsArrowLeftShort } from "react-icons/bs";
import { useLocation, useNavigate } from "react-router-dom";

const TemporaryAplicantDetails = () => {
  const location = useLocation().state;
  const navigate = useNavigate();
  const data = location.item;
  return (
    <div className='container px-5' id='res-padding'>
      <div>
        <div
          style={{ cursor: "pointer" }}
          onClick={() => navigate(-1)}
          className='d-flex align-items-center gap-2'>
          <BsArrowLeftShort size={"40"} />
          <p className=' fs-5 mt-3 '>Applicant Details</p>
        </div>
      </div>
      <div className='row mt-3 gap-5'>
        <div className='col-lg-4 border px-3' style={{ height: "230px" }}>
          <div className='d-flex gap-3 mt-3'>
            <div>
              <img
                src='https://bit.ly/prosper-baba'
                width={"65px"}
                style={{ borderRadius: "50%" }}
                alt='/'
              />
            </div>
            <div className='mt-2'>
              <p className='fs-6 fw-semibold'>{data.name}</p>
              <p className='text-muted' style={{ marginTop: "-15px" }}>
                {data.id}-1095
              </p>
            </div>
          </div>
          <div className='px-3 mt-3' style={{ backgroundColor: "#F8F8FD" }}>
            <div className='d-flex justify-content-between pt-2 border-bottom'>
              <p>Status</p>
              <p>1 day ago</p>
            </div>
            <p className='text-primary py-3 fw-semibold'>Approved</p>
          </div>
          <div className='border-bottom my-3'></div>
        </div>
        <div className='col-lg-7 border px-0 mb-5'>
          <div className='border-bottom px-3'>
            <p className='fw-semibold pt-2'>Applicant Information</p>
          </div>
          <div className='row'>
            <div className='col-lg-6 px-4 pt-4'>
              <div>
                <p className='text-muted fs-6'>Full Name</p>
                <p className='fw-semibold fs-6' style={{ marginTop: "-15px" }}>
                  {data.name}
                </p>
              </div>
              <div>
                <p className='text-muted fs-6 mt-3'>Faculty</p>
                <p className='fw-semibold fs-6' style={{ marginTop: "-15px" }}>
                  Basic Medical Science
                </p>
              </div>
              <div>
                <p className='text-muted fs-6 mt-3'>Division/Department/Unit</p>
                <p className='fw-semibold fs-6' style={{ marginTop: "-15px" }}>
                  Finance
                </p>
              </div>
              <div>
                <p className='text-muted fs-6'>PF NO </p>
                <p className='fw-semibold fs-6' style={{ marginTop: "-15px" }}>
                  5564826
                </p>
              </div>
              <div>
                <p className='text-muted fs-6'>Date Of Appointment</p>
                <p className='fw-semibold fs-6' style={{ marginTop: "-15px" }}>
                  1st January 2023
                </p>
              </div>
              <div>
                <p className='text-muted fs-6'>
                  Grade on Temporary Appointment
                </p>
                <p className='fw-semibold fs-6' style={{ marginTop: "-15px" }}>
                  14
                </p>
              </div>
              <div>
                <p className='text-muted fs-6'>
                  Grade on Temporary Appointment
                </p>
                <p className='fw-semibold fs-6' style={{ marginTop: "-15px" }}>
                  14
                </p>
              </div>
              <div>
                <p className='text-muted fs-6'>
                  Details on work done since Appointment{" "}
                </p>
                <p className='fw-semibold fs-6' style={{ marginTop: "-15px" }}>
                  List of work done below
                </p>
              </div>
            </div>
            <div className='col-lg-6 px-4 pt-4'>
              <div>
                <p className='text-muted fs-6'>Staff Type</p>
                <p className='fw-semibold fs-6' style={{ marginTop: "-15px" }}>
                  Senior Staff{" "}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TemporaryAplicantDetails;

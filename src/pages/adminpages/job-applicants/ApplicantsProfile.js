import React from "react";

const ApplicantsProfile = ({ data }) => {
  return (
    <div className='mt-2 pb-4'>
      <div>
        <p className='fw-semibold fs-5'>Personal Details</p>
        <div className='row mt-4 border-bottom pb-2'>
          <div className='col-lg-6'>
            <div>
              <p className='fs-6  text-muted'>Full Name</p>
              <p className='fs-6 fw-semibold' style={{ marginTop: "-15px" }}>
                {data.item.name}
              </p>
            </div>
            <div>
              <p className='fs-6  text-muted'>Date of Birth</p>
              <p className='fs-6 fw-semibold' style={{ marginTop: "-15px" }}>
                {data.item.date_of_birth} <span className='text-muted'></span>
              </p>
            </div>
            <div>
              <p className='fs-6  text-muted'>Address</p>
              <p className='fs-6 fw-semibold' style={{ marginTop: "-15px" }}>
               {data.item.permanent_address}
              </p>
            </div>
          </div>
          <div className='col-lg-6'>
            <div>
              <p className='fs-6  text-muted'>Marital Status</p>
              <p className='fs-6 fw-semibold' style={{ marginTop: "-15px" }}>
              {data.item.marital_status}
              </p>
            </div>
            <div>
              <p className='fs-6  text-muted'>Language</p>
              <p className='fs-6 fw-semibold' style={{ marginTop: "-15px" }}>
                English, Yoruba
              </p>
            </div>
          </div>
        </div>
        <p className='fw-semibold fs-5 mt-4'>Other Details</p>
        <div className='row mt-4 pb-5 mb-3'>
          <div className='col-lg-4'>
            <div>
              <p className='fs-6  text-muted'>Nationality</p>
              <p className='fs-6 fw-semibold' style={{ marginTop: "-15px" }}>
              {data.item.nationality}
              </p>
            </div>
            <div>
              <p className='fs-6  text-muted'> Highest Qulification Held</p>
              <p className='fs-6 fw-semibold' style={{ marginTop: "-15px" }}>
              {data.item.academic_qualifications}
              </p>
            </div>
          </div>
          <div className='col-lg-8'>
            <div>
              <p className='fs-6  text-muted'>State of Origin</p>
              <p className='fs-6 fw-semibold' style={{ marginTop: "-15px" }}>
              {data.item.state_of_origin}
              </p>
            </div>
            <div>
              <p className='fs-6  text-muted'>Skills</p>
              <div
                className='fs-6 fw-semibold d-flex flex-wrap gap-2'
                style={{ marginTop: "-15px" }}>
                <span
                  className='py-1 px-2 text-primary'
                  style={{ backgroundColor: "#F8F8FD" }}>
                 {data.item.skills || "- -||- -"}
                </span>
               
              </div>
            </div>
            <div>
              <p className='fs-6  text-muted'>Hobbies</p>
              <div
                className='fs-6 fw-semibold d-flex flex-wrap gap-2'
                style={{ marginTop: "-15px" }}>
                <span
                  className='py-1 px-2 text-primary'
                  style={{ backgroundColor: "#F8F8FD" }}>
                 {data.item.hobbies}
                </span>
               
              </div>
            </div>
            <div>
              <p className='fs-6  text-muted'>Reference</p>
              <div
                className='fs-6 fw-semibold d-flex flex-wrap gap-2'
                style={{ marginTop: "-15px" }}>
                <span
                  className='py-1 px-2 text-primary'
                  style={{ backgroundColor: "#F8F8FD" }}>
                 {data.item.application_references}
                </span>
               
              </div>
            </div>
            <div>
              <p className='fs-6  text-muted'>Statement of Experience</p>
              <div
                className='fs-6 fw-semibold d-flex flex-wrap gap-2'
                style={{ marginTop: "-15px" }}>
                <span
                  className='py-1 px-2 text-primary'
                  style={{ backgroundColor: "#F8F8FD" }}>
                 {data.item.statement_of_experience}
                </span>
               
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplicantsProfile;

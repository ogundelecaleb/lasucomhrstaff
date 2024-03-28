import React from "react";

const Staff = () => {
  return (
    <div className='container mt-5 px-5'>
      <div className='row ps-3 pt-4'>
        <div
          className='col-lg-5 d-flex flex-column gap-2 justify-content-center ps-5 rounded-4'
          style={{ height: "280px", backgroundColor: "#E4C0D3" }}>
          <div
            className='rounded-3'
            style={{
              height: "50px",
              width: "50px",
              border: "1px solid #984779",
            }}></div>
          <p className='fs-7' style={{ color: "#984779" }}>
            Staff Appointment
          </p>
        </div>
      </div>
      <div className='row mb-4 ps-3 py-5'>
        <div
          className='col-lg-5 my-5 d-flex flex-column gap-2 justify-content-center ps-5 rounded-4'
          style={{ height: "280px", backgroundColor: "#E4C0D3" }}>
          <div
            className='rounded-3'
            style={{
              height: "50px",
              width: "50px",
              border: "1px solid #984779",
            }}></div>
          <p className='fs-7' style={{ color: "#984779" }}>
            Staff Requests
          </p>
        </div>
      </div>
    </div>
  );
};

export default Staff;

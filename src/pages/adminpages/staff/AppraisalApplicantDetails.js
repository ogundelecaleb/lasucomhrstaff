import React from "react";
import { BsArrowLeftShort } from "react-icons/bs";
import { useLocation, useNavigate } from "react-router-dom";
import { reuseAbleColor } from "../../../components/Color";

const AppraisalApplicantDetails = () => {
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
        <div className='col-md-4 border px-3' style={{ height: "230px" }}>
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
        <div className='col-md-7 border mb-5'>
          <div className=''>
            <div className='row border-bottom mb-3'>
              <p
                className='fw-semibold fs-6 ms-2'
                style={{
                  marginTop: "10px",
                  marginBottom: "6px",
                  borderBottom: `2px ${reuseAbleColor.pupple} solid`,
                  width: "100px",
                }}>
                Document
              </p>
            </div>
            <div className='row ps-2 gap-4'>
              <div className='col-lg-5 border'>Document 1</div>
              <div className='col-lg-5 border'>Document 2</div>
            </div>
            <div className='mt-4 ps-2 row gap-4'>
              <div className='col-lg-5 border'>Document 3</div>
              <div className='col-lg-5 border'>Document 4</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppraisalApplicantDetails;

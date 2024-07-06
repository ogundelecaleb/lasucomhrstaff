import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { BsArrowLeftShort, BsPhone } from "react-icons/bs";
import { TbMessage } from "react-icons/tb";
import { AiFillLinkedin, AiOutlineMail } from "react-icons/ai";
import JobApplicantTab from "./JobApplicantTab";

const ApplicantsDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const width = 75;
  const data = location.state;
// console.log("jopooooffff====>>",location.state.job)
  return (
    <div className=' px-4'>
      <div className='d-flex flex-wrap mt-3 align-items-center justify-content-between'>
        <div
          style={{ cursor: "pointer" }}
          onClick={() => navigate(-1)}
          className='d-flex align-items-center gap-2'>
          <BsArrowLeftShort size={"40"} />
          <p className=' fs-5 mt-3 '>Applicant Details</p>
        </div>
        <div>
          {" "}
         
        </div>
      </div>
      <div className='row my-4 pad-r-res'>
        <div className='col-lg-4 border mt-3' style={{ height: "700px" }}>
          <div className='d-flex gap-3 mt-3'>
            
            <div>
              <p className='fw-semibold fs-5'>{data.item.name}</p>
            
            </div>
          </div>
          <div className='py-2 px-3 ' style={{ backgroundColor: "#F8F8FD" }}>
            <div
              style={{ height: "30px" }}
              className='d-flex border-bottom align-items-start gap-4'>
              <p className=''>Applied Department</p>
              <p className='text-muted'>2 days ago</p>
            </div>
            <div className='mt-2'>
              <p className='fw-semibold fs-6'>{data.job?.department.name}</p>
              <p
                className='fw-semibold text-muted'
                style={{ marginTop: "-15px" }}>
              {data.job?.title}
              </p>
            </div>
          </div>
          <div
            className='py-2 px-3 mt-3'
            style={{ backgroundColor: "#F8F8FD" }}>
            <div className='d-flex justify-content-between'>
              <p>Stage</p>
              <div className='d-flex gap-2 '>
                <div
                  className='mt-2'
                  style={{
                    height: "8px",
                    width: "8px",
                    borderRadius: "50%",
                    backgroundColor: "#26A4FF",
                  }}></div>
                <p style={{ color: "#26A4FF" }}>Interview</p>
              </div>
            </div>
            <div style={{ width: "100%" }} id='progress-bar'>
              <div className='line'></div>
              <div
                style={{
                  backgroundColor: "#26A4FF",
                  height: "10px",
                  width: `${width}%`,
                }}></div>
            </div>
          </div>
          <div className='border-bottom mb-2 pb-3 mt-3 d-flex gap-3'>
            <div>
              <button
                style={{ width: "190px" }}
                className='border py-2 text-primary fw-semibold'>
                Schedule Interview
              </button>
            </div>
            <div className='border text-primary py-1 px-1'>
              <TbMessage size={"30"} />
            </div>
          </div>
          <div>
            <p className='fw-semibold fs-5'>Contact</p>
          </div>
          <div className='d-flex gap-2'>
            <AiOutlineMail size={"20px"} className='mt-1 text-muted' />
            <div>
              <p className='text-muted'>Email</p>
              <p className='' style={{ marginTop: "-17px" }}>
              {data?.item.email}
              </p>
            </div>
          </div>
          <div className='d-flex mt-1 gap-2'>
            <BsPhone size={"20px"} className='mt-1 text-muted' />
            <div>
              <p className='text-muted'>Phone</p>
              <p className='' style={{ marginTop: "-17px" }}>
                +234 1000 389 898
              </p>
            </div>
          </div>
          <div className='d-flex mt-1 gap-2'>
            <AiFillLinkedin size={"20px"} className='mt-1 text-muted' />
            <div>
              <p className='text-muted'>Linkedin</p>
              <p className='' style={{ marginTop: "-17px" }}>
                Linekdin.com/jeromebell
              </p>
            </div>
          </div>
        </div>
        <div className='col-lg-1' style={{ width: "80px" }}></div>
        <div
          className='col-lg-7 border mt-3 tb-res-parent'
          style={{ height: "950px" }}>
          {/* <div className='tb-res'> */}
          <JobApplicantTab data={data} />
          {/* </div> */}
        </div>
      </div>
    </div>
  );
};

export default ApplicantsDetails;

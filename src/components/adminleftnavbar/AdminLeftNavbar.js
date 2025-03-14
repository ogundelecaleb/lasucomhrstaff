import React from "react";
import "../dasLeftNav.css";
import schLogo from "../../asset/logo(small).svg";
import {
  MdDashboard,
  MdMoveToInbox,
  MdAccountTree,
  MdSupervisedUserCircle,
} from "react-icons/md";
import { IoMdCalendar, IoMdSettings } from "react-icons/io";
import { RxReload } from "react-icons/rx";
import { RiBubbleChartFill } from "react-icons/ri";
import { FcLeave } from "react-icons/fc";

import { HiUpload } from "react-icons/hi";
import { MdInsertChart } from "react-icons/md";
import { Link, useMatch, useResolvedPath, useNavigate } from "react-router-dom";
import { AiOutlineDown, AiOutlineUp } from "react-icons/ai";
import { useState } from "react";
import LogoutModal from "../../pages/adminpages/logout/Logout";
import { IoPlayBackOutline } from "react-icons/io5";
import { BiCalendar } from "react-icons/bi";

const AdminLeftNavbar = ({ mobile, setMobile }) => {
  const navigate = useNavigate();
  const dash1Style = { flexDirection: "column" };
  const [settingDropDown, setSettingDropDown] = useState(false);
  const [staffDropDown, setStaffDropDown] = useState(false);
  const [isLeave, setIsLeave] = useState(false);
  const [isJobs, setIsJobs] = useState(false);
  const [isReport, setIsReport] = useState(false);

  return (
    <div className={mobile ? "leftNav" : "swapLeftNav"}>
      <div
        // onClick={() => setMobile(true)}
        style={dash1Style}
        className="over-class d-flex gap-2 ps-2 pt-3 relative"
      >
        <button
          className=" text-white absolute top-2 right-2 xl:hidden"
          onClick={() => setMobile(!mobile)}
        >
          <i className="ms-3 fa fa-bars"></i>
        </button>
        <div className="d-flex justify-content-center pe-3 pb-2">
          <img src={schLogo} alt="schhol_image" />
        </div>
        <CustomLink to="/dashboard">
          <div
            id="hoverEffect"
            className="ps-3 ms-1 d-flex align-items-center rounded gap-2"
            style={{ height: "48px", width: "90%" }}
          >
            <MdDashboard size="25" style={{ color: "#84818A" }} />
            Dashboard
          </div>
        </CustomLink>

        <CustomLink to="settings">
          <div
            onClick={() => setSettingDropDown(!settingDropDown)}
            id="hoverEffect"
            className="ps-3 ms-1 d-flex align-items-center rounded gap-2 position-relative"
            style={{ height: "48px", width: "90%" }}
          >
            <IoMdSettings size="25" style={{ color: "#84818A" }} />
            Manage Staffs
            {settingDropDown ? (
              <AiOutlineUp className="position-absolute end-0 me-3" />
            ) : (
              <AiOutlineDown
                color="white"
                className="position-absolute end-0 me-3"
              />
            )}
          </div>
        </CustomLink>
        <div className={settingDropDown ? "d-block" : "d-none"}>
          <div className="d-flex flex-column align-items-center px-4">
            <Link
              to="settings/user-list"
              className="w-100 py-2 ps-2"
              style={{ borderBottom: "1px solid #2D1460" }}
            >
              Manage User
            </Link>
          </div>
          <div className="d-flex flex-column align-items-center px-4">
            <Link
              to="settings/add-supervisor"
              className="w-100 py-2 ps-2"
              style={{ borderBottom: "1px solid #2D1460" }}
            >
              Create Supervisors
            </Link>
          </div>
          <div className="d-flex flex-column align-items-center px-4">
              <Link
                to="settings/manage-supervising-office"
                className="w-100 py-2 ps-2 whitespace-nowrap"
                style={{ borderBottom: "1px solid #2D1460" }}
              >
                Manage Supervising Office
              </Link>
            </div>
          <div className="d-flex flex-column align-items-center px-4">
            <Link
              to="settings/assign-role"
              className="w-100 py-2 ps-2"
              style={{ borderBottom: "1px solid #2D1460" }}
            >
              Assign Designation
            </Link>
          </div>
          <div className="d-flex flex-column align-items-center px-4">
            <Link
              to="settings/faculty-list"
              className="w-100 py-2 ps-2"
              style={{ borderBottom: "1px solid #2D1460" }}
            >
              Manage Faculty
            </Link>
            </div>

         
            <div className="d-flex flex-column align-items-center px-4">

            <Link
              to="settings/department-list"
              className="w-100 py-2 ps-2"
              style={{ borderBottom: "1px solid #2D1460" }}
            >
              Manage Department
            </Link>
          </div>
          <div className="d-flex flex-column align-items-center px-4">
            <Link
              style={{ borderBottom: "1px solid #2D1460" }}
              className="w-100 py-2 px-2"
              to="settings/role-list"
            >
              Manage Role
            </Link>
          </div>
          <div className="d-flex flex-column align-items-center px-4">
            <Link
              style={{ borderBottom: "1px solid #2D1460" }}
              className="w-100 py-2 px-2"
              to="settings/manage-division"
            >
              Manage Division
            </Link>
          </div>
        </div>
        <div
          onClick={() => setIsJobs(!isJobs)}
          id="hoverEffect"
          className="ps-3 ms-1 d-flex align-items-center rounded gap-2 position-relative"
          style={{ height: "48px", width: "90%" }}
        >
          <MdSupervisedUserCircle size="25" style={{ color: "#84818A" }} />
          Jobs
          {isJobs ? (
            <AiOutlineUp className="position-absolute end-0 me-3" />
          ) : (
            <AiOutlineDown
              color="white"
              className="position-absolute end-0 me-3"
            />
          )}
        </div>
        <div className={isJobs ? "d-block" : "d-none"}>
          <div className="d-flex flex-column align-items-center px-4">
            <Link
              to="job-openings"
              className="w-100 py-2 ps-2"
              style={{ borderBottom: "1px solid #2D1460" }}
            >
              Create Jobs
            </Link>
          </div>
          <div className="d-flex flex-column align-items-center px-4">
            <Link
              to="availablejobs"
              className="w-100 py-2 ps-2"
              style={{ borderBottom: "1px solid #2D1460" }}
            >
              Job Applicants
            </Link>
          </div>
        </div>

        <div
          onClick={() => setIsLeave(!isLeave)}
          id="hoverEffect"
          className="ps-3 ms-1 d-flex align-items-center rounded gap-2 position-relative"
          style={{ height: "48px", width: "90%" }}
        >
          <BiCalendar size="25" style={{ color: "#84818A" }} />
          Leave
          {isLeave ? (
            <AiOutlineUp className="position-absolute end-0 me-3" />
          ) : (
            <AiOutlineDown
              color="white"
              className="position-absolute end-0 me-3"
            />
          )}
        </div>
        <div className={isLeave ? "d-block" : "d-none"}>
          <div className="d-flex flex-column align-items-center px-4">
            <Link
              to="/leave"
              className="w-100 py-2 ps-2"
              style={{ borderBottom: "1px solid #2D1460" }}
            >
              Leave Applications
            </Link>
          </div>
          <div className="d-flex flex-column align-items-center px-4">
            <Link
              to="/carryover-leave"
              className="w-100 py-2 ps-2"
              style={{ borderBottom: "1px solid #2D1460" }}
            >
              Carryover Leave
            </Link>
          </div>
          <div className="d-flex flex-column align-items-center px-4">
            <Link
              to="/recall-leave"
              className="w-100 py-2 ps-2"
              style={{ borderBottom: "1px solid #2D1460" }}
            >
              Recall Leave
            </Link>
          </div>
        </div>

        <div
          onClick={() => setIsReport(!isReport)}
          id="hoverEffect"
          className="ps-3 ms-1 d-flex align-items-center rounded gap-2 position-relative"
          style={{ height: "48px", width: "90%" }}
        >
          <MdInsertChart size="25" style={{ color: "#84818A" }} />
          Reports
          {isReport ? (
            <AiOutlineUp className="position-absolute end-0 me-3" />
          ) : (
            <AiOutlineDown
              color="white"
              className="position-absolute end-0 me-3"
            />
          )}
        </div>
        <div className={isReport ? "d-block" : "d-none"}>
          <div className="d-flex flex-column align-items-center px-4">
            <Link
              to="/age-report"
              className="w-100 py-2 ps-2"
              style={{ borderBottom: "1px solid #2D1460" }}
            >
              Age Distribution
            </Link>
          </div>
          <div className="d-flex flex-column align-items-center px-4">
            <Link
              to="/state-of-origin-report"
              className="w-100 py-2 ps-2"
              style={{ borderBottom: "1px solid #2D1460" }}
            >
              State Of Origin
            </Link>
          </div>
          <div className="d-flex flex-column align-items-center px-4">
            <Link
              to="/appointment-report"
              className="w-100 py-2 ps-2"
              style={{ borderBottom: "1px solid #2D1460" }}
            >
              Appointment Type
            </Link>
          </div>
          <div className="d-flex flex-column align-items-center px-4">
            <Link
              to="/active-staff-report"
              className="w-100 py-2 ps-2"
              style={{ borderBottom: "1px solid #2D1460" }}
            >
              Active Staff
            </Link>
          </div>
          <div className="d-flex flex-column align-items-center px-4">
            <Link
              to="/level-report"
              className="w-100 py-2 ps-2"
              style={{ borderBottom: "1px solid #2D1460" }}
            >
              Level Report
            </Link>
          </div>
          <div className="d-flex flex-column align-items-center px-4">
            <Link
              to="/report"
              className="w-100 py-2 ps-2"
              style={{ borderBottom: "1px solid #2D1460" }}
            >
              All Report
            </Link>
          </div>
        </div>

        {/*<CustomLink to='calender'>
          <div
            id='hoverEffect'
            className='d-flex ps-3 ms-1 align-items-center rounded gap-2'
            style={{ height: "48px", width: "90%" }}>
            <IoMdCalendar size='25' style={{ color: "#84818A" }} />
            Calender & Schedule
          </div>
        </CustomLink>
        <CustomLink to='inbox'>
          <div
            id='hoverEffect'
            className='ps-3 ms-1 d-flex align-items-center rounded gap-2'
            style={{ height: "48px", width: "90%" }}>
            <MdMoveToInbox size='25' style={{ color: "#84818A" }} />
            Inbox
          </div>
        </CustomLink>
         */}
        {/* <CustomLink to='event'>
          <div
            id='hoverEffect'
            className='ps-3 ms-1 d-flex align-items-center rounded gap-2'
            style={{ height: "48px", width: "90%" }}>
            <RiBubbleChartFill size='25' style={{ color: "#84818A" }} />
            Events/Training
          </div>
        </CustomLink> */}
        {/* <p className='text-muted ms-4 mt-2' style={{ marginBottom: "5px" }}>
          Organization
        </p>
        <CustomLink to='job-openings'>
          <div
            id='hoverEffect'
            className='ps-3 ms-1 d-flex align-items-center rounded gap-2'
            style={{ height: "48px", width: "90%" }}>
            <MdAccountTree size='25' style={{ color: "#84818A" }} />
            Job Openings
          </div>
        </CustomLink>
        <CustomLink to='availablejobs'>
          <div
            id='hoverEffect'
            className='ps-3 ms-1 d-flex align-items-center rounded gap-2'
            style={{ height: "48px", width: "90%" }}>
            <MdSupervisedUserCircle size='25' style={{ color: "#84818A" }} />
            Job Applicants
          </div>
        </CustomLink>
        <CustomLink to='leave'>
          <div
            id='hoverEffect'
            className='ps-3 ms-1 d-flex align-items-center rounded gap-2'
            style={{ height: "48px", width: "90%" }}>
            <FcLeave size='25' style={{ color: "#84818A" }} />
            Leave
          </div>
        </CustomLink>
        <Link to='/carryover-leave'>
          <div
            id='hoverEffect'
            className='ps-3 ms-1 d-flex align-items-center rounded gap-2'
            style={{ height: "48px", width: "90%" }}>
            <RxReload size='25' style={{ color: "#84818A" }} />
            Leave Carryover
          </div>
        </Link>

        <Link to='/recall-leave'>
          <div
            id='hoverEffect'
            className='ps-3 ms-1 d-flex align-items-center rounded gap-2'
            style={{ height: "48px", width: "90%" }}>
            <IoPlayBackOutline size='25' style={{ color: "#84818A" }} />
            Recall Leave
          </div>
        </Link> */}
        <CustomLink to="retirement">
          <div
            id="hoverEffect"
            className="ps-3 ms-1 d-flex align-items-center rounded gap-2"
            style={{ height: "48px", width: "90%" }}
          >
            <HiUpload size="25" style={{ color: "#84818A" }} />
            Retirement
          </div>
        </CustomLink>

        {/* <CustomLink to='promotion'>
          <div
            id='hoverEffect'
            className='ps-3 ms-1 d-flex align-items-center rounded gap-2'
            style={{ height: "48px", width: "90%" }}>
            <HiUpload size='25' style={{ color: "#84818A" }} />
            Promotions
          </div>
        </CustomLink>
        <CustomLink to='report'>
          <div
            id='hoverEffect'
            className='ps-3 ms-2 d-flex align-items-center rounded gap-2'
            style={{ height: "48px", width: "90%" }}>
            <MdInsertChart size='25' style={{ color: "#84818A" }} />
            Report
          </div>
        </CustomLink> */}
        {/* <p className='text-muted ms-4 mt-1' style={{ marginBottom: "0" }}>
          Others
        </p> */}

        {/* <CustomLink to='get-help'>
          <div
            id='hoverEffect'
            className='ps-3 ms-1 d-flex align-items-center rounded gap-2'
            style={{ height: "48px", width: "90%" }}>
            <MdMoveToInbox size='25' style={{ color: "#84818A" }} />
            Get Help
          </div>
        </CustomLink> */}
        <LogoutModal />
      </div>
    </div>
  );

  function CustomLink({ to, children, ...props }) {
    const resolvedpath = useResolvedPath(to);
    const isActive = useMatch({ path: resolvedpath.pathname, end: true });
    return (
      <div id={isActive ? "active" : ""}>
        <div className={isActive ? "ss bg-white" : "d-none"}></div>
        <Link to={to} {...props}>
          {children}
        </Link>
      </div>
    );
  }
};
export default AdminLeftNavbar;

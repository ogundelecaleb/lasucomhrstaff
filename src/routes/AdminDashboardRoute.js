import React from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Leave from "../pages/adminpages/leave/Leave";
import MainAdminDashboard from "../pages/dashboards/MainAdminDashboard";
// import Promotion from "../pages/adminpages/promotion/Promotion";
import Retirement from "../pages/adminpages/retirement/Retirement";
// import JobApplicants from "../pages/adminpages/job-applicants/JobApplicants";
import JobApplicantsRoutes from "./JobApplicantsRoutes";
import AdminSettingsRoute from "./AdminSettingsRoute";
// import Inbox from "../pages/adminpages/inbox/Inbox";
import Calender from "../pages/adminpages/calender/Calender";
import Event from "../pages/adminpages/event/Event";
import Report from "../pages/adminpages/report/Report";
// import Staff from "../pages/adminpages/staff/Staff";
import AdminStaffRoute from "./AdminStaffRoute";
import LeaveApplicantDetails from "../pages/adminpages/leave/LeaveApplicantDetails";
import AdminboxRoute from "./AdminboxRoute";
import Profile from "../pages/adminpages/profile/Profile";
import EditProfile from "../pages/adminpages/profile/editprofile/EditProfile";
import SecondEditProfile from "../pages/adminpages/profile/editprofile/SecondEditProfile";
import ChangePassword from "../pages/adminpages/profile/changepassword/ChangePassword";
import ChangeEmail from "../pages/adminpages/profile/changeemail/ChangeEmail";
// import Staff from "../pages/staffpages/staff/Staff";
import { Notification } from "../pages/adminpages/notification/Notification";
import JobOpening from "../pages/adminpages/jobpenings/JobOpening";
import ApplicantsDetails from "../pages/adminpages/job-applicants/ApplicantsDetails";
import AvailableJobs from "../pages/adminpages/job-applicants/AvailableJobs";
import JobApplicants from "../pages/adminpages/job-applicants/JobApplicants";
import CarryOverLeave from "../pages/adminpages/leave/CarryOverLeave";
import RecallLeave from "../pages/adminpages/leave/RecallLeave";
import AgeReport from "../pages/adminpages/report/AgeReport";
import StateOfOriginReport from "../pages/adminpages/report/stateOfOriginReport";
import LevelReport from "../pages/adminpages/report/LevelReport";
import ActiveStaffReport from "../pages/adminpages/report/ActiveStaffReport";
import AppointmentReport from "../pages/adminpages/report/AppointmentReport";
import AddSupervisinfOffice from "../pages/adminpages/settings/AddSupervisinfOffice";

const AdminDashboardRoute = ({ mobile, setMobile, display }) => {
  // const navigate = useNavigate();
  // const handleNavigate = () => {
  //   navigate("leaveSecond");
  // };
  // const submitted = () => {
  //   navigate("Submitted");
  // };
  const navigate = useNavigate();
  const reuseableNavigation = (page) => {
    navigate(page);
    return;
  };

  return (
    <div className="rightBody  text-dark">
      <Navbar
        mobile={mobile}
        reuseableNavigation={reuseableNavigation}
        setMobile={setMobile}
        display={display}
      />
      <Routes>
        <Route path="/dashboard" element={<MainAdminDashboard />} />
        <Route path="/leave" exact element={<Leave />} />
        <Route
          path="leave/leave-applicant-details/:id"
          exact
          element={<LeaveApplicantDetails />}
        />
        <Route
          path="/job-openings"
          element={<JobOpening reuseableNavigation={reuseableNavigation} />}
        />
         <Route
          path="/age-report"
          element={<AgeReport />}
        />
        {/* <Route path="/promotion/*" exact element={<Promotion />} /> */}
        <Route path="/retirement" exact element={<Retirement />} />
        <Route path="/staff/*" exact element={<AdminStaffRoute />} />
        <Route path="calender" exact element={<Calender />} />
        <Route path="/carryover-leave" element={<CarryOverLeave />} />
        <Route path="/recall-leave" element={<RecallLeave />} />

        <Route
          path="/job-applicants/*"
          exact
          element={<JobApplicantsRoutes />}
        />
        <Route
          reuseableNavigation={reuseableNavigation}
          path="/availablejobs"
          element={<AvailableJobs />}
        />
        <Route
          reuseableNavigation={reuseableNavigation}
          path="/jobapplicants"
          element={<JobApplicants />}
        />

        <Route
          path="/applicant-detail"
          element={
            <ApplicantsDetails reuseableNavigation={reuseableNavigation} />
          }
        />

        <Route path="/report" element={<Report />} />
        <Route path="/state-of-origin-report" element={<StateOfOriginReport />} />
        <Route path="/level-report" element={<LevelReport />} />
        <Route path="/active-staff-report" element={<ActiveStaffReport />} />
        <Route path="/appointment-report" element={<AppointmentReport />} />
        <Route path="/event" element={<Event />} />
        <Route path="settings/*" element={<AdminSettingsRoute />} />
        <Route path="inbox/*" element={<AdminboxRoute />} />
        <Route
          path="profile"
          element={<Profile reuseableNavigation={reuseableNavigation} />}
        />
        <Route
          path="/notification"
          element={<Notification reuseableNavigation={reuseableNavigation} />}
        />
        <Route
          path="/edit-profile"
          element={<EditProfile reuseableNavigation={reuseableNavigation} />}
        />
        <Route
          path="/second-edit-profile"
          element={
            <SecondEditProfile reuseableNavigation={reuseableNavigation} />
          }
        />
        <Route
          path="/change-password"
          element={<ChangePassword reuseableNavigation={reuseableNavigation} />}
        />
        <Route
          path="/change-email"
          element={<ChangeEmail reuseableNavigation={reuseableNavigation} />}
        />
        
      </Routes>
    </div>
  );
};

export default AdminDashboardRoute;

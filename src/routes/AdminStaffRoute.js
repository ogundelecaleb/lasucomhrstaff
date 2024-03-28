import React from "react";
import Staff from "../pages/adminpages/staff/Staff";
import { Route, Routes } from "react-router-dom";
import PermanentStaff from "../pages/adminpages/staff/PermanentStaff";
import TemporaryRegularizedAppointment from "../pages/adminpages/staff/TemporaryRegularizedAppointment";
import ContractStaff from "../pages/adminpages/staff/ContractStaff";
import TemporaryStaff from "../pages/adminpages/staff/TemporaryStaff";
import ConfirmedAppointment from "../pages/adminpages/staff/ConfirmedAppointment";
import TemporaryAplicantDetails from "../pages/adminpages/staff/TemporaryAplicantDetails";
import ConfirmedApplicantsInformation from "../pages/adminpages/staff/ConfirmedApplicantsInformation";
import WithrawedAppointmentDetails from "../pages/adminpages/staff/WithrawedAppointmentDetails";
import WithdrawalAppointment from "../pages/adminpages/staff/WithdrawalAppointment";
import StaffAppraisal from "../pages/adminpages/staff/StaffAppraisal";
import AppraisalApplicantDetails from "../pages/adminpages/staff/AppraisalApplicantDetails";
// import StaffAppraisal from "../pages/adminpages/staff/StaffAppraisal";

const AdminStaffRoute = () => {
  return (
    <Routes>
      {/* <Route path='/' element={<Staff />} /> */}
      <Route path='permanent-staff' element={<PermanentStaff />} />
      <Route path='contract-staff' element={<ContractStaff />} />
      <Route path='temporary-staff' element={<TemporaryStaff />} />
      <Route path='confirmed-appointments' element={<ConfirmedAppointment />} />
      <Route path='/' element={<StaffAppraisal />} />
      <Route
        path='applicant-details/:id'
        element={<AppraisalApplicantDetails />}
      />
      <Route
        path='permanent-staff/applicant-details/:id'
        element={<AppraisalApplicantDetails />}
      />
      <Route
        path='contract-staff/applicant-details/:id'
        element={<AppraisalApplicantDetails />}
      />
      <Route
        path='temporary-staff/applicant-details/:id'
        element={<AppraisalApplicantDetails />}
      />
      <Route
        path='withrawal-appointments'
        element={<WithdrawalAppointment />}
      />
      <Route
        path='temporary-regularized-appointment/temporary-applicant-details/:id'
        element={<TemporaryAplicantDetails />}
      />
      <Route
        path='confirmed-appointments/confirmed-applicant-details/:id'
        element={<ConfirmedApplicantsInformation />}
      />
      <Route
        path='temporary-regularized-appointment'
        element={<TemporaryRegularizedAppointment />}
      />
      <Route
        path='withrawal-appointments/withrawal-appointment-details/:id'
        element={<WithrawedAppointmentDetails />}
      />
    </Routes>
  );
};

export default AdminStaffRoute;

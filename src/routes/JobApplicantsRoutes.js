import React from "react";
import { Route, Routes } from "react-router-dom";
import JobApplicants from "../pages/adminpages/job-applicants/JobApplicants";
import ApplicantsDetails from "../pages/adminpages/job-applicants/ApplicantsDetails";

const JobApplicantsRoutes = () => {
  return (
    <Routes>
      <Route path='/' element={<JobApplicants />} />
      <Route path='applicant-detail/:id' element={<ApplicantsDetails />} />
    </Routes>
  );
};

export default JobApplicantsRoutes;

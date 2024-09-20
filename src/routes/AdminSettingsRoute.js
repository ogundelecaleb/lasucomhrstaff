import React from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import Settings from "../pages/adminpages/settings/Settings";
import AddUser from "../pages/adminpages/settings/AddUser";
import UserList from "../pages/adminpages/settings/UserList";
import PermissionSetup from "../pages/adminpages/settings/PermissionSetup";
import AddRole from "../pages/adminpages/settings/AddRole";
import RoleList from "../pages/adminpages/settings/RoleList";
import AssignRoleToUser from "../pages/adminpages/settings/AssignRoleToUser";
import AddDepartment from "../pages/adminpages/settings/AddDepartment";
import AddFaculty from "../pages/adminpages/settings/AddFaculty";
import DepartmentList from "../pages/adminpages/settings/DepartmentList";
import FacultyList from "../pages/adminpages/settings/FacultyList";
import { ManageDivision, UnitList } from "../pages/adminpages/settings/ManageDivision";
import { AddDivision, AddUnit } from "../pages/adminpages/settings/AddDivision";
import EditFaculty from '../pages/adminpages/settings/EditFaculty'; 
import EditDepartment from '../pages/adminpages/settings/EditDepartment';
import EditRole from '../pages/adminpages/settings/EditRole';
import EditUser from "../pages/adminpages/settings/EditUser";
import PersonalRecord from "../pages/adminpages/settings/personalrecord/PersonalRecord";
import EditDivision from "../pages/adminpages/settings/EditDivision";
import CarryOverLeave from "../pages/adminpages/leave/CarryOverLeave";

const AdminSettingsRoute = () => {
  const navigate = useNavigate();
  const navigateWithParams = (page, id) => {
    navigate(`${page}/${id}`);
  };
  return (
    <div>
      <Routes>
        <Route path='/' element={<Settings />} />
        <Route path='add-user' element={<AddUser />} />
        <Route path='user-list' element={<UserList />} />
        <Route path='permission-setup' element={<PermissionSetup />} />
        <Route path='add-role' element={<AddRole />} />
        <Route path='role-list' element={<RoleList />} />
        <Route path='add-department' element={<AddDepartment />} />
        <Route path='add-faculty' element={<AddFaculty />} />
        <Route path='edit-faculty/:id' element={<EditFaculty />} />
        <Route path='edit-department/:id' element={<EditDepartment />} />
        <Route path='edit-role/:id' element={<EditRole />} />
        <Route path='edit-user/:id' element={<EditUser />} />
        <Route path='department-list' element={<DepartmentList />} />
        <Route path='faculty-list' element={<FacultyList />} />
        <Route path='role-list' element={<RoleList />} />
        <Route path='manage-division' element={<ManageDivision />} />
        <Route path='add-division' element={<AddDivision />} />
        <Route path='edit-division/:id' element={<EditDivision/>} />
        <Route path='user-access-role' element={<AssignRoleToUser />}/>
        <Route path='staff-record/:id' element={<PersonalRecord />}/>
      </Routes>
    </div>
  );
};

export default AdminSettingsRoute;

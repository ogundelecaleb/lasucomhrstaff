import {
  GETDEPARTMENTS,
  CREATEDEPARTMENTS,
  DEPARTMENTSBYID,
  UPDATEDEPARTMENT,
  DELETEDEPARTMENT,
  DISPLAYALLDEPARTMENT,
  GETFACULTY,
  CREATEFACULTY,
  FACULTYBYID,
  UPDATEFACULTY,
  DELETEFACULTY,
  DISPLAYALLFACULTY,
  GETRANKS,
  CREATERANKS,
  RANKBYID,
  UPDATERANKS,
  DELETERANKS,
  DISPLAYALLRANKS,
  CREATEROLE,
  ADDUSER,
  GETROLE,
  DELETEROLE,
  UPDATEROLE,
  ROLEBYID,
  GETUSERS,
  DELETEUSER,
  UPDATEUSERROLE,
  GETUSERBYID,
  ALLLEAVE,
  UPDATEUSER,
  GETLEAVEBYID,
  CREATEUNIT,
  GETDASHBAORD,
  GETDIVISION,
  DIVISIONBYID,
  DELETEDIVISION,
  UPDATEDIVISION,
  DISPLAYDEPARTMENTS,
  DISPLAYFACULTIES,
  CREATEJOB,
  FETCHJOBS,
  EDITJOBS,
  DELETEJOBS,
  APPLYJOB
} from "../utils/config";
import { apiGet, apiPost, apiPut, apiDelete } from "../utils/utils";

// clients

export function getDashboard(data = null) {
  return apiGet(GETDASHBAORD, data);
}

export function getDepartments(data = null) {
  return apiGet(GETDEPARTMENTS, data);
}

export function createDepartment(data) {
  return apiPost(CREATEDEPARTMENTS, data);
}

export function getDepartmentsbyid(data = null) {
  return apiGet(DEPARTMENTSBYID + data);
}

export function updateDepartment(data) {
  return apiPut(UPDATEDEPARTMENT + data.id,data);
}

export function deleteDepartment(data) {
  return apiDelete(DELETEDEPARTMENT, data);
}
export function fethDeparments(data) {
  return apiGet(DISPLAYALLDEPARTMENT, data);
}

export function fethallDeparments(data) {
  return apiGet(DISPLAYDEPARTMENTS, data);
}

//faculty

export function getFaculty(data = null) {
  return apiGet(GETFACULTY, data);
}

export function createFaculty(data) {
  return apiPost(CREATEFACULTY, data);
}

export function getFacultybyid(data = null) {
  return apiGet(FACULTYBYID + data);
}

export function updateFaculty(data) {
  return apiPut(UPDATEFACULTY +  data.id,data);
}

export function deleteFaculty(data) {
  return apiDelete(DELETEFACULTY + data);
}
export function fetchFaculties(data) {
  return apiGet(DISPLAYALLFACULTY, data);
}

export function fethallFaculties(data) {
  return apiGet(DISPLAYFACULTIES, data);
}

// Roles

export function getRanks(data = null) {
  return apiGet(GETRANKS, data);
}

export function createRanks(data) {
  return apiPost(CREATERANKS, data);
}

export function getRanksbyid(data = null) {
  return apiGet(RANKBYID, data);
}

export function updateRanks(data) {
  return apiPut(UPDATERANKS, data);
}

export function deleteRanks(data) {
  return apiDelete(DELETERANKS, data);
}
export function fetchRanks(data) {
  return apiGet(DISPLAYALLRANKS, data);
}

export function createRole(data) {
  return apiPost(CREATEROLE, data);
}

export function fetchRole(data) {
  return apiGet(GETROLE, data);
}

export function fetchRoleById(data) {
  return apiGet(ROLEBYID + data);
}

export function deleteRole(data) {
  return apiDelete(DELETEROLE + data);
}

export function updateRole(data) {
  return apiPut(UPDATEROLE + data.staffId, data);
}

export function updateUserRole(data) {
  return apiPut(UPDATEUSERROLE + data.staffId,data);
}

//division
export function fetchDivision(data) {
  return apiGet(GETDIVISION, data);
}

export function createDivision(data) {
  return apiPost(GETDIVISION, data);
}

export function fetchDivisionById(data) {
  return apiGet(DIVISIONBYID + data);
}

export function deleteDivision(data) {
  return apiDelete(DELETEDIVISION + data);
}

export function updateDivision(data) {
  return apiPut(UPDATEDIVISION + data);
}
// USERS

export function addUser(data) {
  return apiPost(ADDUSER, data);
}

export function updateUser(data) {
  return apiPut(UPDATEUSER + data.staffId,data);
}

export function fetchUsers(data) {
  return apiGet(GETUSERS, data);
}

export function deleteUser(data) {
  return apiDelete(DELETEUSER + data);
}

export function getUserbyid(data = null) {
  return apiGet(GETUSERBYID + data);
}

export function fetchLeaves(data) {
  return apiGet(ALLLEAVE, data);
}

export function getLeavebyID(data) {
  return apiGet(GETLEAVEBYID + data);
}

//divisions

export function createUnit(data) {
  return apiPost(CREATEUNIT, data);
}

export function createJob(data) {
  return apiPost(CREATEJOB, data);
}


export function fetchJobs(data) {
  return apiGet(FETCHJOBS, data);
}

export function editJobs(data) {
  return apiGet(EDITJOBS + data);
}

export function deleteJobs(data) {
  return apiGet(DELETEJOBS + data);
}

export function applyJob(data) {
  return apiPost(APPLYJOB, data, { 'Content-Type': 'multipart/form-data' });
}
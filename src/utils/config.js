
export const API_BASE_URL = 'https://lasucom.iccflifeskills.com.ng/api';
export const getApiUrl = (endpoint) => API_BASE_URL + endpoint

export const GETDASHBAORD = getApiUrl('/dashboard')
export const GETDEPARTMENTS = getApiUrl('/departments')
export const CREATEDEPARTMENTS = getApiUrl('/departments')
export const DEPARTMENTSBYID = getApiUrl('/departments/')
export const UPDATEDEPARTMENT = getApiUrl('/departments/')
export const DELETEDEPARTMENT = getApiUrl('/departments/')
export const DISPLAYALLDEPARTMENT = getApiUrl('/departments')
export const DISPLAYDEPARTMENTS = getApiUrl('/all-departments')

export const GETFACULTY = getApiUrl('/faculties')
export const CREATEFACULTY = getApiUrl('/faculties')
export const FACULTYBYID = getApiUrl('/faculties/')
export const UPDATEFACULTY = getApiUrl('/faculties/')
export const DELETEFACULTY = getApiUrl('/faculties/')
export const DISPLAYALLFACULTY = getApiUrl('/faculties')
export const DISPLAYFACULTIES = getApiUrl('/all-faculties')

export const GETRANKS = getApiUrl('/ranks')
export const CREATERANKS = getApiUrl('/ranks')
export const RANKBYID = getApiUrl('/faculties/')
export const UPDATERANKS = getApiUrl('/faculties/')
export const DELETERANKS = getApiUrl('/faculties/')
export const DISPLAYALLRANKS = getApiUrl('/faculties')

export const CREATEROLE = getApiUrl('/roles')
export const GETROLE = getApiUrl('/roles')
export const DELETEROLE = getApiUrl('/roles/')
export const ROLEBYID = getApiUrl('/roles/')
export const UPDATEROLE = getApiUrl('/roles/')
export const UPDATEUSERROLE = getApiUrl('/update-staff-role/')

export const CREATEDIVISION = getApiUrl('/units')
export const GETDIVISION = getApiUrl('/units')
export const DELETEDIVISION = getApiUrl('/units/')
export const DIVISIONBYID = getApiUrl('/units/')
export const UPDATEDIVISION = getApiUrl('/units/')

export const ADDUSER = getApiUrl('/staffs')
export const UPDATEUSER = getApiUrl('/staffs/')
export const GETUSERS = getApiUrl('/staffs')
export const DELETEUSER = getApiUrl('/staffs/')
export const GETUSERBYID = getApiUrl('/staffs/')
export const ALLLEAVE = getApiUrl('/all-leave')

export const GETLEAVEBYID = getApiUrl('/leave/')

export const CREATEUNIT = getApiUrl('/units')
export const CREATEJOB = getApiUrl('/jobs')
export const FETCHJOBS = getApiUrl('/all-jobs')
export const DELETEJOBS = getApiUrl("/jobs/")
export const EDITJOBS = getApiUrl("/Jobs/");
export const APPLYJOB = getApiUrl("/apply");
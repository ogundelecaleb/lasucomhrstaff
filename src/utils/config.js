
//export const API_BASE_URL = 'https://hrmdev.devapi.live/api';
export const API_BASE_URL = 'https://hrm.devapi.live/api';
export const getApiUrl = (endpoint) => API_BASE_URL + endpoint

export const GETDASHBAORD = getApiUrl('/dashboard')
export const GETDEPARTMENTS = getApiUrl('/departments')
export const CREATEDEPARTMENTS = getApiUrl('/departments')
export const DEPARTMENTSBYID = getApiUrl('/departments/')
export const UPDATEDEPARTMENT = getApiUrl('/departments/')
export const DELETEDEPARTMENT = getApiUrl('/departments/')
export const DISPLAYALLDEPARTMENT = getApiUrl('/departments')
export const DISPLAYDEPARTMENTS = getApiUrl('/all-departments')
export const GETROLES = getApiUrl('/roles')

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
export const FETCHAPPLICANTS = getApiUrl("/job-applications/");
export const REVIEW = getApiUrl("/job-application/review-shortlist/");
export const CBT = getApiUrl("/job-application/cbt-interview/");
export const INTERVIEW = getApiUrl("/job-application/interview/");
export const HIRE = getApiUrl("/job-application/hire_or_decline_applicant/");
export const CARRYOVER = getApiUrl("/add-unused-leave-to-current-year");
export const ASSIGNROLE = getApiUrl("/assign-role");
export const STAFFONLEAVE = getApiUrl('/user-leave-status')
export const RECALLSTAFF = getApiUrl('/recall-leave-user')
export const CREATESUPERVISOR = getApiUrl('/create-supervisor')
export const CREATERETIREMENTAGE = getApiUrl('/settings/age')
export const FETCHRETIREMENTAGE = getApiUrl('/settings/platform-default-age')
export const GETAGEREPORT = getApiUrl('/filter/age')
export const GETSTATEOFORIGINREPORT = getApiUrl('/filter/state-of-origin')
export const GETACTIVESTAFFS = getApiUrl('/filter/status')
export const GETLLEVELREPORT = getApiUrl('/filter/level')
export const GETAPPOINTMENTREPORT = getApiUrl('/filter/appointment-status')
export const UPDATEPINFO = getApiUrl('/update-personal-information')
export const UPDATECINFO = getApiUrl('/update-contact-information')
export const UPDATENOK = getApiUrl('/update-next-of-kin')
export const UPDATEFINFO = getApiUrl('/update-family-details')
export const UPDATEAINFO = getApiUrl('/update-academic-details')
export const ALLSTAFFS = getApiUrl('/all-lasucom-staffs')
export const ASIGNSUPERVISOR = getApiUrl('/assign-staff-to-head-supervision-office')
export const GETALLOFFICE = getApiUrl('/supervisor-offices')
export const CREATEOFFICE = getApiUrl('/create-supervisor-offices')





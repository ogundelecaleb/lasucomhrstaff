import React, { useEffect, useRef, useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { reuseAbleColor } from "../../../components/Color";
import { Navigate, useNavigate } from "react-router-dom";
import api from "../../../api";
import { useSnackbar } from "notistack";
import { MoonLoader } from "react-spinners";


const AddRole = () => {

  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const [isLoading, setIsLoading] = useState(false);

  const [roleName, setRoleName] = useState("");
  const [description, setDescription] = useState("")

  // const [leavePermissions, setLeavePermissions] = useState([
  //   { title: 'Annual Leave', canCreate: false, canEdit: false, canDelete: false },
  //   { title: 'Maternity leave', canCreate: false, canEdit: false, canDelete: false },
  //   { title: 'Paternity leave', canCreate: false, canEdit: false, canDelete: false },
  //   { title: 'Study leave', canCreate: false, canEdit: false, canDelete: false },
  //   { title: 'Training leave', canCreate: false, canEdit: false, canDelete: false },
  //   { title: 'Research leave', canCreate: false, canEdit: false, canDelete: false },
  //   { title: 'Casual leave', canCreate: false, canEdit: false, canDelete: false },
  //   { title: 'Resumption leave', canCreate: false, canEdit: false, canDelete: false },
  //   { title: 'Compasssionate leave', canCreate: false, canEdit: false, canDelete: false },
  //   { title: 'Adoption leave', canCreate: false, canEdit: false, canDelete: false },
  //   { title: 'Sick leave', canCreate: false, canEdit: false, canDelete: false },
  //   { title: 'Sabbatical leave', canCreate: false, canEdit: false, canDelete: false },
  //   { title: 'leave of Absence', canCreate: false, canEdit: false, canDelete: false },
  //   { title: 'Permission to be away', canCreate: false, canEdit: false, canDelete: false },
  //   { title: 'Resumptoion of leave', canCreate: false, canEdit: false, canDelete: false },
  // ]);

  // const [promotionPermissions, setPromotionPermissions] = useState([
  //   { title: 'Promotions Applications	', canCreate: false, canEdit: false, canDelete: false },
  // ]);

  // const [appointmentPermissions, setAppointmentPermissions] = useState([
  //   { title: 'Assumption of duty', canCreate: false, canEdit: false, canDelete: false },
  //   { title: 'Staff Records', canCreate: false, canEdit: false, canDelete: false },
  //   { title: 'Regularization', canCreate: false, canEdit: false, canDelete: false },
  //   { title: 'Confirmation', canCreate: false, canEdit: false, canDelete: false },
  //   { title: 'Withdrawal', canCreate: false, canEdit: false, canDelete: false },
  //   { title: 'Staff Appraisal', canCreate: false, canEdit: false, canDelete: false },
  // ]);
  
  // const [noticeboardPermissions, setNoticeBoardPermissions] = useState([
  //   { title: 'Add notifications', canCreate: false, canEdit: false, canDelete: false },
  // ]);
  
  // const [eventsPermissions, setEventsPermissions] = useState([
  //   { title: 'Add Events', canCreate: false, canEdit: false, canDelete: false },
  // ]);

  // const [employeePermissions, setEmployeePermissions] = useState([
  //   { title: 'Add Employee', canCreate: false, canEdit: false, canDelete: false },
  //   { title: 'Employee performance', canCreate: false, canEdit: false, canDelete: false },
  // ]);

  // const [reportPermissions, setReportPermissions] = useState([
  //   { title: 'Add reports', canCreate: false, canEdit: false, canDelete: false },
  // ]);

  // const handlePermissionChange = (section, index, field) => {
  //   let updatedPermissions;
  
  //   switch (section) {
  //     case 'promotion':
  //       updatedPermissions = [...promotionPermissions];
  //       break;
  //     case 'leave':
  //       updatedPermissions = [...leavePermissions];
  //       break;
  //     case 'appointment':
  //       updatedPermissions = [...appointmentPermissions];
  //       break;
  //     case 'noticeboard':
  //       updatedPermissions = [...noticeboardPermissions];
  //       break;
  //     case 'events':
  //       updatedPermissions = [...eventsPermissions];
  //       break;
  //     case 'employee':
  //       updatedPermissions = [...employeePermissions];
  //       break;
  //     case 'report':
  //       updatedPermissions = [...reportPermissions];
  //       break;
  //     // Add cases for other sections as needed
  //     default:
  //       return;
  //   }
  
  //   updatedPermissions[index][field] = !updatedPermissions[index][field];
    
  //   // Update the state based on the section
  //   switch (section) {
  //     case 'promotion':
  //       setPromotionPermissions(updatedPermissions);
  //       break;
  //     case 'leave':
  //       setLeavePermissions(updatedPermissions);
  //       break;
  //     case 'appointment':
  //       setAppointmentPermissions(updatedPermissions);
  //       break;
  //     case 'noticeboard':
  //       setNoticeBoardPermissions(updatedPermissions);
  //       break;
  //     case 'events':
  //      setEventsPermissions(updatedPermissions);
  //       break;
  //     case 'employee':
  //       setEmployeePermissions(updatedPermissions);
  //       break;
  //     case 'report':
  //      setReportPermissions(updatedPermissions);
  //       break;  
  //     default:
  //       return;
  //   }
  // };
  

  async function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await api.createRole({ name:roleName, description });
      console.log("res of action==>>>>>", response);
      enqueueSnackbar("Role added successfully", { variant: "success" });
      setIsLoading(false);
      setDescription("");
      setRoleName("");
    } catch (error) {
      console.log(error)
      enqueueSnackbar(error.message, { variant: "error" });
      setIsLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className='pb-3 mb-5 shadow  mt-5 mx-5'>
        <p className='border-bottom mb-5 fs-4 fw-semibold ps-4 py-3'>Add Role</p>
        <div className='px-4'>
          
          <div className='my-5 form-group row'>
            <label
              for='rolename'
              className=' fs-5 fw-semibold col-lg-2 col-form-label'>
              Role Name<sup className='text-danger'>*</sup>
            </label>
            <div className='col-lg-8'>
              <input
                style={{ height: "60px" }}
                type='text'
                value={roleName}
                onChange={(e) => setRoleName(e.target.value)}
                className='form-control rounded-0'
                placeholder='Input title'
              />
            </div>
          </div>
          <div className='my-5 form-group row'>
            <label
              for='description'
              className=' fs-5 fw-semibold col-lg-2 col-form-label'>
              Description<sup className='text-danger'>*</sup>
            </label>
            <div className='col-lg-8'>
              <input
                style={{ height: "60px" }}
                type='text'
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className='form-control rounded-0'
                placeholder='Input description'
              />
            </div>
          </div>
            
        </div>

        {/* Leave permission */}
        {/* <p className=' mb-3 fs-4 fw-semibold ps-4 pt-3'>Leave</p>
        <div className='tb-res-parent px-3'>
          <div className='tb-res'>
            <table className='table table-bordered' style={{ fontSize: "17px" }}>
              <thead>
                <tr className=''>
                  <th
                    scope='col'
                    className='text-center'
                    style={{ height: "55px" }}>
                    S/N
                  </th>
                  <th scope='col' className='text-center'>
                    Permission Title
                  </th>
                  <th scope='col' className='text-center'>
                    Can Create
                  </th>
                  <th scope='col' className='text-center'>
                    Can Edit
                  </th>
                  <th scope='col' className='text-center'>
                    Can Delete
                  </th>
                </tr>
              </thead>
              <tbody className=''>
              {leavePermissions.map((permission, index) => (
                <tr key={index}>
                  <td className='pt-4'>{index + 1}</td>
                  <td className='pt-4'>{permission.title}</td>
                  <td className='pt-4 text-center'>
                    <input
                     type='checkbox'
                     className='form-check-input'
                     checked={permission.canCreate}
                     onChange={() => handlePermissionChange('leave',index, 'canCreate')}
                    />
                  </td>
                  <td className='pt-4 text-center'>
                    <input
                      type='checkbox'
                      className='form-check-input'
                      checked={permission.canEdit}
                      onChange={() => handlePermissionChange('leave', index, 'canEdit')}
                    />
                  </td>
                  <td className='pt-4 text-center'>
                    <input
                      type='checkbox'
                      className='form-check-input'
                      checked={permission.canDelete}
                      onChange={() => handlePermissionChange('leave', index, 'canDelete')}
                    />
                  </td>
                </tr>
              ))}
              </tbody>
            </table>
          </div>
        </div> */}
        {/* Leave permission */}


        {/* Promotion Permission */}
        {/* <p className=' mb-3 fs-4 fw-semibold ps-4 pt-4'>Promotions</p>
        <div className='tb-res-parent px-3'>
          <div className='tb-res' style={{ fontSize: "17px" }}>
            <table className='table table-bordered'>
              <thead>
                <tr className=''>
                  <th
                    scope='col'
                    className='text-center'
                    style={{ height: "55px" }}>
                    S/N
                  </th>
                  <th scope='col' className='text-center'>
                  Permission Title
                  </th>
                  <th scope='col' className='text-center'>
                    Can Create
                  </th>
                  <th scope='col' className='text-center'>
                    Can Edit
                  </th>
                  <th scope='col' className='text-center'>
                    Can Delete
                  </th>
                </tr>
              </thead>
              <tbody className=''>
              {promotionPermissions.map((permission, index) => (
                <tr key={index}>
                  <td className='pt-4'>{index + 1}</td>
                  <td className='pt-4'>{permission.title}</td>
                  <td className='pt-4 text-center'>
                    <input
                      type='checkbox'
                      className='form-check-input'
                      checked={permission.canCreate}
                      onChange={() => handlePermissionChange('promotion', index, 'canCreate')}
                      />
                  </td>
                  <td className='pt-4 text-center'>
                    <input
                      type='checkbox'
                      className='form-check-input'
                      checked={permission.canEdit}
                      onChange={() => handlePermissionChange('promotion', index, 'canEdit')}
                      />
                  </td>
                  <td className='pt-4 text-center'>
                    <input
                      type='checkbox'
                      className='form-check-input'
                      checked={permission.canDelete}
                      onChange={() => handlePermissionChange('promotion', index, 'canDelete')}
                      />
                  </td>
                </tr>
              ))}
              </tbody>
            </table>
          </div>
        </div> */}
        {/* Promotion Permission */}

        {/* Appointment Permission */}
        {/* <p className=' mb-3 fs-4 fw-semibold ps-4 pt-4'>Appointment</p>
        <div className='tb-res-parent px-3'>
          <div className='tb-res' style={{ fontSize: "17px" }}>
            <table className='table table-bordered'>
              <thead>
                <tr className=''>
                  <th
                    scope='col'
                    className='text-center'
                    style={{ height: "55px" }}>
                    S/N
                  </th>
                  <th scope='col' className='text-center'>
                  Permission Title
                  </th>
                  <th scope='col' className='text-center'>
                    Can Create
                  </th>
                  <th scope='col' className='text-center'>
                    Can Edit
                  </th>
                  <th scope='col' className='text-center'>
                    Can Delete
                  </th>
                </tr>
              </thead>
              <tbody className=''>
              {appointmentPermissions.map((permission, index) => (
                <tr key={index}>
                  <td className='pt-4'>{index + 1}</td>
                  <td className='pt-4'>{permission.title}</td>
                  <td className='pt-4 text-center'>
                    <input
                      type='checkbox'
                      className='form-check-input'
                      checked={permission.canCreate}
                      onChange={() => handlePermissionChange('appointment', index, 'canCreate')}
                    />
                  </td>
                  <td className='pt-4 text-center'>
                    <input
                      type='checkbox'
                      className='form-check-input'
                      checked={permission.canEdit}
                      onChange={() => handlePermissionChange('appointment', index, 'canEdit')}
                    />
                  </td>
                  <td className='pt-4 text-center'>
                    <input
                      type='checkbox'
                      className='form-check-input'
                      checked={permission.canDelete}
                      onChange={() => handlePermissionChange('appointment', index, 'canDelete')}
                    />
                  </td>
                </tr>
              ))}
              </tbody>
            </table>
          </div>
        </div> */}

        {/* Appointment Permission */}

        {/* Notice board Permission */}
        {/* <p className=' mb-3 fs-4 fw-semibold ps-4 pt-4'>Notice Boards </p>
        <div className='tb-res-parent px-3'>
          <div className='tb-res' style={{ fontSize: "17px" }}>
            <table className='table table-bordered'>
              <thead>
                <tr className=''>
                  <th
                    scope='col'
                    className='text-center'
                    style={{ height: "55px" }}>
                    S/N
                  </th>
                  <th scope='col' className='text-center'>
                  Permission Title
                  </th>
                  <th scope='col' className='text-center'>
                    Can Create
                  </th>
                  <th scope='col' className='text-center'>
                    Can Edit
                  </th>
                  <th scope='col' className='text-center'>
                    Can Delete
                  </th>
                </tr>
              </thead>
              <tbody className=''>
              {noticeboardPermissions.map((permission, index) => (
                <tr key={index}>
                  <td className='pt-4'>{index + 1}</td>
                  <td className='pt-4'>{permission.title}</td>
                  <td className='pt-4 text-center'>
                    <input
                      type='checkbox'
                      className='form-check-input'
                      checked={permission.canCreate}
                      onChange={() => handlePermissionChange('noticeboard',index, 'canCreate')}
                    />
                  </td>
                  <td className='pt-4 text-center'>
                    <input
                      type='checkbox'
                      className='form-check-input'
                      checked={permission.canEdit}
                      onChange={() => handlePermissionChange('noticeboard', index, 'canEdit')}
                    />
                  </td>
                  <td className='pt-4 text-center'>
                    <input
                      type='checkbox'
                      className='form-check-input'
                      checked={permission.canDelete}
                      onChange={() => handlePermissionChange('noticeboard', index, 'canDelete')}
                    />
                  </td>
                </tr>
              ))}
              </tbody>
            </table>
          </div>
        </div> */}
        {/* Notice borad Permission */}

        {/* Events Permission */}
        {/* <p className=' mb-3 fs-4 fw-semibold ps-4 pt-4'>Events</p>
        <div className='tb-res-parent px-3'>
          <div className='tb-res' style={{ fontSize: "17px" }}>
            <table className='table table-bordered'>
              <thead>
                <tr className=''>
                  <th
                    scope='col'
                    className='text-center'
                    style={{ height: "55px" }}>
                    S/N
                  </th>
                  <th scope='col' className='text-center'>
                  Permission Title
                  </th>
                  <th scope='col' className='text-center'>
                    Can Create
                  </th>
                  <th scope='col' className='text-center'>
                    Can Edit
                  </th>
                  <th scope='col' className='text-center'>
                    Can Delete
                  </th>
                </tr>
              </thead>
              <tbody className=''>
              {eventsPermissions.map((permission, index) => (
                <tr key={index}>
                  <td className='pt-4'>{index + 1}</td>
                  <td className='pt-4'>{permission.title}</td>
                  <td className='pt-4 text-center'>
                    <input
                      type='checkbox'
                      className='form-check-input'
                      checked={permission.canCreate}
                      onChange={() => handlePermissionChange('events', index, 'canCreate')}
                    />
                  </td>
                  <td className='pt-4 text-center'>
                    <input
                      type='checkbox'
                      className='form-check-input'
                      checked={permission.canEdit}
                      onChange={() => handlePermissionChange('events', index, 'canEdit')}
                    />
                  </td>
                  <td className='pt-4 text-center'>
                    <input
                      type='checkbox'
                      className='form-check-input'
                      checked={permission.canDelete}
                      onChange={() => handlePermissionChange('events', index, 'canDelete')}
                    />
                  </td>
                </tr>
              ))}
              </tbody>
            </table>
          </div>
        </div> */}
        {/* Events Permission */}

        {/* Employee Permission */}
        {/* <p className=' mb-3 fs-4 fw-semibold ps-4 pt-4'>Employee</p>
        <div className='tb-res-parent px-3'>
          <div className='tb-res' style={{ fontSize: "17px" }}>
            <table className='table table-bordered'>
              <thead>
                <tr className=''>
                  <th
                    scope='col'
                    className='text-center'
                    style={{ height: "55px" }}>
                    S/N
                  </th>
                  <th scope='col' className='text-center'>
                  Permission Title
                  </th>
                  <th scope='col' className='text-center'>
                    Can Create
                  </th>
                  <th scope='col' className='text-center'>
                    Can Edit
                  </th>
                  <th scope='col' className='text-center'>
                    Can Delete
                  </th>
                </tr>
              </thead>
              <tbody className=''>
              {employeePermissions.map((permission, index) => (
                <tr key={index}>
                  <td className='pt-4'>{index + 1}</td>
                  <td className='pt-4'>{permission.title}</td>
                  <td className='pt-4 text-center'>
                    <input
                      type='checkbox'
                      className='form-check-input'
                      checked={permission.canCreate}
                      onChange={() => handlePermissionChange('employee', index, 'canCreate')}
                    />
                  </td>
                  <td className='pt-4 text-center'>
                    <input
                      type='checkbox'
                      className='form-check-input'
                      checked={permission.canEdit}
                      onChange={() => handlePermissionChange('employee', index, 'canEdit')}
                    />
                  </td>
                  <td className='pt-4 text-center'>
                    <input
                      type='checkbox'
                      className='form-check-input'
                      checked={permission.canDelete}
                      onChange={() => handlePermissionChange('employee', index, 'canDelete')}
                    />
                  </td>
                </tr>
              ))}
              </tbody>
            </table>
          </div>
        </div> */}
        {/* Employee Permission */}

        {/* Report Permission */}
        {/* <p className=' mb-3 fs-4 fw-semibold ps-4 pt-4'>Reports </p>
        <div className='tb-res-parent px-3'>
          <div className='tb-res' style={{ fontSize: "17px" }}>
            <table className='table table-bordered'>
              <thead>
                <tr className=''>
                  <th
                    scope='col'
                    className='text-center'
                    style={{ height: "55px" }}>
                    S/N
                  </th>
                  <th scope='col' className='text-center'>
                  Permission Title
                  </th>
                  <th scope='col' className='text-center'>
                    Can Create
                  </th>
                  <th scope='col' className='text-center'>
                    Can Edit
                  </th>
                  <th scope='col' className='text-center'>
                    Can Delete
                  </th>
                </tr>
              </thead>
              <tbody className=''>
              {reportPermissions.map((permission, index) => (
                <tr key={index}>
                  <td className='pt-4'>{index + 1}</td>
                  <td className='pt-4'>{permission.title}</td>
                  <td className='pt-4 text-center'>
                    <input
                      type='checkbox'
                      className='form-check-input'
                      checked={permission.canCreate}
                      onChange={() => handlePermissionChange('report', index, 'canCreate')}
                    />
                  </td>
                  <td className='pt-4 text-center'>
                    <input
                      type='checkbox'
                      className='form-check-input'
                      checked={permission.canEdit}
                      onChange={() => handlePermissionChange('report', index, 'canEdit')}
                    />
                  </td>
                  <td className='pt-4 text-center'>
                    <input
                      type='checkbox'
                      className='form-check-input'
                      checked={permission.canDelete}
                      onChange={() => handlePermissionChange('report', index, 'canDelete')}
                    />
                  </td>
                </tr>
              ))}
              </tbody>
            </table>
          </div>
        </div> */}
        {/* Report Permission */}

        <div className='col-sm-8 justify-content-end d-flex gap-5'>
          <div></div>
          <button
            style={{
              backgroundColor: reuseAbleColor.pupple,
              border: "none",
            }}
            className='btn text-white btn-info d-flex gap-2 align-items-center' type='submit'>
            {isLoading ? (
                    <MoonLoader color={"white"} size={20} />
                  ) : ( <> Add Role </>
                  )}
          </button>
          <button className='btn btn-secondary '>Reset</button>
        </div>
        
      </div>
    </form>
  );
};

export default AddRole;

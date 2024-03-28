import React, { useState, useEffect, useCallback} from "react";
import { reuseAbleColor } from "../../../components/Color";
import { AiOutlinePlus,  AiOutlineMenu} from "react-icons/ai";
import { MdSearch } from "react-icons/md";
import api from "../../../api";
import { useSnackbar } from "notistack";
import { TbDirection, TbGridDots } from "react-icons/tb";
import { MoonLoader } from "react-spinners";
import { Button, Box } from "@chakra-ui/react";

const AssignRoleToUser = () => {

  const { enqueueSnackbar } = useSnackbar();
  const [isLoading, setIsLoading] = useState(false);
  const [users, setUsers] = useState([]); 
  const [selectedUser, setSelectedUser] = useState(null); 
  const [searchValue, setSearchValue] = useState('');
  const [roleData, setRoleData] = useState([]);
  const [selectedRole, setSelectedRole] = useState('');
  const [isLoadingUsers, setIsLoadingUsers] = useState(false);
  const [isLoadingRoles, setIsLoadingRoles] = useState(false);

  useEffect(() => {
    setIsLoadingUsers(true); // Set loading state when fetching users
    api.fetchUsers(searchValue)
      .then(response => {
        setUsers(response.data);
      })
      .catch(error => {
        enqueueSnackbar(error.message, { variant: "error" });
      })
      .finally(() => {
        setIsLoadingUsers(false); // Reset loading state when fetching is complete
      });
  }, [searchValue]);

  useEffect(() => {
    setIsLoadingRoles(true); // Set loading state when fetching roles
    api.fetchRole()
      .then(response => {
        setRoleData(response.data);
      })
      .catch(error => {
        enqueueSnackbar("Error fetching roles", { variant: "error" });
      })
      .finally(() => {
        setIsLoadingRoles(false); // Reset loading state when fetching is complete
      });
  }, []);


  const filteredUsers = users.filter(user => {
    const fullName = `${user.first_name} ${user.last_name}`.toLowerCase();
    return fullName.includes(searchValue.toLowerCase());
  });

  const handleRoleChange = (event) => {
    setSelectedRole(event.target.value);
    console.log(selectedRole)
  };
  useEffect(() => {
    console.log("Selected Role:", selectedRole);
    console.log("Selected User ID:", selectedUser);
  }, [selectedRole, selectedUser]);


  async function handleSubmit (e)  {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await api.updateUserRole({staffId:selectedUser,role:selectedRole})
      console.log("responce==>>>>>", response);
      enqueueSnackbar("Role changed successfully", { variant: "success" });
      setIsLoading(false);
    } catch (error) {
      console.log(error)
      enqueueSnackbar(error.message, { variant: 'error' })
      setIsLoading(false);
    }
  };

  return (
    <div>
      {isLoadingUsers || isLoadingRoles ? (
        <Box
        w={"85vw"}
        display='flex'
        flexDirection='column'
        h={"80vh"}
        alignItems='center'
        justifyContent='center'>
        <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-70" style={{ zIndex: 9999 }}>
        <div className="inline-block">
            <MoonLoader color={"#984779"} size={80} />
          </div>
        </div>
      </Box>
      ) : (
      <div className=' shadow mx-3 pb-5 mb-5 mt-5 bg-red-400'>

        <div style={{padding:10, flexDirection:'row', display:'flex', borderWidth:1}}>
          <div className='col-lg-4 pt-3 ' style={{ height: "70px" }}>
            <p className='fs-5 fw-semibold'>Assign roles</p>
          </div>
          <div className='col-lg-3 ' style={{ height: "70px" }}>
            <div style={{ position: "relative" }}>
              <div style={{ position: "absolute" }}>
                
                <input
                  type="text"
                  placeholder="Search users..."
                  value={searchValue}
                  className='form-control mt-2 ps-5'
                  style={{ height: "45px" }}
                  onChange={(e) => setSearchValue(e.target.value)}
                />
              </div>
              <div style={{ position: "absolute", top: "18px", left: "10px" }}>
                <MdSearch size={"25"} />
              </div>
            </div>
          </div>
          <div
            className='col-lg-5 d-flex flex-wrap gap-3 align-items-center justify-content-end'
            style={{ cursor: "pointer", height: "70px" }}>
            <div className='d-flex'>
              <div className='border py-2 px-2'>
                <TbGridDots size={"15"} />
              </div>
              <div className='py-2 px-2 border'>
                <AiOutlineMenu size={"15"} />
              </div>
            </div>
            <div className='border d-flex align-items-center gap-2 py-2 px-2'>
              <AiOutlineMenu /> Filter
            </div>
            <div>
            </div>
          </div>
        </div>
        
        <form onSubmit={handleSubmit}>
          
            <div className="my-5 ms-3 form-group row">
              <label
                htmlFor="selectUser"
                className="fs-5 fw-semibold col-md-2 col-form-label"
              >
                User
              </label>
              <div className="col-md-8">
                <select
                  id="selectUser"
                  className="form-control rounded-0 h-120"
                  value={selectedUser}
                  style={{ height: "60px", borderRadius:"10px" }}
                  onChange={(e) => setSelectedUser(e.target.value)}
                >
                  <option value="">Select a user...</option>
                  {filteredUsers.map(user => (
                    <option key={user.id} value={user.id}>
                      {user.first_name} {user.last_name}
                    </option>
                  ))}
                </select>
                
              </div>
            </div>
        
          <div className='my-5 form-group row'>
            <label
              for='inputPassword'
              className=' fs-5 ms-4 fw-semibold col-lg-2 col-form-label'>
              Role <sup className='text-danger'>*</sup>
            </label>
            <div className='col-sm-8 d-flex gap-4 w-20'>
              {roleData.map((role) => (
                <div className='d-flex h-30 align-items-center gap-3' key={role.id}>
                  <input
                    type='radio'
                    value={role.name}
                    checked={selectedRole === role.name}
                    onChange={handleRoleChange}
                  />
                  <label className='fs-5 fw-semibold'>{role.name}</label>
                </div>
              ))}
            </div>
          </div>
          <div className='my-5 form-group row'>
            <label
              for='inputPassword'
              className=' fs-5 fw-semibold col-sm-2 col-form-label'>
            </label>
            <div className='col-sm-8 justify-content-end d-flex gap-5'>
              <div></div>
              <Button
                type="submit"
                mt='3'
                color={"white"}
                w='15%'
                h='12'
                bg='#572753'
                borderRadius='lg'
                disabled={isLoading}>
                  {isLoading ? (
                    <MoonLoader color={"white"} size={20} />
                  ) : ( <> Assign role </>
                  )}
              </Button>
            </div>
          </div>
        </form>
      </div>
    )}
    </div>
  );
};

export default AssignRoleToUser;

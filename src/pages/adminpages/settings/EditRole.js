import React, { useEffect, useRef, useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { reuseAbleColor } from "../../../components/Color";
import { useNavigate } from "react-router-dom";
import api from "../../../api";
import { useSnackbar } from "notistack";
import { Spinner } from "@chakra-ui/react";
import { useParams } from "react-router-dom";

const EditRole  = () => {
 
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const [isLoading, setIsLoading] = useState(false);

  const [roleName, setRoleName] = useState("");
  const [description, setDescription] = useState("")
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      api.fetchRoleById(id)
        .then(response => {
          const roleData = response.data;
          setRoleName(roleData.name);
          setDescription(roleData.description);
        })
        .catch(error => {
          console.log(error);
        });
    }
  }, [id]);

  async function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (id) {
        const response = await api.updateRole( {staffId:id,  name: roleName, description });
        console.log("res of action==>>>>>", response);
        enqueueSnackbar("Role updated successfully", { variant: "success" });
      }
      setIsLoading(false);
      navigate("/settings/role-list");
    } catch (error) {
      console.log(error);
      enqueueSnackbar("Error", { variant: "error" });
      setIsLoading(false);
    }
  }

  

  return (
    <form onSubmit={handleSubmit}>
      
      <div className='pb-3 mb-5 shadow  mt-5 mx-5'>
        <p className='border-bottom mb-5 fs-4 fw-semibold ps-4 py-3'>Edit Role</p>
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

        <div className='col-sm-8 justify-content-end d-flex gap-5'>
          <div></div>
          <button
            style={{
              backgroundColor: reuseAbleColor.pupple,
              border: "none",
            }}
            className='btn text-white btn-info d-flex gap-2 align-items-center' type='submit'>
            <AiOutlinePlus /> Add Role
          </button>
          <button className='btn btn-secondary '>Reset</button>
        </div>
        
      </div>
    </form>
  );
}

export default EditRole
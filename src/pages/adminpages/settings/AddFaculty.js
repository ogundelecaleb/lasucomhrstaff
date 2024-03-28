import React, { useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { reuseAbleColor } from "../../../components/Color";
import api from "../../../api";
import { useSnackbar } from "notistack";
import { Spinner } from "@chakra-ui/react";
import { MoonLoader } from "react-spinners";

const AddFaculty = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState('');

  async function handleSubmit (e)  {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await api.createFaculty({name});
      console.log("responce==>>>>>", response);
      enqueueSnackbar('Faculty added successfully', { variant: 'success' })
      setIsLoading(false);
      setName('');
    } catch (error) {
      console.log(error)
      enqueueSnackbar(error.message, { variant: 'error' })
      setIsLoading(false);
    }
  };

  return (

    <div className='pb-3 mb-5 shadow  mt-5 mx-5'>
      <p className='border-bottom mb-5 fs-4 fw-semibold ps-4 py-3'> Add Faculty</p>
      <div className='px-4'>
        
        <form onSubmit={handleSubmit}>
         
          <div className='my-5 form-group row'>
            <label
              className=' fs-5 fw-semibold col-md-2 col-form-label'>
              FACULTY <sup className='text-danger'>*</sup>
            </label>
            <div className='col-sm-8'>
             
              <input
                style={{ height: "60px" }}
                type='text'
                className='form-control rounded-0'
                placeholder='Faculty name'
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          </div>
      
          <div className='my-5 form-group row'>
            <label
              for='inputPassword'
              className=' fs-5 fw-semibold col-sm-2 col-form-label'>
            </label>
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
                ) : ( <>Add Faculty</>
                )}
              </button>
              {/* <button className='btn btn-secondary ' type='reset'>Reset</button> */}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddFaculty;

import React, { useState, useEffect, useCallback } from "react";
import { reuseAbleColor } from "../../../components/Color";
import api from "../../../api";
import { useSnackbar } from "notistack";
import { MoonLoader } from "react-spinners";

export const AddDivision = () => {

    const [divisionName, setDivisionName] = useState("");
    const { enqueueSnackbar } = useSnackbar();
    const [isLoading, setIsLoading] = useState(false);

    async function handleSubmit (e)  {
      e.preventDefault();
      setIsLoading(true);

      api.createUnit({ name: divisionName, description: 'Unit' })
      .then(response => {
        enqueueSnackbar("Unit created successfully", { variant: "success" });
        setIsLoading(false);
        setDivisionName('')
      })
      .catch(error => {
        console.log(error)
        enqueueSnackbar(error.message, { variant: 'error' })
        setIsLoading(false);
      });
    };

  return (
    <div className='pb-3 mb-5 shadow  mt-5 mx-5'>
      <p className='border-bottom mb-5 fs-4 fw-semibold ps-4 py-3'> Add Division</p>
      <div className='px-4'>
        <form onSubmit={handleSubmit}>

          <div className='my-5 form-group row'>
            <label
              className=' fs-5 fw-semibold col-md-2 col-form-label'>
              Name <sup className='text-danger'>*</sup>
            </label>
            <div className='col-sm-8'>
              <input
              value={divisionName}
              onChange={(e) => setDivisionName(e.target.value)}
                style={{ height: "60px" }}
                type='text'
                className='form-control rounded-0'
                placeholder='Enter Division Name' />
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
                  type="submit"
                  style={{
                      backgroundColor: reuseAbleColor.pupple,
                      border: "none",
                  }}
                  className='btn text-white btn-info d-flex gap-2 align-items-center'>
                  {isLoading ? (
                  <MoonLoader color={"white"} size={20} />
                  ) : ( <>Add Division</>
                  )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

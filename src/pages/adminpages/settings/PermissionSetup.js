import React from "react";
import { reuseAbleColor } from "../../../components/Color";
import { AiOutlinePlus } from "react-icons/ai";

const PermissionSetup = () => {
  return (
    <div className='pb-3 mb-5 shadow  mt-5 mx-5'>
      <p className='border-bottom mb-5 fs-4 fw-semibold ps-4 py-3'>
        Ins Menu For Application
      </p>
      <div className='px-4'>
        <form>
          <div className='my-5 form-group row'>
            <label
              //   style={{ marginTop: "-8px" }}
              for='inputPassword'
              className=' fs-5 fw-semibold col-md-2 col-form-label'>
              Menu title<sup className='text-danger'>*</sup>
            </label>
            <div className='col-md-8'>
              <input
                style={{ height: "60px" }}
                type='text'
                className='form-control rounded-0'
                // id='inputPassword'
                placeholder='Menu title'
              />
            </div>
          </div>
          <div className='my-5 form-group row'>
            <label
              //   style={{ marginTop: "-8px" }}
              for='inputPassword'
              className=' fs-5 fw-semibold col-md-2 col-form-label'>
              Page URL <sup className='text-danger'>*</sup>
            </label>
            <div className='col-md-8'>
              <input
                style={{ height: "60px" }}
                type='text'
                className='form-control rounded-0'
                // id='inputPassword'
                placeholder='URL'
              />
            </div>
          </div>
          <div className='my-5 form-group row'>
            <label
              //   style={{ marginTop: "-8px" }}
              for='inputPassword'
              className=' fs-5 fw-semibold col-md-2 col-form-label'>
              Module<sup className='text-danger'>*</sup>
            </label>
            <div className='col-md-8'>
              <input
                style={{ height: "60px" }}
                type='email'
                className='form-control rounded-0'
                // id='inputPassword'
                placeholder='Module'
              />
            </div>
          </div>
          <div className='my-5 form-group row'>
            <label
              //   style={{ marginTop: "-8px" }}
              //   for='inputPassword'
              className=' fs-5 fw-semibold col-md-2 col-form-label'>
              Parent <sup className='text-danger'>*</sup>
            </label>
            <div className='col-sm-8'>
              <input
                style={{ height: "60px" }}
                type='password'
                className='form-control rounded-0'
                id='inputPassword'
                placeholder='Parent'
              />
            </div>
          </div>

          <div className='my-5 form-group row'>
            <label
              //   style={{ marginTop: "-8px" }}
              for='inputPassword'
              className=' fs-5 fw-semibold col-sm-2 col-form-label'>
              {/* Password <sup className='text-danger'>*</sup> */}
            </label>
            <div className='col-sm-8 justify-content-end d-flex gap-5'>
              <div></div>
              <button
                style={{
                  backgroundColor: reuseAbleColor.pupple,
                  border: "none",
                }}
                className='btn text-white btn-info d-flex gap-2 align-items-center'>
                <AiOutlinePlus /> Save
              </button>
              <button className='btn btn-secondary '>Reset</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PermissionSetup;

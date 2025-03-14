import React, { useState } from "react";
import {
  Flex,
} from "@chakra-ui/react";
import api from "../../../api";
import { enqueueSnackbar } from "notistack";
const InReview = (props) => {

  const [reviewStatus, setReviewStatus] = useState("In Progress");
  const [isLoading, setIsLoading] = useState(false)

  const handleStatusChange = (newStatus) => {
    setReviewStatus(newStatus);
  };

  const handleSubmit = async()=> {

    try {
      const response = await api.review(props.applicantId,{
        review_decision : reviewStatus,
        review_comments: ""
      })
      enqueueSnackbar(response?.message, { variant: "success" });

      props.moveToNextStage()

    }catch (error) {
      console.error("API error:", error);
      
      enqueueSnackbar("error sending request", { variant: "error" });
      setIsLoading(false);
    }
  }

  console.log(props)

  return (
    <div className='border-bottom pb-4'>
      <p className='fw-semibold fs-6'>Stage Info</p>
      <div className='row'>
        <div className='col-lg-6'>
          
          <div>
            <button className='my-4 btn btn-outline-dark rounded-0' onClick={handleSubmit}>
              Move To Next Stage
            </button>
          </div>
        </div>
        <div className='col-lg-6'>
          <div className='d-flex justify-space-between'>
            <p className='text-muted py-1'>Review Status:</p>
            <p className='fw-semibold text-warning px-1 py-1 d-flex justify-content-center rounded-3'>
              {reviewStatus}
            </p>
          </div>
          <Flex className='justify-space-between' gap='4'>
            <div w='16'>
                <button className='text-danger rounded-0 btn border' onClick={() => handleStatusChange("Rejected")}>Reject</button>
              </div>
              <div w='16'>
                <button className='btn btn-success rounded-0' onClick={() => handleStatusChange("Pass")}>Pass</button>
              </div>
          </Flex>
        </div>
      </div>
    </div>
  );
};

export default InReview;

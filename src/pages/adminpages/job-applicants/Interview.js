import React, { useEffect, useState } from "react";
import {
  Box,
  Divider,
  Flex,
} from "@chakra-ui/react";
import { Input } from "@chakra-ui/react";
import { Button } from "@chakra-ui/react";
import { BiMessageAltDetail } from "react-icons/bi";
import 'intl';
import 'intl/locale-data/jsonp/en';
import { getYear, getMonth } from 'date-fns';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import api from "../../../api";
import { useSnackbar } from "notistack";
import { getUserDetails } from "../../../utils/utils";

const Interview = (props) => {
 
  const [reviewStatus, setReviewStatus] = useState("Interviewed");

  const handleStatusChange = (newStatus) => {
    setReviewStatus(newStatus);
  };
  function range(start, end, step) {
    const result = [];
    for (let i = start; i <= end; i += step) {
      result.push(i);
    }
    return result;
  }
  const years = range(1990, getYear(new Date()) + 1, 1);
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const [userDetails, setUserDetails] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [comment, setComment] = useState("");
  const [date, setDate] = useState("");
  const { enqueueSnackbar } = useSnackbar();

  async function fetchUserDetails(props) {
    try {
      const userDetails = await getUserDetails();
      console.log("User Details:", userDetails);
      setUserDetails(userDetails?.data);
    } catch (error) {
      console.error("Error fetching your basic details", error);
      enqueueSnackbar(error.message, { variant: "error" });
    }
  }

  useEffect(() => {
    fetchUserDetails();
  }, []);

  const handleSubmit = async () => {
    try {
      const response = await api.hire(props.applicantId, {
        hired_date: date,
        hired_decision: reviewStatus,
        hired_comments: comment,
      });
      enqueueSnackbar(response?.message, { variant: "success" });

      props.moveToNextStage();
    } catch (error) {
      console.error("API error:", error);

      enqueueSnackbar("error sending request", { variant: "error" });
      setIsLoading(false);
    }
  };




  return (
    <div className="border-bottom pb-4">
      <p className="fw-semibold fs-6">Stage Info</p>
      <div className="row">
        <div className="col-lg-6">
          <div>
            <p className="text-muted">Name of Reviewer</p>
            <p className="fw-semibold" style={{ marginTop: "-15px" }}>
              {userDetails?.title +
                " " +
                userDetails?.first_name +
                " " +
                userDetails?.last_name}
            </p>
          </div>
         
        </div>
        <div className="col-lg-6">
          <>
            <Box>
              <div>
                <label>Hire Date</label>
                <Input
                  type="date"
                  borderRadius={"0"}
                  className="mb-3"
                  border="1px solid #2D394C1A"
                  onChange={(event) => setDate(event.target.value)}
                />
              </div>
              <Input
                h="16"
                borderRadius={"0"}
                border="1px solid #2D394C1A"
                placeholder="Add a comment..."
                onChange={(event) => setComment(event.target.value)}
              />

              <div className="d-flex justify-space-between">
                <p className="text-muted py-1">Review Status:</p>
                <p className="fw-semibold text-warning px-1 py-1 d-flex justify-content-center rounded-3">
                  {reviewStatus}
                </p>
              </div>

              <Flex className="justify-space-between" gap="4">
                <div w="16">
                  <button
                    className="text-danger rounded-0 btn border"
                    onClick={() => handleStatusChange("Declned")}
                  >
                    Decline
                  </button>
                </div>
                <div w="16">
                  <button
                    className="btn btn-success rounded-0"
                    onClick={() => handleStatusChange("Hired")}
                  >
                    Hired
                  </button>
                </div>
              </Flex>
            </Box>
          </>
          <div>
            <button
              className="my-4 btn btn-outline-dark rounded-0"
              onClick={handleSubmit}
            >
              Move To Next Step
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Interview;

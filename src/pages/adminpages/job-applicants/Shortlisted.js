import React, { useEffect, useState } from "react";
import { Box, Divider, Flex } from "@chakra-ui/layout";
import { Input } from "@chakra-ui/input";
import { Button } from "@chakra-ui/button";
import { BiMessageAltDetail } from "react-icons/bi";
import { getUserDetails } from "../../../utils/utils";
import { useSnackbar } from "notistack";
import api from "../../../api";

const Shortlisted = (props) => {
  const [userDetails, setUserDetails] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [reviewStatus, setReviewStatus] = useState("Shortlisted");
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
      const response = await api.cbt(props.applicantId, {
        cbt_date: date,
        cbt_decision: reviewStatus,
        cbt_comments: comment,
      });
      enqueueSnackbar(response?.message, { variant: "success" });

      props.moveToNextStage();
    } catch (error) {
      console.error("API error:", error);

      enqueueSnackbar("error sending request", { variant: "error" });
      setIsLoading(false);
    }
  };

  const handleStatusChange = (newStatus) => {
    setReviewStatus(newStatus);
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
          <div>
            <button
              className="my-4 btn btn-outline-dark rounded-0"
              onClick={handleSubmit}
            >
              Move To Next Step
            </button>
          </div>
        </div>
        <div className="col-lg-6">
          <>
            <Box>
              <div>
                <label>CBT Date</label>
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
                    onClick={() => handleStatusChange("Rejected")}
                  >
                    Reject
                  </button>
                </div>
                <div w="16">
                  <button
                    className="btn btn-success rounded-0"
                    onClick={() => handleStatusChange("Pass")}
                  >
                    Pass
                  </button>
                </div>
              </Flex>
            </Box>
          </>
        </div>
      </div>
    </div>
  );
};

export default Shortlisted;

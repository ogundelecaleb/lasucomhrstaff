import { useEffect } from "react";
import { CiCircleCheck } from "react-icons/ci";

const Submitted = ({ navigate }) => {
  useEffect(() => {
    setTimeout(function () {
      navigate("/staff/leave");
    }, 2000);
  }, [navigate]);
  return (
    <div>
      <div
        class='d-flex justify-content-center align-items-center'
        style={{ height: "90vh" }}>
        <div class='d-flex flex-column align-items-center'>
          <CiCircleCheck size={130} color={"#5542F6"} />
          <p class='fw-semibold fs-6'>Requests Submitted </p>
        </div>
      </div>
    </div>
  );
};
export default Submitted;

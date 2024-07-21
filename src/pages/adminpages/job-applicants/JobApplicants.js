import React, { useEffect, useState } from "react";
import { AiOutlineMenu, AiOutlinePlus } from "react-icons/ai";
import { TbDirection, TbGridDots } from "react-icons/tb";
// import { TfiMenuAlt } from "react-icons/tf";
// import { CgLayoutGridSmall } from "react-icons/cg";
import { MdSearch } from "react-icons/md";
import { Link, useLocation } from "react-router-dom";
import { useSnackbar } from "notistack";
import api from "../../../api";

const JobApplicants = () => {
  const { enqueueSnackbar } = useSnackbar();
  const location = useLocation();
  const [jobListings, setJobListings] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (jobListings) {
      fetchJobDetails();
    }
  }, []);

  async function fetchJobDetails() {
    try {
      setIsLoading(true);
      const response = await api.fetchApplicants(location.state?.item.id);
      console.log("User Details:", response);
      setJobListings(response.data);
    } catch (error) {
      console.error(error.message, error);
      enqueueSnackbar(error.message, { variant: "error" });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className=" px-4">
      <div className="row mt-4 pa-res px-3">
        <div className="col-lg-4 pt-3 " style={{ height: "70px" }}>
          <p className="fs-5 ">Total Applicants : {jobListings?.length}</p>
        </div>
        <div className="col-lg-4 " style={{ height: "70px" }}>
          <div style={{ position: "relative" }}>
            <div style={{ position: "absolute" }}>
              <input
                type="text"
                className="form-control mt-2 ps-5"
                style={{ height: "45px" }}
                placeholder="Search for staff"
              />
            </div>
            <div style={{ position: "absolute", top: "18px", left: "10px" }}>
              <MdSearch size={"25"} />
            </div>
          </div>
        </div>
        <div
          className="col-lg-4 d-flex flex-wrap gap-3 align-items-center"
          style={{ cursor: "pointer", height: "70px" }}
        ></div>
      </div>
      <div className="px-3 tb-res-parent mt-4 ">
        <div className="tb-res">
          <table class="table table-hover">
            <thead>
              <tr className="border">
                <th scope="col" className="fw-light py-3 text-muted fs-6">
                  Applicant Name{" "}
                  <label style={{ marginBottom: "-8px" }}>
                    <TbDirection size={"25"} />
                  </label>
                </th>
                <th scope="col" className="fw-light py-3 text-muted fs-6">
                  Email{" "}
                  <label style={{ marginBottom: "-8px" }}>
                    <TbDirection size={"25"} />
                  </label>
                </th>
                <th scope="col" className="fw-light py-3 text-muted fs-6">
                  Academic Qualification{" "}
                  <label style={{ marginBottom: "-8px" }}>
                    <TbDirection size={"25"} />
                  </label>
                </th>
                <th scope="col" className="fw-light py-3 text-muted fs-6">
                  Hiring Stage
                  <label style={{ marginBottom: "-8px" }}>
                    <TbDirection size={"25"} />
                  </label>
                </th>
                <th scope="col" className="fw-light py-3 text-muted fs-6">
                  Action{" "}
                  <label style={{ marginBottom: "-8px" }}>
                    <TbDirection size={"25"} />
                  </label>
                </th>
              </tr>
            </thead>
            <br />
            {!isLoading && jobListings?.length === 0 && (
              <tr>
                <td className="text-center" colspan="6">
                  <img
                    src="./nodata.gif"
                    className="mx-auto mt-6 h-[70px] "
                    alt=""
                  />
                  <h3 className="text-[30px] leading-[35px]  text-[#1A202C] font-extrabold mb-[6px]">
                    No Data
                  </h3>
                </td>
              </tr>
            )}
            {jobListings &&
              jobListings?.map((item, key) => (
                <tbody key={key} className="border">
                  <tr>
                    <td>
                      <div className="d-flex py-2 gap-4">
                        <div style={{ lineHeight: "5px" }}>
                          <p className="fw-semibold mb-0">{item.name}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-2">
                      <p className="mb-0">{item.email}</p>
                    </td>
                    <td className="fw-semibold py-2">
                      <p className="mb-0">{item?.academic_qualifications}</p>
                    </td>
                    <td className="py-24 max-w-[200px] ">
                      <button
                        className={`rounded-[20px] md:rounded-[20px] text-center px-[12px]  py-[4px] md:py-3  border-[0.5px] ${
                          item?.status === "Pending"
                            ? "bg-[#FEECEB] text-[#F44336] border-[#F44336]"
                            : item?.status === "Shortlisted"
                            ? "bg-[#FFF5E6] text-[#F44336] border-[#FF9800]"
                            : "bg-[#EDF7EE] text-[#4CAF50] border-[#4CAF50]"
                        }  text-[10px] md:text-[12px]  font-semibold leading-[16px] md:leading-[18px] `}
                      >
                        <p className="mb-0">{item?.status}</p>
                      </button>
                    </td>
                    <td className="fw-semibold py-2">
                      <Link
                        to={`/applicant-detail`}
                        // to={`jobapplicants/${item.id}`}
                        state={{ item: item, job: location.state?.item }}
                      >
                        <button
                          className="btn py-1 px-3 rounded-0 mt-3 btn-sm rounded-0 fw-semibold"
                          style={{
                            border: "1px solid #984779",
                            color: "#987779",
                            backgroundColor: "#E9EBFD",
                          }}
                        >
                          See applicant details
                        </button>
                      </Link>
                    </td>
                  </tr>
                </tbody>
              ))}
          </table>
        </div>
      </div>
      <div className="row px-4">
        <div className="col-lg-4 d-flex gap-3 align-items-center ">
          <p className="mt-3 fw-semibold text-muted">Show results</p>
          <div className="">
            <select
              style={{ width: "70px" }}
              className="form-select rounded-0"
              aria-label="Default select example"
            >
              <option selected>1</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
            </select>
          </div>
          <p className="mt-3 fw-semibold text-muted">Applicants per page</p>
        </div>
        <div className="col-lg-4 "></div>
        <div className="col-lg-4">
          <div className="d-flex justify-content-end py-2 mt-4 px-5">
            <h1>
              <nav aria-label="Page navigation example">
                <ul class="pagination">
                  <li class="page-item">
                    <p class="page-link" aria-label="Previous">
                      <span aria-hidden="true">&laquo;</span>
                      <span class="sr-only">Previous</span>
                    </p>
                  </li>
                  <li class="page-item">
                    <p class="page-link" href="#">
                      1
                    </p>
                  </li>
                  <li class="page-item">
                    <p class="page-link" href="#">
                      2
                    </p>
                  </li>
                  <li class="page-item">
                    <p class="page-link" href="#">
                      3
                    </p>
                  </li>
                  <li class="page-item">
                    <p class="page-link" aria-label="Next">
                      <span aria-hidden="true">&raquo;</span>
                      <span class="sr-only">Next</span>
                    </p>
                  </li>
                </ul>
              </nav>
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobApplicants;

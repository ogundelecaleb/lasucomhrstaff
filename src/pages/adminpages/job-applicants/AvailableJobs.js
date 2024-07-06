import React, { useEffect, useState } from "react";
import { AiOutlineMenu, AiOutlinePlus } from "react-icons/ai";
import { TbDirection, TbGridDots } from "react-icons/tb";
// import { TfiMenuAlt } from "react-icons/tf";
// import { CgLayoutGridSmall } from "react-icons/cg";
import { MdSearch } from "react-icons/md";
import { Link } from "react-router-dom";
import { useSnackbar } from "notistack";
import api from "../../../api";
// import CommonButton from "../../components/commonbutton/Button";

const AvailableJobs = () => {
  const { enqueueSnackbar } = useSnackbar();

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
      const response = await api.fetchJobs();
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
        >
          <div className="d-flex">
            <div className="border py-2 px-2">
              <TbGridDots size={"15"} />
            </div>
            <div className="py-2 px-2 border">
              <AiOutlineMenu size={"15"} />
            </div>
          </div>
          <div className="border d-flex align-items-center gap-2 py-2 px-2">
            <AiOutlineMenu /> Filter
          </div>
        </div>
      </div>
      <div className="px-3 tb-res-parent mt-4 ">
        <div className="tb-res">
          <table class="table table-hover">
            <thead>
              <tr className="border">
                <th scope="col" className="py-3">
                  <input type="checkbox" className="border" />
                </th>
                <th scope="col" className="fw-light py-3 text-muted fs-6">
                Position{" "}
                  <label style={{ marginBottom: "-8px" }}>
                    <TbDirection size={"25"} />
                  </label>
                </th>
                <th scope="col" className="fw-light py-3 text-muted fs-6">
                Staff Type{" "}
                  <label style={{ marginBottom: "-8px" }}>
                    <TbDirection size={"25"} />
                  </label>
                </th>
                <th scope="col" className="fw-light py-3 text-muted fs-6">
                  Department/Unit{" "}
                  <label style={{ marginBottom: "-8px" }}>
                    <TbDirection size={"25"} />
                  </label>
                </th>
                <th scope="col" className="fw-light py-3 text-muted fs-6">
                  Requirement{" "}
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
                        No Project
                      </h3>
                    </td>
                  </tr>
                )}
            { jobListings && jobListings?.map((item, key) => (
              <tbody key={key} className="border">
                <tr>
                  <th scope="row">
                    <input type="checkbox" className="mt-4" />
                  </th>
                  <td>
                    <div className="d-flex gap-4">
                     
                      <div style={{ lineHeight: "5px" }}>
                        <p className="fw-semibold mt-3">{item.title}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-2">
                  <p className="">{item.unit === null ? "ASE" : "NASE"}</p>
                  </td>
                  <td className="fw-semibold py-2">
                    <p className="">{item?.department?.name}</p>
                  </td>
                  <td className=" max-w-[200px] "><p className="line-clamp-2">{item?.requirements}</p></td>
                  <td className="fw-semibold">
                    <Link
                      // to={`applicant-detail/${item.id}`}
                      to={"/jobapplicants"}
                      state={{ item: item }}
                    >
                      <button
                        className="btn py-1 px-3 rounded-0 mt-3 btn-sm rounded-0 fw-semibold"
                        style={{
                          border: "1px solid #984779",
                          color: "#987779",
                          backgroundColor: "#E9EBFD",
                        }}
                      >
                        See Application
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

export default AvailableJobs;

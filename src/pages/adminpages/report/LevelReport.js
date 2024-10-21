import { ArrowRight } from "iconsax-react";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import api from "../../../api";
import { useQuery } from "@tanstack/react-query";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

const LevelReport = () => {
  const [page, setPage] = useState("");

  async function getLevelReport(page) {
    const response = await api.getLevelReport({
      params: {
        page,
      },
    });
    return response;
  }

  const reportQuery = useQuery(["report"], () => getLevelReport(page), {
    keepPreviousData: true,
    refetchOnWindowFocus: "always",
  });

  console.log("age roport ======>>>>", reportQuery?.data);
  const exportToExcel = () => {
    const data = reportQuery?.data;
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

    // Buffer to store the generated Excel file
    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });
    const blob = new Blob([excelBuffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8",
    });

    saveAs(blob, "gradeLevel.xlsx");
  };

  
  return (
    <div className="px-4 md:px-6 xl:px-8 py-6">
       <button
                    onClick={exportToExcel}
                    className="px-2 py-2 bg-[#984779] text-white rounded-md"
                  >
                    Download
                  </button>
      <div className="rounded-lg overflow-hidden border-[0.8px] border-[#E4E7EC] mt-5 md:mt-9">
        <div className="flex items-center justify-between bg-white p-3">
          <p className=" text-[16px] md:text-lg  text-[#000] leading-[24px] font-medium text-left ">
           Report on Grade Level
          </p>
          <Link to="/report">
            <button className="flex items-center gap-2">
              {" "}
              <p className=" text-[14px] md:text-base  text-[#984779] leading-[24px] mb-0 font-medium text-left ">
                View all Reports
              </p>
              <ArrowRight size="16" color="#984779" />
            </button>
          </Link>
        </div>
        <div class="overflow-x-auto rounded-lg">
          <table className="min-w-full mb-6 border-[0.8px] border-r-[0.8px]  border-l-[0.8px] border-[#E4E7EC] rounded-lg">
            <thead className="bg-light-gray">
              <tr className="">
                <th
                  scope="col"
                  className=" px-2 md:px-5 border-b-[0.8px] border-[#E4E7EC] py-[12px] gap-[6px] md:gap-[12px] text-[14px] md:text-[16px] text-[#98A2B3]  font-medium leading-[20px] md:leading-[24px] tracking-[0.2%]"
                >
                  <div className="flex  gap-[6px] md:gap-[12px] items-center my-0">
              Grade Level
                  </div>
                </th>
              
                <th
                  scope="col"
                  className="px-2 md:px-5  border-b-[0.8px] border-[#E4E7EC] py-[12px] gap-[6px] md:gap-[12px] text-[14px] md:text-[16px] text-[#98A2B3]  font-medium leading-[20px] md:leading-[24px] tracking-[0.2%]"
                >
                  <div className="flex justify-center gap-[6px] md:gap-[12px] items-center my-0">
                    Total Staff
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              {reportQuery?.isLoading && <div>Loading...</div>}
              {!reportQuery?.isLoading && reportQuery?.data.length === 0 && (
                <tr>
                  <td className="text-center" colspan="6">
                    <img
                      src="./nodata.gif"
                      className="mx-auto mt-6 h-[70px] "
                      alt=""
                    />
                    <h3 className="text-[30px] leading-[35px]  text-[#1A202C] font-extrabold mb-[6px]">
                      No Report
                    </h3>
                  </td>
                </tr>
              )}
              {reportQuery?.data &&
                reportQuery?.data?.map((result, index) => (
                  <tr key={index} className="mb-2 hover:bg-light-gray">
                    <td className="whitespace-nowrap py-[16px] bg-white  px-5   border-b-[0.8px] border-[#E4E7EC] text-[14px] leading-[24px] tracking-[0.2px] text-[#667185] font-medium text-left  ">
                      {result?.level}
                    </td>

                   
                    <td className="whitespace-nowrap py-[16px] bg-white  px-5  border-b-[0.8px] border-[#E4E7EC] text-[14px] leading-[24px] tracking-[0.2px] text-[#667185] font-medium text-center  ">
                      {result?.staff_count}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default LevelReport;

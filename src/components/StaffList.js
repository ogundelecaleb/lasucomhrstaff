import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { SearchNormal1, staff, RecordCircle, ArrowDown2 } from "iconsax-react"; // Replace with your icon library
import api from "../api";

const StaffListModal = ({selectedStaff, setSelectedStaff, officeName}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredStaffs, setFilteredStaffs] = useState([]);
//   const [selectedStaff, setSelectedStaff] = useState(null);
  const [staffsVisible, setStaffsVisible] = useState(false);

  const { data: staffs, isLoading } = useQuery(["staffs"], () => api.getAllStaffs(), {
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (staffs) {
      const sortedstaffs = [...staffs].sort((a, b) =>
        a.name === "Access staff" ? -1 : b.name === "Access staff" ? 1 : 0
      );
      setFilteredStaffs(sortedstaffs);
    }
  }, [staffs]);

  const handleSearch = (query) => {
    setSearchQuery(query);
    if (staffs) {
      const filtered = staffs.filter((staff) =>
        staff.email.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredStaffs(filtered);
    }
  };

  const handleSelectStaff = (staff) => {
    setSelectedStaff(staff);
    setStaffsVisible(false);
  };

  return (
    <div className="mb-[12px] md:mb-[18px]">

        <p className="text-[#272F35] text-[14px] font-semibold mb-[10px]">Office: <span>{officeName}</span></p>
     
      <button
        onClick={() => setStaffsVisible(!staffsVisible)}
        className="w-full h-[38px] pl-[10px] pr-[8px] flex  justify-between py-[8px] text-[14px] text-[#344054] border-[#D0D5DD] border-[0.2px] rounded-[8px] focus:outline-none focus:border-[#984779]"
      >
        <div className="flex-row staffs-center">
          {selectedStaff ? (
            <p className="text-[#272F35] text-[12px]">{selectedStaff.email}</p>
          ) : (
            <p className="text-[#838383] text-[12px]">Select an office email</p>
          )}
        </div>
        <ArrowDown2 size={14} color="#838383" variant="Linear" />
      </button>

      {staffsVisible && (
        <div
         
          className="w-full h-[300px] overflow-y-auto px-2 py-3 border-[#D0D5DD] border-[0.2px] rounded-[8px]"
        >
          <div className="relative w-full mb-2 flex items-center">
            <SearchNormal1 size="14" color="#98A2B3"
             className="absolute left-[16px] " />
            <input
              type="text"
              placeholder="search staff"
              className="w-full h-[36px] text-[12px] pl-[44px] py-[8px] bg-[#F7F9FC] border-[#D0D5DD] border-[0.2px] rounded-[8px] focus:outline-none"
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
            />
          </div>

          {filteredStaffs.map((staff, index) => (
            <button
              key={index}
              onClick={() => handleSelectStaff(staff)}
              className="w-full px-[10px] py-2 rounded-[10px] flex items-center justify-between mb-2"
              style={{ borderColor: "rgba(18, 3, 58, 0.10)", borderWidth: 0.2 }}
            >
              <div className="flex items-center">
                {staff.logo ? (
                  <img src={staff.logo} alt={staff.name} className="mr-3 rounded-full" style={{ height: 24, width: 24 }} />
                ) : (
                  <div className="rounded-full bg-[#F6F6F6] border border-[#EDF2F7] py-[5px] px-[5px] mr-3">
                    <staff size="14" color="#BAB4B2FF" variant="Bold" />
                  </div>
                )}
                <p className="text-[#272F35] text-[12px] mb-0">{staff.email}</p>
              </div>
              {selectedStaff?.id === staff.id ? (
                <RecordCircle size="16" color="#984779" variant="Bold" />
              ) : (
                <RecordCircle size="16" color="#DEDEDE" variant="Bold" />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default StaffListModal;
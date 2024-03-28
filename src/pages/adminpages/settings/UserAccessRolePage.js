import React from "react";
import { useState } from "react";
import UserAccessRole from "./UserAccessRole";
import AssignRoleToUser from "./AssignRoleToUser";

const UserAccessRolePage = () => {
  const [page, setPage] = useState(true);
  const [username, setUserName] = useState("");
  const handleSubmit = (id, name) => {
    setPage(false);
    console.log(id, name);
    setUserName(name);
  };
  return (
    <div>
      {page ? (
        <UserAccessRole handleSubmit={handleSubmit} />
      ) : (
        <AssignRoleToUser username={username} />
      )}
    </div>
  );
};

export default UserAccessRolePage;

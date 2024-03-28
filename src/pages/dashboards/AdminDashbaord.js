import { useEffect, useState } from "react";
import "./AdminDashboard.css";
import AdminDashboardRoute from "../../routes/AdminDashboardRoute";
import AdminLeftDashboard from "../../components/adminleftnavbar/AdminLeftNavbar";

const AdminDashboard = () => {
  //   const [users, setUsers] = useState([]);
  const [mobile, setMobile] = useState(true);
  const [display, setDisplay] = useState(true);
  const [width, setWidth] = useState(window.innerWidth);
  useEffect(() => {
    setInterval(function () {
      setWidth(window.innerWidth);
    }, 1000);
  }, []);
  useEffect(() => {
    if (width < 1180) {
      setDisplay(true);
      // setMobile(true);
    } else if (width > 1180) {
      setDisplay(false);
      setMobile(true);
    }
  }, [width]);

  return (
    <div style={{ fontSize: "14px" }}>
      <div className='d-flex text-white'>
        <AdminLeftDashboard mobile={mobile} setMobile={setMobile} />
        <AdminDashboardRoute
          mobile={mobile}
          setMobile={setMobile}
          display={display}
        />
      </div>
    </div>
  );
};

export default AdminDashboard;

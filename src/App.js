// import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import AdminDashboard from "./pages/dashboards/AdminDashbaord";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SnackbarProvider } from "notistack";
import { Toaster } from "react-hot-toast";
import SeeJobs from "./pages/SeeJobs";
import ApplyJob from "./pages/ApplyJobs";
import CarryOverLeave from "./pages/adminpages/leave/CarryOverLeave";


const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      cacheTime: Infinity,
    },
  },
});

function App() {
  return (
    <div>
      <Toaster position="top-right" reverseOrder={false} />
      <SnackbarProvider>
        <QueryClientProvider client={queryClient}>
          <Router>
            <div>
              <Routes>
                <Route path='/' exact element={<Login />} />
                <Route path='/career' exact element={<SeeJobs />} />
                <Route path='/apply' exact element={<ApplyJob />} />
                <Route path='/carryover' exact element={<CarryOverLeave />} />
                <Route path='/*' element={<AdminDashboard />} />
              </Routes>
            </div>
          </Router>
        </QueryClientProvider>
      </SnackbarProvider>
    </div>
  );
}

export default App;

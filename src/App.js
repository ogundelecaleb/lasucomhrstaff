// import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import AdminDashboard from "./pages/dashboards/AdminDashbaord";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SnackbarProvider } from "notistack";
import { Toaster } from "react-hot-toast";


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

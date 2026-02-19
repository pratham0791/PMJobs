import React, { useContext, useEffect } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";
import { AppContext } from "../context/AppContext";

const Dashboard = () => {
  const navigate = useNavigate();

  const { companyData, setCompanyData, setCompanyToken } =
    useContext(AppContext);

  //Function to handle logout
  const logout = () => {
    setCompanyData(null);
    setCompanyToken(null);
    localStorage.removeItem("companyToken");
    navigate("/");
  };

  useEffect(() => {
    if (companyData) {
      navigate("/dashboard/manage-jobs");
    }
  }, [companyData]);
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <div className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
        <div className="px-5 flex justify-between items-center py-4">
          <img
            onClick={() => navigate("/")}
            className="ml-14 max-sm:w-32 h-12 scale-450 w-10 cursor-pointer transition-transform hover:scale-[4.6] duration-200"
            src={assets.pmjobs_logo}
            alt=""
          />
          {companyData && (
            <div className="flex items-center gap-4">
              <p className="max-sm:hidden text-gray-700 font-medium">
                Welcome, {companyData.name}
              </p>
              <div className="relative group">
                <img
                  className="w-10 h-10 border-2 border-gray-200 rounded-full cursor-pointer hover:border-blue-500 transition-all duration-200 object-cover"
                  src={companyData.image}
                  alt=""
                />
                <div className="absolute z-10 right-0 top-0 hidden group-hover:block text-black rounded pt-12">
                  <ul className="list-none bg-white rounded-lg shadow-xl border border-gray-200 p-1 m-0 text-sm min-w-[140px]">
                    <li
                      onClick={logout}
                      className="cursor-pointer hover:bg-blue-50 px-4 py-2.5 rounded-md transition-colors duration-150 text-gray-700 hover:text-blue-600 font-medium"
                    >
                      Logout
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="flex items-start">
        {/* Left Sidebar */}
        <div className="inline-block min-h-screen border-r border-gray-200 bg-white">
          <h2 className="text-xl font-bold text-center py-6 text-gray-800 border-b border-gray-200">
            Admin Dashboard
          </h2>
          <ul className="flex flex-col items-start pt-3 text-gray-800">
            <NavLink
              className={({ isActive }) =>
                `flex items-center p-4 sm:px-6 gap-3 w-full hover:bg-blue-50 transition-all duration-200 font-medium ${
                  isActive &&
                  "bg-blue-50 border-r-4 border-blue-600 text-blue-700"
                }`
              }
              to="/dashboard/add-job"
            >
              <img className="min-w-4" src={assets.add_icon} alt="" />
              <p className="max-sm:hidden">Add Job</p>
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                `flex items-center p-4 sm:px-6 gap-3 w-full hover:bg-blue-50 transition-all duration-200 font-medium ${
                  isActive &&
                  "bg-blue-50 border-r-4 border-blue-600 text-blue-700"
                }`
              }
              to="/dashboard/manage-jobs"
            >
              <img className="min-w-4" src={assets.home_icon} alt="" />
              <p className="max-sm:hidden">Manage Jobs</p>
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                `flex items-center p-4 sm:px-6 gap-3 w-full hover:bg-blue-50 transition-all duration-200 font-medium ${
                  isActive &&
                  "bg-blue-50 border-r-4 border-blue-600 text-blue-700"
                }`
              }
              to="/dashboard/view-applications"
            >
              <img className="min-w-4" src={assets.person_tick_icon} alt="" />
              <p className="max-sm:hidden">View Applications</p>
            </NavLink>
          </ul>
        </div>
        <div className="flex-1 h-full p-2 sm:p-5">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

import { assets } from "../assets/assets";
import { useClerk, UserButton, useUser } from "@clerk/clerk-react";
import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const Navbar = () => {
  const { openSignIn } = useClerk();
  const { user } = useUser();
  const navigate = useNavigate();

  const {
    setShowRecruiterLogin,
    companyData,
    setCompanyData,
    setCompanyToken,
  } = useContext(AppContext);

  // Recruiter logout
  const recruiterLogout = () => {
    setCompanyData(null);
    setCompanyToken(null);
    localStorage.removeItem("companyToken");
    navigate("/");
  };

  return (
    <div className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200 shadow-sm">
      <div className="container px-4 2xl:px-20 mx-auto flex justify-between items-center py-4">
        {/* Logo */}
        <img
          onClick={() => navigate("/")}
          className="h-12 scale-450 cursor-pointer transition-transform hover:scale-[4.6] duration-200"
          src={assets.pmjobs_logo}
          alt=""
        />

        {/* Right section */}
        <div className="flex items-center gap-4">
          {/* Recruiter logged in */}
          {companyData ? (
            <>
              {/* Dashboard button */}
              <button
                onClick={() => navigate("/dashboard/manage-jobs")}
                className="bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 text-white px-5 py-2 rounded-lg font-medium shadow-md hover:shadow-lg transition-all duration-200"
              >
                Recruiter Dashboard
              </button>

              {/* Recruiter profile */}
              <div className="relative group">
                <img
                  src={companyData.image}
                  alt=""
                  className="w-10 h-10 rounded-full border-2 border-gray-200 cursor-pointer object-cover hover:border-indigo-500 transition-all duration-200"
                />

                {/* Dropdown */}
                <div className="absolute right-0 mt-0 hidden group-hover:block">
                  <div className="bg-white border border-gray-200 rounded-lg shadow-lg min-w-[160px] overflow-hidden">
                    <div className="px-4 py-2 border-b bg-gray-50">
                      <p className="text-sm font-semibold text-gray-700">
                        {companyData.name}
                      </p>
                    </div>

                    <button
                      onClick={() => navigate("/dashboard/manage-jobs")}
                      className="w-full text-left px-4 py-2 hover:bg-indigo-50 text-gray-700 hover:text-indigo-600 font-medium"
                    >
                      Dashboard
                    </button>

                    <button
                      onClick={recruiterLogout}
                      className="w-full text-left px-4 py-2 hover:bg-red-50 text-gray-700 hover:text-red-600 font-medium"
                    >
                      Logout
                    </button>
                  </div>
                </div>
              </div>
            </>
          ) : user ? (
            <>
              {/* User navigation */}
              <Link
                to="/applications"
                className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200"
              >
                Applied Jobs
              </Link>

              <div className="w-px h-5 bg-gray-300"></div>

              <p className="max-sm:hidden text-gray-600 font-medium">
                Hi, {user.firstName} {user.lastName}
              </p>

              <UserButton />
            </>
          ) : (
            <>
              {/* Recruiter login */}
              <button
                onClick={() => setShowRecruiterLogin(true)}
                className="text-gray-600 hover:text-gray-900 font-medium px-4 py-2 rounded-lg hover:bg-gray-100 transition-all duration-200"
              >
                Recruiter Login
              </button>

              {/* User login */}
              <button
                onClick={() => openSignIn()}
                className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-6 py-2.5 rounded-full font-medium shadow-md hover:shadow-lg transition-all duration-200"
              >
                Login
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;

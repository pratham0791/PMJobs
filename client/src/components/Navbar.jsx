import { assets } from "../assets/assets";
import { useClerk, UserButton, useUser } from "@clerk/clerk-react";
import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const Navbar = () => {
  const { openSignIn } = useClerk();
  const { user } = useUser();
  const navigate = useNavigate();
  const { setShowRecruiterLogin } = useContext(AppContext);
  return (
    <div className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200/50 shadow-sm">
      <div className="container px-4 2xl:px-20 mx-auto flex justify-between items-center py-4">
        <img
          onClick={() => navigate("/")}
          className="h-12 scale-450 cursor-pointer transition-transform hover:scale-[4.6] duration-200"
          src={assets.pmjobs_logo}
          alt=""
        />
        {user ? (
          <div className="flex items-center gap-4">
            <Link
              to="/applications"
              className="text-gray-700 hover:text-blue-600 transition-colors duration-200 font-medium"
            >
              Applied Jobs
            </Link>
            <div className="w-px h-5 bg-gray-300"></div>
            <p className="max-sm:hidden text-gray-600 font-medium">
              Hi, {user.firstName + " " + user.lastName}{" "}
            </p>
            <UserButton />
          </div>
        ) : (
          <div className="flex gap-3 max-sm:text-xs items-center">
            <button
              onClick={(e) => setShowRecruiterLogin(true)}
              className="text-gray-600 hover:text-gray-900 font-medium transition-colors duration-200 px-4 py-2 rounded-lg hover:bg-gray-100"
            >
              Recruiter Login
            </button>
            <button
              onClick={(e) => openSignIn()}
              className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-6 sm:px-9 py-2.5 rounded-full font-medium shadow-md hover:shadow-lg transition-all duration-200"
            >
              Login
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;

/* eslint-disable react-hooks/set-state-in-effect */
import React, { useContext, useEffect, useState } from "react";
import { assets } from "../assets/assets";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";
import Loading from "../components/Loading";

const ViewApplications = () => {
  const { backendURL, companyToken } = useContext(AppContext);

  const [applicants, setApplicants] = useState(false);

  // Floating dropdown state
  const [activeMenu, setActiveMenu] = useState(null);
  const [menuPosition, setMenuPosition] = useState({ top: 0, left: 0 });

  // Fetch applications
  const fetchCompanyJobApplications = async () => {
    try {
      const { data } = await axios.get(backendURL + "/api/company/applicants", {
        headers: { token: companyToken },
      });

      if (data.success) {
        setApplicants(data.applications?.reverse() || []);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  // Change application status
  const changeJobApplicationStatus = async (id, status) => {
    try {
      const { data } = await axios.post(
        backendURL + "/api/company/change-status",
        { id, status },
        {
          headers: { token: companyToken },
        }
      );

      if (data.success) {
        toast.success(data.message);

        fetchCompanyJobApplications();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  // Open floating menu
  const openMenu = (event, applicantId) => {
    event.stopPropagation();

    const rect = event.currentTarget.getBoundingClientRect();

    setMenuPosition({
      top: rect.bottom + window.scrollY + 5,
      left: rect.right + window.scrollX - 180,
    });

    setActiveMenu(applicantId);
  };

  // Close menu
  const closeMenu = () => setActiveMenu(null);

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = () => closeMenu();

    if (activeMenu) {
      window.addEventListener("click", handleClickOutside);
    }

    return () => window.removeEventListener("click", handleClickOutside);
  }, [activeMenu]);

  useEffect(() => {
    if (companyToken) {
      fetchCompanyJobApplications();
    }
  }, [companyToken]);

  return applicants ? (
    applicants.length === 0 ? (
      <div className="flex items-center justify-center h-[70vh]">
        <p className="text-xl sm:text-2xl">No Applications available</p>
      </div>
    ) : (
      <div className="container p-6 mx-auto">
        <div className="bg-white rounded-2xl shadow-xl border border-gray-200">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 px-8 py-6">
            <h2 className="text-2xl font-bold text-white">Job Applications</h2>

            <p className="text-blue-100 mt-1">
              Manage and review candidate applications
            </p>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full bg-white max-sm:text-sm">
              <thead>
                <tr className="bg-gradient-to-r from-gray-50 to-gray-100 border-b-2 border-blue-200">
                  <th className="py-4 px-6 text-center font-bold text-gray-700">
                    #
                  </th>

                  <th className="py-4 px-6 text-left font-bold text-gray-700">
                    User Name
                  </th>

                  <th className="py-4 px-6 text-left font-bold text-gray-700 max-sm:hidden">
                    Job Title
                  </th>

                  <th className="py-4 px-6 text-left font-bold text-gray-700 max-sm:hidden">
                    Location
                  </th>

                  <th className="py-4 px-6 text-left font-bold text-gray-700">
                    Resume
                  </th>

                  <th className="py-4 px-6 text-center font-bold text-gray-700">
                    Action
                  </th>
                </tr>
              </thead>

              <tbody>
                {applicants
                  ?.filter((item) => item?.jobId && item?.userId)
                  .map((applicant, index) => (
                    <tr
                      key={applicant._id}
                      className="text-gray-700 border-b border-gray-100 hover:bg-blue-50/50 transition-colors duration-150"
                    >
                      {/* Index */}
                      <td className="py-4 px-6 text-center font-semibold text-gray-600">
                        {index + 1}
                      </td>

                      {/* User */}
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-3">
                          <img
                            className="w-10 h-10 rounded-full border-2 border-blue-200 object-cover"
                            src={applicant.userId?.image || assets.default_user}
                            alt=""
                          />

                          <span className="font-semibold text-gray-800">
                            {applicant.userId?.name || "Unknown"}
                          </span>
                        </div>
                      </td>

                      {/* Job */}
                      <td className="py-4 px-6 max-sm:hidden text-gray-700 font-medium">
                        {applicant.jobId?.title || "N/A"}
                      </td>

                      {/* Location */}
                      <td className="py-4 px-6 max-sm:hidden text-gray-600">
                        {applicant.jobId?.location || "N/A"}
                      </td>

                      {/* Resume */}
                      <td className="py-4 px-6">
                        {applicant.userId?.resume ? (
                          <a
                            href={applicant.userId.resume}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-gradient-to-r from-blue-50 to-blue-100 text-blue-600 px-4 py-2 inline-flex rounded-lg gap-2 items-center font-semibold border border-blue-200 hover:from-blue-100 hover:to-blue-200 shadow-sm hover:shadow-md"
                          >
                            View Resume
                            <img
                              className="w-4 h-4"
                              src={assets.resume_download_icon}
                              alt=""
                            />
                          </a>
                        ) : (
                          <span className="text-gray-400">No Resume</span>
                        )}
                      </td>

                      {/* Action */}
                      <td className="py-4 px-6 text-center">
                        {applicant.status === "Pending" ? (
                          <button
                            onClick={(e) => openMenu(e, applicant._id)}
                            className="text-gray-500 hover:text-blue-600 font-bold text-2xl hover:bg-blue-50 w-10 h-10 rounded-lg transition-all flex items-center justify-center mx-auto"
                          >
                            ⋮
                          </button>
                        ) : (
                          <span
                            className={`font-semibold ${
                              applicant.status === "Accepted"
                                ? "text-green-600"
                                : "text-red-600"
                            }`}
                          >
                            {applicant.status}
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Floating Dropdown */}
        {activeMenu && (
          <div
            style={{
              position: "fixed",
              top: menuPosition.top,
              left: menuPosition.left,
              zIndex: 9999,
            }}
            className="w-48 bg-white rounded-xl shadow-2xl border border-gray-200 py-2"
          >
            <button
              onClick={() => {
                changeJobApplicationStatus(activeMenu, "Accepted");
                closeMenu();
              }}
              className="flex items-center gap-2 px-5 py-3 text-sm text-green-700 hover:bg-green-50 w-full text-left font-semibold"
            >
              ✓ Accept
            </button>

            <button
              onClick={() => {
                changeJobApplicationStatus(activeMenu, "Rejected");
                closeMenu();
              }}
              className="flex items-center gap-2 px-5 py-3 text-sm text-red-700 hover:bg-red-50 w-full text-left font-semibold"
            >
              ✕ Reject
            </button>
          </div>
        )}
      </div>
    )
  ) : (
    <Loading />
  );
};

export default ViewApplications;

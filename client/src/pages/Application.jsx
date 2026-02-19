/* eslint-disable no-constant-condition */
import React, { useContext, useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { assets } from "../assets/assets";
import moment from "moment";
import Footer from "../components/Footer";
import { AppContext } from "../context/AppContext";
import { useAuth, useUser } from "@clerk/clerk-react";
import axios from "axios";
import { toast } from "react-toastify";

const Application = () => {
  const [isEdit, setIsEdit] = useState(false);
  const [resume, setResume] = useState(null);

  const { user } = useUser();
  const { getToken } = useAuth();

  const {
    backendURL,
    userData,
    userApplications,
    fetchUserData,
    fetchUserApplications,
  } = useContext(AppContext);

  // Update resume
  const updateResume = async () => {
    try {
      if (!resume) {
        toast.error("Please select a resume");
        return;
      }

      const formData = new FormData();
      formData.append("resume", resume);

      const token = await getToken();

      const { data } = await axios.post(
        backendURL + "/api/user/update-resume",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (data.success) {
        await fetchUserData();
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }

    setIsEdit(false);
    setResume(null);
  };

  // Fetch applications
  useEffect(() => {
    if (user) {
      fetchUserApplications();
    }
  }, [user]);

  return (
    <>
      <Navbar />

      <div className="container mx-auto px-4 my-10 2xl:px-20 min-h-[65vh]">
        {/* Resume Section */}
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Your Resume</h2>

        <div className="flex gap-3 mb-8 mt-4">
          {isEdit || !userData?.resume ? (
            <>
              <label className="flex items-center gap-2 cursor-pointer">
                <p className="bg-gradient-to-r from-blue-100 to-blue-200 text-blue-600 px-5 py-2.5 rounded-lg font-semibold border border-blue-300 hover:from-blue-200 hover:to-blue-300">
                  {resume ? resume.name : "Select Resume"}
                </p>

                <input
                  onChange={(e) => setResume(e.target.files[0])}
                  accept="application/pdf"
                  type="file"
                  hidden
                />

                <img
                  className="w-8 h-8"
                  src={assets.profile_upload_icon}
                  alt=""
                />
              </label>

              <button
                onClick={updateResume}
                className="bg-gradient-to-r from-green-100 to-emerald-100 border-2 border-green-400 text-green-700 px-5 py-2.5 rounded-lg font-semibold hover:from-green-200 hover:to-emerald-200"
              >
                Save
              </button>
            </>
          ) : (
            <div className="flex gap-3">
              <a
                className="bg-gradient-to-r from-blue-100 to-blue-200 text-blue-600 px-5 py-2.5 rounded-lg font-semibold border border-blue-300 hover:from-blue-200 hover:to-blue-300"
                href={userData?.resume}
                target="_blank"
                rel="noopener noreferrer"
              >
                Resume
              </a>

              <button
                onClick={() => setIsEdit(true)}
                className="text-gray-700 border-2 border-gray-300 px-5 py-2.5 rounded-lg font-semibold hover:border-blue-600 hover:text-blue-600"
              >
                Edit
              </button>
            </div>
          )}
        </div>

        {/* Jobs Applied */}
        <h2 className="text-2xl font-bold mb-6 text-gray-900">Jobs Applied</h2>

        <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200">
          <table className="w-full bg-white">
            <thead>
              <tr className="bg-gradient-to-r from-gray-50 to-gray-100 border-b-2 border-blue-200">
                <th className="px-6 py-4 text-left font-bold text-gray-700">
                  Company
                </th>

                <th className="px-6 py-4 text-left font-bold text-gray-700">
                  Job Title
                </th>

                <th className="px-6 py-4 text-left font-bold text-gray-700 max-sm:hidden">
                  Location
                </th>

                <th className="px-6 py-4 text-left font-bold text-gray-700 max-sm:hidden">
                  Date
                </th>

                <th className="px-6 py-4 text-left font-bold text-gray-700">
                  Status
                </th>
              </tr>
            </thead>

            <tbody>
              {userApplications
                ?.filter((job) => job?.jobId && job?.companyId)
                .map((job, index) => (
                  <tr
                    key={job._id || index}
                    className="border-b border-gray-100 hover:bg-blue-50/50 transition-colors duration-150"
                  >
                    {/* Company */}
                    <td className="px-6 py-4 flex items-center gap-3">
                      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-2 rounded-lg border border-blue-200">
                        <img
                          className="w-8 h-8 object-contain"
                          src={
                            job.companyId?.image || assets.default_company_icon
                          }
                          alt=""
                        />
                      </div>

                      <span className="font-semibold text-gray-800">
                        {job.companyId?.name || "Unknown Company"}
                      </span>
                    </td>

                    {/* Job title */}
                    <td className="px-6 py-4 text-gray-700 font-medium">
                      {job.jobId?.title || "N/A"}
                    </td>

                    {/* Location */}
                    <td className="px-6 py-4 max-sm:hidden text-gray-600">
                      {job.jobId?.location || "N/A"}
                    </td>

                    {/* Date */}
                    <td className="px-6 py-4 max-sm:hidden text-gray-600">
                      {job.date ? moment(job.date).format("ll") : "N/A"}
                    </td>

                    {/* Status */}
                    <td className="px-6 py-4">
                      <span
                        className={`px-4 py-1.5 rounded-lg font-semibold border ${
                          job.status === "Accepted"
                            ? "bg-green-100 text-green-700 border-green-300"
                            : job.status === "Rejected"
                            ? "bg-red-100 text-red-700 border-red-300"
                            : "bg-blue-100 text-blue-700 border-blue-300"
                        }`}
                      >
                        {job.status || "Pending"}
                      </span>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Application;

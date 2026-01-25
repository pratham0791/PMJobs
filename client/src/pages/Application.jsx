import React, { useState } from "react";
import Navbar from "../components/Navbar";
import { assets, jobsApplied } from "../assets/assets";
import moment from "moment";
import Footer from "../components/Footer";

const Application = () => {
  const [isEdit, setIsEdit] = useState(false);
  const [resume, setResume] = useState(null);
  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 my-10 2xl:px-20 min-h-[65vh]">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Your Resume</h2>
        <div className="flex gap-3 mb-8 mt-4">
          {isEdit ? (
            <>
              <label className="flex items-center gap-2 cursor-pointer" htmlFor="resumeUpload">
                <p className="bg-gradient-to-r from-blue-100 to-blue-200 text-blue-600 px-5 py-2.5 rounded-lg font-semibold border border-blue-300 hover:from-blue-200 hover:to-blue-300 transition-all duration-200">
                  Select Resume
                </p>
                <input
                  onChange={(e) => setResume(e.target.files[0])}
                  id="resumeUpload"
                  accept="application/pdf"
                  type="file"
                  hidden
                />
                <img className="w-8 h-8" src={assets.profile_upload_icon} alt="" />
              </label>
              <button
                onClick={(e) => setIsEdit(false)}
                className="bg-gradient-to-r from-green-100 to-emerald-100 border-2 border-green-400 text-green-700 px-5 py-2.5 rounded-lg font-semibold hover:from-green-200 hover:to-emerald-200 transition-all duration-200"
              >
                Save
              </button>
            </>
          ) : (
            <div className="flex gap-3">
              <a
                className="bg-gradient-to-r from-blue-100 to-blue-200 text-blue-600 px-5 py-2.5 rounded-lg font-semibold border border-blue-300 hover:from-blue-200 hover:to-blue-300 transition-all duration-200"
                href=""
              >
                Resume
              </a>
              <button
                className="text-gray-700 border-2 border-gray-300 px-5 py-2.5 rounded-lg font-semibold hover:border-blue-600 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200"
                onClick={() => setIsEdit(true)}
              >
                Edit
              </button>
            </div>
          )}
        </div>
        
        <h2 className="text-2xl font-bold mb-6 text-gray-900">Jobs Applied</h2>
        
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200">
          <table className="w-full bg-white">
            <thead>
              <tr className="bg-gradient-to-r from-gray-50 to-gray-100 border-b-2 border-blue-200">
                <th className="px-6 py-4 text-left font-bold text-gray-700">Company</th>
                <th className="px-6 py-4 text-left font-bold text-gray-700">Job Title</th>
                <th className="px-6 py-4 text-left font-bold text-gray-700 max-sm:hidden">Location</th>
                <th className="px-6 py-4 text-left font-bold text-gray-700 max-sm:hidden">Date</th>
                <th className="px-6 py-4 text-left font-bold text-gray-700">Status</th>
              </tr>
            </thead>
            <tbody>
              {jobsApplied.map((job, index) =>
                true ? (
                  <tr key={index} className="border-b border-gray-100 hover:bg-blue-50/50 transition-colors duration-150">
                    <td className="px-6 py-4 flex items-center gap-3">
                      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-2 rounded-lg border border-blue-200">
                        <img className="w-8 h-8 object-contain" src={job.logo} alt="" />
                      </div>
                      <span className="font-semibold text-gray-800">{job.company}</span>
                    </td>
                    <td className="px-6 py-4 text-gray-700 font-medium">{job.title}</td>
                    <td className="px-6 py-4 max-sm:hidden text-gray-600">
                      {job.location}
                    </td>
                    <td className="px-6 py-4 max-sm:hidden text-gray-600">
                      {moment(job.date).format("ll")}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`${
                          job.status === "Accepted"
                            ? "bg-gradient-to-r from-green-100 to-emerald-100 text-green-700 border border-green-300"
                            : job.status === "Rejected"
                            ? "bg-gradient-to-r from-red-100 to-rose-100 text-red-700 border border-red-300"
                            : "bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-700 border border-blue-300"
                        } px-4 py-1.5 rounded-lg font-semibold`}
                      >
                        {job.status}
                      </span>
                    </td>
                  </tr>
                ) : null
              )}
            </tbody>
          </table>
        </div>
      </div>
      <Footer/>
    </>
  );
};

export default Application;
import React from "react";
import { assets, viewApplicationsPageData } from "../assets/assets";

const ViewApplications = () => {
  return (
    <div className="container p-6 mx-auto">
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200">
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 px-8 py-6">
          <h2 className="text-2xl font-bold text-white">Job Applications</h2>
          <p className="text-blue-100 mt-1">Manage and review candidate applications</p>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full bg-white max-sm:text-sm">
            <thead>
              <tr className="bg-gradient-to-r from-gray-50 to-gray-100 border-b-2 border-blue-200">
                <th className="py-4 px-6 text-center font-bold text-gray-700">#</th>
                <th className="py-4 px-6 text-left font-bold text-gray-700">User Name</th>
                <th className="py-4 px-6 text-left font-bold text-gray-700 max-sm:hidden">Job Title</th>
                <th className="py-4 px-6 text-left font-bold text-gray-700 max-sm:hidden">Location</th>
                <th className="py-4 px-6 text-left font-bold text-gray-700">Resume</th>
                <th className="py-4 px-6 text-center font-bold text-gray-700">Action</th>
              </tr>
            </thead>
            <tbody>
              {viewApplicationsPageData.map((applicant, index) => (
                <tr key={index} className="text-gray-700 border-b border-gray-100 hover:bg-blue-50/50 transition-colors duration-150">
                  <td className="py-4 px-6 text-center font-semibold text-gray-600">
                    {index + 1}
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <img
                        className="w-10 h-10 rounded-full border-2 border-blue-200 max-sm:hidden object-cover"
                        src={applicant.imgSrc}
                        alt=""
                      />
                      <span className="font-semibold text-gray-800">{applicant.name}</span>
                    </div>
                  </td>
                  <td className="py-4 px-6 max-sm:hidden text-gray-700 font-medium">
                    {applicant.jobTitle}
                  </td>
                  <td className="py-4 px-6 max-sm:hidden text-gray-600">
                    {applicant.location}
                  </td>
                  <td className="py-4 px-6">
                    <a
                      className="bg-gradient-to-r from-blue-50 to-blue-100 text-blue-600 px-4 py-2 inline-flex rounded-lg gap-2 items-center font-semibold border border-blue-200 hover:from-blue-100 hover:to-blue-200 transition-all duration-200 shadow-sm hover:shadow-md"
                      href=""
                      target="_blank"
                    >
                      View Resume 
                      <img className="w-4 h-4" src={assets.resume_download_icon} alt="" />
                    </a>
                  </td>
                  <td className="py-4 px-6">
                    <div className="relative inline-block text-left group">
                      <button className="text-gray-500 hover:text-blue-600 action-button font-bold text-2xl hover:bg-blue-50 w-10 h-10 rounded-lg transition-all flex items-center justify-center mx-auto">
                        ⋮
                      </button>
                      <div className="absolute right-0 top-0 mt-12 w-48 bg-white rounded-xl shadow-2xl border border-gray-200 py-2 z-10 hidden group-hover:block">
                        <button className="flex items-center gap-2 px-5 py-3 text-sm text-green-700 hover:bg-green-50 w-full text-left font-semibold transition-colors">
                          <span className="text-lg">✓</span> Accept
                        </button>
                        <button className="flex items-center gap-2 px-5 py-3 text-sm text-red-700 hover:bg-red-50 w-full text-left font-semibold transition-colors">
                          <span className="text-lg">✕</span> Reject
                        </button>
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ViewApplications;
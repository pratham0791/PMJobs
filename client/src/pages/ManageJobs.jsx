import React from "react";
import { manageJobsData } from "../assets/assets";
import moment from "moment";
import { useNavigate } from "react-router-dom";

const ManageJobs = () => {
  const navigate = useNavigate();
  return (
    <div className="container p-6 mx-auto">
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200">
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 px-8 py-6">
          <h2 className="text-2xl font-bold text-white">Manage Jobs</h2>
          <p className="text-blue-100 mt-1">View and manage all your job postings</p>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full bg-white max-sm:text-sm">
            <thead>
              <tr className="bg-gradient-to-r from-gray-50 to-gray-100 border-b-2 border-blue-200">
                <th className="px-6 py-4 text-left font-bold text-gray-700 max-sm:hidden">#</th>
                <th className="px-6 py-4 text-left font-bold text-gray-700">Job Title</th>
                <th className="px-6 py-4 text-left font-bold text-gray-700 max-sm:hidden">Date</th>
                <th className="px-6 py-4 text-left font-bold text-gray-700 max-sm:hidden">Location</th>
                <th className="px-6 py-4 text-center font-bold text-gray-700">Applicants</th>
                <th className="px-6 py-4 text-left font-bold text-gray-700">Visible</th>
              </tr>
            </thead>
            <tbody>
              {manageJobsData.map((job, index) => (
                <tr key={index} className="text-gray-700 border-b border-gray-100 hover:bg-blue-50/50 transition-colors duration-150">
                  <td className="py-4 px-6 max-sm:hidden font-semibold text-gray-600">
                    {index + 1}
                  </td>
                  <td className="py-4 px-6 font-semibold text-gray-800">{job.title}</td>
                  <td className="py-4 px-6 max-sm:hidden text-gray-600">
                    {moment(job.date).format("ll")}
                  </td>
                  <td className="py-4 px-6 max-sm:hidden text-gray-600">
                    {job.location}
                  </td>
                  <td className="py-4 px-6 text-center">
                    <span className="bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-700 px-3 py-1 rounded-full font-semibold border border-blue-200">
                      {job.applicants}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <input
                      className="w-5 h-5 cursor-pointer accent-blue-600"
                      type="checkbox"
                      name=""
                      id=""
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      <div className="mt-6 flex justify-end">
        <button 
          onClick={() => navigate("/dashboard/add-job")} 
          className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-6 py-2.5 rounded-lg font-semibold shadow-md hover:shadow-lg transition-all duration-200 active:scale-95"
        >
          Add new job
        </button>
      </div>
    </div>
  );
};

export default ManageJobs;
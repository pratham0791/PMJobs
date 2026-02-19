/* eslint-disable react-hooks/set-state-in-effect */
import React, { useContext, useEffect, useState } from "react";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { toast } from "react-toastify";
import axios from "axios";
import Loading from "../components/Loading";

const ManageJobs = () => {
  const navigate = useNavigate();

  const [jobs, setJobs] = useState(false);

  const { backendURL, companyToken } = useContext(AppContext);

  //Function to fetch company jobs Application data
  const fetchCompanyJobs = async () => {
    try {
      const { data } = await axios.get(backendURL + "/api/company/list-jobs", {
        headers: { token: companyToken },
      });
      if (data.success) {
        setJobs(data.jobsData.reverse());
        console.log(data.jobsData);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  //Function to change visibility of job
  const changeJobVisibility = async (id) => {
    try {
      const { data } = await axios.post(
        backendURL + "/api/company/change-visibility",
        { id },
        { headers: { token: companyToken } }
      );
      if (data.success) {
        toast.success(data.message);
        fetchCompanyJobs();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  //Function to delete job
  // Function to delete job
  const deleteJob = async (id) => {
    try {
      const confirmDelete = window.confirm(
        "Are you sure you want to delete this job?"
      );

      if (!confirmDelete) return;

      const { data } = await axios.post(
        backendURL + "/api/company/delete-job",
        { id },
        { headers: { token: companyToken } }
      );

      if (data.success) {
        toast.success("Job deleted successfully");
        fetchCompanyJobs(); // refresh jobs list
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (companyToken) {
      fetchCompanyJobs();
    }
  }, [companyToken]);
  return jobs ? (
    jobs.length === 0 ? (
      <div className="flex items-center justify-center h-[70vh]">
        <p className="text-xl sm:text-2xl">No jobs available</p>
      </div>
    ) : (
      <div className="container p-6 mx-auto">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200">
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 px-8 py-6">
            <h2 className="text-2xl font-bold text-white">Manage Jobs</h2>
            <p className="text-blue-100 mt-1">
              View and manage all your job postings
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full bg-white max-sm:text-sm">
              <thead>
                <tr className="bg-gradient-to-r from-gray-50 to-gray-100 border-b-2 border-blue-200">
                  <th className="px-6 py-4 text-left font-bold text-gray-700 max-sm:hidden">
                    #
                  </th>
                  <th className="px-6 py-4 text-left font-bold text-gray-700">
                    Job Title
                  </th>
                  <th className="px-6 py-4 text-left font-bold text-gray-700 max-sm:hidden">
                    Date
                  </th>
                  <th className="px-6 py-4 text-left font-bold text-gray-700 max-sm:hidden">
                    Location
                  </th>
                  <th className="px-6 py-4 text-center font-bold text-gray-700">
                    Applicants
                  </th>
                  <th className="px-6 py-4 text-left font-bold text-gray-700">
                    Visible
                  </th>
                  <th className="px-6 py-4 text-left font-bold text-gray-700">
                    Delete
                  </th>
                </tr>
              </thead>
              <tbody>
                {jobs.map((job, index) => (
                  <tr
                    key={index}
                    className="text-gray-700 border-b border-gray-100 hover:bg-blue-50/50 transition-colors duration-150"
                  >
                    <td className="py-4 px-6 max-sm:hidden font-semibold text-gray-600">
                      {index + 1}
                    </td>
                    <td className="py-4 px-6 font-semibold text-gray-800">
                      {job.title}
                    </td>
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
                        onChange={() => changeJobVisibility(job._id)}
                        className="w-5 h-5 cursor-pointer accent-blue-600"
                        type="checkbox"
                        checked={job.visible}
                      />
                    </td>
                    <td className="py-4 px-6 text-center">
                      <button
                        onClick={() => deleteJob(job._id)}
                        className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg font-semibold shadow-sm hover:shadow-md transition-all duration-200 active:scale-95"
                      >
                        Delete
                      </button>
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
    )
  ) : (
    <Loading />
  );
};

export default ManageJobs;

/* eslint-disable react-hooks/set-state-in-effect */
import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import Loading from "../components/Loading";
import Navbar from "../components/Navbar";
import { assets } from "../assets/assets";
import kconvert from "k-convert";
import moment from "moment";
import JobCard from "../components/JobCard";
import Footer from "../components/Footer";
import axios from "axios";
import { toast } from "react-toastify";
import { useAuth } from "@clerk/clerk-react";

const ApplyJob = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getToken } = useAuth();

  const [jobData, setJobData] = useState(null);
  const [isAlreadyApplied, setIsAlreadyApplied] = useState(false);
  const [isApplying, setIsApplying] = useState(false);

  const {
    jobs,
    backendURL,
    userData,
    userApplications,
    fetchUserApplications,
  } = useContext(AppContext);

  // Fetch job
  const fetchJob = async () => {
    try {
      const { data } = await axios.get(backendURL + `/api/jobs/${id}`);

      if (data.success) {
        setJobData(data.job);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  // Apply handler (logic fix only)
  const applyHandler = async () => {
    try {
      if (isApplying || isAlreadyApplied) return;

      if (!userData) {
        return toast.error("Please login to apply for job");
      }

      if (!userData?.resume) {
        navigate("/applications");
        return toast.error("Please upload your resume to apply for job");
      }

      setIsApplying(true);

      const token = await getToken();

      const { data } = await axios.post(
        backendURL + "/api/user/apply",
        { jobId: jobData?._id },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (data.success) {
        toast.success(data.message);

        await fetchUserApplications();

        setIsAlreadyApplied(true);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }

    setIsApplying(false);
  };

  // Check already applied (logic fix only)
  const checkalreadyApplied = () => {
    if (!jobData || !userApplications) return;

    const hasApplied = userApplications.some(
      (item) => item?.jobId?._id === jobData?._id
    );

    setIsAlreadyApplied(hasApplied);
  };

  useEffect(() => {
    fetchJob();
  }, [id]);

  useEffect(() => {
    checkalreadyApplied();
  }, [jobData, userApplications]);

  // Safe applied jobs set (logic fix)
  const appliedJobsIds = new Set(
    userApplications
      ?.filter((app) => app?.jobId?._id)
      .map((app) => app.jobId._id)
  );

  return jobData ? (
    <>
      <Navbar />

      <div className="min-h-screen flex flex-col py-10 container px-4 2xl:px-20 mx-auto">
        <div className="bg-white text-black rounded-2xl w-full">
          <div className="relative flex md:justify-between flex-wrap gap-8 px-14 py-20 mb-6 bg-gradient-to-br from-blue-50 via-sky-50 to-indigo-50 border-2 border-blue-300 rounded-xl overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-300/20 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-300/20 rounded-full blur-3xl"></div>

            <div className="relative z-10 flex flex-col md:flex-row items-center">
              <div className="bg-white rounded-xl p-4 mr-4 max-md:mb-4 border-2 border-blue-200 shadow-md">
                <img
                  className="h-24 object-contain"
                  src={jobData?.companyId?.image}
                  alt=""
                />
              </div>

              <div className="text-center md:text-left text-neutral-700">
                <h1 className="text-2xl sm:text-4xl font-medium">
                  {jobData?.title}
                </h1>

                <div className="flex flex-row flex-wrap max-md:justify-center gap-y-2 gap-6 items-center mt-2 text-gray-600">
                  <span className="flex items-center gap-1 bg-gradient-to-r from-blue-50 to-blue-100 px-3 py-1.5 rounded-lg border border-blue-200 font-medium">
                    <img src={assets.suitcase_icon} alt="" />
                    {jobData?.companyId?.name}
                  </span>

                  <span className="flex items-center gap-1 bg-gradient-to-r from-indigo-50 to-indigo-100 px-3 py-1.5 rounded-lg border border-indigo-200 font-medium">
                    <img src={assets.location_icon} alt="" />
                    {jobData?.location}
                  </span>

                  <span className="flex items-center gap-1 bg-gradient-to-r from-purple-50 to-purple-100 px-3 py-1.5 rounded-lg border border-purple-200 font-medium">
                    <img src={assets.person_icon} alt="" />
                    {jobData?.level}
                  </span>

                  <span className="flex items-center gap-1 bg-gradient-to-r from-green-50 to-green-100 px-3 py-1.5 rounded-lg border border-green-200 font-medium">
                    <img src={assets.money_icon} alt="" />
                    CTC:{kconvert.convertTo(jobData?.salary)}
                  </span>
                </div>
              </div>
            </div>

            <div className="relative z-10 flex flex-col justify-center text-end text-sm max-md:mx-auto max-md:text-center">
              <button
                onClick={applyHandler}
                disabled={isAlreadyApplied || isApplying}
                className="bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 text-white font-medium py-2 px-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {isAlreadyApplied
                  ? "Already applied"
                  : isApplying
                  ? "Applying..."
                  : "Apply now"}
              </button>

              <p className="mt-2 text-gray-600">
                Posted {moment(jobData?.date).fromNow()}
              </p>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row justify-between items-start">
            <div className="w-full lg:w-2/3">
              <h2 className="text-2xl font-bold mb-4">Job Description</h2>

              <div
                className="rich-text"
                dangerouslySetInnerHTML={{
                  __html: jobData?.description,
                }}
              ></div>

              <button
                onClick={applyHandler}
                disabled={isAlreadyApplied || isApplying}
                className="bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 text-white font-medium py-2 px-4 rounded-lg mt-10 shadow-md hover:shadow-lg transition-all duration-200 active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {isAlreadyApplied
                  ? "Already applied"
                  : isApplying
                  ? "Applying..."
                  : "Apply now"}
              </button>
            </div>

            {/* Right section more jobs */}

            <div className="w-full lg:w-1/3 lg:pl-10 mt-10 lg:mt-0 space-y-5">
              <h2>More Jobs {jobData?.companyId?.name}</h2>

              {jobs
                ?.filter(
                  (job) =>
                    job?.companyId?._id === jobData?.companyId?._id &&
                    job?._id !== jobData?._id
                )
                ?.filter((job) => !appliedJobsIds.has(job?._id))
                ?.slice(0, 4)
                ?.map((job, index) => (
                  <JobCard key={index} job={job} />
                ))}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  ) : (
    <Loading />
  );
};

export default ApplyJob;

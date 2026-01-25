import React from "react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";

const JobCard = ({ job }) => {
  const navigate = useNavigate();

  return (
    <div className="group border border-gray-200 hover:border-blue-400 p-6 shadow-md hover:shadow-2xl rounded-xl transition-all duration-300 hover:-translate-y-2 bg-white">
      <div className="flex justify-between items-center">
        <div className="bg-gradient-to-br from-blue-50 to-indigo-100 p-2.5 rounded-lg">
          <img className="h-9" src={assets.company_icon} alt="" />
        </div>
      </div>
      <h4 className="font-bold text-xl mt-3 text-gray-800 group-hover:text-blue-600 transition-colors">{job.title}</h4>
      <div className="flex items-center gap-3 mt-3 text-xs">
        <span className="bg-gradient-to-r from-blue-50 to-blue-100 border border-blue-200 px-4 py-1.5 rounded-lg text-blue-700 font-medium">
          {job.location}
        </span>
        <span className="bg-gradient-to-r from-red-50 to-orange-50 border border-red-200 px-4 py-1.5 rounded-lg text-red-700 font-medium">
          {job.level}
        </span>
      </div>
      <p
        className="text-gray-600 text-sm mt-4 leading-relaxed"
        dangerouslySetInnerHTML={{ __html: job.description.slice(0, 150) }}
      ></p>
      <div className="mt-5 flex gap-3 text-sm">
        <button 
          onClick={()=>{navigate(`/apply-job/${job._id}`);scrollTo(0,0)}} 
          className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-5 py-2.5 rounded-lg font-semibold shadow-md hover:shadow-lg transition-all duration-200 active:scale-95"
        >
          Apply Now
        </button>
        <button 
          onClick={()=>{navigate(`/apply-job/${job._id}`);scrollTo(0,0)}} 
          className="text-gray-700 border-2 border-gray-400 hover:border-blue-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg px-5 py-2.5 font-semibold transition-all duration-200"
        >
          Learn More
        </button>
      </div>
    </div>
  );
};

export default JobCard;
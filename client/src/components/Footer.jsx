import React from "react";
import { assets } from "../assets/assets";

function Footer() {
  return (
    <div className="bg-gradient-to-b from-white to-gray-50 border-t border-gray-200">
      <div className="container px-4 mx-auto 2xl:px-20 flex items-center justify-between gap-4 py-6 mt-20">
        <img width={180} src={assets.pmjobs_logo} alt="" />
        <p className="flex-1 border-l border-gray-300 pl-4 text-sm text-gray-600 max-sm:hidden">
          Copyright @PMJobs | All Rights Reserved.
        </p>
        <div className="flex gap-3">
          <img
            width={38}
            src={assets.facebook_icon}
            alt=""
            className="cursor-pointer hover:scale-110 transition-transform duration-200 opacity-80 hover:opacity-100"
          />
          <img
            width={38}
            src={assets.twitter_icon}
            alt=""
            className="cursor-pointer hover:scale-110 transition-transform duration-200 opacity-80 hover:opacity-100"
          />
          <img
            width={38}
            src={assets.instagram_icon}
            alt=""
            className="cursor-pointer hover:scale-110 transition-transform duration-200 opacity-80 hover:opacity-100"
          />
        </div>
      </div>
    </div>
  );
}

export default Footer;

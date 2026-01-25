import React, { useContext, useEffect, useState } from "react";
import { assets } from "../assets/assets";
import { AppContext } from "../context/AppContext";

function RecrutierLogin() {
  const [state, setState] = useState("Login");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const [image, setImage] = useState(false);
  const [isTextDataSubmited, setIsTextDataSubmited] = useState(false);
  const { setShowRecruiterLogin } = useContext(AppContext);

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    if (state === "Sign Up" && !isTextDataSubmited) {
      setIsTextDataSubmited(true);
    }
  };

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  return (
    <div className="absolute top-0 left-0 right-0 bottom-0 backdrop-blur-sm flex justify-center items-center bg-black/30 z-10">
      <form
        onSubmit={onSubmitHandler}
        className="relative bg-white p-10 rounded-lg shadow-lg text-slate-500"
      >
        <h1 className="text-2xl font-bold mb-2 text-center text-neutral-700">
          Recrutier
        </h1>
        <p className="text-sm">Welcome Back Please Sign in to continue</p>
        {state === "Sign Up" && isTextDataSubmited ? (
          <>
            <div className="flex items-center gap-4 my-10">
              <label htmlFor="image">
                <img
                  className="w-16 rounded-full"
                  src={image ? URL.createObjectURL(image) : assets.upload_area}
                  alt=""
                />
                <input
                  onChange={(e) => setImage(e.target.files[0])}
                  type="file"
                  id="image"
                  hidden
                />
              </label>
              <p>
                Upload Company <br /> Logo
              </p>
            </div>
          </>
        ) : (
          <>
            {state !== "Login" && (
              <div className="border px-4 py-2 rounded-lg flex items-center gap-2 mt-6">
                <img src={assets.person_icon} alt="" />
                <input
                  className="outline-none text-sm"
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                  type="text"
                  placeholder="Company Name"
                  required
                />
              </div>
            )}

            <div className="border px-4 py-2 rounded-lg flex items-center gap-2 mt-4">
              <img src={assets.email_icon} alt="" />
              <input
                className="outline-none text-sm"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                type="email"
                placeholder="Company Email"
                required
              />
            </div>
            <div className="border px-4 py-2 rounded-lg flex items-center gap-2 mt-4">
              <img src={assets.lock_icon} alt="" />
              <input
                className="outline-none text-sm"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                type="password"
                placeholder="Company Password"
                required
              />
            </div>
          </>
        )}
        {state === "Login" && (
          <p className="text-sm text-blue-500 cursor-pointer mt-2">
            Forgot Password?
          </p>
        )}

        <button
          type="submit"
          className="w-full  bg-blue-500 text-white py-2 rounded-lg mt-6"
        >
          {state === "Login"
            ? "Login"
            : isTextDataSubmited
            ? "Create Account"
            : "Next"}
        </button>
        <p className="text-sm mt-4 text-center">
          {state === "Login"
            ? "Don't have an account?"
            : "Already have an account?"}
          <span
            onClick={() => setState(state === "Login" ? "Sign Up" : "Login")}
            className="text-blue-500 cursor-pointer ml-1"
          >
            {state === "Login" ? "Sign Up" : "Login"}
          </span>
        </p>
        <img
          onClick={(e) => setShowRecruiterLogin(false)}
          className="absolute top-4 right-4 cursor-pointer"
          src={assets.cross_icon}
          alt=""
        />
      </form>
    </div>
  );
}

export default RecrutierLogin;

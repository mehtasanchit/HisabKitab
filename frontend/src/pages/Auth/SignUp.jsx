import React, { use, useState } from "react";
import AuthLayout from "../../components/layouts/AuthLayout";
import { Link, useNavigate } from "react-router-dom";
import Input from "../../components/inputs/input";
import { validateEmail } from "../../utils/Helper";
import ProfilePhotoSelector from "../../components/inputs/ProfilePhotoSelector";
import axiosInstance from "../../services/AxiosInstance";
import { API_PATHS } from "../../services/ApiPaths";
import { useContext } from "react";
import { UserContext } from "../../context/UseContext";
import uploadImage from "../../services/uploadimage";

const SignUp = () => {
  const [profilePic, setProfilePic] = useState(null);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState(null);

  const { updateUser } = useContext(UserContext);

  const navigate = useNavigate();

  //handle signup form submit
  const handleSignUp = async (e) => {
    e.preventDefault();
    let profileImageUrl = "";
    let errorMessage = "";
    if (!fullName) {
      errorMessage = "please enter your name";
    } else if (!validateEmail(email)) {
      errorMessage = "Please enter a valid Email :(";
    } else if (!password) {
      errorMessage = "Please enter a valid Password :(";
    }

    if (errorMessage) {
      setError(errorMessage);
      return;
    }

    setError("");

    //signup API CALL
    try {
      // Upload image if present
      if (profilePic) {
        const imgUploadRes = await uploadImage(profilePic);
        profileImageUrl = imgUploadRes.imageUrl || "";
      }

      const response = await axiosInstance.post(API_PATHS.AUTH.REGISTER, {
        fullName,
        email,
        password,
        profileImageUrl,
      });

      const { token, user } = response.data;

      if (token) {
        localStorage.setItem("token", token);
        updateUser(user);
        navigate("/dashboard");
      }
    } catch (error) {
      if (error.response && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError("Something went wrong. Please try again.");
      }
    }
  };

  return (
    <AuthLayout>
      <div className="w-full h-full flex flex-col justify-center">
        <h3 className="text-xl font-semibold text-black">Create An Acoount</h3>
        <p className="text-xs text-slate-700 mt-[7px] mb-8">
          Join us today by entering your details below.
        </p>

        <form onSubmit={handleSignUp}>
          <ProfilePhotoSelector image={profilePic} setImage={setProfilePic} />

          <div className="grid grid-cols-2 gap-4">
            <Input
              value={fullName}
              onChange={({ target }) => setFullName(target.value)}
              label="Full Name"
              placeholder="Jhon"
              type="text"
            />
            <Input
              value={email}
              onChange={({ target }) => setEmail(target.value)}
              label="Email Address"
              placeholder="jhon@email.com"
              type="text"
            />
            <div className="col-span-2">
              <Input
                value={password}
                onChange={({ target }) => setPassword(target.value)}
                label="password"
                placeholder="MIN 8 CHARACTERS"
                type="password"
              />
            </div>
          </div>

          {error && <p className="text-red-500 text-xs pb-2.5">{error}</p>}

          <button type="submit" className="btn-primary">
            Sign Up
          </button>

          <p className="text-[13px] text-slate-800 mt-3">
            Already have an account ?{" "}
            <Link className="font-medium text-primary underline" to="/login">
              Login
            </Link>
          </p>
        </form>
      </div>
    </AuthLayout>
  );
};

export default SignUp;

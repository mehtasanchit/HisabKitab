import React, { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";

const Input = ({ value, onChange, label, placeholder, type }) => {
  const [shadowpassword, setShowpassword] = useState(false);

  const toggleshowpassword = () => {
    setShowpassword(!shadowpassword);
  };

  return (
    <div>
      <label className="text-[13px] text-slate-800">{label}</label>

      <div className="input-box">
        <input
          type={
            type == "password" ? (shadowpassword ? "text" : "password") : type
          }
          placeholder={placeholder}
          className="w-full bg-transparent outline-none"
          onChange={(e) => onChange(e)}
          value={value}
        />

        {type === "password" && (
          <>
            {shadowpassword ? (
              <FaRegEye
                size={22}
                className="text-primary cursor-pointer"
                onClick={() => toggleshowpassword()}
              />
            ) : (
              <FaRegEyeSlash
                size={22}
                className="text-primary cursor-pointer"
                onClick={() => toggleshowpassword()}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Input;

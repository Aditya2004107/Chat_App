import { useState } from "react";
import { BiLogOut } from "react-icons/bi";
import axios from "axios";
import Cookies from "js-cookie";
import toast from "react-hot-toast";

const logout = () => {
  const [loading, setLoading] = useState(false);
  const handleLogout = async () => {
    setLoading(true);
    try {
      const res = await axios.post("/api/user/logout");
      localStorage.removeItem("message");
      Cookies.remove("jwt");
      setLoading(false);
      toast.success("User logged out Successfully");
    } catch (error) {
      toast.error(error,"Error logging out");
    }
  };
  return (
    <>
      <div className="w-[5%]  bg-slate-950 text-white flex flex-col justify-end">
        <div className="p-3 align-bottom ">
          <div className="flex space-x-3">
            <button>
              <BiLogOut
                className="text-5xl p-2 hover:bg-gray-600 rounded-lg duration-300"
                onClick={handleLogout}
              />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default logout;

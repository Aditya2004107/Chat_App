import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";

function useGetAllUsers() {
  const [allUsers, setAllUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUsers = async () => {
      try {
        const token = Cookies.get("jwt");
        const response = await axios.get("/api/user/getUserProfile", {
          credentials: "include",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (
          response.data?.filiteredUsers &&
          Array.isArray(response.data.filiteredUsers)
        ) {
          setAllUsers(response.data.filiteredUsers);
        } else {
          console.error("Unexpected API data format:", response.data);
          setAllUsers([]);
        }
      } catch (error) {
        console.error("Error in useGetAllUsers:", error);
        setAllUsers([]);
      } finally {
        setLoading(false);
      }
    };

    getUsers();
  }, []);

  return [allUsers, loading];
}

export default useGetAllUsers;

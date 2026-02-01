// 
"use client";

import { useEffect, useState } from "react";
import UserContext from "./UserContext";
import { CurrentUser } from "../services/userservice";

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // ✅ important

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const res = await CurrentUser();
        setUser(res.user || null); // ✅ ONLY the user object
      } catch (error) {
        setUser(null);
      } finally {
        setLoading(false); // ✅ stop flicker
      }
    };

    fetchCurrentUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, loading }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;

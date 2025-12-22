import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../providers/AuthProvider";
import axios from "axios";

const useAdmin = () => {
  const { user } = useContext(AuthContext);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isAdminLoading, setIsAdminLoading] = useState(true);

  useEffect(() => {
    if (user?.email) {
      axios
        .get(`http://localhost:5000/users/admin/${user.email}`, {
          headers: {
            authorization: `Bearer ${localStorage.getItem("access-token")}`,
          },
        })
        .then((res) => {
          setIsAdmin(res.data.admin);
          setIsAdminLoading(false);
        });
    }
  }, [user]);

  return [isAdmin, isAdminLoading];
};

export default useAdmin;

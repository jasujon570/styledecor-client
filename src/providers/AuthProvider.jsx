import { createContext, useEffect, useState } from "react";
import auth from "../firebase/firebase.config";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  updateProfile,
} from "firebase/auth";
import jwtDecode from "jwt-decode";
import useAxiosPublic from "../hooks/useAxiosPublic";

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userRole, setUserRole] = useState(null);
  const axiosPublic = useAxiosPublic();

  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const signIn = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const updateUserProfile = (name, photo) => {
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photo,
    });
  };

  const logOut = () => {
    setLoading(true);
    localStorage.removeItem("access-token");
    setUserRole(null);
    return signOut(auth);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);

      if (currentUser) {
        const userInfo = { email: currentUser.email };

        axiosPublic
          .post(`/auth/login`, userInfo)
          .then((res) => {
            const token = res.data.token;
            if (token) {
              localStorage.setItem("access-token", token);

              try {
                const decoded = jwtDecode(token);
                setUserRole(decoded.role);
              } catch (e) {
                console.error("Error decoding token:", e);
              }
            }
          })
          .catch((error) => {
            console.error("JWT Fetch Error:", error);
            localStorage.removeItem("access-token");
          });
      } else {
        localStorage.removeItem("access-token");
        setUserRole(null);
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, [axiosPublic]);

  const authInfo = {
    user,
    loading,
    userRole,
    createUser,
    signIn,
    updateUserProfile,
    logOut,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;

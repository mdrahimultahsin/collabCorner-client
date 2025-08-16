import React, {useEffect, useState} from "react";
import {AuthContext} from "./AuthContext";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updatePassword,
  updateProfile,
} from "firebase/auth";
import {auth} from "../firebase/firebase.config";
import {useQueryClient} from "@tanstack/react-query";

const AuthProvider = ({children}) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const GoogleProider = new GoogleAuthProvider();
  const queryClient = useQueryClient();
  const registerUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };
  const joinUsUser = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };
  const updateUser = (userData) => {
    return updateProfile(auth.currentUser, userData);
  };
  const loginWithGoogle = () => {
    setLoading(true);
    return signInWithPopup(auth, GoogleProider);
  };
  const logOutUser = async () => {
    await signOut(auth);
    queryClient.clear();
  };
  const passwordChange = (newPassword) => {
    return updatePassword(auth.currentUser, newPassword);
  };
  const profileUpdate = (updatedData) => {
    return updateProfile(auth.currentUser, updatedData);
  };
  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setLoading(false);
        setUser(currentUser);
      } else {
        setUser(null);
        setLoading(false);
      }
    });
    return () => {
      unSubscribe();
    };
  }, []);
  const authInfo = {
    user,
    registerUser,
    joinUsUser,
    updateUser,
    loginWithGoogle,
    logOutUser,
    loading,
    profileUpdate,
    passwordChange,
  };
  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;

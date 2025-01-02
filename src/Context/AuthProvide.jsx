import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut, updateCurrentUser, updateProfile } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { auth } from "../firebase/firebase.init";

export const AuthContext = createContext(null);

const AuthProvide = ({ children }) => {
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(true);

  const createUser = (email , passsword)=>{
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, passsword);
  }
  const signIn = (email, passsword)=>{
    setLoading(true)
    return signInWithEmailAndPassword(auth, email, passsword)
  }
  const logOut =()=>{
    setLoading(true);
    return signOut(auth)
  }
  const updateUserProfile = (name, photoUrL)=>{
   return updateProfile(auth.currentUser, {
      displayName: name, photoURL: photoUrL
    })
  }

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      console.log(currentUser);
      setLoading(false);
    });
    return () => {
      return unSubscribe();
    };
  }, []);

  const authInfo = {
    user,
    setUser,
    loading,
    setLoading,
    createUser,
    signIn,
    logOut,
    updateUserProfile
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvide;

import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut,  updateProfile } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { auth } from "../firebase/firebase.init";
import useAxiosPublic from "../hooks/UseAxiosPublic";

export const AuthContext = createContext(null);

const AuthProvide = ({ children }) => {
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(true);
  const axiosPublic = useAxiosPublic()
  const googleProvider = new GoogleAuthProvider();

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
  // google login 
  const googleLogin =()=>{
      setLoading(true);
      return signInWithPopup(auth, googleProvider)
  }

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if(currentUser){
        // get token and stor client side
        const userInfo = {email: currentUser.email}
        axiosPublic.post('/jwt', userInfo)
        .then(res=>{
          if(res.data.token){
            localStorage.setItem("access-token", res.data.token)
          }
        })
      }else{
        // remove token (if token from the client side)
        localStorage.removeItem("access-token")
      }
      setLoading(false);
    });
    return () => {
      return unSubscribe();
    };
  }, [axiosPublic]);

  const authInfo = {
    user,
    setUser,
    loading,
    setLoading,
    createUser,
    signIn,
    logOut,
    updateUserProfile,
    googleLogin
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvide;

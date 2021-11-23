import {
  getAuth,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithPopup,
  GoogleAuthProvider,
  GithubAuthProvider,
  signOut,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  updateProfile,
} from "firebase/auth";
import { useState, useEffect } from "react";
import axios from "axios";
import initializeAuthentication from "../firebase/firebase.init.js";
initializeAuthentication();
const useFirebase = () => {
  const auth = getAuth();
  //all state
  const [currentUser, setCurrentUser] = useState({});
  const [error, setError] = useState("");
  const [admin, setAdmin] = useState(false);
  const [isAdminLoading, setIsAdminLoading] = useState(true);
  const [loading, setLoading] = useState(true);
  //all provider
  const googleProvider = new GoogleAuthProvider();
  const githubProvider = new GithubAuthProvider();

  // handle sign up
  const handleSignup = (email, password, name) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password)
      .then(() => {
        const newUser = { email, displayName: name };
        setCurrentUser(newUser);
        //save user to the database
        saveUser(email, name, "post");
        updateProfile(auth.currentUser, {
          displayName: name,
        })
          .then(() => {
            //profile updated successfully
          })
          .catch((error) => {
            //an error occurred
            console.log(error.message);
          });
      })
      .finally(() => {
        setLoading(false);
      });
  };
  //handle sign in
  const handleSignIn = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password).finally(() => {
      setLoading(false);
    });
  };

  //handle google sign in
  const handleGoogleSignIn = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider)
      .then((result) => {
        //save user to the database
        setCurrentUser(result.user);
        saveUser(result.user.email, result.user.displayName, "put");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  //handle github sign in
  const handleGithubSignIn = () => {
    return signInWithPopup(auth, githubProvider)
      .then((result) => {
        //save user to the database
        setCurrentUser(result.user);
        saveUser(result.user.email, result.user.displayName, "put");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  //handle logout
  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        setCurrentUser({});
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  //reset password
  const resetPassword = (email) => {
    return sendPasswordResetEmail(auth, email);
  };

  // observing the current user
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      user ? setCurrentUser(user) : setCurrentUser({});
      setLoading(false);
    });
    return unsubscribe;
  }, [auth]);

  //admin check
  useEffect(() => {
    setIsAdminLoading(true);
    axios
      .get(
        `https://secure-brook-32131.herokuapp.com/users/${currentUser?.email}`
      )
      .then((res) => {
        setAdmin(res.data.admin);
        if (admin) {
          setIsAdminLoading(false);
        }
        setInterval(() => {
          if (!admin) {
            setIsAdminLoading(false);
          }
        }, 5000);
      });
  }, [admin, currentUser?.email]);

  //save user to the database
  const saveUser = (email, displayName, httpMethod) => {
    const user = { email, displayName };
    axios({
      method: httpMethod,
      url: "https://secure-brook-32131.herokuapp.com/users",
      data: user,
    });
  };

  return {
    handleSignup,
    currentUser,
    error,
    loading,
    isAdminLoading,
    setError,
    admin,
    handleGoogleSignIn,
    handleGithubSignIn,
    handleLogout,
    handleSignIn,
    resetPassword,
  };
};

export default useFirebase;

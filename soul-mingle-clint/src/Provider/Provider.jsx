import { useEffect, useState } from "react";
import { createContext } from "react";
import { GoogleAuthProvider, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { auth } from "../Firebase/Firebase.config";



export const AuthInfo = createContext();
const googleProvider = new GoogleAuthProvider();

// eslint-disable-next-line react/prop-types
const Provider = ({ children }) => {
    const [user, setUser] = useState();
    const [loader, setLoader] = useState(true);
    const [requestInfo, setRequestInfo] = useState();
    // const axiosPublic = useAxiosPublic();

    // CREATE USER
    const createUser = (email, password) => {
        setLoader(true)
        return createUserWithEmailAndPassword(auth, email, password)
    }

    // singin user
    const singinUser = (email, password) => {
        setLoader(true)
        return signInWithEmailAndPassword(auth, email, password)
    }


    // sing out 
    const logOut = () => {
        setLoader(true)
        return signOut(auth)
    }

    // update user profile
    const updaleProfileOfUser = (name, image) => {
        return updateProfile(auth.currentUser, {
            displayName: name, photoURL: image
        })
    }

    // handle social sing in
    const googleSingin = () => {
        setLoader(true)
        return signInWithPopup(auth, googleProvider)
    }

    // USER observer
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser)
            setLoader(false)
        });
        return () => {
            return unsubscribe()
        }
    }, []);

    const authInfo = {
        requestInfo,
        setRequestInfo,
        googleSingin,
        loader,
        user,
        singinUser,
        createUser,
        logOut,
        updaleProfileOfUser,
        setLoader
    }

    return (
        <AuthInfo.Provider value={authInfo}>
            {children}
        </AuthInfo.Provider>
    );
};

export default Provider;
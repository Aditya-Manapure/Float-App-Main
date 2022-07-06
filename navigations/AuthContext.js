import React,{ useContext, useState, useEffect } from 'react'
import {auth} from '../firebaseConfig.js';
//import { signInWithGoogle } from "../firebaseConfig.js";
import { updateProfile } from "firebase/auth";

const AuthContext = React.createContext({});

export function useAuth() {
    return  useContext(AuthContext)
}

export function AuthProvider ({children}) {
    
    const [currentUser, setCurrentUser] = useState();
    const [loading, setLoading] = useState(true);



    function signup(email, password) {
        return auth.createUserWithEmailAndPassword(email, password);
    }

    function login(email, password) {
        return auth.signInWithEmailAndPassword(email, password);
    }

    function logout () {
        return auth.signOut();
    }

  

    function resetPassword(email) {
        return auth.sendPasswordResetEmail(email);
    }

    function updateprofile(name , url) {
        return updateProfile(currentUser, {
            displayName: name, 
            photoURL: url
        })
    }


    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user =>{
            setLoading(false);
            setCurrentUser(user)
        }) 
        return unsubscribe
    }, [])
 
    const value = {
        currentUser,
        setCurrentUser,
        login,
        signup,
        logout,
        updateprofile,
        resetPassword
    }

    return (
        <AuthContext.Provider value = {value}>
            { !loading && children}
        </AuthContext.Provider>
    )
}

export default AuthProvider;
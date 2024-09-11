import { createContext, useEffect, useState } from "react";
import PropTypes from 'prop-types';

import { GoogleAuthProvider,createUserWithEmailAndPassword, onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import auth from "../firebase/firebase.config";
import useAxiosSecure from "../hooks/useAxiosSecure";
import usePublicAxios from "../hooks/usePublicAxios";


export const AuthContext = createContext(null)
const AuthProvider = ({children}) => {

const axiosSecure = useAxiosSecure()
const axiosPublic = usePublicAxios()
    const [user, setUser] = useState({})
    const [loader, setLoader] = useState(true)
    const googleProvider = new GoogleAuthProvider()


    const loginWithGoogle = ()=> {
     
        return signInWithPopup(auth, googleProvider)
     }
     
  
     const resetPassword = (email)=> {
return sendPasswordResetEmail(auth, email)
     }

    //  email and password base authantication

    const registar = (email, password)=>{

        return createUserWithEmailAndPassword(auth, email, password)
    }
    const login = (email, password) =>{
        return signInWithEmailAndPassword(auth, email, password)
    }
    const updateUser = (name, photo)=>{
    
    
        return updateProfile(auth.currentUser,{
            displayName: name,
            photoURL:photo
        })
    }
    const logOut = ()=>{

        axiosSecure.get('/logout')
        return signOut(auth)
    }

    
useEffect(()=>{

const unSubscribe  = onAuthStateChanged(auth, (currentUser)=>{
    setLoader(false)
    setUser(currentUser)
    if(currentUser){

  





        const userName = currentUser.displayName;
        const  userEmail= currentUser.email;
       const  userPhoto= currentUser.photoURL;
       const userRole= "user";
     const userInfo = {
        userName,
        userEmail,
        userPhoto,
        userRole
     }


     axiosSecure.post('/jwt', {userEmail})
.then(result => {
    console.log(result);
})
.catch(err => { 
    console.log(err);
});


     axiosPublic.post('/saveUser', userInfo)
     .then(result => console.log(result))
     .catch(error =>{

        console.log(error);
     })

     
    }



})

return ()=> unSubscribe()

},[])


     const authInfo = { loginWithGoogle,   resetPassword , registar, login, logOut, updateUser, user, loader}


    return (
        <AuthContext.Provider value={authInfo}>

            {children}
        </AuthContext.Provider>
    );
};

AuthProvider.propTypes = {
    children: PropTypes.node
};
export default AuthProvider;
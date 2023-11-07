import { createContext } from "react";
import { createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import app from "../firebase/firebase.config";
import { useState } from "react";
import { useEffect } from "react";
import Swal from "sweetalert2";



export const AuthContext = createContext();
const auth = getAuth(app)
const provider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true)


    //create a  new user
    const createUser = (email, password) => {
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password)
    }

    //login with an existing user
    const signIn = (email, password) => {
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password)
    }

    //login with google
    const googleLogin = () => {
        setLoading(true)
        return signInWithPopup(auth, provider)
    }


    //logout
    const logOut = () => {
        setLoading(true)
        return signOut(auth)
    }

    //state observer
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser)
            setLoading(false)

            if (currentUser && currentUser.email) {
                const loggedUser = {
                    email: currentUser.email
                }
                fetch('http://localhost:3000/jwt', {
                    method: "POST",
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify(loggedUser)
                })
                    .then(res => res.json())
                    .then(data => {
                        localStorage.setItem('car-access-token', data.token)
                        Swal.fire({
                            position: "top",
                            icon: "success",
                            title: "User has been created successful",
                            showConfirmButton: false,
                            timer: 1500
                        });
                    })
            }
            else {
                //remove jwt token from local storage
                localStorage.removeItem('car-access-token')
            }
        })
        return () => {
            return unsubscribe;
        }
    }, [])


    const authInfo = {
        user,
        loading,
        createUser,
        signIn,
        googleLogin,
        logOut
    }
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export { AuthProvider }; 
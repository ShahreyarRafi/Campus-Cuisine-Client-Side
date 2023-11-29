import { createContext, useEffect, useState } from 'react';
import app from '../../../firebase.config';
import useAxiosPublic from "../../Hook/useAxiosPublic/useAxiosPublic";
import {
    createUserWithEmailAndPassword,
    getAuth,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    updateProfile, // Import updateProfile function
    signOut,
    GoogleAuthProvider,
    signInWithPopup,
} from "firebase/auth";

export const AuthContext = createContext(null);

const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState();
    const [loading, setLoading] = useState(true);
    const axiosPublic = useAxiosPublic();

    const googleSignIn = () => {
        setLoading(true);
        return signInWithPopup(auth, googleProvider);
    };

    const signUp = async (email, password, name, photoUrl) => {
        setLoading(true);
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            // Update the user's display name and photo URL
            await updateProfile(user, {
                displayName: name,
                photoURL: photoUrl,
            });

            // ... rest of the code ...
        } catch (error) {
            console.error("Registration error:", error);
            setLoading(false);
            throw error;
        }
    };

    const signIn = async (email, password) => {
        setLoading(true);
        try {
            await signInWithEmailAndPassword(auth, email, password);
        } catch (error) {
            console.error("Sign-in error:", error);
            setLoading(false);
            throw error;
        }
    };

    const logout = () => {
        setLoading(true);
        return signOut(auth);
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            console.log("state changed");
            setUser(currentUser);
            if (currentUser) {
                // get token and store client
                const userInfo = { email: currentUser.email };
                axiosPublic.post('/jwt', userInfo)
                    .then(res => {
                        if (res.data.token) {
                            localStorage.setItem('access-token', res.data.token);
                            setLoading(false);
                        }
                    })
            } else {
                // TODO: remove token (if token stored in the client side: Local storage, caching, in memory)
                localStorage.removeItem('access-token');
                setLoading(false);
            }
        });
        return () => {
            return unsubscribe();
        }
    }, [axiosPublic]);

    const AuthInfo = {
        googleSignIn,
        signUp,
        signIn,
        user,
        logout,
        loading,
    };

    return (
        <AuthContext.Provider value={AuthInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;

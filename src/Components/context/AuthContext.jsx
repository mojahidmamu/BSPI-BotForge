import React, { createContext, useContext, useEffect, useState } from 'react';
import { onAuthStateChange } from '../../firebase/firebase.config';
import axios from 'axios';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        const unsubscribe = onAuthStateChange(async (firebaseUser) => {
            setUser(firebaseUser);

            if (firebaseUser?.email) {
                try {
                    const res = await axios.get(
                        'http://localhost:5000/api/admin/check-admin',
                        {
                            params: { email: firebaseUser.email }
                        }
                    );

                    setIsAdmin(res.data.isAdmin);

                } catch (err) {
                    console.log(err);
                    setIsAdmin(false);
                }
            } else {
                setIsAdmin(false);
            }

            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    return (
        <AuthContext.Provider value={{
            user,
            loading,
            isAuthenticated: !!user,
            isAdmin
        }}>
            {children}
        </AuthContext.Provider>
    );
};
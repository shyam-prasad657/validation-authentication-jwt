import { createContext, useEffect, useState } from "react";
import axiosInstance from "../api/axios";

const AuthContext = createContext({});

export const AuthProvider = ({children}) => {
    const [ auth, setAuth] = useState({});
    const [loading, setLoading] = useState(true);

    // Restore session on initial load
    useEffect(() => {
        const restoreAuth = async () => {
            try {
                const response = await axiosInstance.get('/refresh-token');
                const { accessToken, user } = response.data;
                console.log('Logged in data',JSON.stringify(response?.data?.user));
                localStorage.setItem('token',accessToken)
                setAuth({ accessToken, user });
                console.log('After reload',JSON.stringify(auth?.user?.roles))
            } catch(err) {
                setAuth({});
                console.log('Session not restored', err);
            } finally {
                setLoading(false)
            }
        }
        restoreAuth();
    },[])

    return(
        <AuthContext.Provider value = {{auth, setAuth, loading}}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;
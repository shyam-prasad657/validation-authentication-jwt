import { createContext, useContext, useEffect, useState } from "react";
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
                console.log('Logged in data after refresh',JSON.stringify(response?.data));
                localStorage.setItem('token',accessToken)
                setAuth({ accessToken, user });
            } catch(err) {
                setAuth({});
                localStorage.clear(); // optional: clear token and expiry
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

export const useAuth = () => {
    return useContext(AuthContext);
}
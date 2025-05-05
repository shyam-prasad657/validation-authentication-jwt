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
                const { accessToken, user, refresh_expiry } = response.data;
                console.log('Logged in data',JSON.stringify(response?.data));
                localStorage.setItem('token',accessToken)
                setAuth({ accessToken, user, refresh_expiry });
                console.log('After reload',JSON.stringify(refresh_expiry))
            } catch(err) {
                setAuth({});
                localStorage.removeItem('token');
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
import { useContext } from "react";
import AuthContext from "./context/AuthProvider"

export const Home = () => {
    const { auth } = useContext(AuthContext);
    return (
        <div>
            <h1> Welcome {auth?.username}</h1>
        </div>
    )
}
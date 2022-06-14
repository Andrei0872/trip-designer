import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUserAuth } from "../context/userAuthContext";

function UserUnAuthenticatedGuard (props: any) {
    const { user } = useUserAuth();
    const navigate = useNavigate();

    const isUserAuthenticated = !!user;

    useEffect(() => {
        if (isUserAuthenticated) {
            navigate('/my-trips');
        }
    }, []);
    
    if (isUserAuthenticated) {
        return null;
    }

    return (
        <>
            {props.children}
        </>
    )
}

export default UserUnAuthenticatedGuard
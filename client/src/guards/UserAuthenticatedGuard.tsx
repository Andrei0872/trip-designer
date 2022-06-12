import { useEffect } from "react";
import { IndexRouteProps, LayoutRouteProps, PathRouteProps, useNavigate } from "react-router-dom";
import { useUserAuth } from "../context/userAuthContext";

function UserAuthenticatedGuard (props: any) {
    const { user } = useUserAuth();
    const navigate = useNavigate();

    const isUserAuthenticated = !!user;

    useEffect(() => {
        if (!isUserAuthenticated) {
            navigate('/');
        }
    }, []);
    
    if (!isUserAuthenticated) {
        return null;
    }

    return (
        <>
            {props.children}
        </>
    )
}

export default UserAuthenticatedGuard
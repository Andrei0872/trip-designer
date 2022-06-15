import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { axiosInstance, bareAxiosInstance } from "../api/axios";
import { User } from "../types/user";
import { useUserAuth } from "./userAuthContext";

export const ACCESS_TOKEN_HEADER = 'x-access-token';
export const REFRESH_TOKEN_HEADER = 'x-refresh-token';

const refreshAccessToken = (refreshToken: string, userId: number): Promise<User> => {
    const body = JSON.stringify({ id: userId });
    const opts = { headers: { [REFRESH_TOKEN_HEADER]: refreshToken, 'Content-Type': 'application/json' } };

    // Using `bareAxiosInstance` so that it won't be intercepted(it makes the logic from the interceptor less complicated that already is).
    return bareAxiosInstance.post('/refresh', body, opts)
        .then(r => r.data)
}

export const useAxios = () => {
    let { user, setUser } = useUserAuth();
    const navigate = useNavigate();

    useEffect(() => {
        // If `N` requests take place simultaneously and all of them fail due to token expiry, then N-1 requests will have to wait
        // for the refresh token request. `refreshTokenPromise` is used so that the N-1 requests will be retried after 
        // the new access token has been retrieved.
        let refreshTokenPromise: Promise<any> | null = null;

        const reqInterceptor = axiosInstance.interceptors.request.use(
            config => {
                config.headers ??= {};
                config.headers[ACCESS_TOKEN_HEADER] = user!.token;

                return config;
            },
            err => Promise.reject(err)
        );

        const respInterceptor = axiosInstance.interceptors.response.use(
            resp => (console.log({resp}), resp),
            async err => {
                console.warn(err);
                const failedRequest = err.config;
                if (err.response.status === 401) {
                    if (!refreshTokenPromise) {
                        try {
                            refreshTokenPromise = refreshAccessToken(user!.refreshToken, user!.id);
                            const updatedUser = await refreshTokenPromise;
                            setUser(updatedUser);
                            // By the time the failed requests will retry, this component won't get the change to re-render.
                            // So, we're using this quick hack so that, when the access token is attached to the request, 
                            // it will be the fresh access token.
                            user = updatedUser;
                        } catch (err) {
                            navigate('/');
                            return Promise.reject(err);
                        }

                        return axiosInstance(failedRequest).finally(() => refreshTokenPromise = null); 
                    }

                    return refreshTokenPromise
                        .then(() => axiosInstance(failedRequest))
                        .finally(() => refreshTokenPromise = null);
                }

                return Promise.reject(err);
            }
        );

        return () => {
            refreshTokenPromise = null;
            axiosInstance.interceptors.request.eject(reqInterceptor);
            axiosInstance.interceptors.response.eject(respInterceptor);
        }
    }, [user]);
};
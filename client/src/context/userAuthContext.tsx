import { createContext, ReactNode, useContext, useMemo, useState } from "react";
import { User } from "../types/user";

const USER_LOCAL_STORAGE_KEY = 'user';

const getUserLocalStorageData = () => JSON.parse(localStorage.getItem(USER_LOCAL_STORAGE_KEY) || null!);

const addUserToLocalStorage = (user: User) => localStorage.setItem(USER_LOCAL_STORAGE_KEY, JSON.stringify(user));

const removeUserFromLocalStorage = () => localStorage.removeItem(USER_LOCAL_STORAGE_KEY);

const UserAuthContext = createContext<{ user: User | null, setUser: (u: User) => void, logOutUser: () => void } | undefined>(undefined);

export const UserAuthProvider: React.FC<{ children: ReactNode | undefined }> = ({ children }) => {
    const [user, setUser] = useState(getUserLocalStorageData());

    const setUserWrapper = (user: User) => {
        addUserToLocalStorage(user);
        setUser(user);
    }

    const logOutUser = () => {
        setUser(null);
        removeUserFromLocalStorage();
    };

    const value = useMemo(() => ({ user, setUser: setUserWrapper, logOutUser }), [user]);

    return (
        <UserAuthContext.Provider value={value}>
            {children}
        </UserAuthContext.Provider>
    )
}

export const useUserAuth = () => {
    const context = useContext(UserAuthContext);
    if (context === undefined) {
        throw new Error(`'useUserAuth' must be used within an 'UserAuthProvider'!`);
    }

    return context;
}
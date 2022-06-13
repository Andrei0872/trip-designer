import { createContext, ReactNode, useContext, useMemo, useState } from "react";
import { User } from "../types/user";

const USER_LOCAL_STORAGE_KEY = 'user';

const getUserLocalStorageData = () => JSON.parse(localStorage.getItem(USER_LOCAL_STORAGE_KEY) || null!);

const addUserToLocalStorage = (user: User) => localStorage.setItem(USER_LOCAL_STORAGE_KEY, JSON.stringify(user));

const UserAuthContext = createContext<{ user: User | null, setUser: (u: User) => void } | undefined>(undefined);

export const UserAuthProvider: React.FC<{ children: ReactNode | undefined }> = ({ children }) => {
    const [user, setUser] = useState(getUserLocalStorageData());

    const setUserWrapper = (user: User) => {
        addUserToLocalStorage(user);
        setUser(user);
    }
    const value = useMemo(() => ({ user, setUser: setUserWrapper }), [user]);

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
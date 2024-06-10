import { createContext, useContext } from 'react';
import { useMemo, useState, useCallback, useEffect } from 'react'
import jwt_decode from 'jwt-decode'

const LOGGED_USER = 'LOGGED_USER';
const TOKEN = 'TOKEN';
const PROFILE_PICTURE = 'PROFILE_PICTURE';

interface DecodedToken {
    exp: number;
}

interface LoggedUserData {
    user: {
        name: string;
        email: string;
        profile: string[];
        profilePictureUrl: string;
    },
    profilePicture: string;
    token: string;
    isLoggedIn: boolean;
}

interface ContextType {
    loggedUserData: LoggedUserData;
    handleLogin: (userData: LoggedUserData) => void;
    handleLogout: () => void
    updateProfilePicture: (url: string) => void
}

interface Props {
    children: React.ReactNode;
}

export const DataContext = createContext<ContextType | undefined>(undefined)

export const AuthContext = ({ children }: Props) => {

    const initialUserState: LoggedUserData = {
        user: {
            name: '',
            email: '',
            profile: [],
            profilePictureUrl: '',
        },
        profilePicture: '',
        token: '',
        isLoggedIn: false
    }

    const [loggedUserData, setLoggedUserData] = useState(
        () => {
            const storedUser = window.localStorage.getItem(LOGGED_USER);
            return storedUser
                ? { ...JSON.parse(window.localStorage.getItem(LOGGED_USER)!), isLoggedIn: true }
                : initialUserState
        }
    )

    useEffect(() => {
        if (window.localStorage.getItem(TOKEN)) {

            const decode = jwt_decode<DecodedToken>(window.localStorage.getItem(TOKEN)!);
            const currentTime = Date.now() / 1000;

            if (decode.exp < currentTime) {
                setLoggedUserData({ ...initialUserState, isLoggedIn: false });
                window.localStorage.removeItem(TOKEN);
                window.localStorage.removeItem(LOGGED_USER);
                return;
            }

            setLoggedUserData((prevData: LoggedUserData) => ({ ...prevData, isLoggedIn: true }))
        }
    }, [])

    const handleLogin = useCallback((userData: LoggedUserData) => {
        window.localStorage.setItem(LOGGED_USER, JSON.stringify(userData));
        window.localStorage.setItem(TOKEN, userData.token);
        window.localStorage.setItem(PROFILE_PICTURE, userData.user.profilePictureUrl);
    }, [])

    const handleLogout = useCallback(() => {
        window.localStorage.removeItem(LOGGED_USER);
        window.localStorage.removeItem(TOKEN);
        window.localStorage.removeItem(PROFILE_PICTURE);
    }, [])
    
    const updateProfilePicture = useCallback((url: string) => {
        window.localStorage.setItem(PROFILE_PICTURE, url);
    },[])

    const useAuthContextValue = useMemo(() => ({
        loggedUserData,
        handleLogin,
        handleLogout,
        updateProfilePicture

    }), [loggedUserData])

    return (
        <DataContext.Provider value={useAuthContextValue}>
            {children}
        </DataContext.Provider>
    )
}

export const useAuthContext = () => {
    return useContext(DataContext);
}
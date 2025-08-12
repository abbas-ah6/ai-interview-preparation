import React, { createContext, useState, useEffect } from "react";
import axiosInstace from "../utils/axiosInstance";
import { API_PATHS } from "../utils/apiPaths";

export const UserContext = createContext();

const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (user) return;

        const accessToken = localStorage.getItem('token');
        if (!accessToken) {
            setIsLoading(false);
            return
        }

        const fetchUser = async () => {
            try {
                const response = await axiosInstace.get(API_PATHS.AUTH.GET_PROFILE);
                setUser(response.data);
            } catch (error) {
                console.error("User is not authenticated", error);
                clearUser();
            } finally {
                setIsLoading(false);
            }
        };

        fetchUser();
    }, []);

    const updateUser = (userData) => {
        setUser(userData);
        localStorage.setItem('token', userData.token);
        setIsLoading(false);
    }

    const clearUser = () => {
        setUser(null);
        localStorage.removeItem('token');
    };

    return (
        <UserContext.Provider value={{ user, isLoading, updateUser, clearUser }}>
            {children}
        </UserContext.Provider>
    )
}

export default UserProvider;
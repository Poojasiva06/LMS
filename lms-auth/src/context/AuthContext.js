import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    const login = (email, password) => {
        const users = JSON.parse(localStorage.getItem("users")) || [];
        const foundUser = users.find(u => u.email === email && u.password === password);

        if (foundUser) {
            localStorage.setItem("user", JSON.stringify(foundUser));
            setUser(foundUser);
            return { success: true, role: foundUser.role };
        } else {
            return { success: false, message: "Invalid credentials" };
        }
    };

    const signup = (name, email, password, role) => {
        const users = JSON.parse(localStorage.getItem("users")) || [];

        if (users.some(u => u.email === email)) {
            return { success: false, message: "Email already exists" };
        }

        const newUser = { name, email, password, role };
        users.push(newUser);
        localStorage.setItem("users", JSON.stringify(users));
        localStorage.setItem("user", JSON.stringify(newUser));
        setUser(newUser);

        return { success: true, role };
    };

    const logout = () => {
        localStorage.removeItem("user");
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, signup, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

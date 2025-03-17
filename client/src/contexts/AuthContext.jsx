import { createContext, useContext, useEffect, useState } from "react";
import { useToast } from "../hooks/useToast";
import { hasPermission, mockUsers } from "../data/authMockData";

const AuthContext = createContext(undefined);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    // check for saved user
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email, password) => {
    // Simulate API Logic
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Check if user exists
    const foundUser = mockUsers.find(
      (user) => user.email === email && user.password === password
    );

    if (foundUser) {
      setUser(foundUser);
      localStorage.setItem("user", JSON.stringify(foundUser));
      toast({
        title: "Login Successful",
        description: `Welcome back, ${foundUser.name}`,
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } else {
      toast({
        title: "Login Failed",
        description: "Invalid email or password",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  // Register User
  const register = async (name, email, password) => {
    // Simulate API Logic
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Check if user already exists
    const foundUser = mockUsers.find((user) => user.email === email);

    if (foundUser) {
      toast({
        title: "Registration Failed",
        description: "User already exists",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } else {
      // Create new user
      const newUser = {
        id: "user-" + mockUsers.length + 1,
        name,
        email,
        password,
        role: "employee", // Default role
      };

      mockUsers.push(newUser);
      setUser(newUser);
      localStorage.setItem("user", JSON.stringify(newUser));
      toast({
        title: "Registration Successful",
        description: `Welcome, ${newUser.name}`,
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  const checkPermission = (permission) => {
    if(!user) return
    return hasPermission(user?.role, permission)
  };

  return (
    <AuthContext.Provider
      value={{ 
        user, 
        isLoading, 
        login, 
        register, 
        logout, 
        hasPermission: checkPermission 
    }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within a AuthProvider");
  }
  return context;
};

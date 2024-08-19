/* eslint-disable no-useless-catch */
const API_URL = import.meta.env.VITE_API_URL;

export const getUserAPI = async () =>{
    try {
        const response = await fetch(`${API_URL}/users`);
        const data = response.json();
        return data;

        
    } catch (error) {
        throw new Error;
    }
};

export const getUserById = async (userId) => {
    try {
        const response = await fetch(`${API_URL}/users/${userId}`);
        const data = response.json();
        return data;
        
    } catch (error) {
        throw new Error;
        
    }
};

export const signinAPI = async (loginCredentials) =>{
    try {
        const response = await fetch(`${API_URL}/auth/signin`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(loginCredentials),
        });
        const data = response.json();
        return data;
        
    } catch (error) {
        throw new Error;
    }
};

export const signupAPI = async (signupCredentials) =>{
    try {
        const response = await fetch(`${API_URL}/auth/signup`, {
            method: "POST", 
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify(signupCredentials),
        })

        const data = response.json();
        return data;
        
    } catch (error) {
        throw new Error;
    }
};

const API_URL = import.meta.env.VITE_API_URL;


export const createExpenseAPI  = async (expense, token) =>{
    try {
        const response = await fetch(`${API_URL}/expenses`, {
            method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
              body: JSON.stringify(expense),
        });

        const data = await response.json();
        return data;
        
    } catch (error) {
        throw new Error;
    }
};

export const updateExpenseAPI = async (expense, token, id) =>{
    try {
        const response = await fetch(`${API_URL}/expenses/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(expense),

        });

        const data = await response.json();
        return data;
        

    } catch (error) {
        throw new Error;
    }

};

export const deleteExpenseAPI = async (token, id) =>{
    try {
        const response  = await fetch(`${API_URL}/expenses/${id}`, {
            method: "DELETE", 
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }); 

        const data = await response.json();
        return data;
        
    } catch (error) {
        throw new Error;
    }
};


export const getExpenseAPI = async (token, id) =>{
    try {
        const response = await fetch(`${API_URL}/expenses/${id}`,{
            method:"GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }, 
        });

        const data = await response.json();
        return data;        
    } catch (error) {
        throw new Error;
    }
};
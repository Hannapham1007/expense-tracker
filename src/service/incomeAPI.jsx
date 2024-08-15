const API_URL = import.meta.env.VITE_API_URL;

export const createIncomeAPI  = async (income, token) =>{
    try {
        const response = await fetch(`${API_URL}/incomes`, {
            method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
              body: JSON.stringify(income),
        });

        const data = await response.json();
        return data;
        
    } catch (error) {
        throw new Error;
    }
};

export const updateIncomeAPI = async (income, token, id) =>{
    try {
        const response = await fetch(`${API_URL}/incomes/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(income),

        });

        const data = await response.json();
        return data;
        

    } catch (error) {
        throw new Error;
    }

};

export const deleteIncomeAPI = async (token, id) =>{
    try {
        const response  = await fetch(`${API_URL}/incomes/${id}`, {
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


export const getIncomeAPI = async (token, id) =>{
    try {
        const response = await fetch(`${API_URL}/incomes/${id}`,{
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
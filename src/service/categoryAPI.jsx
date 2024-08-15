const API_URL = import.meta.env.VITE_API_URL;

export const createCategoryAPI = async (category, token) => {
  try {
    const response = await fetch(`${API_URL}/categories`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(category),
    });

    const data = response.json();
    return data;
  } catch (error) {
    throw error;
  }
};

export const deleteCategoryAPI = async (categoryId, token) => {
  try {
    const response = await fetch(`${API_URL}/categories/${categoryId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to delete");
    }
    return response.json();
  } catch (error) {
    throw error;
  }
};

export const updateCategoryAPI = async (name, type, user, categoryId, token) => {
  try {
    const response = await fetch(`${API_URL}/categories/${categoryId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ name, type, user }),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};

export const getCategoryAPI = async (token, id) =>{
  try {
      const response = await fetch(`${API_URL}/categories/user/${id}`,{
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
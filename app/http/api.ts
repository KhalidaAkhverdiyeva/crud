const apiUrl = "https://dummyjson.com/products";

export const createProduct = async (newProduct: any) => {
    const response = await fetch(`${apiUrl}/add`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(newProduct),
    });
    return response.json();
};

export const updateProduct = async (id: number, updatedProduct: any) => {
    const response = await fetch(`${apiUrl}/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedProduct),
    });
    return response.json();
};

export const deleteProduct = async (id: number) => {
    await fetch(`${apiUrl}/${id}`, {
        method: "DELETE",
    });
};
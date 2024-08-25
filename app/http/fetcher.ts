export const fetcher = (url: string) => fetch(url).then(res => res.json());

const apiUrl = "http://localhost:3001/products";

export const createProduct = async (newProduct: any) => {
    const response = await fetch(`${apiUrl}`, {
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

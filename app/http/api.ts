export const api = {
    dummyApi: {
        baseUrl: "https://dummyjson.com",
        login: "auth/login",
        user: "auth/me",
    },
    localApi: {
        baseUrl: "http://localhost:3001",
        products: "products",
        productsEdit: "products/{{id}}"
    }
};
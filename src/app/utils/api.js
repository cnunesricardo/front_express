const fetchProducts = async () => {
    const response = await fetch('http://localhost:3001/products');
    const products = await response.json();
    return products;
}

const fetchLogs = async () => {
    const response = await fetch('http://localhost:3001/logs');
    const logs = await response.json();
    return logs;
}

const fetchCategories = async () => {
    const response = await fetch('http://localhost:3001/categories');
    const categories = await response.json();
    return categories;
}

const apiUrlCategories = "http://localhost:3000/categories"
const apiUrlProducts = "http://localhost:3000/products"
const apiUrlLogs = "http://localhost:3000/logs"

export { fetchProducts, fetchLogs, fetchCategories, apiUrlCategories, apiUrlLogs, apiUrlProducts};
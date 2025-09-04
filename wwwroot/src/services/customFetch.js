const BASE_URL = "http://localhost:8080"; // Define your base URL

export function customFetch(path, options = {}) {
    const url = `${BASE_URL}${path}`;
    return fetch(url, options);
}
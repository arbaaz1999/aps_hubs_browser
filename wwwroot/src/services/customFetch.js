const BASE_URL = import.meta.env.VITE_API_URL; // Define your base URL

export function customFetch(path, options = {}) {
    const url = `${BASE_URL}${path}`;
    return fetch(url, options);
}
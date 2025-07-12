export const save = (key, data) => localStorage.setItem(key, JSON.stringify(data));
export const load = (key, fallback = []) =>
    JSON.parse(localStorage.getItem(key)) || fallback;



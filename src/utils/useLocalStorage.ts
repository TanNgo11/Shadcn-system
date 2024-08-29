import { useEffect, useState } from "react";

export function UseLocalStorage<T>(key: string, initialValue: T | (() => T)) {
    const [storedValue, setStoredValue] = useState<T>(() => {
        const item = localStorage.getItem(key);
        return item ? JSON.parse(item) : initialValue;
    });

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(storedValue));
    }, [key, storedValue]);

    return [storedValue, setStoredValue] as const;

}
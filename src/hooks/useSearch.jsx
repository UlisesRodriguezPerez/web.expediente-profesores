// useSearch.js
import { useState, useEffect } from 'react';

const useSearch = (initialSearchTerm = '', buildFilterQuery, delay = 500) => {
    const [searchTerm, setSearchTerm] = useState(initialSearchTerm);
    const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(initialSearchTerm);

    useEffect(() => {
        const handler = setTimeout(() => {
            if (searchTerm !== debouncedSearchTerm) {
                setDebouncedSearchTerm(searchTerm);
            }
        }, delay);

        return () => {
            clearTimeout(handler);
        };
    }, [searchTerm, delay]);

    const searchFilterQuery = buildFilterQuery ? buildFilterQuery(debouncedSearchTerm) : '';

    return { searchTerm, setSearchTerm, debouncedSearchTerm, searchFilterQuery };
};

export default useSearch;

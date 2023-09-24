import { useState, useEffect } from 'react';

export const useSearch = (onSearch) => {
    const [term, setTerm] = useState('');
    const [debouncedTerm, setDebouncedTerm] = useState('');

    useEffect(() => {
        console.log('Setting debounced term to:', term);
        const timerId = setTimeout(() => {
            setDebouncedTerm(term);
        }, 300); // 300ms delay

        return () => clearTimeout(timerId);
    }, [term]);

    useEffect(() => {
        if (debouncedTerm === term) return; 
        console.log('Effect: onSearch with debouncedTerm:', debouncedTerm);
        onSearch(debouncedTerm);
    }, [debouncedTerm, onSearch]);

    return [term, setTerm];
};


import { useState, useEffect, useCallback, useContext } from 'react';
import dataService from '../../../../services/dataService'; // Asegúrate de ajustar la ruta correcta
import ROUTES from '../../../../enums/routes';
import { NotificationContext } from '../../../../contexts/NotificationContext/NotificationContext';

const useWorkloads = () => {
    const [workloads, setWorkloads] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalItems, setTotalItems] = useState(0);
    const [searchTerm, setSearchTerm] = useState('');
    const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');
    const { showNotification } = useContext(NotificationContext);

    const fetchWorkloads = useCallback(async (page = 1, filterQuery = '') => {
        setCurrentPage(page);
        try {
            const responseData = await dataService.readData(`${ROUTES.WORKLOADS}?included=collaborator.user,period.creator.user&perPage=10&page=${page}${filterQuery}`);
            setWorkloads(responseData.data.data);
            setTotalItems(responseData.data.total);
        } catch (error) {
            console.error('Error fetching workloads:', error);
            showNotification('Error al cargar las cargas de trabajo', 'error');
        }
    }, []);

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
      };

    const buildFilterQuery = (term) => {
        const baseFields = [
            'collaborator.user.name',
            'collaborator.user.last_name',
            'collaborator.user.second_last_name',
            'workload'
        ];
        const queries = baseFields.map(field => `&filter[${field}]=${term}`);
        return queries.join('');
    };

    useEffect(() => {
        fetchWorkloads();
    }, [fetchWorkloads]);

    useEffect(() => {
        // if (currentPage !== 1) fetchWorkloads(currentPage);
        fetchWorkloads(currentPage);
    }, [currentPage, fetchWorkloads]);

    useEffect(() => {
        if (debouncedSearchTerm.trim() === '') {
            fetchWorkloads(1);
        } else {
            const filterQuery = buildFilterQuery(debouncedSearchTerm);
            fetchWorkloads(1, filterQuery);
        }
    }, [debouncedSearchTerm, fetchWorkloads]);

    return {
        workloads,
        currentPage,
        totalItems,
        searchTerm,
        setSearchTerm,
        setDebouncedSearchTerm,
        handlePageChange,
        fetchWorkloads,
        setWorkloads
    };
};

export default useWorkloads;

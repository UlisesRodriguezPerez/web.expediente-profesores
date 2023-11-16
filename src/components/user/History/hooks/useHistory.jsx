import { useState, useEffect, useCallback, useContext } from 'react';
import dataService from '../../../../services/dataService'; // Asegúrate de ajustar la ruta correcta
import ROUTES from '../../../../enums/routes';
import { NotificationContext } from '../../../../contexts/NotificationContext/NotificationContext';

const useHistory = () => {
    const idValue = JSON.parse(localStorage.getItem('user'));
    const userId = idValue.id;
    const [id, setUserPage] = useState(userId);

    const [records, setRecords] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalItems, setTotalItems] = useState(0);
    const [searchTerm, setSearchTerm] = useState('');
    const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');
    const { showNotification } = useContext(NotificationContext);

    const fetchWRecords = useCallback(async (page = 1, filterQuery = '') => {
        setCurrentPage(page);
        try {
            const responseData = await dataService.readData(`${ROUTES.WORKLOADS}?filter[collaborator_id]=${id}&included=collaborator.user,period.creator.user&perPage=10&page=${page}${filterQuery}`);
            console.log(responseData.data.data);
            setRecords(responseData.data.data);
            setTotalItems(responseData.data.total);
        } catch (error) {
            console.error('Error fetching records:', error);
            showNotification('Error al cargar los registros de trabajo', 'error');
        }
    }, [id, setCurrentPage, setRecords, setTotalItems, showNotification]);

    const handlePageChange = (direction) => {
        if (direction === 'next' && currentPage * 10 < totalItems) {
            setCurrentPage((prevPage) => prevPage + 1);
        } else if (direction === 'prev' && currentPage > 1) {
            setCurrentPage((prevPage) => prevPage - 1);
        }
    };

    useEffect(() => {
        fetchWRecords(currentPage);
    }, [currentPage, fetchWRecords]);

    useEffect(() => {
        if (debouncedSearchTerm.trim() === '') {
            fetchWRecords(1);
        } else {
            const filterQuery = buildFilterQuery(debouncedSearchTerm);
            fetchWRecords(1, filterQuery);
        }
    }, [debouncedSearchTerm, fetchWRecords]);

    const buildFilterQuery = (term) => {
        const baseFields = [
            'periods.name',
            'activities.name',
            'workload'
        ];
        const queries = baseFields.map(field => `&filter[${field}]=${term}`);
        return queries.join('');
    };

    return {
        records,
        currentPage,
        totalItems,
        searchTerm,
        setSearchTerm,
        setDebouncedSearchTerm,
        handlePageChange,
    };
};

export default useHistory;

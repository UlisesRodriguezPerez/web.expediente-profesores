import React, { useContext, useEffect, useState } from 'react';
import { SearchBar } from '../../../common/components/SearchBar/SearchBar';
import { Table } from '../../../common/components/Table/Table';
import { Pagination } from '../../../common/components/Pagination/Pagination';
import './HistoryComponent.css';
import usePagination from '../../../hooks/usePagination';
import useSearch from '../../../hooks/useSearch';
import dataService from '../../../services/dataService';
import ROUTES from '../../../enums/routes';
import { NotificationContext } from '../../../contexts/NotificationContext/NotificationContext';
import { CustomSelect } from '../../../common/components/CustomSelect/CustomSelect';

const NOT_FILTER = 'not_filter';

export const HistoryComponent = () => {

    const { showNotification } = useContext(NotificationContext);
    const [records, setRecords] = useState([]); 
    const { currentPage, setCurrentPage, totalItems, setTotalItems, handlePageChange } = usePagination();
    const { searchTerm, setSearchTerm, debouncedSearchTerm, searchFilterQuery } = useSearch('', (searchTerm) => `?search=${searchTerm}`);

    const userValues = JSON.parse(localStorage.getItem('user'));
    const userName = userValues.name;
    const [name_user, setNameUser] = useState(userName);
    const [selectedPeriod, setSelectedPeriod] = useState(null);
    const [periods, setPeriods] = useState([]);
    const [periodId, setPeriodId] = useState(NOT_FILTER);


    const periodOptions = async () => {
        try {
            const response = await dataService.readData(`${ROUTES.PERIODS}`);
            console.log('periods', response.data.data)
            const periods = response.data.data.map(period => ({ value: period.id, label: period.name }));
            const defaultOption = { value: NOT_FILTER, label: 'Todos' };
            periods.unshift(defaultOption);
            setPeriods(periods);

        } catch (error) {
            console.error('Error fetching periods:', error);
            showNotification('error', 'Error al cargar los periodos');
        }
    }
            

    const handleSearchChange = (option) => {
        setSelectedPeriod(option)
        setPeriodId(option.value);
    };

    const fetchRecords = async () => {
        try {
            const currentUserId = JSON.parse(localStorage.getItem('user')).id;
            // const collaborator = await dataService.readData(`${ROUTES.COLLABORATORS}?filter[user_id]=${currentUserId}`);
            // console.log('collaborator', collaborator.data.data)
            const response = await dataService.readData(`${ROUTES.COLLABORATORS}/${currentUserId}/period-details/${periodId}`);
            setRecords(response.data);
            console.log('records', records);
        } catch (error) {
            console.error('Error fetching records:', error);
            showNotification('error', 'Error al cargar los registros');
        }
    }

    useEffect(() => {
        periodOptions();
        fetchRecords();
    }, []);

    useEffect(() => {
        fetchRecords();
    }, [selectedPeriod]);



    const columns = [
        { header: 'Periodo', render: row => `${row.period_name}` },
        { header: 'Cursos', render: row => `${row.courses_count}` },
        { header: 'Actividades', render: row => `${row.total_activities_count}` },
        { header: 'Carga', render: row => (
            <div className="workload-container">
                <div className="bar-container">
                    <div
                        className={`workload-bar ${row.workload > 1.5 ? 'workload-bar-red' : 'workload-bar-blue'}`}
                        style={{ width: `${(row.workload / 1.5) * 100}%` }} 
                    />
                </div>
            </div>
        )},
    ];

    return (
        <div className="semester-workload-container">
            <h1>Mi Historial: {name_user}</h1>

            <div className="box-container">
                <div className="header-container">
                    <div className="search-filter-container-user">
                    <CustomSelect
                        options={periods}
                        onChange={(option) => handleSearchChange(option)}
                        placeholder="Periodo"
                        value={selectedPeriod}
                    />
                    </div>
                </div>

                <Table className="records-table" columns={columns} data={records} />

                <Pagination currentPage={currentPage} totalItems={totalItems} onPageChange={handlePageChange} />
            </div>
        </div>
    );
}

export default HistoryComponent;

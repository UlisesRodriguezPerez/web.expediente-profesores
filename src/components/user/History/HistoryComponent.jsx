import React, { useContext, useState } from 'react';
import { SearchBar } from '../../../common/components/SearchBar/SearchBar';
import { Table } from '../../../common/components/Table/Table';
import { Pagination } from '../../../common/components/Pagination/Pagination';
import useHistory from './hooks/useHistory'; // Asegúrate de ajustar la ruta correcta
import './HistoryComponent.css';

export const HistoryComponent = () => {
    const {
        records,
        currentPage,
        totalItems,
        searchTerm,
        setSearchTerm,
        setDebouncedSearchTerm,
        handlePageChange,
    } = useHistory();

    //const { showNotification } = useContext(NotificationContext);

    const userValues = JSON.parse(localStorage.getItem('user'));
    const userName = userValues.name;
    const [name_user, setNameUser] = useState(userName);

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
        setDebouncedSearchTerm(event.target.value);
    };

    const columns = [
        { header: 'Periodo', render: row => `${row.period}` },
        { header: 'Cursos', render: row => `${row.activities}` },
        { header: 'Actividades', render: row => `${row.activities}` },
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
                        <SearchBar className="search-box" value={searchTerm} onChange={handleSearchChange} placeholder={'Periodo'} />
                        <p> </p>
                        <SearchBar className="search-box" value={searchTerm} onChange={handleSearchChange} placeholder={'Búsqueda'} />
                    </div>
                </div>

                <Table className="records-table" columns={columns} data={records} />

                <Pagination currentPage={currentPage} totalItems={totalItems} onPageChange={handlePageChange} />
            </div>
        </div>
    );
}

export default HistoryComponent;

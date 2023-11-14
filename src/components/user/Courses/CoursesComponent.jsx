import React, { useContext, useState } from 'react';
import useCourses from './hooks/useCourses';
import { SearchBar } from '../../../common/components/SearchBar/SearchBar';
import { Table } from '../../../common/components/Table/Table';
import { Pagination } from '../../../common/components/Pagination/Pagination';

import './CoursesComponent.css';

export const CoursesComponent = () => {
    const {
        records,
        currentPage,
        totalItems,
        searchTerm,
        setSearchTerm,
        setDebouncedSearchTerm,
        handlePageChange,
    } = useCourses();

    //const { showNotification } = useContext(NotificationContext);

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
        setDebouncedSearchTerm(event.target.value);
    };

    const ActivityColumn = ({ row }) => row.activities;
    const PeriodColumn = ({ row }) => row.period;

    const columns = [
        { header: 'Actividad', render: row => <ActivityColumn row={row} /> },
        { header: 'Periodo', render: row => <PeriodColumn row={row} /> },
    ];

    return (
        <div className="semester-workload-container">
            <h1>Mis Cursos</h1>

            <div className="box-container">
                <div className="header-container">
                    <div className="search-filter-container-user">
                        <SearchBar className="search-box" value={searchTerm} onChange={handleSearchChange} placeholder={'Búsqueda'} />
                    </div>
                </div>

                <Table className="records-table" columns={columns} data={records} />

                <Pagination currentPage={currentPage} totalItems={totalItems} onPageChange={handlePageChange} />
            </div>
        </div>
    );
}

export default CoursesComponent;

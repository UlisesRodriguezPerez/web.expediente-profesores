import React, { useState } from "react";
import { SearchBar } from "../../../../../common/components/SearchBar/SearchBar";
import { Table } from "../../../../../common/components/Table/Table";
import { Pagination } from "../../../../../common/components/Pagination/Pagination";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileExport } from '@fortawesome/free-solid-svg-icons';
import './PublicationTab.css';

export const PublicationTab = () => {

    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');
    // Datos falsos para visualización
    const [data, setData] = useState([
        { teacher: 'testing Test', scholarship : 5, publicationName: 10, students: 'PENDING', objective: 'PENDING', target: 'PENDING' },
        { teacher: 'testing Test', scholarship : 5, publicationName: 10, students: 'PENDING', objective: 'PENDING', target: 'PENDING' },
        { teacher: 'testing Test', scholarship : 5, publicationName: 10, students: 'PENDING', objective: 'PENDING', target: 'PENDING' },
        { teacher: 'testing Test', scholarship : 5, publicationName: 10, students: 'PENDING', objective: 'PENDING', target: 'PENDING' },
        { teacher: 'testing Test', scholarship : 5, publicationName: 10, students: 'PENDING', objective: 'PENDING', target: 'PENDING' },
        { teacher: 'testing Test', scholarship : 5, publicationName: 10, students: 'PENDING', objective: 'PENDING', target: 'PENDING' },
        { teacher: 'testing Test', scholarship : 5, publicationName: 10, students: 'PENDING', objective: 'PENDING', target: 'PENDING' },
        { teacher: 'testing Test', scholarship : 5, publicationName: 10, students: 'PENDING', objective: 'PENDING', target: 'PENDING' },
        { teacher: 'testing Test', scholarship : 5, publicationName: 10, students: 'PENDING', objective: 'PENDING', target: 'PENDING' },
        { teacher: 'testing Test', scholarship : 5, publicationName: 10, students: 'PENDING', objective: 'PENDING', target: 'PENDING' },
        { teacher: 'testing Test', scholarship : 5, publicationName: 10, students: 'PENDING', objective: 'PENDING', target: 'PENDING' },
        { teacher: 'testing Test', scholarship : 5, publicationName: 10, students: 'PENDING', objective: 'PENDING', target: 'PENDING' },
        { teacher: 'testing Test', scholarship : 5, publicationName: 10, students: 'PENDING', objective: 'PENDING', target: 'PENDING' },
        { teacher: 'testing Test', scholarship : 5, publicationName: 10, students: 'PENDING', objective: 'PENDING', target: 'PENDING' },
        { teacher: 'testing Test', scholarship : 5, publicationName: 10, students: 'PENDING', objective: 'PENDING', target: 'PENDING' },
        { teacher: 'testing Test', scholarship : 5, publicationName: 10, students: 'PENDING', objective: 'PENDING', target: 'PENDING' },
        { teacher: 'testing Test', scholarship : 5, publicationName: 10, students: 'PENDING', objective: 'PENDING', target: 'PENDING' },

    ]);

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
        setDebouncedSearchTerm(event.target.value);
    };

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
        // Actualizar datos basados en la nueva página
    };

    const columns = [
        { header: 'Profesor', render: row => <span>{row.teacher}</span> },
        { header: 'Beca', render: row => <span>{row.scholarship}</span> },
        { header: 'Nombre Publicación', render: row => <span>{row.publicationName}</span> },
        { header: 'Estudiantes', render: row => <span>{row.students}</span> },
        { header: 'Objetivo', render: row => <span>{row.objective}</span> },
        { header: 'Meta', render: row => <span>{row.target }</span> },
        { header: '', render: row => <span >Antions</span> },
    ];

    return (
        <div className="publication-tab-container">
            <div className="search-filter-container width-95">
                <div className="search-container">
                    <SearchBar className="search-box" value={searchTerm} onChange={handleSearchChange} placeholder={'Búsqueda'} />

                    <button className="filter-button">
                        <span className="filter-lines">
                            <span className="line line-large"></span>
                            <span className="line line-medium"></span>
                            <span className="line line-small"></span>
                        </span>
                        Filtros  {/* PENDIENTE */}
                    </button>
                </div>
                <div className="export-container">
                    <button className="action-button export-button">
                        <FontAwesomeIcon icon={faFileExport} /> Exportar
                    </button>
                </div>
            </div>
            <Table className="historic-table" columns={columns} data={data} />
            <Pagination currentPage={currentPage} totalItems={data.length} onPageChange={handlePageChange} className="width-95"/>
        </div>
    );

};
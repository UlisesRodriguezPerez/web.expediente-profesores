import React, { useState } from "react";
import { SearchBar } from "../../../../../common/components/SearchBar/SearchBar";
import { Table } from "../../../../../common/components/Table/Table";
import { Pagination } from "../../../../../common/components/Pagination/Pagination";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileExport } from '@fortawesome/free-solid-svg-icons';
import './InternationalizationTab.css';

export const InternationalizationTab = () => {

    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');
    // Datos falsos para visualización
    const [data, setData] = useState([
        { teacher: 'testing Test', activity : 5, type: 10, university: 'PENDING', country: 'PENDING' },
        { teacher: 'testing Test', activity : 5, type: 10, university: 'PENDING', country: 'PENDING' },
        { teacher: 'testing Test', activity : 5, type: 10, university: 'PENDING', country: 'PENDING' },
        { teacher: 'testing Test', activity : 5, type: 10, university: 'PENDING', country: 'PENDING' },
        { teacher: 'testing Test', activity : 5, type: 10, university: 'PENDING', country: 'PENDING' },
        { teacher: 'testing Test', activity : 5, type: 10, university: 'PENDING', country: 'PENDING' },
        { teacher: 'testing Test', activity : 5, type: 10, university: 'PENDING', country: 'PENDING' },
        { teacher: 'testing Test', activity : 5, type: 10, university: 'PENDING', country: 'PENDING' },
        { teacher: 'testing Test', activity : 5, type: 10, university: 'PENDING', country: 'PENDING' },
        { teacher: 'testing Test', activity : 5, type: 10, university: 'PENDING', country: 'PENDING' },
        { teacher: 'testing Test', activity : 5, type: 10, university: 'PENDING', country: 'PENDING' },
        { teacher: 'testing Test', activity : 5, type: 10, university: 'PENDING', country: 'PENDING' },
        { teacher: 'testing Test', activity : 5, type: 10, university: 'PENDING', country: 'PENDING' },
        { teacher: 'testing Test', activity : 5, type: 10, university: 'PENDING', country: 'PENDING' },
        { teacher: 'testing Test', activity : 5, type: 10, university: 'PENDING', country: 'PENDING' },
        { teacher: 'testing Test', activity : 5, type: 10, university: 'PENDING', country: 'PENDING' },
        { teacher: 'testing Test', activity : 5, type: 10, university: 'PENDING', country: 'PENDING' },
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
        { header: 'Actividad', render: row => <span>{row.activity}</span> },
        { header: 'Tipo', render: row => <span>{row.type}</span> },
        { header: 'Universidad', render: row => <span>{row.university}</span> },
        { header: 'Pais', render: row => <span>{row.country}</span> },
        { header: '', render: row => <span >Antions</span> },
    ];

    return (
        <div className="internationalization-tab-container">
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
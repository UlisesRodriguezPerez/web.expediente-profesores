import React, { useState, useEffect } from "react";
import { SearchBar } from "../../../../../../../common/components/SearchBar/SearchBar";
import { Table } from "../../../../../../../common/components/Table/Table";
import { Pagination } from "../../../../../../../common/components/Pagination/Pagination";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileExport, faTrash, faPlus, faEdit } from '@fortawesome/free-solid-svg-icons';
import './TechniqueTab.css';

// Función para obtener los datos de prueba
const getTestData = () => {
    const data = [
        { teacher: 'testing Test1', activity: 5, type: 10, actions: 'PENDING' },
        { teacher: 'testing Test2', activity: 5, type: 10, actions: 'PENDING' },
        { teacher: 'testing Test3', activity: 5, type: 10, actions: 'PENDING' },
        { teacher: 'testing Test4', activity: 5, type: 10, actions: 'PENDING' },
        { teacher: 'testing Test5', activity: 5, type: 10, actions: 'PENDING' },
        { teacher: 'testing Test6', activity: 5, type: 10, actions: 'PENDING' },
        { teacher: 'testing Test7', activity: 5, type: 10, actions: 'PENDING' },
        { teacher: 'testing Test8', activity: 5, type: 10, actions: 'PENDING' },
        { teacher: 'testing Test9', activity: 5, type: 10, actions: 'PENDING' },
        { teacher: 'testing Test1', activity: 5, type: 10, actions: 'PENDING' },
        { teacher: 'testing Test2', activity: 5, type: 10, actions: 'PENDING' },
        { teacher: 'testing Test3', activity: 5, type: 10, actions: 'PENDING' },
    ];

    return data;
};

export const TechniqueTab = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');
    const [data, setData] = useState(getTestData()); // Inicializar con datos de prueba

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
        setDebouncedSearchTerm(event.target.value);
    };

    useEffect(() => {
        // Aquí deberías llamar a tu API para obtener los datos reales.
        // Actualizar el estado de 'data' con los datos obtenidos.
        // Ejemplo:
        // fetchData(currentPage, debouncedSearchTerm);
        // setData([...]); // Actualiza 'data' con los datos obtenidos
    }, [currentPage, debouncedSearchTerm]);

    // ... (otros estados y funciones)

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
        // Actualiza datos basados en la nueva página
        // Ejemplo:
        // fetchData(pageNumber, debouncedSearchTerm);
    };

    const columns = [
        { header: 'Profesor', render: row => <span>{row.teacher}</span> },
        { header: 'Actividad', render: row => <span>{row.activity}</span> },
        { header: 'Tipo', render: row => <span>{row.type}</span> },
        { header: '', render: row => <span >PENDING</span> },
    ];

    return (
        <div className="technique-tab-container">
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
            {/* ... (resto del código, como el formulario modal, notificaciones, etc.) */}
        </div>
    );
};

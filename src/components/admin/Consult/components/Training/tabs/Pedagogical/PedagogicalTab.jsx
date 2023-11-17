import React, { useState, useEffect } from "react";
import { SearchBar } from "../../../../../../../common/components/SearchBar/SearchBar";
import { Table } from "../../../../../../../common/components/Table/Table";
import { Pagination } from "../../../../../../../common/components/Pagination/Pagination";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileExport, faTrash, faPlus, faEdit } from '@fortawesome/free-solid-svg-icons';
import './PedagogicalTab.css';

// Función para obtener los datos de prueba
const getTestData = () => {
    const data = [
        { teacher: 'testing Test', name: 'Pedagogy 101', institution: 'Edu University', period: '2022-2023' },
        { teacher: 'testing Test', name: 'Advanced Teaching Methods', institution: 'Teaching Institute', period: '2021-2022' },
        { teacher: 'testing Test', name: 'Inclusive Education Workshop', institution: 'Education Center', period: '2023-2024' },
        { teacher: 'testing Test', name: 'Educational Technology Seminar', institution: 'TechEd Academy', period: '2020-2021' },
        { teacher: 'testing Test', name: 'Language Arts Curriculum', institution: 'Language Institute', period: '2022-2023' },
        { teacher: 'testing Test', name: 'Mathematics Teaching Strategies', institution: 'Math Academy', period: '2019-2020' },
        { teacher: 'testing Test', name: 'Science Education Symposium', institution: 'Science Center', period: '2021-2022' },
        { teacher: 'testing Test', name: 'Physical Education and Health', institution: 'Health School', period: '2023-2024' },
        { teacher: 'testing Test', name: 'Social Studies Curriculum', institution: 'Social Institute', period: '2020-2021' },
        { teacher: 'testing Test', name: 'Art and Music Education', institution: 'Arts Center', period: '2022-2023' },
        { teacher: 'testing Test', name: 'Special Education Workshop', institution: 'SpecialEd Institute', period: '2019-2020' },
        { teacher: 'testing Test', name: 'Literacy Development Strategies', institution: 'Literacy Academy', period: '2021-2022' },
        { teacher: 'testing Test', name: 'Critical Thinking in Education', institution: 'Critical Ed Center', period: '2023-2024' },
        { teacher: 'testing Test', name: 'Educational Leadership Seminar', institution: 'Leadership Institute', period: '2020-2021' },
        { teacher: 'testing Test', name: 'History and Civics Education', institution: 'History Center', period: '2022-2023' },
        { teacher: 'testing Test', name: 'Environmental Education Workshop', institution: 'Environment Institute', period: '2019-2020' },
        { teacher: 'testing Test', name: 'Teaching Foreign Languages', institution: 'Language School', period: '2021-2022' },
        { teacher: 'testing Test', name: 'Early Childhood Education', institution: 'Early Ed Center', period: '2023-2024' },
        { teacher: 'testing Test', name: 'Educational Psychology Seminar', institution: 'Psychology Institute', period: '2020-2021' },
        { teacher: 'testing Test', name: 'STEM Education Workshop', institution: 'STEM Academy', period: '2022-2023' },
    ];

    return data;
};

export const PedagogicalTab = () => {
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
        { header: 'Nombre', render: row => <span>{row.name}</span> },
        { header: 'Institución', render: row => <span>{row.institution}</span> },
        { header: 'Período', render: row => <span>{row.period}</span> },
    ];

    return (
        <div className="pedagogical-tab-container">
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

import React, { useState, useEffect } from "react";
import { SearchBar } from "../../../../../../../common/components/SearchBar/SearchBar";
import { Table } from "../../../../../../../common/components/Table/Table";
import { Pagination } from "../../../../../../../common/components/Pagination/Pagination";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileExport } from '@fortawesome/free-solid-svg-icons';
import './TechniqueTab.css';

// Simula una llamada a la API con datos de prueba
const fetchDataFromApi = async (page, teacherId) => {
    // Simulación de datos de prueba
    const fakeApiData = [
        { teacher: 'Teacher 1', activity: 'Activity 1', type: 'Type 1' },
        { teacher: 'Teacher 2', activity: 'Activity 2', type: 'Type 2' },
        { teacher: 'Teacher 3', activity: 'Activity 3', type: 'Type 3' },
        { teacher: 'Teacher 1', activity: 'Activity 1', type: 'Type 1' },
        { teacher: 'Teacher 2', activity: 'Activity 2', type: 'Type 2' },
        { teacher: 'Teacher 3', activity: 'Activity 3', type: 'Type 3' },
        { teacher: 'Teacher 1', activity: 'Activity 1', type: 'Type 1' },
        { teacher: 'Teacher 2', activity: 'Activity 2', type: 'Type 2' },
        { teacher: 'Teacher 3', activity: 'Activity 3', type: 'Type 3' },
        { teacher: 'Teacher 1', activity: 'Activity 1', type: 'Type 1' },
        { teacher: 'Teacher 2', activity: 'Activity 2', type: 'Type 2' },
        { teacher: 'Teacher 3', activity: 'Activity 3', type: 'Type 3' },
        { teacher: 'Teacher 1', activity: 'Activity 1', type: 'Type 1' },
        { teacher: 'Teacher 2', activity: 'Activity 2', type: 'Type 2' },
        { teacher: 'Teacher 3', activity: 'Activity 3', type: 'Type 3' },
        // ... más datos según sea necesario
    ];

    // Simulación de un retardo en la llamada a la API (puedes eliminar esto en tu código real)
    await new Promise(resolve => setTimeout(resolve, 500));

    // Devuelve los datos de prueba
    return {
        data: fakeApiData.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE),
        total: fakeApiData.length,
    };
};

const ITEMS_PER_PAGE = 10;
const DEFAULT_TEACHER_VALUE = -1;

export const TechniqueTab = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');
    const [data, setData] = useState([]);
    const [totalItems, setTotalItems] = useState(0);

    // Define fetchData aquí
    const fetchData = async (page = 1, teacherId = DEFAULT_TEACHER_VALUE) => {
        try {
            const response = await fetchDataFromApi(page, teacherId);
            setData(response.data);
            setTotalItems(response.total);
        } catch (error) {
            console.error('Error fetching data:', error);
            // Maneja el error según tus necesidades
        }
    };

    useEffect(() => {
        fetchData(currentPage, DEFAULT_TEACHER_VALUE);
    }, [DEFAULT_TEACHER_VALUE, ITEMS_PER_PAGE, currentPage]);

    useEffect(() => {
        fetchData(1, ''); // Llama a la API para obtener datos iniciales
    }, []);

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
        setDebouncedSearchTerm(event.target.value);
    };

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const columns = [
        { header: 'Profesor', render: row => <span>{row.teacher}</span> },
        { header: 'Actividad', render: row => <span>{row.activity}</span> },
        { header: 'Tipo', render: row => <span>{row.type}</span> },
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
            <Pagination currentPage={currentPage} totalItems={totalItems} onPageChange={handlePageChange} className="width-95"/>
            {/* ... (resto del código) */}
        </div>
    );
};

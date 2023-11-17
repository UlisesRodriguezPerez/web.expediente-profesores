import React, { useState, useEffect } from "react";
import { SearchBar } from "../../../../../common/components/SearchBar/SearchBar";
import { Table } from "../../../../../common/components/Table/Table";
import { Pagination } from "../../../../../common/components/Pagination/Pagination";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileExport } from '@fortawesome/free-solid-svg-icons';
import './PublicationTab.css';

export const PublicationTab = () => {
    const ITEMS_PER_PAGE = 10; // Número de elementos por página
    const DEFAULT_TEACHER_VALUE = -1;

    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');
    const [data, setData] = useState([]);
    const [totalItems, setTotalItems] = useState(0);

    // Función para simular la llamada a la API y obtener datos paginados
    const fetchDataFromApi = async (page, teacherId) => {
        // Simulación de datos de prueba
        const fakeApiData = [
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
        ];

        // Simulación de un retardo en la llamada a la API (puedes eliminar esto en tu código real)
        await new Promise(resolve => setTimeout(resolve, 500));

        // Devuelve los datos de prueba
        return {
            data: fakeApiData.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE),
            total: fakeApiData.length,
        };
    };

    // Función para obtener datos paginados y actualizar el estado
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
        fetchData(currentPage);
    }, [currentPage]);

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
        setDebouncedSearchTerm(event.target.value);
    };

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const columns = [
        { header: 'Profesor', render: row => <span>{row.teacher}</span> },
        { header: 'Beca', render: row => <span>{row.scholarship}</span> },
        { header: 'Nombre Publicación', render: row => <span>{row.publicationName}</span> },
        { header: 'Estudiantes', render: row => <span>{row.students}</span> },
        { header: 'Objetivo', render: row => <span>{row.objective}</span> },
        { header: 'Meta', render: row => <span>{row.target}</span> },
        { header: '', render: row => <span>Acciones</span> },
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
            <Pagination currentPage={currentPage} totalItems={totalItems} onPageChange={handlePageChange} className="width-95" />
        </div>
    );
};

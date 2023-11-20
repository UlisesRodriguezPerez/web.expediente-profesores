import React, { useContext, useState, useEffect } from "react";
import { SearchBar } from "../../../../../../../common/components/SearchBar/SearchBar";
import { Table } from "../../../../../../../common/components/Table/Table";
import { Pagination } from "../../../../../../../common/components/Pagination/Pagination";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileExport } from '@fortawesome/free-solid-svg-icons';
import './PedagogicalTab.css';  // Asegúrate de tener el archivo CSS adecuado
import dataService from "../../../../../../../services/dataService";
import ROUTES from "../../../../../../../enums/routes";
import { NotificationContext } from "../../../../../../../contexts/NotificationContext/NotificationContext"
import useSearch from "../../../../../../../hooks/useSearch";

const ITEMS_PER_PAGE = 10;

export const PedagogicalTab = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [paginatedPedagogicalData, setPaginatedPedagogicalData] = useState([]);
    const { showNotification } = useContext(NotificationContext);

    const searchBuildFilterQuery = (term) => {
        const baseFields = [
            'user.name',
            'user.last_name',
            'user.second_last_name',
        ];
        const queries = baseFields.map(field => `&filter[${field}]=${term}`);
        return queries.join('');
    };

    const getPaginatedData = () => {
        const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
        const endIndex = startIndex + ITEMS_PER_PAGE;
        return pedagogicalData.slice(startIndex, endIndex);
    };

    const { searchTerm, setSearchTerm, searchFilterQuery } = useSearch('', searchBuildFilterQuery);

    const [pedagogicalData, setPedagogicalData] = useState([]);

    const fetchPedagogicalData = async () => { //pedagogicalTrainings.collaborator_id
        try {
            const response = await dataService.readData(`${ROUTES.COLLABORATORS}?included=user,pedagogical_trainings${searchFilterQuery}`);
            console.log('pedagogicalData :', response.data.data);
            
            const pedagogicalDataFormatted = response.data.data.flatMap(collaborator => ({
                teacher: `${collaborator.user.name}`,
                name: 'Pending', // O training.hours según lo que necesites
                institution: 'Pending',
                period: 'Pending',
            }));

            console.log('pedagogicalDataFormatted', pedagogicalDataFormatted);

            setPedagogicalData(pedagogicalDataFormatted);
        } catch (error) {
            console.error('Error fetching pedagogical data:', error);
            showNotification('error', 'Error al cargar la información pedagógica');
        }
    }

    useEffect(() => {
        fetchPedagogicalData();
    }, []);

    useEffect(() => {
        setCurrentPage(1);
        fetchPedagogicalData();
    }, [searchFilterQuery]);

    useEffect(() => {
        setPaginatedPedagogicalData(getPaginatedData());
    }, [currentPage, pedagogicalData]);

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
        // Actualizar datos basados en la nueva página
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
            <Table className="historic-table" columns={columns} data={paginatedPedagogicalData} />
            <Pagination currentPage={currentPage} totalItems={pedagogicalData.length} onPageChange={handlePageChange} className="width-95"/>
            {/* ... (resto del código, como el formulario modal, notificaciones, etc.) */}
        </div>
    );
};

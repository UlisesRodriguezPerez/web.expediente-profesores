import React, { useContext, useEffect, useState } from "react";
import { SearchBar } from "../../../../../../../common/components/SearchBar/SearchBar";
import { Table } from "../../../../../../../common/components/Table/Table";
import { Pagination } from "../../../../../../../common/components/Pagination/Pagination";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileExport } from '@fortawesome/free-solid-svg-icons';
import './TechniqueTab.css';  // Asegúrate de tener el archivo CSS adecuado
import dataService from "../../../../../../../services/dataService";
import ROUTES from "../../../../../../../enums/routes";
import { NotificationContext } from "../../../../../../../contexts/NotificationContext/NotificationContext";
import useSearch from "../../../../../../../hooks/useSearch";

const ITEMS_PER_PAGE = 10;

export const TechniqueTab = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [paginatedTechniques, setPaginatedTechniques] = useState([]);
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
        return techniques.slice(startIndex, endIndex);
    };

    const { searchTerm, setSearchTerm, searchFilterQuery } = useSearch('', searchBuildFilterQuery);

    const [techniques, setTechniques] = useState([]);

    const fetchTechniques = async () => {
        try {
            const response = await dataService.readData(`${ROUTES.COLLABORATORS}?included=user,technicalTrainings${searchFilterQuery}`);
            console.log('techniques', response.data.data);
            console.log('URL', `${ROUTES.COLLABORATORS}?included=user,technicalTrainings${searchFilterQuery}`);

            const techniquesFormatted = response.data.data.flatMap(collaborator => collaborator.technicalTrainings.map(technique => ({
                teacher: `${collaborator.user.name}`,
                activity: technique.activity,  
                type: technique.type, 
                pending: 'PENDING',
            })));

            console.log('techniquesFormatted', techniquesFormatted);

            setTechniques(techniquesFormatted);
        } catch (error) {
            console.error('Error fetching techniques:', error);
            showNotification('error', 'Error al cargar las técnicas');
        }
    }

    useEffect(() => {
        fetchTechniques();
    }, []);

    useEffect(() => {
        setCurrentPage(1);
        fetchTechniques();
    }, [searchFilterQuery]);

    useEffect(() => {
        setPaginatedTechniques(getPaginatedData());
    }, [currentPage, techniques]);

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
        // Actualizar datos basados en la nueva página
    };

    const columns = [
        { header: 'Profesor', render: row => <span>{row.teacher}</span> },
        { header: 'Actividad', render: row => <span>{row.activity}</span> },
        { header: 'Tipo', render: row => <span>{row.type}</span> },
        { header: '', render: row => <span>{row.pending}</span> },
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
            <Table className="historic-table" columns={columns} data={paginatedTechniques} />
            <Pagination currentPage={currentPage} totalItems={techniques.length} onPageChange={handlePageChange} className="width-95" />
        </div>
    );
};

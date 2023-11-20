import React, { useContext, useEffect, useState } from "react";
import { SearchBar } from "../../../../../common/components/SearchBar/SearchBar";
import { Table } from "../../../../../common/components/Table/Table";
import { Pagination } from "../../../../../common/components/Pagination/Pagination";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileExport } from '@fortawesome/free-solid-svg-icons';
import './PublicationTab.css';
import dataService from "../../../../../services/dataService";
import ROUTES from "../../../../../enums/routes";
import { NotificationContext } from "../../../../../contexts/NotificationContext/NotificationContext";
import useSearch from "../../../../../hooks/useSearch";

const ITEMS_PER_PAGE = 10;

export const PublicationTab = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [paginatedPublication, setPaginatedPublication] = useState([]);
    const { showNotification } = useContext(NotificationContext);

    const searchBuildFilterQuery = (term) => {
        const baseFields = [
            'user.name',
        ];
        const queries = baseFields.map(field => `&filter[${field}]=${term}`);
        return queries.join('');
    };

    const { searchTerm, setSearchTerm, searchFilterQuery } = useSearch('', searchBuildFilterQuery);

    const [publication, setPublication] = useState([]);

    const fetchPublicationData = async () => {
        try {
          const response = await dataService.readData(`${ROUTES.COLLABORATORS}?included=user,publications${searchFilterQuery}`);
          console.log(response.data.data);
      
          const publicationFormatted = response.data.data.flatMap(collaborator => {
            const user = collaborator.user;
            const publications = collaborator.publications || []; // Verificar si 'publications' está definido
      
            return publications.map(publication => ({
              teacher: `${user?.name ?? ''} ${user?.last_name ?? ''}`, // Verificar si 'user' está definido
              scholarship: `${publication.ORCID === 1 ? 'Si' : 'No'}`,
              publicationName: `${publication.name ?? ''}`,
              students: `${publication.coauthors ?? ''}`,
              objective: `${publication.objectives ?? ''}`,
              target: `${publication.goals ?? ''}`,
            }));
          });
      
          console.log(publicationFormatted);
          setPublication(publicationFormatted);
        } catch (error) {
          console.error('Error fetching publication data:', error);
          console.log('Response data:', error.response?.data); // Agregado para imprimir la respuesta del servidor
          showNotification('error', 'Error al cargar la información de publicación');
        }
      };
      

    const getPaginatedData = (data) => {
        const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
        const endIndex = startIndex + ITEMS_PER_PAGE;
        return publication.slice(startIndex,endIndex);
    };

    useEffect(() => {
        fetchPublicationData();
    }, []);
    
    useEffect(() => {
        console.log("Search term query", searchTerm)
        setCurrentPage(1);
        fetchPublicationData();
    }, [searchFilterQuery]);
    
    useEffect(() => {
        setPaginatedPublication(getPaginatedData());
    }, [currentPage, publication]);

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
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
            <Table className="historic-table" columns={columns} data={paginatedPublication} />
            <Pagination currentPage={currentPage} totalItems={publication.length} onPageChange={handlePageChange} className="width-95" />
        </div>
    );
};

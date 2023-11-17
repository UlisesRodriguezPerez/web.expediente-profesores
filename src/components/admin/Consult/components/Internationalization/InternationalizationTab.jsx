import React, { useState, useEffect, useContext } from "react";
import { SearchBar } from "../../../../../common/components/SearchBar/SearchBar";
import { Table } from "../../../../../common/components/Table/Table";
import { Pagination } from "../../../../../common/components/Pagination/Pagination";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileExport } from '@fortawesome/free-solid-svg-icons';
import './InternationalizationTab.css';
import dataService from "../../../../../services/dataService";
import ROUTES from "../../../../../enums/routes";
import { NotificationContext } from "../../../../../contexts/NotificationContext/NotificationContext";
import useSearch from "../../../../../hooks/useSearch";

const ITEMS_PER_PAGE = 10;

export const InternationalizationTab = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [paginatedInternationalization, setPaginatedInternationalization] = useState([]);
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

    const { searchTerm, setSearchTerm, searchFilterQuery } = useSearch('', searchBuildFilterQuery);

    const [internationalization, setInternationalization] = useState([]);

    const fetchInternationalization = async () => {
        try {
            const response = await dataService.readData(`${ROUTES.COLLABORATORS}?included=user,internationalizations${searchFilterQuery}`);
            console.log(response.data);
            const internationalizationFormatted = response.data.data.flatMap(collaborator =>
                collaborator.internationalizations.map(internationalization => ({
                    teacher: `${collaborator.user.name}`,
                    activity: internationalization.name,
                    type: internationalization.type,
                    university: internationalization.university_name,
                    country: internationalization.country,
                }))
            );

            setInternationalization(internationalizationFormatted);
        } catch (error) {
            console.error('Error fetching internationalization:', error);
            showNotification('error', 'Error al cargar la internacionalización');
        }
    };

    const getPaginatedData = () => {
        const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
        const endIndex = startIndex + ITEMS_PER_PAGE;
        return internationalization.slice(startIndex, endIndex);
    };

    useEffect(() => {
        fetchInternationalization();
    }, []);

    useEffect(() => {
        console.log("Searche tearm query", searchTerm)
        setCurrentPage(1);
        fetchInternationalization();
    }, [searchFilterQuery]);

    useEffect(() => {
        setPaginatedInternationalization(getPaginatedData());
    }, [currentPage, internationalization]);

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
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
            <Table className="historic-table" columns={columns} data={paginatedInternationalization} />
            <Pagination currentPage={currentPage} totalItems={internationalization.length} onPageChange={handlePageChange} className="width-95" />
        </div>
    );
};

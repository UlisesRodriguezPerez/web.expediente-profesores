import React, { useContext, useEffect, useState } from "react";
import { SearchBar } from "../../../../../../../common/components/SearchBar/SearchBar";
import { Table } from "../../../../../../../common/components/Table/Table";
import { Pagination } from "../../../../../../../common/components/Pagination/Pagination";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileExport } from '@fortawesome/free-solid-svg-icons';
import './FormationTab.css';
import dataService from "../../../../../../../services/dataService";
import ROUTES from "../../../../../../../enums/routes";
import { NotificationContext } from "../../../../../../../contexts/NotificationContext/NotificationContext";
import useSearch from "../../../../../../../hooks/useSearch";

export const FormationTab = () => {

    const [currentPage, setCurrentPage] = useState(1);
    // const [searchTerm, setSearchTerm] = useState('');
    // const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');
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

    const [training, setTraining] = useState([]);

    const fetchTraining = async () => {
        try {
            const response = await dataService.readData(`${ROUTES.COLLABORATORS}?included=user,activityFormationTrainings${searchFilterQuery}`);
            console.log('training', response.data.data);
            console.log('URL', `${ROUTES.COLLABORATORS}?included=user,activityFormationTrainings${searchFilterQuery}`);

            const trainingFormated = response.data.data.flatMap(collaborator => collaborator.activity_formation_trainings.map(training => ({
                teacher: `${collaborator.user.name}`,
                program: training.name,
                university: training.university_name,
                academicDegree: training.academic_degree,
                startYear: training.start_year,
                endYear: training.end_year,
            })));

            console.log('trainingFormated', trainingFormated);

            setTraining(trainingFormated);
        } catch (error) {
            console.error('Error fetching training:', error);
            showNotification('error', 'Error al cargar la formación');
        }
    }

    useEffect(() => {
        fetchTraining();
    }, []);

    useEffect(() => {
        fetchTraining();
    }, [searchFilterQuery]);

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);

    };

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
        // Actualizar datos basados en la nueva página
    };

    const columns = [
        { header: 'Profesor', render: row => <span>{row.teacher}</span> },
        { header: 'Programa', render: row => <span>{row.program}</span> },
        { header: 'universidad', render: row => <span>{row.university}</span> },
        { header: 'Grado Académico', render: row => <span>{row.academicDegree}</span> },
        { header: 'Año Inicio', render: row => <span>{row.startYear}</span> },
        { header: 'Año Final', render: row => <span>{row.endYear}</span> },

    ];

    return (
        <div className="formation-tab-container">
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
            <Table className="historic-table" columns={columns} data={training} />
            <Pagination currentPage={currentPage} totalItems={training.length} onPageChange={handlePageChange} className="width-95" />
        </div>
    );

};
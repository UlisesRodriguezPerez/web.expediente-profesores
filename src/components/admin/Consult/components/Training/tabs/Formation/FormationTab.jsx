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

const ITEMS_PER_PAGE = 10;

export const FormationTab = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const { showNotification } = useContext(NotificationContext);
    const [training, setTraining] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    // Sección reemplazable con datos de prueba
    const mockTrainingData = [
        { teacher: 'John Doe', program: 'Programming 101', university: 'Tech University', academicDegree: 'Bachelor', startYear: 2020, endYear: 2022 },
        { teacher: 'Jane Smith', program: 'Web Development Masterclass', university: 'Code Academy', academicDegree: 'Master', startYear: 2019, endYear: 2021 },
        { teacher: 'Bob Johnson', program: 'Data Science Bootcamp', university: 'Data Institute', academicDegree: 'Master', startYear: 2021, endYear: 2023 },
        { teacher: 'Alice Williams', program: 'Machine Learning Fundamentals', university: 'AI University', academicDegree: 'Ph.D.', startYear: 2018, endYear: 2020 },
        { teacher: 'Charlie Brown', program: 'Cybersecurity Essentials', university: 'Security Institute', academicDegree: 'Bachelor', startYear: 2022, endYear: 2024 },
        { teacher: 'Eva Davis', program: 'Mobile App Development Workshop', university: 'Tech Hub', academicDegree: 'Master', startYear: 2017, endYear: 2019 },
        { teacher: 'Frank Turner', program: 'Cloud Computing Seminar', university: 'Cloud Academy', academicDegree: 'Ph.D.', startYear: 2019, endYear: 2021 },
        { teacher: 'Grace Murphy', program: 'UX/UI Design Intensive', university: 'Design Institute', academicDegree: 'Bachelor', startYear: 2023, endYear: 2025 },
        { teacher: 'Hank Miller', program: 'Big Data Analytics Course', university: 'Data Analytics School', academicDegree: 'Master', startYear: 2020, endYear: 2022 },
        { teacher: 'Ivy Robinson', program: 'Artificial Intelligence Symposium', university: 'AI Summit', academicDegree: 'Ph.D.', startYear: 2016, endYear: 2018 },
        { teacher: 'Jackie Lee', program: 'Blockchain Fundamentals', university: 'Blockchain Institute', academicDegree: 'Bachelor', startYear: 2021, endYear: 2023 },
        { teacher: 'Keith Brown', program: 'Digital Marketing Bootcamp', university: 'Marketing Academy', academicDegree: 'Master', startYear: 2018, endYear: 2020 },
        { teacher: 'Laura White', program: 'Internet of Things (IoT) Workshop', university: 'Tech Innovation Center', academicDegree: 'Bachelor', startYear: 2022, endYear: 2024 },
        { teacher: 'Mike Davis', program: 'Python Programming Course', university: 'Coding School', academicDegree: 'Ph.D.', startYear: 2019, endYear: 2021 },
        { teacher: 'Nina Patel', program: 'Data Visualization Masterclass', university: 'Visualization Institute', academicDegree: 'Master', startYear: 2017, endYear: 2019 },
        { teacher: 'Oscar Gonzalez', program: 'Web Design Essentials', university: 'Design Hub', academicDegree: 'Bachelor', startYear: 2020, endYear: 2022 },
        { teacher: 'Paula Martinez', program: 'Project Management Seminar', university: 'Project Management Institute', academicDegree: 'Ph.D.', startYear: 2021, endYear: 2023 },
        { teacher: 'Quincy Adams', program: 'Artificial Neural Networks Workshop', university: 'Neural Networks Academy', academicDegree: 'Master', startYear: 2018, endYear: 2020 },
        { teacher: 'Rachel Turner', program: 'Cybersecurity Essentials', university: 'Security Institute', academicDegree: 'Bachelor', startYear: 2022, endYear: 2024 },
        { teacher: 'Samuel Wilson', program: 'Machine Learning Fundamentals', university: 'AI University', academicDegree: 'Ph.D.', startYear: 2018, endYear: 2020 },
    ];

    const [isMockData, setIsMockData] = useState(true);

    const fetchTraining = async (page = 1) => {
        try {
            if (isMockData) {
                setTraining(mockTrainingData);
            } else {
                const response = await dataService.readData(`${ROUTES.COLLABORATORS}?included=user&perPage=${ITEMS_PER_PAGE}&page=${page}`);
                const trainingFormatted = response.data.data.flatMap(collaborator => collaborator.activity_formation_trainings.map(training => ({
                    teacher: `${collaborator.user.name}`,
                    program: training.name,
                    university: training.university_name,
                    academicDegree: training.academic_degree,
                    startYear: training.start_year,
                    endYear: training.end_year,
                })));

                setTraining(trainingFormatted);
            }
        } catch (error) {
            console.error('Error fetching training:', error);
            showNotification('error', 'Error al cargar la formación');
        }
    }

    useEffect(() => {
        fetchTraining();
    }, []);

    useEffect(() => {
        fetchTraining(currentPage);
    }, [currentPage, isMockData]);

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
        // Aquí puedes implementar la lógica para realizar una búsqueda con la API si es necesario
    };

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const columns = [
        { header: 'Profesor', render: row => <span>{row.teacher}</span> },
        { header: 'Programa', render: row => <span>{row.program}</span> },
        { header: 'Universidad', render: row => <span>{row.university}</span> },
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

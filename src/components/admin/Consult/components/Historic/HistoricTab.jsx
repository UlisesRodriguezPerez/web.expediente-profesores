// HistoricTab.jsx
import React, { useContext, useEffect, useState } from 'react';
import { Table } from '../../../../../common/components/Table/Table';
import { Pagination } from '../../../../../common/components/Pagination/Pagination';
import './HistoricTab.css';
import { NotificationContext } from '../../../../../contexts/NotificationContext/NotificationContext';
import ROUTES from '../../../../../enums/routes';
import dataService from '../../../../../services/dataService';
import { CustomSelect } from '../../../../../common/components/CustomSelect/CustomSelect';

const ITEMS_PER_PAGE = 10;
const DEFAULT_TEACHER_VALUE = -1;

export const HistoricTab = () => {

    const [collaborator, setCollaborator] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalItems, setTotalItems] = useState(0);
    const [teacherOptions, setTeacherOptions] = useState([]);
    const [selectedTeacher, setSelectedTeacher] = useState(null);
    const { showNotification } = useContext(NotificationContext);

    const fetchTeachers = async () => {
        try {
            const response = await dataService.readData(`${ROUTES.COLLABORATORS}?included=user`);
            const userTeachers = response.data.data.filter(teacher =>
                teacher.user.roles.some(role => role.name === 'user')
            );
            setTeacherOptions(userTeachers.map(teacher => ({
                label: `${teacher.user.name} ${teacher.user.last_name}`,
                value: teacher.id
            })));
        } catch (error) {
            console.error('Error fetching teachers:', error);
            showNotification('error', 'Error al cargar los profesores' );
        }
    };

    const fetchData = async (page = 1, teacherId = DEFAULT_TEACHER_VALUE) => {
        try {
            const queryId = teacherId !== null ? teacherId : DEFAULT_TEACHER_VALUE;
            const response = await dataService.readData(
                `${ROUTES.COLLABORATORS}/${teacherId}/period-details-admin?included=user,workloads.period.courses&perPage=${ITEMS_PER_PAGE}&page=${page}`
            );

            const periodDetails = response.data.data;

            console.log('periodDetails', periodDetails)

            // Transforma los datos en el formato esperado por la tabla.
            const transformedData = periodDetails.map(detail => ({
                cursos: detail.courses_count,
                actividades: detail.activities_count,
                workload: detail.workload,
                period: detail.period_name,
            }));
            

            setCollaborator(transformedData);

            setTotalItems(response.data.total);
        } catch (error) {
            console.error('Error fetching collaborators:', error);
            showNotification('error','Error al cargar los colaboradores');
        }
    };


    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };

    useEffect(() => {
        fetchTeachers();
        fetchData();
    }, []);

    useEffect(() => {
        fetchData(currentPage, selectedTeacher?.value);
    }, [currentPage, selectedTeacher]);


    const CargaHistoricaColumn = ({ row }) => (
        <div className="bar-container">
            <div
                className={`workload-bar ${row.workload > 1.5 ? 'workload-bar-red' : 'workload-bar-blue'}`}
                style={{ width: `${(row.workload / 1.5) * 100}%` }}
            />
        </div>
    );

    const columns = [
        { header: 'Periodo', render: row => <span>{row.period}</span> },
        { header: 'Cursos', render: row => <span>{row.cursos}</span> },
        { header: 'Actividades', render: row => <span>{row.actividades}</span> },
        { header: 'Carga', render: row => <CargaHistoricaColumn row={row} /> },
        { header: '', render: row => <span className="worload-value">{row.workload}</span>, headerClass: 'workload-header' },
    ];

    return (
        <div className="historic-tab-container">
            <div className="search-filter-container">
                <div className="filter">
                    <CustomSelect
                        options={teacherOptions}
                        onChange={(option) => setSelectedTeacher(option)}
                        label="Profesor"
                        placeholder="Profesor"
                        value={selectedTeacher}
                    />
                </div>

                <button className="filter-button">
                    <span className="filter-lines">
                        <span className="line line-large"></span>
                        <span className="line line-medium"></span>
                        <span className="line line-small"></span>
                    </span>
                    Filtros  {/* PENDIENTE */}
                </button>
            </div>
            <Table className="historic-table" columns={columns} data={collaborator}
            />

            <Pagination currentPage={currentPage} totalItems={totalItems} onPageChange={handlePageChange} />
        </div>
    );
};


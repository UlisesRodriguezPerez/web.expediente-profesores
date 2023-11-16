// HistoricTab.jsx
import React, { useContext, useEffect, useState } from 'react';
import { Table } from '../../../../../common/components/Table/Table';
import { Pagination } from '../../../../../common/components/Pagination/Pagination';
import './HistoricTab.css';
import { NotificationContext } from '../../../../../contexts/NotificationContext/NotificationContext';
import ROUTES from '../../../../../enums/routes';
import dataService from '../../../../../services/dataService';
import { CustomSelect } from '../../../../../common/components/CustomSelect/CustomSelect';
import usePagination from '../../../../../hooks/usePagination';
import useSearch from '../../../../../hooks/useSearch';

const ITEMS_PER_PAGE = 10;
const DEFAULT_TEACHER_VALUE = -1;

export const HistoricTab = () => {
    const { showNotification } = useContext(NotificationContext);
    const [records, setRecords] = useState([]);
    const { currentPage, setCurrentPage, totalItems, setTotalItems, handlePageChange } = usePagination();
    const { searchTerm, setSearchTerm, debouncedSearchTerm, searchFilterQuery } = useSearch('', (searchTerm) => `?search=${searchTerm}`);
    const [teacherOptions, setTeacherOptions] = useState([]);
    const [selectedTeacher, setSelectedTeacher] = useState(null);

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
            // Cambia la URL y los parámetros según tus necesidades
            const response = await dataService.readData(
                `${ROUTES.COLLABORATORS}/${queryId}/period-details/${page}`
            );
            setRecords(response.data);
            setTotalItems(response.data.length);
        } catch (error) {
            console.error('Error fetching records:', error);
            showNotification('error', 'Error al cargar los registros');
        }
    };

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

    useEffect(() => {
        fetchTeachers();
        fetchData();
    }, []);

    useEffect(() => {
        fetchData(currentPage, selectedTeacher?.value);
    }, [currentPage, selectedTeacher]);

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
                    Filtros
                </button>
            </div>
            <Table className="historic-table" columns={columns} data={records} />
            <Pagination currentPage={currentPage} totalItems={totalItems} onPageChange={handlePageChange} />
        </div>
    );
};

export default HistoricTab;

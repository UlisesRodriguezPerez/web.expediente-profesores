import React, { useContext, useEffect, useState } from 'react';
import useWorkloads from './hooks/useWorkloads';
import { SearchBar } from '../../../common/components/SearchBar/SearchBar';
import { Table } from '../../../common/components/Table/Table';
import { Pagination } from '../../../common/components/Pagination/Pagination';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import dataService from '../../../services/dataService';
import ROUTES from '../../../enums/routes';
import { NotificationContext } from '../../../contexts/NotificationContext/NotificationContext';
import './SemesterWorkload.css';
import usePagination from '../../../hooks/usePagination';
import useSearch from '../../../hooks/useSearch';


export const SemesterWorkload = () => {

    const [editingWorkloadId, setEditingWorkloadId] = useState(null);
    const [tempWorkloadValue, setTempWorkloadValue] = useState(null);
    const { showNotification } = useContext(NotificationContext);
    const { currentPage, setCurrentPage, totalItems, setTotalItems, handlePageChange } = usePagination();
    const [workloads, setWorkloads] = useState([]);

    const searchBuildFilterQuery = (term) => {
        const baseFields = [
            'collaborator.user.name',
            'collaborator.user.last_name',
            'collaborator.user.second_last_name',
            'workload'
        ];
        const queries = baseFields.map(field => `&filter[${field}]=${term}`);
        return queries.join('');
    };

    const { searchTerm, setSearchTerm, searchFilterQuery } = useSearch('', searchBuildFilterQuery);

    const fetchWorkloads = async () => {
        try {
            const responseData = await dataService.readData(`${ROUTES.WORKLOADS}?included=collaborator.user,period.creator.user&perPage=10&page=${currentPage}${searchFilterQuery}`);
            setWorkloads(responseData.data.data);
            setTotalItems(responseData.data.total);
            console.log('workloads', responseData.data.data);
        } catch (error) {
            console.error('Error fetching workloads:', error);
            showNotification('Error al cargar las cargas de trabajo', 'error');
        }
    };

    useEffect(() => {
        fetchWorkloads();
    }, []);

    useEffect(() => {
        console.log('currentPage', currentPage);
        console.log('searchFilterQuery', searchFilterQuery);
        fetchWorkloads();
        }, [currentPage, searchFilterQuery]);

    

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
        // setDebouncedSearchTerm(event.target.value);
    };

    const handleEditClick = (workloadId, workloadValue) => {
        setEditingWorkloadId(workloadId);
        setTempWorkloadValue(workloadValue);
    };

    const handleWorkloadChange = (e) => {
        let value = e.target.value;
        if (value < 0) value = 0;
        setTempWorkloadValue(value);
    };

    const handleSaveWorkload = async (workloadId, collaboratorId, periodId) => {
        if (tempWorkloadValue < 0) return showNotification('error', 'The workload value must be zero or positive.');

        try {
            const response = await dataService.updateData(`${ROUTES.WORKLOADS}/${workloadId}`, {
                workload: tempWorkloadValue,
                collaborator_id: collaboratorId,
                period_id: periodId,
            });
            setWorkloads(workloads.map(w => w.id === workloadId ? { ...w, workload: tempWorkloadValue } : w));
            setEditingWorkloadId(null);
            setTempWorkloadValue(null);
            showNotification('success', 'Workload successfully updated.');
        } catch (error) {
            console.error('Error updating workload:', error);
            showNotification('error', 'Error updating the workload.');
        }
    };


    const NombreColumn = ({ row }) =>
        `${row.collaborator.user.name} ${row.collaborator.user.last_name} ${row.collaborator.user.second_last_name}`;

    const CargaColumn = ({ row, editingWorkloadId, tempWorkloadValue, handleWorkloadChange }) => (
        <div className="workload-container">
            {editingWorkloadId === row.id ? (
                <input
                    type="number"
                    value={tempWorkloadValue}
                    onChange={handleWorkloadChange}
                    className="input-edit"
                />
            ) : (
                <div className="bar-container">
                    <div
                        className={`workload-bar ${row.workload > 1.5 ? 'workload-bar-red' : 'workload-bar-blue'}`}
                        style={{ width: `${(row.workload / 1.5) * 100}%` }} 
                    />
                </div>
            )}
        </div>
    );

    const WorkloadNumberColumn = ({ row, editingWorkloadId, tempWorkloadValue }) => (
        <span className="workload-number"> {editingWorkloadId === row.id ? tempWorkloadValue : row.workload} </span>
    );

    const ActionColumn = ({ row, editingWorkloadId, handleSaveWorkload, handleEditClick }) => (
        <div>
            {editingWorkloadId === row.id 
                ? (<button onClick={() => handleSaveWorkload(row.id, row.collaborator.id, row.period.id)} className="btn-guardar"> Guardar </button>)
                : (<button className="btn-editar" onClick={() => handleEditClick(row.id, row.workload)}> <FontAwesomeIcon icon={faEdit} /> Editar </button>)
            }
        </div>
    );

    const columns = [
        { header: 'Nombre', render: row => <NombreColumn row={row} /> },
        { header: 'Carga', render: row => <CargaColumn row={row} editingWorkloadId={editingWorkloadId} tempWorkloadValue={tempWorkloadValue} handleWorkloadChange={handleWorkloadChange} /> },
        { header: '', render: row => <WorkloadNumberColumn row={row} editingWorkloadId={editingWorkloadId} tempWorkloadValue={tempWorkloadValue} /> },
        { header: '', render: row => <ActionColumn row={row} editingWorkloadId={editingWorkloadId} handleSaveWorkload={handleSaveWorkload} handleEditClick={handleEditClick} /> },
    ];

    return (
        <div className="semester-workload-container">
            <h1 className="title">Carga Semestral</h1>

            <div className="box-container">
                <div className="header-container">
                    <div className="header-title-filter-container">
                        <div className="header-title-container">
                            <h2 className="header-title">Carga Semestral</h2>
                            <span className="period">Periodo actual</span>
                        </div>
                        <p className="header-subtitle">Ingrese o modifique la carga semestral</p>
                    </div>

                    <div className="search-filter-container">
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
                </div>

                <Table className="workload-table" columns={columns} data={workloads} />

                <Pagination currentPage={currentPage} totalItems={totalItems} onPageChange={handlePageChange} />
            </div>
        </div>
    );
}


